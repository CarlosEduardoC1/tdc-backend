'use-strict';

exports.auth = () => {
    return function(req, res, next) {
        console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}