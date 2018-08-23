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


## template engine choice - [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- It supports the concept of "layout".
- It supports the concpet of "partials" via existing Handlebars' partials mechanism.
`{{> foo/bar}}` loads the file `views/partials/foo/bar.handlebars`


## Cookie and Session

### HTTP Cookie
쿠키는 웹 서버에서 웹 브라우저로 전송되는 key-value 형태의 데이터입니다. 브라우저는 이것을 파일로 저장할 수 있고, 동일한 서버로 다음 요청을 보낼 때 이것을 함께 전송합니다.

예를 들어 투표 사이트가 있다고 가정합니다. 이 사이트에서는 각 디바이스 사용자가 1번만 투표할 수 있습니다.
때문에 사용자가 2번 투표할 수 없도록, 최초 투표 시 서버는 투표를 완료했다는 것을 boolean값으로 브라우저에 전송할 수 있습니다.
브라우저는 이 쿠키를 로컬 하드 디스크에 저장하고, 다음에 이 사이트에 접속할 때 이것을 요청 헤더에 담아 보냅니다.
서버는 헤더에 있는 값을 보고 해당 사용자가 이미 투표를 완료했음을 알 수 있고, 더이상 투표를 하지 못하도록 처리할 수 있습니다.

이처럼 쿠키를 사용하는 이유는 서버가 **현재 요청을 보낸 사용자의 상태 또는 사용자가 누구인지를 식별**하기 위함입니다. 쿠키는 사용자가 누구인지 알 수 있는 명함같은 정보입니다.

또다른 예로 서버는 현재 날짜와 시간을 포함하는 쿠키를 보낼 수 있습니다. 나중에 브라우저가 다시 같은 서버로 쿠키와 함께 요청을 보내면, 서버는 사용자가 마지막으로 사이트를 방문한 날짜 및 시간을 확인할 수 있습니다. 이 정보를 사용하여 사용자에게 적절한 메시지를 표시할 수 있습니다.

디바이스에서 github.com에 한번 로그인한 후 나중에 다시 접속하면 github.com으로 들어가도 본인 리파지토리가 나열됩니다. 이것도 디바이스에 저장된 쿠키가 요청과 함께 전송되어 가능한 것입니다.

원래 쿠키같은 것이 없으면, 웹 서버는 사용자의 각 요청을 다른 요청과 완전히 관련이 없다고 생각하고 별개로 처리합니다. 예를 들어 투표 사이트에서 최초 투표를 할 때 사용자는 서버에 POST 요청을 보낼 것입니다. 만약 쿠키가 없으면, 같은 디바이스 사용자가 2번째 투표를 시도하더라도 그 사용자가 이전에 POST 요청을 보낸 적이 있는지 서버는 알지 못하고 투표를 허용합니다. 이러한 HTTP 웹 프로토콜의 성질 때문에 HTTP를 stateless 하다고 합니다.

그러나 대부분의 경우 서버에서 사용자를 인식하면 유용하므로 쿠키를 사용합니다.

쿠키는 특정 페이지(경로)가 아니라 웹 사이트와 관련되므로 브라우저와 서버는 사용자가 사이트에 요청하는 페이지(경로)에 관계없이 쿠키 정보를 교환합니다. 사용자가 여러 사이트를 방문할 경우 각 사이트에서는 사용자의 브라우저에 쿠키를 보내고, 브라우저에서는 모든 쿠키를 개별적으로 저장합니다. 또한 쿠키 사용은 옵션이기 떄문에, 브라우저의 쿠키 설정을 허용하지 않으면 브라우저는 쿠키를 저장하지 않습니다.

쿠키는 보안에 취약합니다. 쿠키는 로컬에 저장되며, 패킷 안에 담겨 인터넷을 타고 그대로 전송되기 때문에, 누군가 그 값을 바꾸거나 탈취할 수 있습니다. 예를 들어 rails같은 웹 프레임워크나 express의 passport같은 인증 패키지에서 자동로그인을 쿠키만으로 구현한다고 가정합니다. 사용자가 최초 로그인한 후 서버에서 사용자의 아이디와 패스워드를 전송하고, 브라우저는 그 값을 쿠키로 저장하여 웹사이트에 접속할 때마다 이 값을 헤더에 담아 보낼 것입니다. 만약 누군가 악의적으로 요청이 전송되는 중간에 패킷을 보거나, 로컬 스토리지를 본다면 사용자의 아이디와 패스워드가 외부에 노출됩니다.


### Session

그래서 사용자가 누구인지 기억할 때 쿠키와 함께 세션을 이용하기도 합니다. 중요한 정보는 서버 측의 데이터베이스에 안전하게 저장하고, 브라우저에는 그 정보를 열람할 수 있는 정보를 쿠키로 전달하는 방식입니다. 이후에 브라우저에서 쿠키와 함께 요청을 보내면 서버 측 데이터에 접근할 수 있습니다. 즉 세션은 **사용자를 식별하기 위해 서버 측에 저장되는 데이터**입니다.

> 원래 네트워크에서 http 세션은 브라우저에 접속해서 브라우저를 종료하기까지 서버와 브라우저 간의 연결상태를 의미합니다. 이 Http 세션이 지속되는 동안 이용가능한 값들 session variable이라고 하는데, 대부분 이 세션 변수 설정을 HttpSession 같은 이름의 클래스로 제공하기 때문에 아예 세션 변수를 세션이라고 하는 것 같다. 또한 원래 세션 변수는 세션이 지속되는 동안만 유효하지만, 대부분의 언어에서는 유효기간 설정 가능하도록 지원한다. 

> wiki

> An HTTP session is a sequence of network request-response transactions. An HTTP client initiates a request by establishing a Transmission Control Protocol (TCP) connection to a particular port on a server.


예를 들어 쇼핑몰의 경우, 처음 사용자가 로그인하지 않고 접속하면 unnamed 유저로 세션을 생성하고 고유한 세션 ID를 쿠키로 전송할 수 있습니다. 다음에 쇼핑몰에 접속하면 세션 ID가 요청과 함께 전송되어, 사용자를 식별하여 장바구니 데이터를 로그인하지 않은 사용자 단위로도 관리할 수 있습니다. 

또다른 예로 로그인을 하는 경우, 로그인된 사용자의 정보를 서버에 기억해놓고, 기억한 세션을 열람할 수 있는 ID를 쿠키로 사용자에게 전송하여 이 ID만 있으면 자동 로그인되도록 처리할 수 있습니다. 노드의 passport도 이같은 방식을 지원하며 따라서 express-session 미들웨어를 필요로합니다. 

### Session security issue - session hijacking
세션 아이디도 해킹 당할 수 있다. 그래서 세션 쿠키값과 IP 주소를 같이 확인하는 방법도 있는데, 이것도 안전하지 않다. 만약 사용자와 해킹한 사람이 같은 라우터에 물려있어서 동일한 public IP를 가진다면 서버는 같은 사용자로 인식할 것이기 때문에. 그렇게 되면 다른 사용자가 세션 ID를 해킹해서 전송하더라도 정상 인증되어 보통 세션 ID만을 가지고 사용자를 식별하지는 않는다.


## redirect variable

## redirect, render flash msg