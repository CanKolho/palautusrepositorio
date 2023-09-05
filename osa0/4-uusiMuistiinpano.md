sequenceDiagram
    participant browser
    participant server

    User fills the form and sends POST method to '/new-notes':

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new-notes
    activate server
    Server: Executes code that adds new JSON to 'notes' and redirects back to '/notes'
    deactivate server

    When POST -method is redirected, browser sends GET -method to server:

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server

    The browser executes the callback function that renders the notes, and the most resent JSON is shown at the end of the array

    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... , { "content": "Most resent note", "date": "2023-1-1" }]
    deactivate server    