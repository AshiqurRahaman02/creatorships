import Loading from "@/components/common/Loading";
import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import { getAllCreator } from "@/services/creatorService";
import { CreatorInfoAttributes, UserDetails } from "@/utils/interface";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Creator() {
	const router = useRouter();
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true)

	const [creators, setCreators] = useState<CreatorInfoAttributes[] | []>([]);
	const [filteredCreators, setFilteredCreators] = useState<
		CreatorInfoAttributes[] | []
	>([]);

	useEffect(() => {
		const getAllCreatorDetails = async () => {
			let { isError, message, creators }: any = await getAllCreator();

			if (isError) {
				notify(message, "warning");
			} else {
				setCreators(creators);
				setFilteredCreators(creators);
			}

			setLoading(false)
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
	}, [router]);

	const handleFilter = (
		location: string,
		language: string,
		verified: boolean
	) => {
		let filtered = [...creators];

		if (location) {
			filtered = filtered.filter((creator) =>
				creator.location.toLowerCase().includes(location.toLowerCase())
			);
		}

		if (language) {
			filtered = filtered.filter((creator) =>
				creator.languages.some((lang: string) =>
					lang.toLowerCase().includes(language.toLowerCase())
				)
			);
		}

		if (verified) {
			filtered = filtered.filter((creator) => creator.user.verified);
		}

		setFilteredCreators(filtered);
	};

	const handleSort = (criteria: string) => {
		let sorted = [...filteredCreators];
		if (criteria === "followers") {
			sorted.sort(
				(a, b) =>
					b.social.reduce((acc, s) => acc + Number(s.followers), 0) -
					a.social.reduce((acc, s) => acc + Number(s.followers), 0)
			);
		} else if (criteria === "createdAt") {
			sorted.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
		}
		setFilteredCreators(sorted);
	};

	const sortner = (string: string, max: number) => {
		if (string.length > max) {
			return string.substring(0, max) + "...";
		}
		return string;
	};

	const getFollowers = (arr: any) => {
		return arr.reduce((acc: number, s: any) => acc + Number(s.followers), 0);
	};

	return (
		<>
			<Head>
				<title>Creators</title>
			</Head>
			<Nav />
			<div className="min-h-screen p-3">
				<div className="flex">
					<h1 className="font-bold text-5xl">All creators :</h1>
				</div>

				{/* Main content */}
				<div className="flex-1 p-x-2">
					<div
						className={`flex flex-wrap bg-gray-100 rounded-lg overflow-hidden transition-transform transform   p-x-1  gap-3  items-center justify-around my-5`}
					>
						<>
							<label className="block mb-2">
								Location:
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
						</>
						<>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded"
								onClick={() => handleSort("followers")}
							>
								Sort by Followers
							</button>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded"
								onClick={() => handleSort("createdAt")}
							>
								Sort by New creators
							</button>
						</>
					</div>
					{/* Main content goes here */}

					<div className="flex flex-col gap-5">
						<ul
							role="list"
							className="gap-3"
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(auto-fit, minmax(300px, 1fr))",
							}}
						>
							{filteredCreators.length > 0 ? (
								<>
									{filteredCreators.map(
										(
											creator: CreatorInfoAttributes,
											index: number
										) => (
											<li
												className="col-span-1 flex flex-col divide-y divide-gray-700 rounded-lg bg-gray-100 text-center shadow"
												key={index}
												style={{ maxWidth: "400px" }}
											>
												<div className="flex flex-1 flex-col p-8">
													<Image
														src={creator.user.logo}
														alt="user logo"
														width={160}
														height={160}
														className="mx-auto h-32 w-32 flex-shrink-0 rounded-full border-black p-1"
														priority
													/>
													<h3 className="mt-6 font-semibold text-xl text-gray-900">
														{creator?.user?.name}
													</h3>
													<dl className="mt-1 flex flex-grow flex-col justify-between">
														<dt className="sr-only">Bio</dt>
														{/* <dd className="text-sm text-gray-500 text-justify">
													{sortner(creator?.bio, 75)}
												</dd> */}

														<dt className="sr-only">Followers</dt>
														<dd className="text-sm text-gray-500 text-left">
															<span className="text-gray-700 font-semibold">{`Followers: `}</span>
															{getFollowers(creator.social)}
														</dd>

														<dd className="text-sm text-gray-500 flex gap-2">
															<span className="text-gray-700 font-semibold">{`Languages: `}</span>
															<span className="flex flex-wrap gap-1">
																{creator.languages.map(
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
														{/* <dd className="mt-3">
													<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
														Admin
													</span>
												</dd> */}
														<dt className="sr-only">Location</dt>
														<dd className="text-sm text-gray-500 text-left">
															<span className="text-gray-700 font-semibold">{`Location: `}</span>
															{creator.location}
														</dd>
													</dl>
												</div>
												<div>
													<div className="-mt-px flex divide-x divide-gray-200 ">
														<div className="-ml-px flex w-0 flex-1">
															<p
																className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer"
																onClick={() =>
																	router.push(
																		`/creator/${creator.user_id}`
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
																		`/chat/?active=${creator.user_id}`
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
								<>{`No Creator found`}</>
							)}
						</ul>
					</div>
				</div>
			</div>
			{loading && <Loading />}
		</>
	);
}

export default Creator;
