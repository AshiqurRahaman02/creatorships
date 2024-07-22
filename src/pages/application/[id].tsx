import Nav from "@/components/common/Nav";
import notify from "@/components/common/Notify";
import {
	getAllApplications,
	getApplication,
} from "@/services/applicationService";
import {
	ApplicationAttributes,
	BusinessInfoAttributes,
	CreatorInfoAttributes,
	UserDetails,
} from "@/utils/interface";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Application() {
	const router = useRouter();
	const { id } = router.query;
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	const [application, setApplication] = useState<ApplicationAttributes>({
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
	});

	const [details, setDetails] = useState<any>({});

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			setToken(token);
			setUserDetails(parsedUserDetails);
			getApplicationDetails();
		} else {
			router.push("/login");
		}
	}, [id]);
	const getApplicationDetails = async () => {
		if (!id) {
			router.push("/application");
		}

		let { isError, message, application, details }: any =
			await getApplication(id);

		if (isError) {
			notify(message, "warning");
		} else {
			setApplication(application);
			setDetails(details);
		}
	};

	return (
		<>
			<Head>
				<title>Application</title>
			</Head>
			<Nav />
			<div className="min-w-80 max-w-4xl flex  bg-gray-100 m-auto">
				<div className="flex-1 p-6 border">
					<div className="flex gap-3 items-center mt-3">
						<p className="min-w-36 text-pink-800">
							Application details :
						</p>{" "}
						<hr className="h-0.5 w-full bg-gray-700" />
					</div>
					<div>
						<h1 className="text-3xl font-semibold text-center my-3">
							{application.heading}
						</h1>
						<hr className="h-0.5 w-full bg-black" />
						<p className="text-xl mt-5 font-semibold text-gray-800">About</p>
						<p>{application.about}</p>
						<div className="flex flex-wrap justify-start gap-x-6 gap-y-3 mt-5">
							<p>
								{`Pricing: `}
								{application.pricing}
							</p>
							<p>
								{`Expire date: `}
								{application.endDate}
							</p>
							<p>
								{`Experience required: `}
								{application.experience}
							</p>
							<p>
								{`No of openings: `}
								{application.no_of_openings}
							</p>
						</div>

						<div className="flex gap-3 mt-5">
							<p>Languages: </p>
							{application.languages.map((lang: string, i: number) => (
								<p
									className="bg-white rounded-md border px-1 w-max"
									key={i}
								>
									{lang}
								</p>
							))}
						</div>
					</div>
					<div className="flex gap-3 items-center mt-6">
						<p className="min-w-36 text-pink-800">User information :</p>{" "}
						<hr className="h-0.5 w-full bg-gray-700" />
					</div>
					<div>
						<div className="flex gap-3 mt-6">
							<Image
								src={application.user.logo}
								alt="user logo"
								width={80}
								height={80}
								className="h-16 w-16 flex-shrink-0 rounded-full border-black p-1"
								priority
							/>
							<h3 className="mt-3 text-xl font-medium text-gray-900 flex gap-2">
								<span>{application.user.name}</span>
								<span
									onClick={() =>
										window.open(details.website, "_blank")
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
						<p className="text-xl mt-5 font-semibold text-gray-800">About</p>
						<p className="mt-3">{details.bio || details.about}</p>

						<div className="mt-3">

						<p className="text-xl mt-5 font-semibold text-gray-800 mb-2">Socials</p>
							{details.social?.map((ele: any, index: any) => (
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

						<p className="mt-2">{`Location: `}{details.location}</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Application;
