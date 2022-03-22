import os
from flask import Flask, request, jsonify
import io
import os
import re
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('universal_tagset')
nltk.download('maxent_ne_chunker')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('brown')
import spacy
import pandas as pd
import docx2txt
import constants as cs
from spacy.matcher import Matcher
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize
import requests
import phonenumbers
import constants as cs
from job_titles.src.find_job_titles import FinderAcora
# import en_core_web_sm
app = Flask(__name__)

# load pre-trained model
nlp = spacy.load('en_core_web_sm')
finder=FinderAcora()
# initialize matcher with a vocab
matcher = Matcher(nlp.vocab)

def my_replace(match):
    match = match.group()
    return match[0] + (" " if " " in match else "")
regex = r"[!\"#$%&\'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~ ]{2,}"

def get_company_list():
    # file_name = "https://raw.githubusercontent.com/jineshdhruv8/ResumeParser/master/Code/ResumeParser/wordList/companies.csv"
    file_name = "companies_sorted.csv"
    reader = pd.read_csv(file_name)
    companies_word_list = []
    for row in reader['name']:
        companies_word_list.append(row)
    return companies_word_list
company_list = get_company_list()

def extract_text_from_pdf(pdf_path):
    """
    A utility function to convert a machine-readable PDF to raw text.

    This code is largely borrowed from existing solutions, and does not match the style of the rest of this repo.
    :param input_pdf_path: Path to the .pdf file which should be converted
    :type input_pdf_path: str
    :return: The text contents of the pdf
    :rtype: str
    """
    # https://www.blog.pythonlibrary.org/2018/05/03/exporting-data-from-pdfs-with-python/
    # try:
    #     raw_text = parser.from_file(pdf_path,service='text')['content']
        
    #     full_string = re.sub(r'\n+','\n',raw_text)
    #     full_string = full_string.replace("\r", "\n")
    #     full_string = full_string.replace("\t", " ")

    #     # Remove awkward LaTeX bullet characters
        
    #     full_string = re.sub(r"\uf0b7", " ", full_string)
    #     full_string = re.sub(r"\u200b", " ", full_string)
    #     full_string = re.sub(r"\(cid:\d{0,2}\)", " ", full_string)
    #     # full_string = re.sub(r'•', " ", full_string)
    #     # full_string = re.sub(r'●', " ", full_string)

    #     # Split text blob into individual lines
    #     resume_lines = full_string.splitlines(True)
    #     return resume_lines

    # except Exception as e:
    #     print('Error in pdf file:: ' + str(e))
    #     return [], " "
    """
    A utility function to convert a machine-readable PDF to raw text.

    This code is largely borrowed from existing solutions, and does not match the style of the rest of this repo.
    :param input_pdf_path: Path to the .pdf file which should be converted
    :type input_pdf_path: str
    :return: The text contents of the pdf
    :rtype: str
    """
    if not isinstance(pdf_path, io.BytesIO):
        # extract text from local pdf file
        with open(pdf_path, 'rb') as fh:
            try:
                for page in PDFPage.get_pages(
                                fh,
                                caching=True,
                                check_extractable=True
                ):
                    resource_manager = PDFResourceManager()
                    fake_file_handle = io.StringIO()
                    converter = TextConverter(
                        resource_manager,
                        fake_file_handle,
                        codec='utf-8',
                        laparams=LAParams()
                    )
                    page_interpreter = PDFPageInterpreter(
                        resource_manager,
                        converter
                    )
                    page_interpreter.process_page(page)

                    raw_text = fake_file_handle.getvalue()
                    full_string = re.sub(r'\n+','\n',raw_text)
                    full_string = full_string.replace("\r", "\n")
                    full_string = full_string.replace("\t", "\n")
                    full_string = re.sub(r'[ \t]{3,}', '\n', full_string)

                    # Remove awkward LaTeX bullet characters

