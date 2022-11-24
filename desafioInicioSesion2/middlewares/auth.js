const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../db/models/userModel.js');

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.use('login', new LocalStrategy(
	(email, password, done) => {
		User.findOne({ email }, (error, user) => {
			if (error) return done(error);
			if (!user) return done(null, false, { message: 'Usuario y/o contraseña incorrectos' });
			if (!isValidPassword(user, password)) return done(null, false, { message: 'Usuario y/o contraseña incorrectos' });
			return done(null, user);
		})
	}
));

passport.use('signup', new LocalStrategy({
	passReqToCallback: true
},
	(req, email, password, done) => {
		User.findOne({ 'email': email }, (error, user) => {
            console.log('si');
			if (error) return done(error, user, { message: 'Error al intentar registrar el usuario' });
			if (user) return done(null, false, { message: 'El usuario ya existe' });
			const newUser = { email, password: createHash(password) }
            console.log(newUser);
			User.create(newUser, (error, userWithId) => {
				if (error) return done(error, user, { message: 'Error creando usuario' });
				return done(null, userWithId, { message: 'Usuario registrado' });
			})
		})
	}
));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect('/login');
}

module.exports = checkAuthentication;