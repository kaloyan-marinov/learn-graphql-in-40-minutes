1. Launch one terminal instance

    ```
    $ npm install

    $ npm run dev
    ```

2. Launch another terminal instance

    ```
    $ http localhost:5000/graphql

    HTTP/1.1 500 Internal Server Error
    Connection: keep-alive
    Content-Length: 76
    Content-Type: application/json; charset=utf-8
    Date: Fri, 03 Dec 2021 19:52:44 GMT
    ETag: W/"4c-uxJf08BnZSXYg0lVnu6C93N+91A"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    {
        "errors": [
            {
                "message": "GraphQL middleware options must contain a schema."
            }
        ]
    }
    ```