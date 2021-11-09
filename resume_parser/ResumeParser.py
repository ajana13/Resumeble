import spacy 
from spacy.matcher import Matcher
import re
import pandas as pd
from nltk.corpus import stopwords
import os
import io
import nltk
import docx2txt

class ResumeParser(object):
    def __init__(self, resume, skills_file=None) -> None:
        nlp = spacy.load('en_core_web_sm')
        