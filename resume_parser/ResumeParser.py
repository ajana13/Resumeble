import io
import os
import re
import nltk
import spacy
import pandas as pd
import docx2txt
# from . import constants as cs
from spacy.matcher import Matcher
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument

'''
def text_from_pdf(pdf_path):
    output_string = StringIO()

    with open(pdf_path, 'rb') as f:
        #for page in PDFPage.get_pages(f, caching=True, check_extractable=True):
        #    page
        parser = PDFParser(f)
        doc = PDFDocument(parser)
        rsrcmgr = PDFResourceManager()
        device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        for page in PDFPage.create_pages(doc):
	        interpreter.process_page(page)
    
    return output_string.getvalue()

def extract_text_from_doc(doc_path):
    
    # Helper function to extract plain text from .doc or .docx files
    # :param doc_path: path to .doc or .docx file to be extracted
    # :return: string of extracted text
    
    temp = docx2txt.process(doc_path)
    text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
    return ' '.join(text)
'''