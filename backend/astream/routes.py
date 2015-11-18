import os
from flask import Blueprint, jsonify
from . import music_dir


api = Blueprint("api", __name__)
music = Blueprint("music", __name__)


@api.route("/")
@api.route("/api")
def home():
    return jsonify({"message": "See documentation here: https://github.com/FrostyX/astream/blob/master/API.md"})


@music.route("/api/music/tree")
def tree():
    r = []
    for path, dirs, files in os.walk(music_dir):
        d = path.replace(music_dir, "")
        for f in files:
            if f.startswith("."):
                continue
            r.append(os.path.join(d, f))
    return jsonify({"music": r})
