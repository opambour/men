# Create an empty File in CMD:
    >>> echo >> README.md

# CREATE a File with text:
    >>> echo "node_modules" >> .gitignore
    >>> echo {"directory": "public/vendors"} >> .bowerrc

# Using git:
1. Intitialize git repositiory in your project
    >>> git init
2. Create ignore files
    >>> echo "node_modules" >> .gitignore
3. echo "node_modules" >> .gitignore
4. Configure Git user and email:
    >>> git config --global user.name "Michael A. Agyeman"
    >>> git config --global user.email "opambour@hotmail.com"
5. Track any changes in project:
    >>> git add .
6. Add all changes to repository:
    >>> git add -A
7. Put all the changes to a permanent memory repository:
    >>> git commit -m "initial commit"
8. Push to gihub:
    >>> git remote add origin https://github.com/opambour/men.git
    >>> git push -u origin master

S Code ESLint extension

Integrates ESLint into VS Code. If you are new to ESLint check the documentation.

The extension uses the ESLint library installed in the opened workspace folder. If the folder doesn't provide one the
extension looks for a global install version. If you haven't installed ESLint either locally or globally do so by running
npm install eslint in the workspace folder for a local install or npm install -g eslint for a global install.

On new folders you might also need to create a .eslintrc configuration file. You can do this by either running
eslint --init in a terminal or by using the VS Code
command Create '.eslintrc.json' file.

Settings Options

This extension contributes the following variables to the settings:

eslint.enable: enable/disable eslint. Is enabled by default.
eslint.options: options to configure how eslint is started using the ESLint CLI Engine API. Defaults to an empty option bag.
An example to point to a custom .eslintrc.json file is:
{
  "eslint.options": { "configFile": "C:/mydirectory/.eslintrc.json" }
}
eslint.run - run the linter onSave or onType, default is onType.
eslint.autoFixOnSave - enables auto fix on save. Please note auto fix on save is only available if VS Code's files.autoSave is either off, onFocusChange or onWindowChange. It will not work with afterDelay.
eslint.nodePath - use this setting if an installed ESLint package can't be detected, for example /myGlobalNodePackages/node_modules.
eslint.validate - an array of language identifiers specify the files to be validated. Something like "eslint.validate": [ "javascript", "javascriptreact", "html" ]. If the setting is missing, it defaults to ["javascript", "javascriptreact"]. You can also control which plugins should provide autofix support. To do so simply provide an object literal in the validate setting with the properties language and autoFix instead of a simple string. An example is:

"eslint.validate": [ "javascript", "javascriptreact", { "language": "html", "autoFix": true } ]
eslint.workingDirectories - an array for working directories to be used. ESLint resolves configuration files relative to a working directory. This new settings allows users to control which working directory is used for which files. Consider the following setups:

client/
.eslintignore
.eslintrc.json
client.js
server/
.eslintignore
.eslintrc.json
server.js
Then using the setting:

"eslint.workingDirectories": [
  "./client", "./server"
]
will validate files inside the server directory with the server directory as the current working directory. Same for files in the client directory. If the setting is omitted the working directory is the workspace folder.

Commands:

This extension contributes the following commands to the Command palette.

Create '.eslintrc.json' file: creates a new .eslintrc.json file.
Fix all auto-fixable problems: applies ESLint auto-fix resolutions to all fixable problems.
Disable ESLint for this Workspace: disables ESLint extension for this workspace.
Enable ESLint for this Workspace: enable ESLint extension for this workspace.

# Enabling JsHint In VSCode:
1. Select File / Preferences / Workspace Settings
2. Paste the following code in the settings.json file 
    "jshint.options": {"esversion": 6},

# Mongodb Database Commands:
While mongod server is still running, open a new terminal to initiate mongodb shell:
>>>$ mongo

## Show databases:
> show databases

## Select Database:
> use meandb

## Create database:
>use meandb

# Using Mongoose to create Schema and connect to your backend:
Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
mongoose is an object modeling package for Node that essentially works like an ORM that you would see in other languages (like Eloquent for Laravel and django models).

Mongoose allows us to have access to the MongoDB commands for CRUD simply and easily. To use mongoose, make sure that you add it to you Node project by using the following command:
>> npm install --save mongoose

Create database before connecting and creating your model.
>> Use robomongo to create new database

Connect Your database:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/your_database');

# Create Your Model Using Mongoose as ORM:
See...user.model.js

