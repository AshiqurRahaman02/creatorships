import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListManager from "@/components/element/ListManager";
import notify from "@/components/common/Notify";
import { useRouter } from "next/router";

function Setup() {
	const router = useRouter();
	const [active, setActive] = useState<number>(0);
	const [userDetails, setUserDetails] = useState<any | null>(null);
	useEffect(() => {
		if (active < 0) {
			setActive(0);
		}
	}, [active]);
	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		if (userDetails !== null) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);
		} else {
			notify("Please login first", "warning");
			setTimeout(() => {
				router.push("/login");
			}, 3000);
		}
	}, []);
	return (
		<main>
            <h1>Welcome to business setup</h1>
			{active === 0 ? (
				<Profile userDetails={userDetails} setActive={setActive} />
			) : active === 1 ? (
				<WorkProfile userDetails={userDetails} setActive={setActive} />
			) : active === 2 ? (
				<ProfessionalProfile
					userDetails={userDetails}
					setActive={setActive}
				/>
			) : (
				<>440 Error</>
			)}
		</main>
	);
}

const Profile = ({ userDetails, setActive }: any) => {
	const genderOptions = [
		"Male",
		"Female",
		"Non-binary",
		"Other",
		"Prefer not to say",
	];

	const [formData, setFormData] = useState({
		email: userDetails?.email || "",
		age: userDetails?.age || "",
		phoneNumber: userDetails?.contact?.phoneNumber || "",
		facebook: userDetails?.social?.facebook || "",
		linkedIn: userDetails?.social?.linkedIn || "",
		x: userDetails?.social?.x || "",
		city: userDetails?.location?.city || "",
		country: userDetails?.location?.country || "",
		region: userDetails?.location?.region || "",
		state: userDetails?.location?.state || "",
		firstName: userDetails?.firstName || "",
		lastName: userDetails?.lastName || "",
		dob: userDetails?.dob || "",
		ethnicity: userDetails?.ethnicity || "",
		gender: userDetails?.gender || "",
		profilePicture: userDetails?.profilePicture || "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleGenderChange = (event: any, newValue: string | null) => {
		setFormData({ ...formData, gender: newValue || "" });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		setActive((pre: number) => pre + 1);
	};

	return (
		<section className="profile-section m-auto" style={{ maxWidth: "700px" }}>
			<form onSubmit={handleSubmit}>
				<div className="profile-header flex flex-wrap gap-5">
					<TextField
						label="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Last Name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Profile Picture URL"
						name="profilePicture"
						value={formData.profilePicture}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Age"
						name="age"
						value={formData.age}
						onChange={handleChange}
						margin="normal"
					/>
					<Autocomplete
						options={genderOptions}
						value={formData.gender}
						onChange={handleGenderChange}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Gender"
								margin="normal"
								fullWidth
							/>
						)}
					/>
					<TextField
						label="Date of Birth"
						name="dob"
						type="date"
						value={formData.dob.split("T")[0]}
						onChange={handleChange}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						label="Ethnicity (Optional)"
						name="ethnicity"
						value={formData.ethnicity}
						onChange={handleChange}
						margin="normal"
					/>
				</div>

				<div className="profile-details ">
					<h2>Contact Information</h2>

					<div className=" flex flex-wrap gap-5">
						<TextField
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							margin="normal"
						/>
						<TextField
							label="Phone Number"
							name="phoneNumber"
							type="tel"
							value={formData.phoneNumber}
							onChange={handleChange}
							margin="normal"
						/>
					</div>

					<h2>Location</h2>
					<div className=" flex flex-wrap gap-5">
						<TextField
							label="City"
							name="city"
							value={formData.city}
							onChange={handleChange}
							margin="normal"
						/>
						<TextField
							label="State"
							name="state"
							value={formData.state}
							onChange={handleChange}
							margin="normal"
						/>
						<TextField
							label="Country"
							name="country"
							value={formData.country}
							onChange={handleChange}
							margin="normal"
						/>
						<TextField
							label="Region"
							name="region"
							value={formData.region}
							onChange={handleChange}
							margin="normal"
						/>
					</div>

					<h2>Social Profiles</h2>
					<div className=" flex flex-wrap gap-5">
						<TextField
							label="Facebook URL"
							name="facebook"
							type="url"
							value={formData.facebook}
							onChange={handleChange}
							margin="normal"
						/>
						<TextField
							label="LinkedIn URL"
							name="linkedIn"
							type="url"
							value={formData.linkedIn}
							onChange={handleChange}
							margin="normal"
						/>
						<TextField
							label="X URL"
							name="x"
							type="url"
							value={formData.x}
							onChange={handleChange}
							margin="normal"
						/>
					</div>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="mt-10"
				>
					Save Profile
				</Button>
			</form>
		</section>
	);
};

