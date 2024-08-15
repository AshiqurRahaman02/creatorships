import exp from "constants";

export const applicationRoutes = {
	createApplication: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/create`,
	updateApplication: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/update`,
	deleteApplication: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/delete`,

	getUserApplications: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/get-user-applications`,
	getApplication: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/get-application`,
	getAllApplications: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/get-all-applications`,
	searchApplications: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/application/search-applications`,
};

export const createApplication = async (body: any, token: string) => {
	if (!token) {
		return;
	}
	const response = await fetch(applicationRoutes.createApplication, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response.json();
};

export const updateApplication = async (
	body: any,
	id: number,
	token: string
) => {
	if (!token) {
		return;
	}
	const response = await fetch(
		`${applicationRoutes.updateApplication}/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body),
		}
	);
	return response.json();
};

export const getApplication = async (id: any) => {
	const response = await fetch(`${applicationRoutes.getApplication}/${id}`);
	return response.json();
};

export const getUserApplications = async (token: string) => {
	const response = await fetch(`${applicationRoutes.getUserApplications}`, {
		headers: {
			Authorization: token,
		},
	});
	return response.json();
};

export const getAllApplications = async () => {
	const response = await fetch(`${applicationRoutes.getAllApplications}`);
	return response.json();
};

export const getSearchedApplications = async (query: string) => {
	const response = await fetch(`${applicationRoutes.searchApplications}?query=${query}`);
	return response.json();
};