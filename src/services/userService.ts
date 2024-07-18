export const userRoutes = {
	login: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/user/login`,
	register: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/user/register`,
	createCheckoutSession: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/user/create-checkout-session`,
	updateUserSubscription: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/user/update-user-session`
};

export const signIn = async (email: string, password: string) => {
	const response = await fetch(userRoutes.login, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	return response.json();
};

export const signUp = async (
	name: string,
	email: string,
	password: string,
	type: "" | "creator"| "business",
) => {
	console.log(type)
	const response = await fetch(userRoutes.register, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({email, password, name, type }),
	});
	return response.json();
};

// export const handelSubscribe = async (planType:string,userType:string )=>{
// 	if(!userType){
// 		return;
// 	}
// 	const response = await fetch(userRoutes.createCheckoutSession, {
// 		method: 'POST',
// 		headers: {
// 		  'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({
// 		  planType,
// 		  userType,
// 		}),
// 	  });

// 	  return response.json()
// }