from astream import app
from astream.routes import api, music
from astream.config import Config

app.register_blueprint(api)
app.register_blueprint(music)

if __name__ == '__main__':
    try:
        conf = Config("astream.conf")
        app.run(host=conf.host, port=conf.port, debug=conf.debug)

    except IOError as e:
        print(e.message)
