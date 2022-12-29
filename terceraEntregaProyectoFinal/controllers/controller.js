const nodemailer = require('nodemailer');
const Product = require('../models/Product');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const twilio = require('twilio')
require('dotenv').config();

const arrayResponse = []

const getProducts = () => {

	for (let i = 1; i <= 5; i++) {
		const prod = {
			id: i,
			name: faker.commerce.product(),
			price: faker.commerce.price(1, 10000, 0),
			image: faker.image.image(200, 200, true)
		}
		arrayResponse.push(prod)
	}
}

getProducts()

const getProductsForMessage = () => {
	let str = '<h1>su pedido esta en curso</h1><br>';
	for (let i = 0; i < arrayResponse.length; i++) {
		str += `<h2>name: ${arrayResponse[i].name}, price: ${arrayResponse[i].price}</h2> <br>`
	}
	return str;
}

// Index
const getIndex = (req, res) => res.render('form.handlebars')

// Login
const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let { username } = req.user;
		res.render('form.handlebars', { username, arrayResponse });
	} else res.render('login.handlebars');
};

// Signup
const getSignup = (req, res) => res.render('signup.handlebars');

// Process login
const postLogin = (req, res) => {
	const { username } = req.user;
	res.render('form.handlebars', { username, arrayResponse });
}

// Process signup
const postSignup = async (req, res) => {
	const { username } = req.user;
	const { password, name, address, age, phoneNumber } = req.body;
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: 'juanbrusasca37.jb@gmail.com',
			pass: 'dbqdlolfwkzbcxrx',
		},
	})

	await transporter.sendMail({
		from: 'ADMIN<juanbrusasca37.jb@gmail.com>',
		to: username,
		subject: 'NUEVO USUARIO',
		html: `<h1>username: ${username}</h1>
		<h1>password: ${password}</h1>
		<h1>name: ${name}</h1>
		<h1>address: ${address}</h1>
		<h1>age: ${age}</h1>
		<h1>phoneNumber: ${phoneNumber}</h1>
		`
	})
	res.render('form.handlebars', { username, arrayResponse });
}

const getFailLogin = (req, res) => res.render('faillogin.handlebars');
const getFailSignup = (req, res) => res.render('failsignup.handlebars');

const addCart = async (req, res) => {
	const { username } = req.user;
	const usuario = await User.findOne({ 'username': username }).exec();
	const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
	await client.messages.create({
		body: 'su pedido esta siendo procesado',
		from: "+12057367531",
		to: `+${usuario.phoneNumber}`,
	});

	await client.messages.create({
		body: 'su pedido esta siendo procesado',
		from: "whatsapp:+14155238886",
		to: `whatsapp:+${usuario.phoneNumber}`,
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: 'juanbrusasca37.jb@gmail.com',
			pass: 'dbqdlolfwkzbcxrx',
		},
	})

	await transporter.sendMail({
		from: 'ADMIN<juanbrusasca37.jb@gmail.com>',
		to: username,
		subject: 'COMPRA REGISTRADA',
		html: getProductsForMessage(),
	})
	res.render('form.handlebars', { username, arrayResponse });
}

// Logout
const getLogout = (req, res) => {
	req.logout(error => { if (error) next(error) });
	res.redirect('/login');
}



const failRoute = (req, res) => res.status(404).render('routing-error');

module.exports = { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute, addCart };