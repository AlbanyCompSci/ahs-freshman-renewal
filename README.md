# AHS Freshman Renewal Debates

## What is it?
An app for managing data collection for the Albany High School Freshman debates.

## Getting Setup
There is a lot to learn. It took me many months before I got to feel productive working on the project. While it may be frustrating at first to learn the setup, design decisions, including developer tools and libraries have been made with the intent to reduce work by the developer and improve quality.

## [The Stack](http://stackshare.io/albany-high-school/albany-high-school)
- [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
    - The app is built in JavaScript so that it can be run entirely
      in the client's browser, removing the need for a full backend.
- [React](https://facebook.github.io/react/)
    - We use Facebook's React JavaScript framework to build the app in a
      modular way. React provides tools for easily and efficiently building
      HTML in the DOM from within the app, as well as dividing it into
      components which can be easily composed.
- [Lo-Dash](https://lodash.com/)
    - Lodash provides utility functions (especially for dealing with arrays,
      object etc.). It is a drop-in replacement for
      [Underscore](http://underscorejs.org/).
- [Firebase](https://www.firebase.com/)
    - Firebase provides the backend NoSQL database for the app as well as a
      built-in authorization and authentication system to log-in and manage
      user access with their school Google account.
- [Grunt](http://gruntjs.com/)
    - We use Grunt to manage development tasks including building the app with
      Webpack and linting code with JSXHint.
- [Webpack](http://webpack.github.io/)
    - We use Webpack to build the app. It converts all of the JSX files to
      vanilla JavaScript before inlining all of the modules into a single
      file, and in the case of a production build, minify the source.
- [NPM](https://www.npmjs.com/)
    - We use NPM to manage all of the project's depencies.
- [Bootstrap](http://getbootstrap.com/)
    - We use [React Bootstrap](http://react-bootstrap.github.io/) to easily and
      cleanly style pages.
- [Github](https://github.com/)
    - We host all of the project's source code in
      [a Github repository](https://github.com/AlbanyCompSci/ahs-freshman-renewal).
- [Git](http://git-scm.com/)
    - We use Git to manage the project's development 
    - A great cheatsheet can be found [here](http://rogerdudler.github.io/git-guide/)
      (exuse the profanity).

## Installation
- Install [Node.js](http://nodejs.org/download)
    - This should install the Node Package Manager (npm)
- Install global binaries: `sudo npm install -g grunt-cli webpack firebase-tools`
- Install local dependencies: `npm install`

## Running the App
- One time development build: `grunt dev`
- Rebuild on file changes: `grunt dev-watch`
- Production build (includes minimizing): `grunt dist`

## TODO
- **Documentation**
- Authentication/Authorization
- Deal with bound tables in a sensible way
    - maximize performance
    - more importantly, make clear and easy
- Change name from ahs-freshman-renewal when new name is decided upon
- Allow Unicode characters in minimize source
- Fix Unicode support for multi select boxes (non-minimized source)
- Validation feedback for select boxes
- Prevent scroll bar from appearing on expanding select menus
- Add put, post and delete properties to field type
- Consider [Parse](https://parse.com/) for replacing Firebase
