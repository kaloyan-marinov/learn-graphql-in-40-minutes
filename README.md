1. Launch one terminal instance

    ```
    $ npm install

    $ npm run dev
    ```

2. Launch another terminal instance

    ```
    $ http localhost:5000/graphql

    HTTP/1.1 400 Bad Request
    Connection: keep-alive
    Content-Length: 53
    Content-Type: application/json; charset=utf-8
    Date: Fri, 03 Dec 2021 20:01:27 GMT
    ETag: W/"35-rkfaW07yp80JIwkYI6hoaXIO3bI"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    {
        "errors": [
            {
                "message": "Must provide query string."
            }
        ]
    }
    ```

    instead, launch a browser and navigate to `localhost:5000/graphql` - a GraphQL web interface should load in your browser tab (you can check the documentation of our GraphQL server by clicking on `Docs`)

    to call that query, we just have to write the following in the left-hand panel of the loaded web interface (which is a text editor):
    ```
    query {
      message
    }
    ```
    and the right-hand panel will be populated with
    ```
    {
    "data": {
        "message": "Hello world!"
    }
    }
    ```