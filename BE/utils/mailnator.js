const nodemailer = require('nodemailer');
const mailTrasport = nodemailer.createTransport({
	host: 'gmail',
	auth: {
		user: process.env.user,
		pass: process.env.pass,
	},
});

const callmail = () => {
	const mailOptions = {
		from: 'sun111@yopmail.com',
		to: 'recipient@example.com',
		subject: 'Subject of the test email',
		text: 'Body of the test email',
	};
	mailTrasport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Test email sent: ' + info.response);
		}
	});
};

module.exports = callmail;
