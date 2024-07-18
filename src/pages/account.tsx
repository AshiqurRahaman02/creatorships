// pages/account.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "@/components/common/Nav";
import {
	BusinessInfoAttributes,
	CreatorInfoAttributes,
	UserDetails,
} from "@/utils/interface";
import Image from "next/image";
import FormInput from "@/components/element/FormInput";
import {
	createBusiness,
	getBusiness,
	updateBusiness,
} from "@/services/busineesService";
import notify from "@/components/common/Notify";
import { ToastContainer } from "react-toastify";
import { createCreator, getCreator, updateCreator } from "@/services/creatorService";

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

const Account = () => {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	const [activeSession, setActiveSession] = useState("");

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (userDetails && token) {
			const parsedUserDetails = JSON.parse(userDetails);
			console.log(token);
			setToken(token);
			setUserDetails(parsedUserDetails);
		} else {
			router.push("/login");
		}
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		let active = query.get("active");

		if(active === "logout") {
			localStorage.removeItem("userInfo");
			localStorage.removeItem("token");

			router.push("/");

			return;
		}

		setActiveSession(active || "profile");
	}, [router.query]);

	return (
		<>
			<Head>
				<title>Account</title>
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

					<>
						{activeSession === "portfolio" ? (
							userDetails?.type === "business" ? (
								<BusinessPortfolioComponent
									userDetails={userDetails}
									token={token}
								/>
							) : (
								<CreatorPortfolioComponent
									userDetails={userDetails}
									token={token}
								/>
							)
						) : (
							<ProfileComponent
								userDetails={userDetails}
								token={token}
							/>
						)}
					</>
				</div>
			</div>
		</>
	);
};

export default Account;

const ProfileComponent = ({ userDetails }: any) => {
	return (
		<div className="w-full">
			<div className="form m-auto">
				<div style={{ width: "max-content", margin: "auto" }}>
					{userDetails?.logo ? (
						<Image
							src={userDetails.logo}
							alt="user logo"
							width={80}
							height={80}
							className="p-1"
							priority
							title="Creatorships Logo"
						/>
					) : (
						<div className="border uppercase rounded-full text-9xl w-40 h-40  flex items-center justify-center">
							<h1 className="-mt-5 p-0 ">
								{userDetails?.name.split("")[0]}
							</h1>
						</div>
					)}
				</div>
				<div>
					<FormInput
						label={`${
							userDetails?.type === "creator" ? "Personal" : "Company"
						} Name`}
						type="text"
						value={userDetails?.name}
						onChange={(e) => console.log(e.target.value)}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={true}
					/>
				</div>
				<div>
					<FormInput
						label={`${
							userDetails?.type === "creator" ? "Personal" : "Company"
						} Email`}
						type="text"
						value={userDetails?.email}
						onChange={(e) => console.log(e.target.value)}
						icon={
							<svg
								height="20"
								viewBox="0 0 32 32"
								width="20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="Layer_3" data-name="Layer 3">
									<path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
								</g>
							</svg>
						}
						disabled={true}
					/>
				</div>
				<div>
					<FormInput
						label="Password"
						type="password"
						value={"password"}
						onChange={(e) => console.log(e.target.value)}
						icon={
							<span>
								{" "}
								<svg
									height="20"
									viewBox="-64 0 512 512"
									width="20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
									<path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
								</svg>
							</span>
						}
						disabled={true}
					/>
				</div>
			</div>
		</div>
	);
};

