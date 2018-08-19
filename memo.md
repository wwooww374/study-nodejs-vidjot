## npm - "package.json" file
A metadata for a JavaScript package or application, which specifies the name, version, description, author, and **dependencies** of the package.

Most importantly, "package.json" file has **dependencies**. When you're ready to deploy the package, you need to know what dependencies it depends on. If your package is an web application using Express, Express is definitely going to be one of the dependencies.

Use `npm install --save [package-name]` to install any package and save it as a dependency in the package.json file. Before installing any package, make sure that your application or your packages has "package.json" file. It can be created by the command `npm init`

After installing the first package, npm creates node_modules folder. npm puts the installed dependency in it and also puts all of the dependencies of the installed dependency.


## ECMAScript and JavaScript
### ECMAScript
ECMAScript (or ES) is a trademarked **scripting-language specification** standardized by Ecma International in ECMA-262 and ISO/IEC 16262. ECMAScript provides rules, details, and guidlines that a scripting language must observe to be considered ECMAScript compliant. By reading the [ECMAScript specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm), you learn how to create a scripting language.

### JavaScript
JavaScript is a scripting language that conforms to the ECMAScript specification.


## npm - installing packages globally or locally
### globally
If you want to use a JavaScript package as a command line tool, then install it globally. This way, it works no matter which directory is current. This is the choice you would use if you were installing [nodemon](https://www.npmjs.com/package/nodemon), for example.

To see the folder where the global packages are installed, use `npm root -g`. The folder will be in the path already registed in your system environment variable like `/usr/local/lib/`.

To install some packages globally, attach `-g` option:

`npm install -g [package-name]`

### locally
If you want to depend on the package from your own module, then install it locally. This is the choice you would use if you are using require statements, for example.

reference: [npm docs](https://docs.npmjs.com/getting-started/installing-npm-packages-globally)


## express - Middleware
Middleware function is a function that performs some actions in the middle of respoding to a request. That is, before sending the response to the request, *express* executes the middleware functions.

You can specify the middlewares by `app.use()`. This command must be above the routes like `app.get()`, or `app.posts`. These middlewares can access to the request and response object.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack by `next();`
