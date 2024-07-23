export const chatRoutes = {
	sendChat: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/chat/send-chat`,
	blockChat: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/chat/block-chat`,
	deleteChat: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/chat/delete`,
	getAllChats: `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/chat/get-all-chats`,
};

export const getAllChats = async (token: string) => {
	const response = await fetch(`${chatRoutes.getAllChats}`, {
		headers: {
			Authorization: token,
		},
	});
	return response.json();
};

export const sendChat = async (
	token: string,
	message: string,
	receiver_id: number
) => {
	let chat = {
		message,
	};
	const response = await fetch(chatRoutes.sendChat, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token
		},
		body: JSON.stringify({ chat, receiver_id }),
	});
	return response.json();
};