const BusinessPortfolioComponent = ({ userDetails, token }: any) => {
	const [businessDetails, setBusinessDetails] =
		useState<BusinessInfoAttributes | null>(null);

	const [formData, setFormData] = useState({
		location: "",
		about: "",
		industry: "",
		total_employee: 0,
		website: "",
		social: [{ name: "", link: "", followers: "" }],
	});

	const [setUp, setSetup] = useState(false);
	useEffect(() => {
		const getBusinessDetails = async () => {
			let { isError, message, business }: any = await getBusiness(
				userDetails?.user_id
			);

			if (isError) {
				if (message === "Business not found") {
					setSetup(true);
					notify("Please setup your business details", "info");
				} else {
					notify(message, "warning");
				}
			} else {
				setFormData({
					location: business.location,
					about: business.about,
					industry: business.industry,
					total_employee: business.total_employee,
					website: business.website,
					social: [...business.social],
				});
				setBusinessDetails(business);
			}
		};
		if (!businessDetails) {
			getBusinessDetails();
		}
	}, [businessDetails, userDetails]);

	const handleInputChange = (index: number, field: string, value: string) => {
		const updatedSocials = formData.social.map((social, i) =>
			i === index ? { ...social, [field]: value } : social
		);
		setFormData({ ...formData, social: updatedSocials });
	};

	const addSocial = () => {
		setFormData({
			...formData,
			social: [...formData.social, { name: "", link: "", followers: "" }],
		});
	};

	const handleUpdateSetup = async () => {
		if (
			formData.social.length <= 0 ||
			!formData.about ||
			!formData.industry ||
			!formData.location ||
			!formData.total_employee ||
			!formData.website
		) {
			notify("Please enter all information", "warning");
			return;
		}
		let body = { ...formData };
		let { isError, message, business }: any = await updateBusiness(
			body,
			token
		);

		if (isError) {
			notify(message, "error");
		} else {
			notify(message, "success");
			setBusinessDetails(business);
			setSetup(false);
		}
	};

	const handleCreateSetup = async () => {
		if (
			formData.social.length <= 0 ||
			!formData.about ||
			!formData.industry ||
			!formData.location ||
			!formData.total_employee ||
			!formData.website
		) {
			notify("Please enter all information", "warning");
			return;
		}
		let body = { ...formData };
		let { isError, message, business }: any = await createBusiness(
			body,
			token
		);

		if (isError) {
			notify(message, "error");
		} else {
			notify(message, "success");
			setBusinessDetails(business);
			setSetup(false);
		}
	};

	return (
		<div className="w-full">
			<div className="form m-auto">
			{setUp ? (
					<button
						onClick={() => {
							businessDetails?.id
								? handleUpdateSetup()
								: handleCreateSetup();
						}}
								className="bg-green-600 text-white px-3 py-1 rounded mt-2 mb-3"
					>
						Save
					</button>
				) : (
					<button onClick={() => setSetup(true)} 
					className="bg-gray-600 text-white px-3 py-1 rounded mt-2 mb-3">Edit</button>
				)}
				<div>
					<div>
						<div className="flex-column">
							<label>About</label>
						</div>
						<div className="" style={{ minHeight: "content-fit" }}>
							<textarea
								className="border w-full p-1"
								placeholder={`Enter your company about`}
								value={formData?.about || ""}
								onChange={(e) =>
									setFormData({
										...formData,
										about: e.target.value,
									})
								}
								disabled={!setUp}
							/>
						</div>
					</div>
					<FormInput
						label={`Company industry`}
						type="text"
						value={formData?.industry || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								industry: e.target.value,
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>
					<FormInput
						label={`Company location`}
						type="text"
						value={formData?.location || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								location: e.target.value,
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>
					<FormInput
						label={`Total employee in company`}
						type="number"
						value={`${formData?.total_employee}` || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								total_employee: Number(e.target.value),
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>
					<FormInput
						label={`Company's website`}
						type="text"
						value={formData?.website || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								website: e.target.value,
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>
					<div className="social-section">
						<h3 className="mt-4 mb-2">Socials</h3>
						{formData.social.map((social, index) => (
							<div key={index} className="social-entry mb-4">
								<FormInput
									label={`Social name`}
									type="text"
									value={social.name}
									onChange={(e) =>
										handleInputChange(index, "name", e.target.value)
									}
									disabled={!setUp}
								/>
								<FormInput
									label={`Social link`}
									type="text"
									value={social.link}
									onChange={(e) =>
										handleInputChange(index, "link", e.target.value)
									}
									disabled={!setUp}
								/>
								<FormInput
									label={`Total followers`}
									type="number"
									value={social.followers}
									onChange={(e) =>
										handleInputChange(
											index,
											"followers",
											e.target.value
										)
									}
									disabled={!setUp}
								/>
							</div>
						))}
						{setUp && (
							<button
								type="button"
								onClick={addSocial}
								className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
							>
								Add Social
							</button>
						)}
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

const CreatorPortfolioComponent = ({ userDetails, token }: any) => {
	const [creatorDetails, setCreatorDetails] =
		useState<CreatorInfoAttributes | null>(null);

	const [formData, setFormData] = useState({
		bio: "",
		phoneNo: "",
		location: "",
		languages: [""],
		website: "",
		social: [{ name: "", link: "", followers: "" }],
	});

	const [setUp, setSetup] = useState(false);
	useEffect(() => {
		const getCreatorDetails = async () => {
			let { isError, message, creator }: any = await getCreator(
				userDetails?.user_id
			);

			if (isError) {
				if (message === "Creator not found") {
					setSetup(true);
					notify("Please setup your creator details", "info");
				} else {
					notify(message, "warning");
				}
			} else {
				setFormData({
					location: creator.location,
					bio: creator.bio,
					phoneNo: creator.phone_number,
					languages: [...creator.languages],
					website: creator.website,
					social: [...creator.social],
				});
				setCreatorDetails(creator);
			}
		};
		if (!creatorDetails) {
			getCreatorDetails();
		}
	}, [creatorDetails, userDetails]);

	const handleInputChange = (index: number, field: string, value: string) => {
		const updatedSocials = formData.social.map((social, i) =>
			i === index ? { ...social, [field]: value } : social
		);
		setFormData({ ...formData, social: updatedSocials });
	};

	const addSocial = () => {
		setFormData({
			...formData,
			social: [...formData.social, { name: "", link: "", followers: "" }],
		});
	};

	const addLanguage = () => {
		setFormData({
			...formData,
			languages: [...formData.languages, ""],
		});
	}

	const handleUpdateSetup = async () => {
		if (
			formData.social.length <= 0 ||
			!formData.bio ||
			!formData.phoneNo ||
			!formData.location ||
			formData.languages.length <= 0 ||
			!formData.website
		) {
			notify("Please enter all information", "warning");
			return;
		}
		let body = { ...formData };
		let { isError, message, creator }: any = await updateCreator(
			body,
			token
		);

		if (isError) {
			notify(message, "error");
		} else {
			notify(message, "success");
			setCreatorDetails(creator);
			setSetup(false);
		}
	};

	const handleCreateSetup = async () => {
		if (
			formData.social.length <= 0 ||
			!formData.bio ||
			!formData.phoneNo ||
			!formData.location ||
			formData.languages.length <= 0 ||
			!formData.website
		) {
			notify("Please enter all information", "warning");
			return;
		}
		let body = { ...formData };
		let { isError, message, creator }: any = await createCreator(
			body,
			token
		);

		if (isError) {
			notify(message, "error");
		} else {
			notify(message, "success");
			setCreatorDetails(creator);
			setSetup(false);
		}
	};

	return (
		<div className="w-full">
			<div className="form m-auto">
				{setUp ? (
					<button
						onClick={() => {
							creatorDetails?.id
								? handleUpdateSetup()
								: handleCreateSetup();
						}}
								className="bg-green-600 text-white px-3 py-1 rounded mt-2 mb-3"
					>
						Save
					</button>
				) : (
					<button onClick={() => setSetup(true)} 
					className="bg-gray-600 text-white px-3 py-1 rounded mt-2 mb-3">Edit</button>
				)}
				<div>
					<div>
						<div className="flex-column">
							<label>About</label>
						</div>
						<div className="" style={{ minHeight: "content-fit" }}>
							<textarea
								className="border w-full p-1"
								placeholder={`Enter something about you`}
								value={formData?.bio || ""}
								onChange={(e) =>
									setFormData({
										...formData,
										bio: e.target.value,
									})
								}
								disabled={!setUp}
							/>
						</div>
					</div>
					<FormInput
						label={`Business phone number`}
						type="number"
						value={formData?.phoneNo || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								phoneNo: e.target.value,
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>
					<FormInput
						label={`Shiping address`}
						type="text"
						value={formData?.location || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								location: e.target.value,
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>

					<div className="languages-section">
						<h3 className="mt-4 mb-2 font-bold">Languages :</h3>
						{formData.languages.map((language, index) => (
							<div key={index} className="social-entry mb-4">
								<FormInput
									label={`Language`}
									type="text"
									value={language}
									onChange={(e) =>

										{
											const updatedLanguages =
												formData.languages.map((language, i) =>
													i === index ? e.target.value : language
												);
											setFormData({
												...formData,
												languages: updatedLanguages,
											});
										}
									}
									disabled={!setUp}
								/>
							</div>
						))}
						{setUp && (
							<button
								type="button"
								onClick={addLanguage}
								className="bg-blue-500 text-white px-3 py-1 rounded mt-2 mb-3"
							>
								Add Language
							</button>
						)}
					</div>

					<FormInput
						label={`Portfolio website`}
						type="text"
						value={formData?.website || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								website: e.target.value,
							})
						}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.4"
								stroke="currentColor"
								style={{ width: "24px" }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						}
						disabled={!setUp}
					/>
					<div className="social-section">
						<h3 className="mt-4 mb-2 font-bold">Socials :</h3>
						{formData.social.map((social, index) => (
							<div key={index} className="social-entry mb-4">
								<FormInput
									label={`Social name`}
									type="text"
									value={social.name}
									onChange={(e) =>
										handleInputChange(index, "name", e.target.value)
									}
									disabled={!setUp}
								/>
								<FormInput
									label={`Social link`}
									type="text"
									value={social.link}
									onChange={(e) =>
										handleInputChange(index, "link", e.target.value)
									}
									disabled={!setUp}
								/>
								<FormInput
									label={`Total followers`}
									type="number"
									value={social.followers}
									onChange={(e) =>
										handleInputChange(
											index,
											"followers",
											e.target.value
										)
									}
									disabled={!setUp}
								/>
							</div>
						))}
						{setUp && (
							<button
								type="button"
								onClick={addSocial}
								className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
							>
								Add Social
							</button>
						)}
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};
