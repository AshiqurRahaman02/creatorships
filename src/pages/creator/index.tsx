import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { getAllCreator } from "@/services/creatorService";
import { UserDetails } from "@/utils/interface";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const menuItems = [
	{ href: "?active=profile", icon: "bx-user", label: "Profile" },
	{ href: "?active=portfolio", icon: "bx-shopping-bag", label: "Portfolio" },
	{ href: "?active=dashboard", icon: "bx-home", label: "Dashboard" },
	{ href: "?active=application", icon: "bx-music", label: "Applications" },
	{ href: "?active=subscription", icon: "bx-drink", label: "Subscription" },
	{
		href: "?active=chat",
		icon: "bx-bell",
		label: "Chats",
		notificationCount: 5,
	},
	{ href: "?active=logout", icon: "bx-log-out", label: "Logout" },
];

function Creator() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	const [creators, setCreators] = useState<any>([]);

	useEffect(() => {
		const getAllCreatorDetails = async () => {
			let { isError, message, creators }: any = await getAllCreator();

			if (isError) {
				notify(message, "warning");
			} else {
				setCreators(creators);
			}
		};
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			console.log(token);
			setToken(token);
			setUserDetails(parsedUserDetails);
			getAllCreatorDetails();
		} else {
			router.push("/login");
		}
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<>
			<Head>
				<title>Creators</title>
			</Head>
			<Nav />
			<div className="min-h-screen flex  bg-gray-100">
				{/* Sidebar */}
				<div
					className={`flex flex-col w-56 min-h-screen bg-white rounded-r-3xl overflow-hidden transition-transform transform ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0 md:relative`}
				>
					<div className="flex items-center justify-center h-20 shadow-md">
						<h1 className="text-3xl font-bold uppercase text-indigo-500">
							{userDetails?.type}
						</h1>
					</div>
					<ul className="flex flex-col py-4 justify-start gap-2">
						{menuItems.map((item, index) => (
							<li key={index} className="border cursor-pointer">
								<p
									onClick={() => router.push(`${item.href}`)}
									className="flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
								>
									<span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
										<i className={`bx ${item.icon}`}></i>
									</span>
									<span className="text-sm font-medium">
										{item.label}
									</span>
									{item.notificationCount && (
										<span className="ml-3 mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
											{item.notificationCount}
										</span>
									)}
								</p>
							</li>
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

					<div className="flex flex-col gap-5">
                        <h1 className="font-bold text-5xl">All creators :</h1>
						{creators.map((creator: any) => (
							<div key={creator.id} className="border p-1">
								<p>
									<span className="font-semibold">
										{"Creator Name :"}
									</span>{" "}
									{creator?.user?.name}
								</p>
								<p>
									<span className="font-semibold">
										{"Creator's bio :"}
									</span>{" "}
									{creator?.bio}
								</p>
								<p>
									<span className="font-semibold">
										{"Creator's location :"}
									</span>{" "}
									{creator.location}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Creator;
