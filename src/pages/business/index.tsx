import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { getAllBusiness } from "@/services/busineesService";
import { getAllCreator } from "@/services/creatorService";
import { UserDetails } from "@/utils/interface";
import Head from "next/head";
import Image from "next/image";
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

function Business() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	const [businesses, setBusinesses] = useState<any>([]);

	useEffect(() => {
		const getAllBusinessesDetails = async () => {
			let { isError, message, businesses }: any = await getAllBusiness();

			if (isError) {
				notify(message, "warning");
			} else {
				setBusinesses(businesses);
			}
		};
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			console.log(token);
			setToken(token);
			setUserDetails(parsedUserDetails);
			getAllBusinessesDetails();
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
				<title>Business</title>
			</Head>
			<Nav />
			<div className="min-h-screen flex  bg-gray-100">
				{/* Sidebar */}
				{/* <div
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
				</div> */}

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
						<h1 className="font-bold text-5xl">All businesses :</h1>
						<ul
							role="list"
							className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						>
							{businesses.map((business: any, index: number) => (
								<li
									className="col-span-1 flex flex-col divide-y divide-gray-700 rounded-lg bg-gray-200 text-center shadow"
									key={index}
								>
									<div className="flex flex-1 flex-col p-8">
										<Image
											src={business.user.logo}
											alt="user logo"
											width={160}
											height={160}
											className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
											priority
										/>
										<h3 className="mt-6 text-sm font-medium text-gray-900">
											{business?.user?.name}
										</h3>
										<dl className="mt-1 flex flex-grow flex-col justify-between">
											<dt className="sr-only">About</dt>
											<dd className="text-sm text-gray-500">
												{business?.about}
											</dd>
											<dt className="sr-only">Location</dt>
											<dd className="mt-3">
												<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
													Admin
												</span>
											</dd>
											<dt className="sr-only">Bio</dt>
											<dd className="text-sm text-gray-500">
												{business.location}
											</dd>
										</dl>
									</div>
									<div>
										<div className="-mt-px flex divide-x divide-gray-200 ">
											<div className="-ml-px flex w-0 flex-1">
												<a
													href="tel:+4407393145546"
													className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														height="24px"
														viewBox="0 -960 960 960"
														width="24px"
														fill="#444"
														className="h-5 w-5 text-gray-400 hover:text-gray-50"
													>
														<path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
													</svg>
													Chat
												</a>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Business;