#                     full_string = re.sub(r"\uf0b7", " ", full_string)
#                     full_string = re.sub(r"\u200b", " ", full_string)
#                     full_string = re.sub(r"\(cid:\d{0,2}\)", " ", full_string)
#                     full_string = re.sub(r'•', " ", full_string)
#                     full_string = re.sub(r'\xa0', " ", full_string)
#                     full_string = re.sub(r'●', " ", full_string)
                    yield full_string

                    # close open handles
                    converter.close()
                    fake_file_handle.close()
            except PDFSyntaxError:
                return
    else:
        # extract text from remote pdf file
        try:
            for page in PDFPage.get_pages(
                pdf_path,
                caching=True,
                check_extractable=True
            ):
                resource_manager = PDFResourceManager()
                fake_file_handle = io.StringIO()
                converter = TextConverter(
                    resource_manager,
                    fake_file_handle,
                    codec='utf-8',
                    laparams=LAParams()
                )
                page_interpreter = PDFPageInterpreter(
                    resource_manager,
                    converter
                )
                page_interpreter.process_page(page)

                raw_text = fake_file_handle.getvalue()
                full_string = re.sub(r'\n+','\n',raw_text)
                full_string = full_string.replace("\r", "\n")
                full_string = full_string.replace("\t", "\n")

                # Remove awkward LaTeX bullet characters

#                 full_string = re.sub(r"\uf0b7", " ", full_string)
#                 full_string = re.sub(r"\u200b", " ", full_string)
#                 full_string = re.sub(r"\(cid:\d{0,2}\)", " ", full_string)
#                 full_string = re.sub(r'•', " ", full_string)
#                 full_string = re.sub(r'\xa0', " ", full_string)
#                 full_string = re.sub(r'●', " ", full_string)
                yield full_string

                # close open handles
                converter.close()
                fake_file_handle.close()
        except PDFSyntaxError:
            return


def get_number_of_pages(file_name):
    try:
        if isinstance(file_name, io.BytesIO):
            # for remote pdf file
            count = 0
            for page in PDFPage.get_pages(
                file_name,
                caching=True,
                check_extractable=True
            ):
                count += 1
            return count
        else:
            # for local pdf file
            if file_name.endswith('.pdf'):
                count = 0
                with open(file_name, 'rb') as fh:
                    for page in PDFPage.get_pages(
                        fh,
                        caching=True,
                        check_extractable=True
                    ):
                        count += 1
                return count
            else:
                return None
    except PDFSyntaxError:
        return None

def extract_text_from_doc(doc_path):
    '''
    Helper function to extract plain text from .doc or .docx files
    :param doc_path: path to .doc or .docx file to be extracted
    :return: string of extracted text
    '''
    try:
        raw_text = docx2txt.process(doc_path)
        full_string = re.sub(r'\n+','\n',raw_text)
        full_string = full_string.replace("\r", "\n")
        full_string = full_string.replace("\t", " ")

        # Remove awkward LaTeX bullet characters
        
        full_string = re.sub(r"\uf0b7", " ", full_string)
        full_string = re.sub(r"\u200b", " ", full_string)
        full_string = re.sub(r"\(cid:\d{0,2}\)", " ", full_string)
        # full_string = re.sub(r'•', " ", full_string)
        # full_string = re.sub(r'●', " ", full_string)
        
        
        # Split text blob into individual lines
        resume_lines = full_string.splitlines(True)
        return resume_lines

    except KeyError:
        text = textract.process(doc_path)
        text = text.decode("utf-8")
        clean_text = text.replace("\r", "\n").replace("\t", " ")  # Normalize text blob
        resume_lines = clean_text.splitlines(True)  # Split text blob into individual lines
        resume_lines = [re.sub('\s+', ' ', line.strip()) for line in resume_lines if line.strip()]  # Remove empty strings and whitespaces
        return ' '.join(resume_lines)

def extract_text(file_path, extension):
    '''
    Wrapper function to detect the file extension and call text extraction function accordingly
    :param file_path: path of file of which text is to be extracted
    :param extension: extension of file `file_name`
    '''
    text = ''
    if extension == '.pdf':
        for page in extract_text_from_pdf(file_path):
            text += ' ' + page
    elif extension == '.docx' or extension == '.doc':
        text = extract_text_from_doc(file_path)
    # text = segment(text)
    return text


