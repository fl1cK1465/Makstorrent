const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')




function initialize(passport , getUserByEmail){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message: 'Пользователя с такой почтой не существует'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Пароль введен неправильно'})
            }
        } catch(e) {
            done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'},
    authenticateUser ))
    passport.serializeUser((user,done) => done(null,user._id))
    passport.deserializeUser((_id,done)=> {})
}

module.exports = initialize