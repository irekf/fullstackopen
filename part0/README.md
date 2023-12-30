### 0.4: New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user clicks the "send" button and the browser forms a POST request <br>with a JSON containing the data from the "note" input element.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note <br> {note: "note text"}
    activate server
    Note right of server: The server JavaScript adds the new note to its "notes" array <br>and redirects the browser by responding with a 302.
    server-->>browser: Status 302 with new location /exampleapp/notes
    deactivate server

    Note right of browser: From here the sequence is exactly the same as the one in the "Loading a page <br>containing JavaScript - review" section of the course with the exception that <br>the data.json file now contains the new note which will be subsequently <br>displayed by the browser.
```

### 0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: the initial HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the main.css CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the spa.js JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the spa.js JavaScript code that:<br> 1. Registers a callback for the following JSON fetch request completion<br> 2. Fetches the JSON from https://studies.cs.helsinki.fi/exampleapp/data.json" and stores the content in a local array<br> 3. Registers a callback for when the page is fully loaded (window.onload)

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: "test", date: "2023-12-28T16:38:16.660Z", ... ]
    deactivate server

    Note right of browser: The browser JavaScript code:<br> 1. Changes the initial document to include the downloaded notes from its local "notes" array<br> 2. Disables the default submit action and registers new logic <br>for the submit form in the window.onload callback <br>(this step can also happen before the JSON has been <br>fetched)
```

### 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

   Note right of browser: When the user enters a note and clicks "send", the browser JavaScript code:<br> 1. Executes the form.onsubmit callback and pushes the new note to its local "notes" array<br> 2. Redraws the notes on the page from the local "notes" array which <br>includes the previously downloaded notes and the new note<br> 3. Sends the new note to the server (see below)
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa <br> {"content":"User note","date":"2023-12-29T20:13:44.879Z"}
    activate server
    Note right of server: The server JavaScript code adds the new note to its "notes" <br>array and responds to the browser with a 201.
    server-->>browser: Status 201 {"message":"note created"}
    deactivate server
```