# https://towardsdatascience.com/something-from-nothing-use-nlp-and-ml-to-extract-and-structure-web-data-3f49b2f72b13
def extract_name(resume_text):
    #Using NER to find people names in the text. 
    doc=nlp(resume_text)
    persons=[X.text for X in doc.ents if X.label_ == 'PERSON']
    persons_dict=dict.fromkeys(persons,0)
    persons=list(persons_dict)

    final_names=[]
    for person in persons: 
        if len(word_tokenize(person)) >= 2:
            string_name=re.sub(r"[^a-zA-Z0-9]+", ' ', person).strip()
            final_names.append(string_name)
    return final_names[0] if len(final_names) > 0 else ""

def extract_mobile_number(text):
    '''
    Helper function to extract mobile number from text
    :param text: plain text extracted from resume file
    :return: string of extracted mobile numbers
    '''
    # Found this complicated regex on : https://zapier.com/blog/extract-links-email-phone-regex/
    try:
        return list(iter(phonenumbers.PhoneNumberMatcher(text, None)))[0].raw_string
    except:
        try:
            phone = re.findall(re.compile(r'(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?'), text)
            if phone:
                number = ''.join(phone[0])
                if len(number) > 10:
                    return '+' + number
                else:
                    return number
        except:
            return ""

def extract_mobile_number(text):
    '''
    Helper function to extract mobile number from text
    :param text: plain text extracted from resume file
    :return: string of extracted mobile numbers
    '''
    # Found this complicated regex on : https://zapier.com/blog/extract-links-email-phone-regex/
    try:
        return list(iter(phonenumbers.PhoneNumberMatcher(text, None)))[0].raw_string
    except:
        try:
            phone = re.findall(re.compile(r'(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?'), text)
            if phone:
                number = ''.join(phone[0])
                if len(number) > 10:
                    return '+' + number
                else:
                    return number
        except:
            return ""

def extract_email(email):
    email = re.findall("([^@|\s]+@[^@]+\.[^@|\s]+)", email)
    if email:
        try:
            return email[0].split()[0].strip(';')
        except IndexError:
            return None

def extract_skills(resume_text):
    '''
    Helper function to extract skills from spacy nlp text
    :param nlp_text: object of `spacy.tokens.doc.Doc`
    :param noun_chunks: noun chunks extracted from nlp text
    :return: list of skills extracted
    '''
    # noun_chunks = nlp.noun_chunks
    nlp_text = nlp(resume_text)
    
    # removing stopwords and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]
    
    # reading the csv file
    # data = pd.read_csv(os.path.join(os.path.dirname(__file__), 'skills.csv')) 
    data = pd.read_csv("skills.csv")
    
    # extract values
    skills = list(data.columns.values)

    skillset = set()
    
    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.add(token)
    
    for token in nlp_text.noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.add(token)
    
    return [i.capitalize() for i in set([i.lower() for i in skillset])]

def get_university_list():
    # file_name = "https://raw.githubusercontent.com/jineshdhruv8/ResumeParser/master/Code/ResumeParser/wordList/companies.csv"
    file_name = "degree.csv"
    reader = pd.read_csv(file_name)
    companies_word_list = []
    for row in reader:
        print(row)
        companies_word_list.append(row)
    return companies_word_list
    

def extract_sections(resume_text):
    RESUME_SECTIONS_GRAD = (
        'accomplishments',
        'experience',
        'education',
        'interests',
        'projects',
        'publications',
        'skills',
        'certifications',
        'summary'
    )

    total = cs.education_and_training + cs.work_and_employment + cs.project + RESUME_SECTIONS_GRAD
    text_split = [i.strip() for i in resume_text.split('\n')]
    entities = {}
    key = False
    for phrase in text_split:
        if len(phrase) == 1:
            p_key = phrase
        else:
            p_key = set(phrase.lower().split()) & set(total)
        try:
            p_key = list(p_key)[0]
        except IndexError:
            pass
        if p_key in total:
            if p_key in cs.project:
                key = 'project'
            elif p_key in cs.work_and_employment:
                key = 'experience'
            elif p_key in cs.education_and_training:
                key = 'education'
            else:
                key = p_key
            entities[key] = []
        elif key and phrase.strip():
            entities[key].append(phrase)
    return entities

