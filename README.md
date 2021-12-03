1. Launch one terminal instance

    ```
    $ npm install

    $ npm run dev
    ```

2. Launch another terminal instance

    ```
    $ http localhost:5000
    
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 26
    Content-Type: application/json; charset=utf-8
    Date: Fri, 03 Dec 2021 19:42:51 GMT
    ETag: W/"1a-T7vCLEZV7pLSyUzkr9XBdG32YU8"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    {
        "message": "Hello world!"
    }
    ```