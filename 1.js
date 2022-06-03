const express = require('express')
const port = process.env.PORT || 2051;
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb+srv://admin:admin12345@cluster0.04ms6.mongodb.net/userdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})


app.set('view engine', 'ejs')

const AdminBro = require('admin-bro')
const expressAdminBro = require('@admin-bro/express')
const mongooseAdminBro = require('@admin-bro/mongoose')


app.use(bodyParser.urlencoded({extended: true}));
app.get('/shooters', (req, res) => {
    res.sendFile(__dirname + '/shooters.html')
})

app.get('/notfound', (req, res) => {
    res.sendFile(__dirname + "/notfound.html")
})

app.get("/", (req, res) => {
    res.render("2.ejs")
})
app.get('/2', (req, res) => {
    res.render('1.ejs')
})

app.get("/about", (req, res
) => {
    res.sendFile(__dirname + "/about.html")
})
app.get('/registration', function (req, res) {
    res.render("registration.ejs");
})
app.get('/login', (req, res) => {
    res.render("login.ejs");
})
app.get('/contacts', function (req, res) {
    res.sendFile(__dirname + "/contacts.html");
})

app.get("/codmw", (req, res
) => {
    res.sendFile(__dirname + "/codmw.html")
})
app.get('/darksouls', function (req, res) {
    res.sendFile(__dirname + "/darksouls.html")
})
app.get('/fifa', function (req, res) {
    res.sendFile(__dirname + "/fifa.html")
})
app.get('/farcry', function (req, res) {
    res.sendFile(__dirname + "/farcry.html")
})
app.get("/detroit", (req, res
) => {
    res.sendFile(__dirname + "/detroit.html")
})
app.get('/GoD', function (req, res) {
    res.sendFile(__dirname + "/god.html")
})
app.get('/mafia', function (req, res) {
    res.sendFile(__dirname + "/mafia.html")
})
app.get('/nfs', function (req, res) {
    res.sendFile(__dirname + "/nfs.html")
})
app.get("/GTAV", (req, res
) => {
    res.sendFile(__dirname + "/gta.html")
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
app.get('/logout', function (req, res) {

    res.redirect('/');
});
app.get('/surv', (req, res) => {
    res.sendFile(__dirname + '/surv.html')
})


app.get('/3rd', (req, res) => {
    res.sendFile(__dirname + '/3rd.html')
})
app.get('/1st', (req, res) => {
    res.sendFile(__dirname + '/1st.html')
})

app.get('/strat', (req, res) => {
    res.sendFile(__dirname + '/strat.html')
})


app.get('/openw', (req, res) => {
    res.sendFile(__dirname + '/openw.html')
})

app.get('/race', (req, res) => {
    res.sendFile(__dirname + '/race.html')
})
app.get('/sport', (req, res) => {
    res.sendFile(__dirname + '/sport.html')
})
app.get('/action', (req, res) => {
    res.sendFile(__dirname + '/action.html')
})
app.get('/adventure', (req, res) => {
    res.sendFile(__dirname + '/adventure.html')
})
app.get('/rpg', (req, res) => {
    res.sendFile(__dirname + '/rpg.html')
})


app.use(express.static('public'))
app.use("/img", express.static("img"))
app.use(express.static('public'))
app.use("/css", express.static("css"))
app.use(cookieParser())


//usermodels
const userSchema = {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    city: {type: String, required: true,},
    isAdmin: {type: Boolean, default: false}
}

const User = mongoose.model("User", userSchema)
//adminpanel
AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {resources: [User]}

const adminBro = new AdminBro(AdminBroOptions)

async function isAdmin(req, res, next) {
    const user = await User.findOne({username: req.cookies.login})
    if (!user || user.isAdmin === false) return res.redirect('/profile')
    return next()
}

const router = expressAdminBro.buildRouter(adminBro)
app.use(adminBro.options.rootPath, isAdmin, router)

//auth

app.post('/registration', async function (req, res) {
    try {
        const hashpass = await bcrypt.hash(req.body.password, 8)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: hashpass,


        })

        await newUser.save()

        res.redirect('/login')
    } catch (e) {
        console.log(e)
    }
})

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if (!user) {
            res.status(400).json({message: `Пользаватель с таким ${username} именем не существует `})
        }
        const validPass = await bcrypt.compareSync(password, user.password)
        if (!validPass) {
            res.status(400).json({message: `Пароль неверный`})
        } else {
            res.cookie('login', username)
            res.redirect('/2')
        }


    } catch (e) {

    }
});

app.get('/profile', async (req, res) => {
    try {
        const user = await User.findOne({username: req.cookies.login})
        res.render('profile', {user: user})
    } catch (e) {
        console.log(e)
    }
})

app.get('/profile_edit', async (req, res) => {
    try {
        const user = await User.findOne({username: req.cookies.login})
        res.render('profile_edit', {user: user})
    } catch (e) {
        console.log(e)
    }
})

app.post('/profile_edit', async (req, res) => {
    try {
        await User.findOneAndUpdate({username: req.cookies.login},
            {
                username: req.body.username,
                email: req.body.email,
                city: req.body.city
            })
        res.cookie('login', req.body.username)
        res.redirect('/profile')
    } catch (e) {
        console.log(e)
    }
})


async function start() {
    try {


    } catch (e) {
        console.log(e)
    }

    app.listen(port, function () {
        console.log('running at http://localhost:2051/')
    })


}

start()