nlp = spacy.load("en_core_web_sm")
def extract_degree(resume_text):
    '''
    Helper function to extract education from spacy nlp text
    :param nlp_text: object of `spacy.tokens.doc.Doc`
    :return: tuple of education degree and year if year if found
             else only returns education degree
    '''
       
    nlp_text = nlp(resume_text)
    # print(nlp_text)
    # Sentence Tokenizer
    nlp_text = [sent.text.strip() for sent in nlp_text.sents]
    print(nlp_text)
    edu = {}
    # Extract education degree
    for index, text in enumerate(nlp_text):
        #print(index, text), print('-'*50)
        for tex in text.split():
            # Replace all special symbols
            tex = re.sub(r'[?|$|.|!|,]', r'', tex)
            # print(tex)
            if tex.upper() in cs.EDUCATION and tex not in cs.STOPWORDS:
                edu[tex] = text + nlp_text[index + 1]
    return list(edu.keys())

RESERVED_WORDS = [
    'school',
    'college',
    'univers',
    'academy',
    'faculty',
    'institute',
    'faculdades',
    'Schola',
    'schule',
    'lise',
    'lyceum',
    'lycee',
    'polytechnic',
    'kolej',
    'ünivers',
    'okul',
    'tech'
]

def extract_education(input_text):
    organizations = []
    # we search for each bigram and trigram for reserved words
    # (college, university etc...)
    education = list()
    for org in input_text:
        for word in RESERVED_WORDS:
            if org.lower().find(word) >= 0:
                education.append(org)
    return education
# print(entities['education'])

def extract_work_experience(entities):
    company = dict()
    # des_set = set(designation_list.lower())
    nlp = spacy.load('en_core_web_sm')
    curr_company = 'Unnamed'
    company[curr_company] = {"date": [], "designation": []}
    if 'experience' in entities:
        for text in entities['experience']:
            test_text = text.split()
            foundCompany = False
            if len(test_text) <= 6:
                for word in company_list:
                    if text.lower() == word:
                        if text not in company:
                            curr_company = text
                            company[text] = {"date": [], "designation": []}
                        break
            match = finder.findall(text)
            # merge intervals
            if len(match) > 0:
                s = [[match[0].start, match[0].end]]
                for i in range(1, len(match)):
                    if s[-1][1] >= match[i].start:
                        s[-1][1] = match[i].end
                    else:
                        s.append([match[i].start, match[i].end])
                if s:
                    for elem in s:
                        t = str(text[elem[0]:elem[1]])
                        company[curr_company]["designation"].append([t, ""])
                        
            text1 = nlp(text)
            found_date = False
            for word in text1.ents:
                if word.label_ == 'DATE':
                    date = text1[word.start:word.end]
                    company[curr_company]["date"].append(str(date))
                    found_date = True
                    break
            if curr_company and not foundCompany and not found_date and len(match) == 0:
                if len(company[curr_company]["designation"]) > 0:
                    company[curr_company]["designation"][-1][1] += (text + "\n")
    return company

ALLOWED_EXTENSIONS = set(['pdf'])

@app.route('/resumeapi', methods=['GET'])
def hello():
    return 'Hello World'

#we define the route
@app.route('/resumeapi/parse_resume', methods=['POST'])
def parseResume():
    # return a json
    resume = request.files['file']
    print(resume)
    # resume = "./TimothyNguyen2022.pdf"
    resume_text = extract_text(resume, os.path.splitext(resume)[1])
    name = extract_name(resume_text)
    phone = extract_mobile_number(resume_text)
    email = extract_email(resume_text)
    skills = extract_skills(resume_text)
    entities = extract_sections(resume_text)
    experience_section = extract_work_experience(entities)
    education_degrees = extract_degree("\n".join(entities['education']))
    universites = extract_education(entities['education'])
    res = {
        "name": name,
        "phone": phone,
        "email": email,
        "skills": skills,
        "experience": experience_section,
        "degrees": education_degrees,
        "universities": universites
    }
    return res
    

if __name__ == '__main__':
    #define the localhost ip and the port that is going to be used
    # in some future article, we are going to use an env variable instead a hardcoded port 
    app.run(host='0.0.0.0', port=5001)
