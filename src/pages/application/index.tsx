import Loading from "@/components/common/Loading";
import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import Verified from "@/components/element/Verified";
import {
	getAllApplications,
	getSearchedApplications,
} from "@/services/applicationService";
import { ApplicationAttributes, UserDetails } from "@/utils/interface";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Applications() {
	const router = useRouter();
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true);

	const [allApplications, setAllApplications] = useState<
		ApplicationAttributes[] | []
	>([]);

	const [filteredApplications, setFilteredApplications] = useState<
		ApplicationAttributes[] | []
	>([]);
	const [sortField, setSortField] = useState<string>("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const getApplications = async () => {
		let { isError, message, applications }: any = await getAllApplications();

		if (isError) {
			notify(message, "warning");
		} else {
			setAllApplications(applications);
			setFilteredApplications(applications);
		}

		setLoading(false);
	};

	const getSearched = async (query: string) => {
		let { isError, message, applications }: any =
			await getSearchedApplications(query);

		if (isError) {
			notify(message, "warning");
		} else {
			console.log(applications);
			setAllApplications(applications);
			setFilteredApplications(applications);
		}

		setLoading(false);
	};
	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			console.log(token);
			setToken(token);
			setUserDetails(parsedUserDetails);
			if (router.isReady) {
				let searchValue = router.query.searchValue as string;
				console.log(searchValue);

				if (searchValue) {
					getSearched(searchValue);
				} else {
					getApplications();
				}
			}
		} else {
			router.push("/login");
		}
	}, [router, router.isReady, router.query.searchValue]);

	const handleFilter = (
		experience: string,
		language: string,
		verified: boolean
	) => {
		experience = experience.trim();
		language = language.trim();

		let filtered = allApplications;

		// Convert experience to a number if it's a valid number string
		const experienceNumber = Number(experience);

		if (experience && !isNaN(experienceNumber)) {
			filtered = filtered.filter((app) => {
				const appExperience = Number(app.experience); // Ensure app.experience is also a number
				return appExperience <= experienceNumber;
			});
		}

		if (language) {
			filtered = filtered.filter((app) =>
				app.languages.some((lang) =>
					lang.toLowerCase().includes(language.toLowerCase())
				)
			);
		}

		if (verified) {
			filtered = filtered.filter((app) => app.user.verified === verified);
		}

		setFilteredApplications(filtered);
	};

	const handleSort = (field: string) => {
		const order = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(order);
		setSortField(field);

		const sorted = [...filteredApplications].sort((a, b) => {
			let aField: any = a[field as keyof ApplicationAttributes];
			let bField: any = b[field as keyof ApplicationAttributes];

			// Handle nested user fields
			if (field.includes("user.")) {
				const userField = field.split(".")[1];
				aField = a.user[userField as keyof typeof a.user];
				bField = b.user[userField as keyof typeof a.user];
			}

			if (field === "pricing") {
				aField = parseInt(aField.replace(/\D/g, ""));
				bField = parseInt(bField.replace(/\D/g, ""));
			}

			if (aField < bField) return order === "asc" ? -1 : 1;
			if (aField > bField) return order === "asc" ? 1 : -1;
			return 0;
		});

		setFilteredApplications(sorted);
	};

	return (
		<>
			<Head>
				<title>Applications</title>
			</Head>
			<Nav />
			<div className="min-h-screen p-3">
				<div className="flex">
					<h1 className="font-bold text-5xl">All applications :</h1>
				</div>

				{/* Main content */}
				<div className="flex-1 p-x-2 ">
					<div
						className={`flex flex-wrap bg-gray-100 rounded-lg overflow-hidden transition-transform transform   p-x-1  gap-3  items-center justify-around my-5`}
					>
						<>
							<label className="block mb-2">
								Experience:
								<input
									type="text"
									className="block w-full p-2 border rounded"
									onChange={(e) =>
										handleFilter(e.target.value, "", false)
									}
								/>
							</label>
							<label className="block mb-2">
								Language:
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
									onChange={(e) =>
										handleFilter("", "", e.target.checked)
									}
								/>
							</label>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded"
								onClick={() => handleSort("pricing")}
							>
								Sort by Pricing
							</button>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded"
								onClick={() => handleSort("endDate")}
							>
								Sort by End Date
							</button>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded"
								onClick={() => handleSort("no_of_openings")}
							>
								Sort by No of Openings
							</button>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded"
								onClick={() => router.push("/application")}
							>
								Reset filters
							</button>
						</>
					</div>
					{/* Main content goes here */}

					<div className="flex flex-col gap-5 p-1">
						<ul
							role="list"
							className="gap-3"
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(auto-fit, minmax(300px, 1fr))",
							}}
						>
							{filteredApplications.length > 0 ? (
								<>
									{filteredApplications.map(
										(
											application: ApplicationAttributes,
											index: number
										) => (
											<li
												className="col-span-1 flex flex-col divide-y divide-gray-700 rounded-lg bg-gray-100 shadow"
												key={index}
												style={{ maxWidth: "400px" }}
											>
												<div className="flex flex-1 flex-col p-8">
													<dl className="mt-1 flex flex-grow flex-col gap-2 justify-between">
														<dt className="sr-only">Title</dt>
														<dd className="text-3xl text-black font-semibold">
															{application.heading}
														</dd>
														<dt className="sr-only">Price</dt>
														<dd className="text-sm text-gray-500">
															<span className="text-gray-700 font-semibold">{`Price: `}</span>
															{application.pricing}
														</dd>
														<dt className="sr-only">
															Expire date
														</dt>
														<dd className="text-sm text-gray-500">
															<span className="text-gray-700 font-semibold">{`Expire date: `}</span>

															{application.endDate}
														</dd>

														<dt className="sr-only">
															No of Openings
														</dt>
														<dd className="text-sm text-gray-500">
															<span className="text-gray-700 font-semibold">{`No of Openings: `}</span>

															{application.no_of_openings}
														</dd>

														<dt className="sr-only">Experince</dt>
														<dd className="text-sm text-gray-500">
															<span className="text-gray-700 font-semibold">{`No of Openings: `}</span>

															{application.experience}
														</dd>

														<dt className="sr-only">Languages</dt>
														<dd className="text-sm text-gray-500 flex gap-2">
															<span className="text-gray-700 font-semibold">{`Languages: `}</span>
															<span className="flex flex-wrap gap-1">
																{application.languages.map(
																	(
																		lang: string,
																		i: number
																	) => (
																		<span
																			className="bg-white rounded-md border px-1"
																			key={i}
																		>
																			{lang}
																		</span>
																	)
																)}
															</span>
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
														<h3 className="mt-1 font-semibold text-xl text-gray-900 flex flex-col gap-1">
															<span>
																{application?.user?.name}
															</span>{" "}
															{application?.user.verified && (
																<Verified />
															)}
														</h3>
													</div>
												</div>
												<div>
													<div className="-mt-px flex divide-x divide-gray-200 ">
														<div className="-ml-px flex w-0 flex-1">
															<p
																className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer"
																onClick={() =>
																	router.push(
																		`/application/${application.id}`
																	)
																}
															>
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
																onClick={() =>
																	router.push(
																		`/chat/?active=${application.userId}`
																	)
																}
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
			{loading && <Loading />}
		</>
	);
}

export default Applications;
