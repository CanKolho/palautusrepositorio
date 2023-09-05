sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    The browser starts executing the JavaScript code that modifies the structure of DOM and then POSTs the submitted note to server. Server does not redirect and the browser remains the same page.