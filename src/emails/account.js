const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "code.ritikup@gmail.com",
		subject: "Thanks for joining us!!",
		text: `Welcome to the app, ${name}. please consider providing feedback`,
	});
};

const sendCancelEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "code.ritikup@gmail.com",
		subject: "Sad to see you go :(",
		text: `Goodbye ${name}, what made you change your mind, please consider providing feedback`,
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancelEmail,
};
