import io
import os
import re
import nltk
import spacy
import pandas as pd
import constants as cs
import spacy
from spacy.matcher import PhraseMatcher
from flask import Flask, request, jsonify

# load default skills data base
from skillNer.general_params import SKILL_DB
# import skill extractor
from skillNer.skill_extractor_class import SkillExtractor

# init params of skill extractor
nlp = spacy.load("en_core_web_lg")

app = Flask(__name__)

def job_description_preprocess(raw_text):
    full_string = re.sub(r'\n+','\n',raw_text)
    full_string = full_string.replace("\r", "\n")
    full_string = full_string.replace("\t", "\n")
    full_string = full_string.replace("|", "\n")
    full_string = re.sub(r'[ \t]{3,}', '\n', full_string)

    return full_string

def extract_skills(jd_text):
    # init skill extractor
    skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)

    # extract skills from job_description
    annotations = skill_extractor.annotate(jd_text)
    skills = annotations['results']['full_matches'] + annotations['results']['ngram_scored']
    skills = set(elem['doc_node_value']for elem in skills) 
    return list(skills)

@app.route('/resumescore', methods=['GET'])
def hello():
    raw_text = """
    About the job
    We are now looking for a Full Stack Software Engineer. NVIDIA is hiring full stack engineer for internal Solutions team to work on our AI infrastructure and deep learning platform. Our team works closely with Autonomous Vehicles (AV) teams and addresses AI, data-processing and visualization demands based on feedback from AV developers. Together, we will help advance NVIDIA's capacity to build leading solutions for a broad range of AI based applications such as autonomous driving, robotics, healthcare, virtual reality, graphics engines and visual computing.

    What You Will Be Doing
    Spend the majority of the time hands-on writing code and peer reviewing high performance, high quality, and well tested and well architected code.
    Be embedded in Autonomous Vehicle teams, deeply understand AV needs on technical level, and then design and build scalable web-based applications that help index, mine, transform, analyze, develop, and debug deep learning datasets and applications.
    Architect and craft solutions for our development and debugging platform using real and synthetic / simulated datasets for autonomous driving.
    Enable deep insights and end-to-end traceability into autonomous vehicle development, triage, debug, and performance metrics.
    Deliver rapid iterations of software based on user feedback and metrics.
    Build and deploy reusable, generalized, and customized solutions that integrate our AI platform.
    Regularly engage with customers directly to provide technical support and productize AI and DRIVE platforms. Document requirements, designs, and solutions, organize training sessions, demonstrate new technologies, and drive adoption across teams working on autonomous driving.
    Showcase your creativity and technical excellence to realize the future of self-driving cars!
    What We Need To See
    Pursuing Bachelors or Masters in Computer Architecture, Computer Science, Electrical Engineering, Mathematics or related field.
    Experience in designing, developing and deploying software that includes distributed backend systems and web application development.
    Experience in Go, Python and TypeScript.
    Breadth of knowledge: understanding of Linux internals to efficiently triage and debug performance issues, understanding of containerization/Docker and current web technologies.
    Strong problem solving and debugging skills.
    Strong programming background that incorporates familiarity with various data structures, design patterns, functional programming, OOP, and test driven development.
    You are highly motivated, you have the ability to successfully work with multi-functional teams and coordinate across organizational boundaries and geographies.
    Ways To Standout From The Crowd
    Familiarity with and appreciation of functional programming techniques (reducing dependence on the state, pure functions, composition) and languages (Scala, Agda, Idris, Haskell), and willingness to apply state-of-the-art techniques to codebases while using mainstream languages (Go/Python/TypeScript).
    Experience with full stack web based visualization technologies to help provide data insights. Familiarity with Angular and React.
    Experience with Python SDKs, Python packaging, cross language bindings (C++/Python) and/or the Bazel build system.
    Experience with structured data such as Avro, Parquet, Protobuf, Thrift, and concepts like schema evolution.
    Experience with robotics or autonomous vehicles' domains, standards, and processes.
    With highly competitive salaries and a comprehensive benefits package, NVIDIA is widely considered to be one of the technology industry's most desirable employers. We have some of the most brilliant and hardworking people in the world working with us and our engineering teams are growing fast in some of the hottest and ground-breaking fields: Deep Learning, Artificial Intelligence, and Autonomous Vehicles. If you're a creative computer scientist/engineer with a real passion for distributed systems and autonomous driving, we want to hear from you.

    NVIDIA is committed to fostering a diverse work environment and proud to be an equal opportunity employer. As we highly value diversity in our current and future employees, we do not discriminate (including in our hiring and promotion practices) on the basis of race, religion, color, national origin, gender, gender expression , sexual orientation, age, marital status, veteran status, disability status or any other characteristic protected by law.
    """
    resume_text = job_description_preprocess(raw_text)
    skills = extract_skills(resume_text)
    return jsonify(skills), 200

if __name__ == '__main__':
    #define the localhost ip and the port that is going to be used
    # in some future article, we are going to use an env variable instead a hardcoded port 
    app.run(host='0.0.0.0', port=5002)