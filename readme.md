# Spotify Music Search API

This sample project is an AngularJS SPA that demonstrates how to display data consumed from Spotify's Open API.

## Installing / running it locally

1. Check if the most recent version of [NodeJS](https://nodejs.org/en/download/) is available on your system and update it if necessary.
2. Clone the code repository on your local environment.
3. Using the command line, navigate to the root folder from the repo you just cloned on the previous step and execute `npm install`
4. Once the command finishes successfully, execute on the project's root folder `node node_modules/http-server/bin/http-server` (replace slashes by backslashes on Windows)
5. Without stopping the process started on the previous step, type any of the URLs it displays on command line on your browser (usually http://127.0.0.1:8080 works, but double check whether you can find it on the URL list that is displayed to prevent unexpected problems)

## Development / build process
The development workflow tool of choice for this project is [Gulp](http://gulpjs.com/). It will be automatically installed once you finish the install steps. The project doesn't require a global (`-g`) Gulp installation to work, you may run the following command from the root repository folder to execute the local gulp:

```
node node_modules/gulp/bin/gulp.js
```

(Replace slashes by backslashes on Windows)

The following tasks are available:

| Task | Description |
|------|-------------|
| sass | Transpiles all .sass files from project and places the output on css/default.css file |
| test | Runs the entire JS test suite on command line using Karma and PhantomJS |
| watch | Triggers `sass` and keeps a process that executes the task again as soon as some change is done on .sass file entries |
| default | Triggers watch |

**no changes** should be done directly on CSS. It is a SASS-based project, so any changes should be done on .sass files, that are from where the CSS output is generated.

## Tests
The command line version of tests can be run using the aforementioned `gulp test` task, that seems to be the easiest way to execute them. On the visual front, the `/tests.html` page executes Jasmine tests too.

## Application architecture
The application is built on top of 6 directives (all of them have an HTML template counterpart):

- SearchHeader **- the header part**
- SearchBox **- the box with the search field and button**
- SearchResults **- the box where multiple result entries are displayed**
- SearchResult **- represents each result entry**
- EntryDetails **- displays the details for a result on an overlay**
- SearchFooter **- the footer part**

The only directive that misses a controller counterpart is _SearchResult_.

These controllers interact with the following services:
- DataService **- handles request to the Spotify API**
- LocalStorageService **- client-side cache layer that utilizes the window.localStorage to speed up Spotify requests**
- MessageService **- an observable object that accepts subscriptions and handles event triggering**

The architecture is completed by some accessory objects, like the models, utilized to parse data retrieved from Spotify API, and the utils methods.

## Files structure
- .idea **- project's visual diagrams**
- css **- result files from SASS compilation**
- images **- graphic data**
- sass **- source files that contains the presentation setup for the project**
- scripts **- on the root folder, the required libraries (angular.js, require.js, and so on)**
  - controllers **- angular controllers**
  - directives  **- angular directives**
  - models **- small function definitions, usually to provide initial parsing capabilities for that that arrives from API**
  - services **- angular services, injectable functionality that may or not receive other injectables**
  - templates **- HTML definition for directives**
  - tests **-test-related stuff like Jasmine libraries, setup scripts, and so on**
  - utils **- A small collection of functionality that can be consumed on various places**
- gulpfile.js **- Gulp tasks definition file**
- index.html **- Main application file**
- karma.conf.js **-Karma configuration**
- package.json **-NPM dependencies definition**
- readme.md **- This file ;)**
- tests.html **- Visual tool to run test cases**
