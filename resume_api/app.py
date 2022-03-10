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

#we define the route /
@app.route('/')
def welcome():
    # return a json
    return jsonify({'status': 'api working'})

if __name__ == '__main__':
    #define the localhost ip and the port that is going to be used
    # in some future article, we are going to use an env variable instead a hardcoded port 
    app.run(host='0.0.0.0', port=os.getenv('PORT'))
