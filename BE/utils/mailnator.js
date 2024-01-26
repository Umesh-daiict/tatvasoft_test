const nodemailer = require('nodemailer');
const mailTrasport = nodemailer.createTransport({
	host: 'smtp.yopmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'sun777@yopmail.com',
		pass: 'sadasdas',
	},
});

const callmail = () => {
	const mailOptions = {
		from: 'sun111@yopmail.com',
		to: 'recipient@example.com',
		subject: 'Subject of the test email',
		text: 'Body of the test email',
	};
	console.log('calling maillll--------------------------------------------');
	transporter.sendMail(mailOptions, (error, info) => {
		console.log('asd hiiii');
		if (error) {
			console.error(error);
		} else {
			console.log('Test email sent: ' + info.response);
		}
	});
};

module.exports = callmail;
