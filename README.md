
## Basic Usage

``` 
    yarn
    yarn dev
    yarn build
```

## Project structure:


1. For the popup page there is created ‘popup-page’ folder. (There is an empty template for the possible future popup implementation)

2. For the option page there is created ‘option-page’ folder. (There is an empty template for the possible future option implementation)

3. For the extension injection into the current WhatsApp page, there is a folder content-scripts. (The main code placed here)

4. Folder src contains the background.js file for the background rendering.

5. Src folder has the following structure:
    * Background.js file. Redux store is initialized in this file
    * Reducer.js file - connected Redux store reducers
    * Saga folder - connected redux-saga. This library is not using in the current implementation and needed for the further using the third-party API.
    * Reducers folder contains reducers to interact with the redux store.
    * App folder contains the main file - manifest.js (global CSS styles, images, icons)

6. Content-scripts folder has the following structure:
    * APP.jsx - the main file for the inserted extension into app. The separate container is created in this file contain implemented extension with personal id. This container is inserted into WhatsApp 
    * Style.scss is intended to connect styles to the used library antd only
    * The folder content-scripts/containers contains the main components of the current extension: 
        - TopLogo (upper field with the logo) 
        - SideBar (field with Left Navigation Bar)
        - QuickReplies (field with Quick Replies and Filters)
        - MainMenu (right side menu with the main extension info)
        - MainWrapper ( Field combined all previous fields above. Data comes from chrome.storage and saving to redux store)
    * The folder content-scripts/components contains separate components placed on the page. ( separate modals, notes, components for the labels settings, quick replies)
    * Folder content-scripts/constants  contains global constants 
    * Folder content-scripts/global-style contains common styles for the single react components
    * Folder content-scripts/helpers contains common functions. Also, functions allow saving data to the chrome.storage.

7. States created in redux store: 
    - quickReplies (to store quick replies)
    - colorFilters (to store color labels)
    - selectedUser (to store WhatsApp selected users)
    - userNotes (to store notes for each WhatsApp user)
    - usersConnectedLabels (to store a connection between created labels for each WhatsApp user)

8. To run the project in development mode you need to:
    - run the remote server redux devTools ( use the command ‘remotedev --port 8000’ , wherein remotedev should be installed on the computer globally).
    - Then install dependencies with ‘yarn’ command
    - Run ‘yarn dev’ for the creation ‘dist’ folder with the project build
    - Add ‘dist’ folder to crome://extension

9. To run the project in production mode you need to:
    - install dependencies with ‘yarn’ command
    - Run ‘yarn dev’ for the creation ‘dist’ folder with the project build
    - Add ‘dist’ folder to crome://extension

