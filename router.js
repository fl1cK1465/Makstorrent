const Router = require('express').Router
const router = new Router()
const controller = require('./controller')

router.get('/2' , controller.main)
router.post('/comment' , controller.comment)




module.exports = router