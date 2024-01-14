const contactUs = ({email, firstName, lastName, message, phoneNumber}) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>User has contacted us</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
			<div class="message">Hello Amit User has contacted us</div>
			<div class="body">
				<p>Dear Amit,</p>
				<p>We have received a message from ${firstName} ${lastName}</p>
				<p class="highlight">please find their response</p>
				<p>${message}</p>
			</div>
			<div class="support">we need to connect with ${firstName} ${lastName} to assist with their query <a
					href="mailto:${email}">${email}</a>. We can also connect with the user via their phone number ${phoneNumber}!</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = contactUs;