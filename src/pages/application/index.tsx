import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { getAllApplications } from "@/services/applicationService";
import { getAllBusiness } from "@/services/busineesService";
import { getAllCreator } from "@/services/creatorService";
import { ApplicationAttributes, UserDetails } from "@/utils/interface";
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

function Applications() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

  const [allApplications, setAllApplications] = useState<
		ApplicationAttributes[] | []
	>([]);

	useEffect(() => {
		const getApplications = async () => {
			let { isError, message, applications }: any = await getAllApplications();

			if (isError) {
				notify(message, "warning");
			} else {
				setAllApplications([...applications]);
			}
		};
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			console.log(token);
			setToken(token);
			setUserDetails(parsedUserDetails);
			getApplications();
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
				<title>Applications</title>
			</Head>
			<Nav />
			<div className="min-h-screen flex  bg-gray-100">
				{/* Sidebar */}
				{/* <div
					className={`flex flex-col w-56 min-h-screen bg-white rounded-r-3xl overflow-hidden transition-transform transform ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0 md:relative`}
				>
					<di*v className="flex items-center justify-center h-20 shadow-md">
						<h1 className="text-3xl font-bold uppercase text-indigo-500">
							{userDetails?.type}
						</h1>
					</di*v>
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

					<div className="flex flex-col gap-5 p-6 border">
					<div className="flex">
						<h1 className="font-bold text-5xl">All applications :</h1>
					</div>
					<ul
						role="list"
						className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
					>
						{allApplications.length > 0 ? (
							<>
								{allApplications.map(
									(
										application: ApplicationAttributes,
										index: number
									) => (
										<li
											className="col-span-1 flex flex-col divide-y divide-gray-700 rounded-lg bg-gray-200 shadow"
											key={index}
										>
											<div className="flex flex-1 flex-col p-8">
												<dl className="mt-1 flex flex-grow flex-col gap-3 justify-between">
													<dt className="sr-only">Title</dt>
													<dd className="text-3xl text-black font-semibold">
														{application.heading}
													</dd>
													<dt className="sr-only">Price</dt>
													<dd className="text-sm text-gray-500">
														<span className="text-gray-700 font-semibold">{`Price: `}</span>
														{application.pricing}
													</dd>
													<dt className="sr-only">Expire date</dt>
													<dd className="text-sm text-gray-500">
														<span className="text-gray-700 font-semibold">{`Expire date: `}</span>

														{application.endDate}
													</dd>

													<dt className="sr-only">Languages</dt>
													<dd className="text-sm text-gray-500 flex gap-2">
														{application.languages.map((lang: string,i:number) =>(
															<span className="bg-white rounded-md border px-1" key={i}>{lang}</span>
														))}
													</dd>
												</dl>
												<div className="flex gap-3 mt-6">
													<Image
														src={application.user.logo}
														alt="user logo"
														width={80}
														height={80}
														className="h-16 w-16 flex-shrink-0 rounded-full border-black p-1"
														priority
													/>
													<h3 className="mt-3 text-xl font-medium text-gray-900">
														{application.user.name}
													</h3>
												</div>
											</div>
											<div>
												<div className="-mt-px flex divide-x divide-gray-200 ">
													<div className="-ml-px flex w-0 flex-1">
														<p className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer" onClick={()=>router.push(`/application/${application.id}`)}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																height="24px"
																viewBox="0 -960 960 960"
																width="24px"
																fill="#444"
																className="h-5 w-5 text-gray-400 hover:text-gray-50"
															>
																<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
															</svg>
															Details
														</p>
														<hr className="h-full w-0.5 bg-gray-500" />
														<p
															className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer"
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
														</p>
													</div>
												</div>
											</div>
										</li>
									)
								)}
							</>
						) : (
							<>{`No application found`}</>
						)}
					</ul>
				</div>
				</div>
			</div>
		</>
	);
}

export default Applications;