if(process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb://<JieunKim>:<jieun123>@ds129762.mlab.com:29762/study-nodejs-vidjot'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/study-nodejs-vidjot'}
}