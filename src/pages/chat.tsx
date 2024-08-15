import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { Chats } from "@/components/element/Chats";
import Verified from "@/components/element/Verified";
import { getAllChats } from "@/services/chatService";
import { getUser } from "@/services/userService";
import { ChatAttributes, UserDetails } from "@/utils/interface";
import Head from "next/head";
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
		<>
			<Head>
				<title>Chat</title>
			</Head>
			<div>
				<Nav />
				<div className="h-max flex  bg-gray-100">
					{/* Sidebar */}
					<div
						className={`flex flex-col min-w-56 md:min-w-64 h-max bg-white rounded-2xl overflow-hidden transition-transform transform ${
							sidebarOpen ? "translate-x-0" : "-translate-x-full"
						} md:translate-x-0 absolute z-10 p-3 m-5`}
					>
						<div className="flex items-center justify-center h-14 shadow-md">
							<h1 className="text-3xl font-bold uppercase text-indigo-500">
								{userDetails && (
									<p className="flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 gap-3">
										<Image
											src={userDetails?.logo || ""}
											alt="user logo"
											width={50}
											height={50}
											className="p-1 border rounded-full"
											priority
										/>
										<h1 className="text-lg font-semibold flex gap-1 items-center">
											{userDetails.name}{" "}
											{userDetails.verified && (
												<Verified full={false} />
											)}
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
											router.push(
												`/chat/?active=${newUser.user_id}`
											);
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
										<h1 className="text-lg font-semibold flex gap-1 items-center">
											{newUser.name}{" "}
											{newUser.verified && <Verified full={false} />}
										</h1>
									</p>
								</li>
							)}
							{userChats.length > 0 &&
								userChats?.map((userChat, index) => (
									<>
										{userChat.sender.user_id ===
										userDetails?.user_id ? (
											<li
												key={index}
												className="border cursor-pointer"
											>
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
													<h1 className="text-lg font-semibold flex gap-1 items-center">
														{userChat.receiver.name}{" "}
														{userChat.receiver.verified && (
															<Verified full={false} />
														)}
													</h1>
												</p>
											</li>
										) : (
											<li
												key={index}
												className="border cursor-pointer"
											>
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
													<h1 className="text-lg font-semibold flex gap-1 items-center">
														{userChat.sender.name}{" "}
														{userChat.sender.verified && (
															<Verified full={false} />
														)}
													</h1>
												</p>
											</li>
										)}
									</>
								))}
						</ul>
					</div>

					{/* Main content */}
					<div className="flex-1 p-x-6 py-3 border relative">
						<button
							onClick={toggleSidebar}
							className="block md:hidden text-indigo-500 focus:outline-none absolute right-5 top-5 border "
						>
							<svg
								className="w-8 h-8"
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

						<div className="m-auto md:ml-56">
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
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</>
	);
}

export default Chat;
