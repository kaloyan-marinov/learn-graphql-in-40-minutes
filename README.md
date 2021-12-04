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

    to call a query, we just have to write the following in the left-hand panel of the loaded web interface (which is a text editor):
    ```
    query {
      authors {
        name
      }
    }
    ```
    and the right-hand panel will be populated with
    ```
    {
      "data": {
        "authors": [
          {
            "name": "J. K. Rowling"
          },
          {
            "name": "J. R. R. Tolkien"
          },
          {
            "name": "Brent Weeks"
          }
        ]
      }
    }
    ```

    another query that we can call is:
    ```
    query {
      books {
        author {
          name
        }
        name
      }
    }
    ```
    and its result will be
    ```
    {
      "data": {
        "books": [
          {
            "author": {
              "name": "J. K. Rowling"
            },
            "name": "Harry Potter and the Chamber of Secrets"
          },
          {
            "author": {
              "name": "J. K. Rowling"
            },
            "name": "Harry Potter and the Prisoner of Azkaban"
          },
          {
            "author": {
              "name": "J. K. Rowling"
            },
            "name": "Harry Potter and the Goblet of Fire"
          },
          {
            "author": {
              "name": "J. R. R. Tolkien"
            },
            "name": "The Fellowship of the Ring"
          },
          {
            "author": {
              "name": "J. R. R. Tolkien"
            },
            "name": "The Two Towers"
          },
          {
            "author": {
              "name": "J. R. R. Tolkien"
            },
            "name": "The Return of the King"
          },
          {
            "author": {
              "name": "Brent Weeks"
            },
            "name": "The Way of Shadows"
          },
          {
            "author": {
              "name": "Brent Weeks"
            },
            "name": "Beyond the Shadows"
          }
        ]
      }
    }
    ```