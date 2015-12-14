# API

API home url: `http://{hostname}/api/`

## Current - v0.1

[Music tree](#music-tree)


### Music tree
Retrieve `tree` of music directory represented as array obtaining relative paths to audio files. No order is guaranteed.
```
GET /api/music/tree
```
#### Parameters
None

#### Response
```
Status: 200 OK
Content-Type: application/json

{
  "music": [
    "foo.mp3",
    "bar.mp3",
    "/baz/a.mp3",
    "/baz/b.mp3",
    "/baz/c.mp3",
    "/baz/qux/x.mp3",
    "/baz/qux/y.mp3"
  ]
}
```


---

## Future

# v0.2
Basic operations with songs
```
/api/
/api/music/tree                GET
/api/music/add/                POST      (file/files)
/api/music/delete/             DELETE    (path)
/api/music/list                POST      (dir)
```

# v0.3
Introducing database
```
/api/music/{id]                GET
/api/music/delete/{id}         GET
```


# v0.4
New feature - playlists
```
/api/playlist/                 GET
/api/playlist/{id}             GET
/api/playlist/add/             POST      (name, paths)
/api/playlist/edit/{id}        PUT       (name, paths)
/api/playlist/delete/{id}      DELETE    (id)
```

## Links
1. http://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
2. http://apihandyman.io/do-you-really-know-why-you-prefer-rest-over-rpc/