const frequencyOptions = [
	"1 day",
	"2-5 days",
	"1 week",
	"2-3 weeks",
	"1 month",
	"2 months",
	"3 months",
	"4 months",
	"5 months",
	"More than 5 months",
];
const WorkProfile = ({ userDetails, setActive }: any) => {
	const [formData, setFormData] = useState({
		youtubeSubscribers:
			userDetails?.workDetails?.platforms?.youtube?.subscribers || "",
		youtubeLink: userDetails?.workDetails?.platforms?.youtube?.link || "",
		youtubeMostViewedVideo:
			userDetails?.workDetails?.platforms?.youtube?.mostViewed || "",
		youtubeVideoUploadFrequency:
			userDetails?.workDetails?.platforms?.youtube
				?.youtubeVideoUploadFrequency || "",
		instagramLink: userDetails?.workDetails?.platforms?.instagram?.link || "",
		instagramFollowers:
			userDetails?.workDetails?.platforms?.instagram?.followers || "",
		instagramMostLikeOnPost:
			userDetails?.workDetails?.platforms?.instagram?.mostLike || "",
		instagramPostFrequency:
			userDetails?.workDetails?.platforms?.instagram
				?.instagramPostFrequency || "",
		previousContracts: userDetails?.workDetails?.previousContracts || "",
		contentType: userDetails?.workDetails?.contentType || "",
		targetAudience: userDetails?.workDetails?.targetAudience || "",
		totalFollowers: userDetails?.workDetails?.totalFollowers || "",
		popularPostsAndVideos:
			userDetails?.work?.platforms?.youtube?.popularVideos || [],
		youtubeSponsors: userDetails?.work?.platforms?.youtube?.sponcers || [],
		youtubePreviousContracts:
			userDetails?.work?.platforms?.youtube?.previousContracts || [],
		instagramSponsors:
			userDetails?.work?.platforms?.instagram?.sponcers || [],
		instagramPreviousContracts:
			userDetails?.work?.platforms?.instagram?.previousContracts || [],
	});

	const handleItemsChange = (field: string, updatedItems: string[]) => {
		setFormData({ ...formData, [field]: updatedItems });
	};

	const [postInput, setPostInput] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		setActive((pre: number) => pre + 1);
	};

	const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostInput(e.target.value);
	};

	const addPost = () => {
		if (postInput) {
			setFormData({
				...formData,
				popularPostsAndVideos: [
					...formData.popularPostsAndVideos,
					postInput,
				],
			});
			setPostInput("");
		}
	};

	const deletePost = (index: number) => {
		setFormData({
			...formData,
			popularPostsAndVideos: formData.popularPostsAndVideos.filter(
				(_: any, i: any) => i !== index
			),
		});
	};

	const handleYouTubeFrequencyChange = (
		event: any,
		newValue: string | null
	) => {
		setFormData({ ...formData, youtubeVideoUploadFrequency: newValue || "" });
	};

	const handleInstagramFrequencyChange = (
		event: any,
		newValue: string | null
	) => {
		setFormData({ ...formData, instagramPostFrequency: newValue || "" });
	};

	return (
		<section className="work-section m-auto" style={{ maxWidth: "700px" }}>
			<form onSubmit={handleSubmit}>
				<h2>Overall</h2>
				<div className="flex flex-wrap gap-5">
					<TextField
						label="Content Type"
						name="contentType"
						value={formData.contentType}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Target Audience"
						name="targetAudience"
						value={formData.targetAudience}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Total Followers"
						name="totalFollowers"
						value={formData.totalFollowers}
						onChange={handleChange}
						margin="normal"
					/>
				</div>
				<ListManager
					label="Popular Posts and Videos"
					items={formData.popularPostsAndVideos}
					onItemsChange={(updatedItems) =>
						handleItemsChange("popularPostsAndVideos", updatedItems)
					}
				/>
				<h2>Youtube</h2>
				<div className="flex flex-wrap gap-5">
					<TextField
						label="YouTube Link"
						name="youtubeLink"
						value={formData.youtubeLink}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="YouTube Subscribers"
						name="youtubeSubscribers"
						value={formData.youtubeSubscribers}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Most viewed video"
						name="youtubeMostViewedVideo"
						value={formData.youtubeMostViewedVideo}
						onChange={handleChange}
						margin="normal"
					/>
					<ListManager
						label="YouTube Sponsors"
						items={formData.youtubeSponsors}
						onItemsChange={(updatedItems) =>
							handleItemsChange("youtubeSponsors", updatedItems)
						}
					/>

					<ListManager
						label="YouTube Previous Contracts"
						items={formData.youtubePreviousContracts}
						onItemsChange={(updatedItems) =>
							handleItemsChange("youtubePreviousContracts", updatedItems)
						}
					/>
					<Autocomplete
						options={frequencyOptions}
						value={formData.youtubeVideoUploadFrequency}
						onChange={handleYouTubeFrequencyChange}
						className="w-1/2"
						renderInput={(params) => (
							<TextField
								{...params}
								label="YouTube Video Upload Frequency"
								margin="normal"
							/>
						)}
					/>
				</div>
				<h2>Instagram</h2>
				<div className="flex flex-wrap gap-5">
					<TextField
						label="Instagram Link"
						name="instagramLink"
						value={formData.instagramLink}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Instagram Followers"
						name="instagramFollowers"
						value={formData.instagramFollowers}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						label="Most like on post"
						name="instagramMostLikeOnPost"
						value={formData.instagramMostLikeOnPost}
						onChange={handleChange}
						margin="normal"
					/>
					<ListManager
						label="Instagram Sponsors"
						items={formData.instagramSponsors}
						onItemsChange={(updatedItems) =>
							handleItemsChange("instagramSponsors", updatedItems)
						}
					/>

					<ListManager
						label="Instagram Previous Contracts"
						items={formData.instagramPreviousContracts}
						onItemsChange={(updatedItems) =>
							handleItemsChange(
								"instagramPreviousContracts",
								updatedItems
							)
						}
					/>
					<Autocomplete
						options={frequencyOptions}
						value={formData.instagramPostFrequency}
						onChange={handleInstagramFrequencyChange}
						className="w-1/2"
						renderInput={(params) => (
							<TextField
								{...params}
								label="Instagram Post Frequency"
								margin="normal"
							/>
						)}
					/>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="mt-10"
				>
					Save Work Profile
				</Button>
			</form>
		</section>
	);
};

