export const creatorRoutes = {
	createCreator: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/creator/create`,
	updateCreator: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/creator/update`,
	deleteCreator: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/creator/delete`,

	getCreator: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/creator/get-creator`,
	getAllCreators: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/creator/get-all-creators`,
	searchCreators: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/creator/search-creators`,
};

export const createCreator = async (body: any, token: string) => {
	console.log(token);
	if (!token) {
		return;
	}
	const response = await fetch(creatorRoutes.createCreator, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response.json();
};

export const updateCreator = async (body: any, token: string) => {
	if (!token) {
		return;
	}
	const response = await fetch(creatorRoutes.updateCreator, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response.json();
};

export const getCreator = async (user_id: number) => {
	const response = await fetch(`${creatorRoutes.getCreator}/${user_id}`);
	return response.json();
};


export const getAllCreator = async () => {
	const response = await fetch(`${creatorRoutes.getAllCreators}`);
	return response.json();
};
