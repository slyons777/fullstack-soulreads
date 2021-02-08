const bcrypt = require('bcryptjs');
const { layout } = require('../utils');
const { Member } = require('../models');

const newUser = (req, res) => {
	res.json({
		message: 'new member account',
	});
};

const processNewUser = async (req, res) => {
	const { username, password, email, firstname, lastname } = req.body;
	console.log(username, password);
	if (username == '' || password == '') {
		// informs user of required info
		console.log('username or password is blank');
		// display message to user (use local, conditional statement)
	} else {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		try {
			const newUser = await Member.create({
				firstname,
				lastname,
				email,
				username,
				password: hash,
			});
			console.log(newUser);
			res.json('new account created successfully');
		} catch (e) {
			// e.name will be "SequelizeUniqueConstraintError"
			console.log(e);
			if (e.name === 'SequelizeUniqueConstraintError') {
				// We should tell the user that the username is taken
				// and then redirect them
				res.json('That username is taken. Please try again.');
			}
		}
	}
};

const login = (req, res) => {
	res.render('home');
};

const processLogin = async (req, res) => {
	const { username, password } = req.body;
	// find user by username
	const user = await Member.findOne({
		where: {
			username,
		},
	});
	if (user) {
		console.log('valid user...checking password');
		const isValid = bcrypt.compareSync(password, user.password);
		if (isValid) {
			console.log('password is good!');
			req.session.user = {
				username,
				id: user.id,
			};
			req.session.save(() => {
				res.redirect('member-profile');
			});
		} else {
			console.log('but password is wrong');
			res.redirect(`${req.baseUrl}/home`);
		}
	} else {
		console.log('not a valid user');
		res.redirect(`${req.baseUrl}/home`);
	}
};

const profileController = (req, res) => {
	res.render('member-profile');
};

const logout = (req, res) => {
	console.log('logging out...');
	req.session.destroy(() => {
		// deleting session:
		res.redirect('/');
	});
};

module.exports = {
	newUser,
	processNewUser,
	login,
	processLogin,
	profileController,
	logout,
};
