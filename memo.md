## "package.json" file
A metadata for a JavaScript package or application, which specifies the name, version, description, author, and **dependencies** of the package.

Most importantly, "package.json" file has **dependencies**. When you're ready to deploy the package, you need to know what dependencies it depends on. If your package is an web application using Express, Express is definitely going to be one of the dependencies.

Use `npm install [package-name] --save` to install any package and save it as a dependency in the package.json file. Before installing any package, make sure that your application or your packages has "package.json" file. It can be created by the command `npm init`

After installing the first package, npm creates node_modules folder. npm puts the installed dependency in it and also puts all of the dependencies of the installed dependency.

## ECMAScript and JavaScript
### ECMAScript
ECMAScript (or ES) is a trademarked **scripting-language specification** standardized by Ecma International in ECMA-262 and ISO/IEC 16262. ECMAScript provides rules, details, and guidlines that a scripting language must observe to be considered ECMAScript compliant. By reading the [ECMAScript specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm), you learn how to create a scripting language.

### JavaScript
JavaScript is a scripting language that conforms to the ECMAScript specification.