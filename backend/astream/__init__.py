import os
from flask import Flask

app = Flask(__name__)
here = os.path.dirname(__file__)
music_dir = os.path.join(os.path.dirname(os.path.dirname(here)), "data")
