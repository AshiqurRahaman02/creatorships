export const businessRoutes = {
	createBusiness: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/business/create`,
	updateBusiness: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/business/update`,
	deleteBusiness: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/business/delete`,

	getBusiness: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/business/get-business`,
	getAllBusiness: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/business/get-all-businesses`,
	searchBusiness: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/business/search-businesses`,
};

export const createBusiness = async (body: any, token: string) => {
	console.log(token);
	if (!token) {
		return;
	}
	const response = await fetch(businessRoutes.createBusiness, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response.json();
};

export const updateBusiness = async (body: any, token: string) => {
	if (!token) {
		return;
	}
	const response = await fetch(businessRoutes.updateBusiness, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response.json();
};

export const getBusiness = async (user_id: string) => {
	const response = await fetch(`${businessRoutes.getBusiness}/${user_id}`);
	return response.json();
};

export const getAllBusiness = async () => {
	const response = await fetch(`${businessRoutes.getAllBusiness}`);
	return response.json();
};
