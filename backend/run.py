from astream import app
from astream.routes import music

app.register_blueprint(music)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', debug = True)
