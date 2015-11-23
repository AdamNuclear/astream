import os
import ConfigParser


class Config(object):
    def __init__(self, path):

        if not os.path.exists(path):
            raise IOError("Config file not found\n"
                          "Please run `cp astream.example.conf astream.conf` and properly edit it.")

        config = ConfigParser.RawConfigParser()
        config.read(path)

        self.debug = config.getboolean("backend", "debug")
        self.host = config.get("backend", "host")
        self.port = config.getint("backend", "port")
