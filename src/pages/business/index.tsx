import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { getAllBusiness } from "@/services/busineesService";
import { BusinessInfoAttributes, UserDetails } from "@/utils/interface";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Business() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	const [businesses, setBusinesses] = useState<BusinessInfoAttributes[] | []>(
		[]
	);
	const [filteredBusinesses, setFilteredBusinesses] = useState<
		BusinessInfoAttributes[] | []
	>([]);

	useEffect(() => {
		const getAllBusinessesDetails = async () => {
			let { isError, message, businesses }: any = await getAllBusiness();

			if (isError) {
				notify(message, "warning");
			} else {
				setBusinesses(businesses);
				setFilteredBusinesses(businesses);
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
	}, [router]);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleFilter = (
		industry: string,
		location: string,
		verified: boolean
	) => {
		let filtered = [...businesses];

		if (industry) {
			filtered = filtered.filter((business) =>
				business.industry.toLowerCase().includes(industry.toLowerCase())
			);
		}

		if (location) {
			filtered = filtered.filter((business) =>
				business.location.toLowerCase().includes(location.toLowerCase())
			);
		}

		if (verified) {
			filtered = filtered.filter((business) => business.user.verified);
		}

		setFilteredBusinesses(filtered);
	};

	const handleSort = (criteria: string) => {
		let sorted = [...filteredBusinesses];
		if (criteria === "total_employee") {
			sorted.sort((a, b) => a.total_employee - b.total_employee);
		} else if (criteria === "createdAt") {
			sorted.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
		}
		setFilteredBusinesses(sorted);
	};

	const sortner = (string: string, max: number) => {
		if (string.length > max) {
			return string.substring(0, max) + "...";
		}
		return string;
	};

	return (
		<>
			<Head>
				<title>Business</title>
			</Head>
			<Nav />
			<div className="min-h-screen flex  bg-gray-100">
				{/* Sidebar */}
				<div
					className={`flex flex-col w-56 min-h-screen bg-white rounded-r-3xl overflow-hidden transition-transform transform ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0 md:relative pr-6`}
				>
					<h1 className="text-2xl font-bold mb-4">Businesses</h1>
					<div className="mb-6">
						<label className="block mb-2">
							Industry:
							<input
								type="text"
								className="block w-full p-2 border rounded"
								onChange={(e) =>
									handleFilter(e.target.value, "", false)
								}
							/>
						</label>
						<label className="block mb-2">
							Location:
							<input
								type="text"
								className="block w-full p-2 border rounded"
								onChange={(e) =>
									handleFilter("", e.target.value, false)
								}
							/>
						</label>
						<label className="block mb-4">
							Verified:
							<input
								type="checkbox"
								className="ml-2"
								onChange={(e) => handleFilter("", "", e.target.checked)}
							/>
						</label>
						{/* <button
							className="px-4 py-2 bg-blue-500 text-white rounded"
							onClick={() =>
								handleFilter(
									industryFilter,
									locationFilter,
									verifiedFilter
								)
							}
						>
							Apply Filters
						</button> */}
					</div>
					<div className="mb-6 flex flex-col gap-2">
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded"
							onClick={() => handleSort("total_employee")}
						>
							Sort by Total Employees
						</button>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded"
							onClick={() => handleSort("createdAt")}
						>
							Sort by Creation Date
						</button>
					</div>
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
						<h1 className="font-bold text-5xl">All businesses :</h1>
						<ul
							role="list"
							className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						>
							{filteredBusinesses.map((business: BusinessInfoAttributes, index: number) => (
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
										<h3 className="mt-6 font-semibold text-xl text-gray-900">
											{business?.user?.name}
										</h3>
										<dl className="mt-1 flex flex-grow flex-col justify-between">
											<dt className="sr-only">About</dt>
											{/* <dd className="text-sm text-gray-500 text-justify">
												{sortner(business?.about, 75)}
											</dd> */}

<dt className="sr-only">Total employee</dt>
											<dd className="text-sm text-gray-500 text-left">
												<span className="text-gray-700 font-semibold">{`Total employee: `}</span>
												{business.total_employee}
											</dd>
											<dt className="sr-only">Industry</dt>
											<dd className="text-sm text-gray-500 text-left">
												<span className="text-gray-700 font-semibold">{`Industry: `}</span>
												{business.industry}
											</dd>

											<dt className="sr-only">Location</dt>
											<dd className="text-sm text-gray-500 text-left">
												<span className="text-gray-700 font-semibold">{`Location: `}</span>
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
