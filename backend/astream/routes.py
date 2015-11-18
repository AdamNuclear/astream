import os
from flask import Blueprint, jsonify
from . import music_dir


music = Blueprint("music", __name__)


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
