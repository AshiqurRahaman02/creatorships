import Loading from "@/components/common/Loading";
import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import {
	getAllApplications,
	getApplication,
} from "@/services/applicationService";
import { getBusiness } from "@/services/busineesService";
import {
	ApplicationAttributes,
	BusinessInfoAttributes,
	UserDetails,
} from "@/utils/interface";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Business() {
	const router = useRouter();
	const { id } = router.query;
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true)

	const [business, setbusiness] = useState<BusinessInfoAttributes | null>(null);
	const [applications, setApplications] = useState<ApplicationAttributes[]>([
		{
			id: 0,
			userId: 0,
			heading: "",
			pricing: "",
			endDate: "",
			experience: "",
			about: "",
			languages: [""],
			benefits: "",
			no_of_openings: 1,
			user: {
				user_id: 0,
				name: "",
				verified: false,
				logo: "",
			},
		},
	]);

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			setToken(token);
			setUserDetails(parsedUserDetails);
		} else {
			router.push("/login");
		}
	}, [id, router]);
	useEffect(() => {
		const getBusinessDetails = async () => {
			if(!id){
				router.push("/business")
				return
			}
			let { isError, message, business, applications }: any =
				await getBusiness(+id || 0);

			if (isError) {
				notify(message, "warning");
			} else {
				console.log(business)
				setApplications(applications);
				setbusiness(business);
			}

			setLoading(false)
		};
		if (!business) {
			getBusinessDetails();
		}
	}, [business, userDetails]);

	return (
		<>
			<Head>
				<title>business</title>
			</Head>
			<Nav />
			<div className="min-w-80 max-w-3xl flex  bg-gray-100 m-auto">
				<div className="flex-1 p-6 border">
					<div className="flex gap-3 items-center mt-6">
						<p className="min-w-36 text-pink-800">User information :</p>{" "}
						<hr className="h-0.5 w-full bg-gray-700" />
					</div>
					<div>
						<div className="flex gap-3 mt-6">
							<Image
								src={business?.user.logo || ""}
								alt="user logo"
								width={80}
								height={80}
								className="h-16 w-16 flex-shrink-0 rounded-full border-black p-1"
								priority
							/>
							<h3 className="mt-3 text-xl font-medium text-gray-900 flex gap-2">
								<span>{business?.user.name}</span>
								<span
									onClick={() =>
										window.open(business?.website, "_blank")
									}
									className="cursor-pointer"
									title="Open in new tab"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="#444"
									>
										<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
									</svg>
								</span>
							</h3>
						</div>
						<p className="text-xl mt-5 font-semibold text-gray-800">
							About
						</p>
						<p className="mt-3">{business?.about}</p>

						<div className="mt-3">
							<p className="text-xl mt-5 font-semibold text-gray-800 mb-2">
								Socials
							</p>
							{business?.social?.map((ele: any, index: any) => (
								<div key={index} className="flex gap-2 mb-2">
									<p>{ele.name}</p>
									<p
										onClick={() => window.open(ele.link, "_blank")}
										className="cursor-pointer"
										title="Open in new tab"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24px"
											viewBox="0 -960 960 960"
											width="24px"
											fill="#444"
										>
											<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
										</svg>
									</p>
									<p>{ele.followers}</p>
								</div>
							))}
						</div>

						<p className="mt-2">
							{`Location: `}
							{business?.location}
						</p>
					</div>
					<div className="flex gap-3 items-center my-3">
						<p className="min-w-36 text-pink-800">Applications :</p>{" "}
						<hr className="h-0.5 w-full bg-gray-700" />
					</div>
					<ul
							role="list"
							className="gap-3"
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(auto-fit, minmax(300px, 1fr))",
							}}
						>
							{applications.length > 0 ? (
								<>
									{applications.map(
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
														<dt className="sr-only">
															Expire date
														</dt>
														<dd className="text-sm text-gray-500">
															<span className="text-gray-700 font-semibold">{`Expire date: `}</span>

															{application.endDate}
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
															src={business?.user.logo || ""}
															alt="user logo"
															width={80}
															height={80}
															className="h-16 w-16 flex-shrink-0 rounded-full border-black p-1"
															priority
														/>
														<h3 className="mt-3 text-xl font-medium text-gray-900">
															{business?.user.name}
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
								<>{`Business don't have any application`}</>
							)}
						</ul>
				</div>
			</div>
			{loading && <Loading />}
		</>
	);
}

export default Business;
