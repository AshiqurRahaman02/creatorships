export const mailRoutes = {
	sendMail: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/mail/send-mail/`,
};

const mail = (otp: number) => {
	return `<body style='padding: 40px 0px; background-color: rgb(245, 245, 245);'> <div style='background-color: white; max-width: max-content; margin: auto; padding: 10px;'><div style='max-width: max-content; margin: auto; padding: 10px; display: flex;'><img src='https://raw.githubusercontent.com/AshiqurRahaman02/creatorships/main/public/assets/creatorships-logo.png' style='width: 70px; height: 70px;margin-top:40px; margin-right: 10px;'><h2 style='width: max-content; font-size: 55px; font-family:Verdana, Geneva, Tahoma, sans-serif;color: #000;'>Creatorships</h2></div> <p  style='max-width: max-content; margin: auto; padding: 10px;  font-size: 40px;font-family: monospace; font-weight: 600;'>OTP - <span>  ${otp}</span></p> <div style='font-family: system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;'> <p>Please do not share this OTP with anyone, as it is used for verification purposes only.</p> <p>Got a question? Find all your answers at our <a href='https://creator-ships.vercel.app/'>help center⟶</a></p> <p>We're excited to have you on board.</p> <p>Stay safe and secure online!</p> <div style='display: flex;'><img src='https://raw.githubusercontent.com/AshiqurRahaman02/creatorships/main/public/assets/creatorships-logo.png' style='width: 30px; height:30px;margin-top:15px'><h2 style='width: max-content; font-size: 20px; font-family:Verdana, Geneva, Tahoma, sans-serif;color: #444;'>Team Creatorships</h2></div> </div> </div></body>`;
};

// Function to handle otp send for verification
export const handleSendOtp = async (email: string, otp: number) => {
	const newMail = {
		to: email,
		subject: "Otp for Email Verification",
		text: `OTP - ${otp} \n \n Please do not share this OTP with anyone, as it is used for verification purposes only. \n \n Got a question? Find all your answers at our help center⟶ \n \n We're excited to have you on board. \n \n Stay safe and secure online!`,
		html: mail(otp),
	};

	const response = await fetch(mailRoutes.sendMail, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newMail),
	});

	return response.json();
};
