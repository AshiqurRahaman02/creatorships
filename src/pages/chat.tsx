import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { Chats } from "@/components/element/Chats";
import { getAllChats } from "@/services/chatService";
import { getUser } from "@/services/userService";
import { ChatAttributes, UserDetails } from "@/utils/interface";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function Chat() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	const [userChats, setUserChats] = useState<ChatAttributes[] | []>([]);
	const [active, setActive] = useState<ChatAttributes | null>(null);
	const [newUser, setNewUser] = useState<UserDetails | null>(null);

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			setToken(token);
			setUserDetails(parsedUserDetails);
			getData(parsedUserDetails.user_id, token);
		} else {
			router.push("/login");
		}
	}, []);

	const getData = async (userId: number, token: string) => {
		const { isError, message, chats }: any = await getAllChats(token);
		if (isError) {
			notify(message, "error");
		} else {
			setUserChats(chats);

			const query = new URLSearchParams(window.location.search);
			let activeUser = query.get("active");

			if (!activeUser || +activeUser === userId) {
				setActive(null);
			} else {
				const activeUserChat = getActiveUserChat(
					userId,
					+activeUser,
					chats
				);

				if (activeUserChat) {
					setActive(activeUserChat);
				} else {
					const { isError, user } = await getUser(+activeUser);
					if (isError) {
						notify(message, "error");
						setTimeout(() => {
							router.push("/chat");
						}, 2000);
					} else {
						setNewUser(user);
					}
				}
			}
		}
	};

	const getActiveUserChat = (
		userId: number,
		activeUser: number,
		chats: ChatAttributes[] | []
	) => {
		for (let i in chats) {
			let chat = chats[i];
			if (
				(chat.receiver_id === userId && chat.sender_id === activeUser) ||
				(chat.receiver_id === activeUser && chat.sender_id === userId)
			) {
				return chat;
			}
			return null;
		}
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div>
			<Nav />
			<div className="min-h-screen flex  bg-gray-100">
				{/* Sidebar */}
				<div
					className={`flex flex-col w-56 min-h-screen bg-white rounded-r-3xl overflow-hidden transition-transform transform ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0 md:relative`}
				>
					<div className="border flex items-center shadow-md">
						<h1 className="cursor-pointer">
							{userDetails && (
								<p className="flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 gap-3">
									<Image
										src={userDetails?.logo || ""}
										alt="user logo"
										width={40}
										height={40}
										className="p-1 border rounded-full"
										priority
									/>
									<h1 className="text-lg font-semibold">
										{userDetails.name}
									</h1>
								</p>
							)}
						</h1>
					</div>
					<ul className="flex flex-col py-4 justify-start gap-2">
						{newUser && (
							<li className="border cursor-pointer">
								<p
									onClick={() => {
										router.push(`/chat/?active=${newUser.user_id}`);
									}}
									className="flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 gap-3"
								>
									<Image
										src={newUser?.logo || ""}
										alt="user logo"
										width={40}
										height={40}
										className="p-1 border rounded-full"
										priority
									/>
									<h1 className="text-lg font-semibold">
										{newUser.name}
									</h1>
								</p>
							</li>
						)}
						{userChats.length > 0 &&
							userChats?.map((userChat, index) => (
								<>
									{userChat.sender.user_id === userDetails?.user_id ? (
										<li key={index} className="border cursor-pointer">
											<p
												onClick={() => {
													setActive(userChat);
												}}
												className="flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 gap-3"
											>
												<Image
													src={userChat.receiver.logo}
													alt="user logo"
													width={40}
													height={40}
													className="p-1 border rounded-full"
													priority
												/>
												<h1 className="text-lg font-semibold">
													{userChat.receiver.name}
												</h1>
											</p>
										</li>
									) : (
										<li key={index} className="border cursor-pointer">
											<p
												onClick={() => setActive(userChat)}
												className="flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 gap-3"
											>
												<Image
													src={userChat.sender.logo}
													alt="user logo"
													width={40}
													height={40}
													className="p-1 border rounded-full"
													priority
												/>
												<h1 className="text-lg font-semibold">
													{userChat.sender.name}
												</h1>
											</p>
										</li>
									)}
								</>
							))}
					</ul>
				</div>

				{/* Main content */}
				<div className="flex-1 p-6 border">
					<button
						onClick={toggleSidebar}
						className="block md:hidden text-indigo-500 focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"
							></path>
						</svg>
					</button>
					{/* Main content goes here */}

					<>
						{userDetails && token && (
							<Chats
								active={active}
								setActive={setActive}
								userDetails={userDetails}
								token={token}
								newUser={newUser}
								setUserChats={setUserChats}
							/>
						)}
					</>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Chat;
