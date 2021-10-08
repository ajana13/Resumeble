from typing import List, Optional
from pydantic import BaseModel
import os
import spacy
from spacy.matcher import Matcher

class Profile(BaseModel):
    nlp = spacy.load('en_core_web_sm')
    matcher = Matcher(nlp.vocab)
    profile_usage = {
        'name': None
    }