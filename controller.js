const Comment = require('./comment-model')
const User = require('./usermodel')



class Controller{
    async main(req, res, next){
        try {
            const comments = await Comment.find().populate('user')
            if (req.body != null) {
                    res.render('1.ejs', {com: comments})
                }

        } catch (e) {
            next(e)
        }
    }
    async comment(req, res, next) {
        try {
            if (req.cookies.login == null)
                return
            req.body.user = await User.findOne({username: req.cookies.login})

            await Comment.create(req.body)
            res.redirect('/2')
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new Controller()