const ProfessionalProfile = ({ userDetails, setActive }: any) => {
	const [formData, setFormData] = useState({
		ownedBusiness: userDetails?.ownedBusiness || [],
		netWorth: userDetails?.netWorth || "",
	});

	const [businessInput, setBusinessInput] = useState("");

	const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBusinessInput(e.target.value);
	};

	const addBusiness = () => {
		if (businessInput) {
			setFormData({
				...formData,
				ownedBusiness: [...formData.ownedBusiness, businessInput],
			});
			setBusinessInput("");
		}
	};

	const deleteBusiness = (index: number) => {
		setFormData({
			...formData,
			ownedBusiness: formData.ownedBusiness.filter(
				(_: any, i: any) => i !== index
			),
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		// setAcive((pre)=>pre+1)
	};

	const netWorthOptions = [
		"< 1000000",
		"1000000 < 10000000",
		"10000000 < 100000000",
		"100000000 < 1000000000",
		"> 1000000000",
	];

	return (
		<section
			className="professional-section m-auto"
			style={{ maxWidth: "700px" }}
		>
			<h2>Professional Profile</h2>

			<form onSubmit={handleSubmit}>
				<h3>Owned Businesses</h3>
				<div className="owned-business-section">
					{formData.ownedBusiness.map(
						(business: string, index: number) => (
							<div key={index} className="business-item">
								<span>{business}</span>
								<IconButton
									aria-label="delete"
									onClick={() => deleteBusiness(index)}
								>
									<DeleteIcon />
								</IconButton>
							</div>
						)
					)}
					<div className="flex flex-wrap items-center gap-3">
						<TextField
							label="Add Business"
							value={businessInput}
							onChange={handleBusinessChange}
							margin="normal"
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={addBusiness}
						>
							Add Business
						</Button>
					</div>
				</div>

				<div className="net-worth-section">
					<h3>Net Worth</h3>
					<Autocomplete
						options={netWorthOptions}
						value={formData.netWorth}
						onChange={(event: any, newValue: string | null) => {
							setFormData({ ...formData, netWorth: newValue || "" });
						}}
						renderInput={(params) => (
							<TextField {...params} label="Net Worth" margin="normal" />
						)}
					/>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="mt-10"
				>
					Save Profile
				</Button>
			</form>
		</section>
	);
};

export default Setup;
