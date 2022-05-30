if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



const express = require('express')
const PORT = process.env.PORT || 2051
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {check} = require('express-validator')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')



initializePassport(
    passport ,
        email =>  newUser.find(user => user.email === email),
        id => newUser.find(user => user.id === id)
)






app.set('view engine' , 'ejs')
app.use( bodyParser.urlencoded({extended:true}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb+srv://admin:admin12345@cluster0.04ms6.mongodb.net/userdata')

app.get("/" , (req, res) => {
    res.sendFile(__dirname+"/1.html")
})

app.get("/about" ,(req,res
) => {
    res.sendFile(__dirname+"/about.html")
})
app.get('/registration', function (req, res) {
    res.render( "registration.ejs");
})
app.get('/login', function (req, res) {
    res.render("login.ejs");
})
app.get('/contacts', function (req, res) {
    res.sendFile(__dirname + "/contacts.html");
})

app.get("/codmw" ,(req,res
) => {
    res.sendFile(__dirname+"/codmw.html")
})
app.get('/darksouls', function (req, res) {
    res.sendFile(__dirname + "/darksouls.html");
})
app.get('/fifa', function (req, res) {
    res.sendFile(__dirname + "/fifa.html");
})
app.get('/farcry', function (req, res) {
    res.sendFile(__dirname + "/farcry.html");
})
app.get("/detroit" ,(req,res
) => {
    res.sendFile(__dirname+"/detroit.html")
})
app.get('/GoD', function (req, res) {
    res.sendFile(__dirname + "/god.html");
})
app.get('/mafia', function (req, res) {
    res.sendFile(__dirname + "/mafia.html");
})
app.get('/nfs', function (req, res) {
    res.sendFile(__dirname + "/nfs.html");
})
app.get("/GTAV" ,(req,res
) => {
    res.sendFile(__dirname+"/gta.html")
})
app.get('/SIMS4', function (req, res) {
    res.sendFile(__dirname + "/sims4.html");
})
app.get('/witcher3', function (req, res) {
    res.sendFile(__dirname + "/witcher.html");
})
app.get('/metroex', function (req, res) {
    res.sendFile(__dirname + "/metro.html");
})

app.use(express.static('public'))
app.use("/img" , express.static("img"))
app.use(express.static('public'))
app.use("/css" , express.static("css"))


const userSchema = {
    username: {type:String,required:true,unique: true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    city:{type:String,required:true,},
    //isAdmin:{type:Boolean , default:false}
}



const User = mongoose.model("User" , userSchema)

app.post('/registration',[
        check('username','Имя пользавтеля не может быть пустым')
            .exists()
            .notEmpty(),
        check('password', 'Пароль должен содержать не менее 8 символов').isLength({min:8,max:16})],
    async function (req,res){try {
        const hashpass = await bcrypt.hash(req.body.password , 8)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: hashpass,

        })


        await newUser.save()

        res.redirect('/registration')
    }catch (e) {
        console.log(e)
    }




    })

app.post('/login', passport.authenticate({
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true,

}))

async function start(){
    try {


    }catch (e) {
        console.log(e)
    }

    app.listen(PORT, function() {
        console.log('running at http://localhost:2051/')})


}

start()


