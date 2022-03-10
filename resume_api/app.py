import os
from flask import Flask, jsonify
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
from tika import parser
# import en_core_web_sm
app = Flask(__name__)

# load pre-trained model
nlp = spacy.load('en_core_web_sm')

# initialize matcher with a vocab
matcher = Matcher(nlp.vocab)

def my_replace(match):
    match = match.group()
    return match[0] + (" " if " " in match else "")
regex = r"[!\"#$%&\'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~ ]{2,}"

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
    try:
        raw_text = parser.from_file(pdf_path,service='text')['content']
        
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

    except Exception as e:
        print('Error in pdf file:: ' + str(e))
        return [], " "

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
        full_string = re.sub(r'•', " ", full_string)
        full_string = re.sub(r'●', " ", full_string)
        
        
        # Split text blob into individual lines
        resume_lines = full_string.splitlines(True)
        # text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
        # raw_text = ' '.join(text)
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

def extract_entity_sections(text):
    '''
    Helper function to extract all the raw text from sections of resume
    :param text: Raw text of resume
    :return: dictionary of entities
    '''
    text_split = [i.strip() for i in text.split('\n')]
     # sections_in_resume = [i for i in text_split if i.lower() in sections]
    entities = {}
    key = False
    for phrase in text_split:
        if len(phrase) == 1:
            p_key = phrase
        else:
            p_key = set(phrase.lower().split()) & set(cs.RESUME_SECTIONS)
        try:
            p_key = list(p_key)[0]
        except IndexError:
            pass
        if p_key in cs.RESUME_SECTIONS:
            entities[p_key] = []
            key = p_key
        elif key and phrase.strip():
            entities[key].append(phrase)
    # entity_key = False
    # for entity in entities.keys():
    #     sub_entities = {}
    #     for entry in entities[entity]:
    #         if u'\u2022' not in entry:
    #             sub_entities[entry] = []
    #             entity_key = entry
    #         elif entity_key:
    #             sub_entities[entity_key].append(entry)
    #     entities[entity] = sub_entities

    # pprint.pprint(entities)

    # make entities that are not found None
    # for entity in cs.RESUME_SECTIONS:
    #     if entity not in entities.keys():
    #         entities[entity] = None 
    return entities

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
            
    # generate bigrams and trigrams (like Machine Learning)
    # n_grams = list(map(' '.join, nltk.everygrams(ft, 2, 3)))
    # for n_gram in n_grams:
    #     token =  n_grams.strip()
    #     if n_gram in skills:
    #         skillset.append(token)
    
    return [i.capitalize() for i in set([i.lower() for i in skillset])]

#we define the route /
@app.route('/')
def welcome():
    # return a json
    resume = "./TimothyNguyen2022.pdf"
    resume_text = extract_text(resume, os.path.splitext(resume)[1])
    name = extract_name(resume_text)
    phone = extract_mobile_number(resume_text)
    email = extract_email(resume_text)
    skills = extract_skills(resume_text)
    res = {
        "name": name,
        "phone": phone,
        "email": email,
        "skills": skills
    }
    return jsonify(res)
    

if __name__ == '__main__':
    #define the localhost ip and the port that is going to be used
    # in some future article, we are going to use an env variable instead a hardcoded port 
    app.run(host='0.0.0.0', port=os.getenv('PORT'))
