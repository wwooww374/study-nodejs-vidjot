module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', '로그인이 필요합니다');
        res.redirect('/users/login');
    },
    ensureNotAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', '로그아웃이 필요합니다');
        res.redirect('/');
    }
}