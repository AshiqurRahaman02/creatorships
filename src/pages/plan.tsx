import Nav from "@/components/common/Nav";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { userRoutes } from "@/services/userService";
import { ToastContainer } from "react-toastify";
import notify from "@/components/common/Notify";
import { useLocation } from "react-router-dom";
import { UserDetails } from "@/utils/interface";

const stripePromise = loadStripe(
	"pk_test_51OckCLSJhfkaql8DL4qcw6vUG8Ein4CpjtV1LUq253mvaHKcq3mSj8hNiK9GumYdfJLuDobUf4PPxrWj9JsMF8qE00K2FPt2NB"
);

const creatorFeatures = [
	"Exclusive content access",
	"Collaboration opportunities",
	"Monthly Q&A sessions",
	"Access to creative tools",
	"Marketing support",
	"Personalized feedback on projects",
	"Entry to annual conference",
	"Official member merchandise",
];

const businessFeatures = [
	"Private networking events",
	"Business resources and templates",
	"Access to industry reports",
	"Discounts on business software",
	"Marketing and branding support",
	"Priority customer support",
	"Entry to annual conference",
	"Official member merchandise",
];

const monthlyPlan = {
	creatorPrice: 15,
	businessPrice: 30,
	creator: "price_1PdfPJSJhfkaql8DcILlS92u",
	business: "price_1PdfR1SJhfkaql8DUdRPp78G",
	features: [
		"Access to private forum",
		"Exclusive member resources",
		"Monthly webinars",
		"Discounts on services/products",
	],
};

const yearlyPlan = {
	creatorPrice: 150,
	businessPrice: 300,
	creator: "price_1PdfQBSJhfkaql8DdBnZaYgK",
	business: "price_1PdfSQSJhfkaql8Dgn8xVvAl",
	features: [
		"Access to private forum",
		"Exclusive member resources",
		"Entry to annual conference",
		"Official member t-shirt",
		"Access to premium content",
		"Personalized support",
	],
};


export default function Plan() {
	const router = useRouter();
	const { pathname, query, asPath } = router;
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [token, setToken] = useState("");

	let [message, setMessage] = useState("");
	let [success, setSuccess] = useState(false);
	let [sessionId, setSessionId] = useState("");
	const [planType, setPlanType] = useState("monthly");

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
	}, []);

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if(query.get("try_again")){
			setSuccess(false);
			setMessage("");
		}else
		if (query.get("success")) {
			setSuccess(true);
			setSessionId(query.get("session_id") || "");
			setPlanType(query.get("plan_type") || "");
		}else
		if (query.get("canceled")) {
			setSuccess(false);
			setMessage(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}else{
			setSuccess(false);
			setMessage("");
		}


	}, [router.query]);

	if (!success && message !== "") {
		return <Message message={message} />;
	} else if (success && sessionId !== "") {
		return (
			<SuccessDisplay
				sessionId={sessionId}
				planType={planType}
				token={token}
			/>
		);
	} else {
		return (
			<div>
				<Nav />
				<Elements stripe={stripePromise}>
					<div className="bg-white">
						<div className="mx-auto max-w-7xl px-6 lg:px-8">
							<div className="mx-auto mt-1 mb-5 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-1 lg:mx-0  lg:max-w-none">
								<ProductDisplay
									userDetails={userDetails}
									monthlyPlan={monthlyPlan}
									yearlyPlan={yearlyPlan}
									token={token}
								/>
								<div className="px-8 sm:px-10 lg:flex-auto pb-5">
									<div className="mt-10 flex items-center gap-x-4">
										<h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
											What’s also included
										</h4>
										<div className="h-px flex-auto bg-gray-100" />
									</div>
									<ul
										role="list"
										className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-3 sm:gap-6"
									>
										{userDetails?.type === "creator" ? (
											<>
												{creatorFeatures.map((feature) => (
													<li
														key={feature}
														className="flex gap-x-3"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															height="25px"
															viewBox="0 -960 960 960"
															width="25px"
															fill="#333"
														>
															<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
														</svg>
														{feature}
													</li>
												))}
											</>
										) : (
											<>
												{businessFeatures.map((feature) => (
													<li
														key={feature}
														className="flex gap-x-3"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															height="25px"
															viewBox="0 -960 960 960"
															width="25px"
															fill="#333"
														>
															<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
														</svg>
														{feature}
													</li>
												))}
											</>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</Elements>

				<ToastContainer />
			</div>
		);
	}
}

const ProductDisplay = ({
	userDetails,
	monthlyPlan,
	yearlyPlan,
	token,
}: any) => {
	const [planType, setPlanType] = useState("monthly");

	const handleCheckout = async (planType:string) => {
		try {
			const userType = userDetails?.type;
			const productId =
				planType === "monthly"
					? monthlyPlan[userType]
					: yearlyPlan[userType];
			const response = await fetch(userRoutes.createCheckoutSession, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					planType,

					productId,
				}),
			});

			const { url, isError, message } = await response.json();

			if (isError) {
				notify(message, "error");
			} else {
				window.location.href = url;
			}
		} catch (error: any) {
			notify(error.message, "error");
		}
	};

	return (
		<div className="lg:flex justify-evenly">
			<div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
				<div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
					<div className="mx-auto max-w-xs px-8">
						<p className="text-base font-semibold text-gray-600">
							Pay every month, own it for whole month
						</p>
						<p className="mt-6 flex items-baseline justify-center gap-x-2">
							<span className="text-5xl font-bold tracking-tight text-gray-900">
								$
								{userDetails?.type === "creator"
									? monthlyPlan.creatorPrice
									: monthlyPlan.businessPrice}
							</span>
							<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
								USD
							</span>
						</p>
						<button
							onClick={() => {
								handleCheckout("monthly");
							}}
							className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Subscribe
						</button>
						<p className="mt-6 text-xs leading-5 text-gray-600">
							Invoices and receipts available for easy company
							reimbursement
						</p>
						<ul
							role="list"
							className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600"
						>
							{monthlyPlan.features.map((feature: string) => (
								<li key={feature} className="flex gap-x-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="25px"
										viewBox="0 -960 960 960"
										width="25px"
										fill="#333"
									>
										<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
									</svg>
									{feature}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
				<div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
					<div className="mx-auto max-w-xs px-8">
						<p className="text-base font-semibold text-gray-600">
							Pay every year, own it for whole year
						</p>
						<p className="mt-6 flex items-baseline justify-center gap-x-2">
							<span className="text-5xl font-bold tracking-tight text-gray-900">
								$
								{userDetails?.type === "creator"
									? yearlyPlan.creatorPrice
									: yearlyPlan.businessPrice}
							</span>
							<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
								USD
							</span>
						</p>
						<button
							onClick={() => {
								handleCheckout("yearly");
							}}
							className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Get access
						</button>
						<p className="mt-6 text-xs leading-5 text-gray-600">
							Invoices and receipts available for easy company
							reimbursement
						</p>
						<ul
							role="list"
							className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600"
						>
							{yearlyPlan.features.map((feature: string) => (
								<li key={feature} className="flex gap-x-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="25px"
										viewBox="0 -960 960 960"
										width="25px"
										fill="#333"
									>
										<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
									</svg>
									{feature}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

const SuccessDisplay = ({ sessionId, planType, token }: any) => {
	const router = useRouter();
	useEffect(() => {
		const updateUserSubscription = async () => {
			const response = await fetch(userRoutes.updateUserSubscription, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					session_id: sessionId,
					plan_type: planType,
				}),
			});

			const { isError, message ,user} = await response.json();

			if (isError) {
				notify(message, "error");
			} else {
				handleSuccessfulUpdate(user)
			}
		};

		if (sessionId && planType && token) {
			updateUserSubscription();
		}
	}, [sessionId]);

	
	const handleSuccessfulUpdate = (user: any) => {
		localStorage.setItem("userInfo", JSON.stringify(user));

		setTimeout(() => {
			router.push("/");
		}, 1000);
	};
	return (
		<div>
			<section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<div className="card max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
				<div className="header p-5">
					<div className="image flex justify-center items-center mx-auto w-20 h-20 bg-green-100 rounded-full animate-pulse">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="w-8 h-8 text-green-600"
						>
							<path
								d="M20 7L9.00004 18L3.99994 13"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</div>
					<div className="content mt-3 text-center">
						<span className="title text-green-700 text-2xl font-semibold">
							Order Confirmed!
						</span>
						<p className="message mt-2 text-gray-600">
							Thank you for your purchase! Your subscription is now
							active and you can enjoy all the benefits of your chosen
							plan.
						</p>
						<p className="message mt-2 text-xs text-gray-600">
							You will receive a confirmation email shortly with the
							details of your subscription.
						</p>
					</div>
					<div className="actions mt-3 space-y-3">
						<button
							className="history w-full py-2 px-4 bg-green-700 text-white font-medium rounded-md shadow-sm"
							type="button"
							onClick={() => {
								notify(
									"You'll redirected after your account has been updated",
									"info"
								)
							}}
						>
							Get started
						</button>
						<button
							className="track w-full py-2 px-4 border border-gray-300 text-gray-800 font-medium rounded-md shadow-sm"
							type="button"
							onClick={() => {
								notify(
									"You'll redirected after your account has been updated",
									"info"
								)
							}}
						>
							Return to home
						</button>
					</div>
				</div>
			</div>

			{/* <form action={`${userRoutes.createPortalSession}`} method="POST">
				<input
					type="hidden"
					id="session-id"
					name="session_id"
					value={sessionId}
				/>
				<button id="checkout-and-portal-button" type="submit">
					Manage your billing information
				</button>
			</form> */}
		</section>
		<ToastContainer />
		</div>
	);
};

const Message = ({ message }: any) => {
	const router = useRouter();
	return (
		<section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<div className="card max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
				<div className="header p-5">
					<div className="image flex justify-center items-center mx-auto w-20 h-20 bg-red-100 rounded-full animate-pulse">

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-8 h-8 text-red-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</div>
					<div className="content mt-3 text-center">
						<span className="title text-green-700 text-2xl font-semibold">
							Order Canceled!
						</span>
						<p className="message mt-2 text-gray-600">
							{`We're sorry to see you go!  Your order has been canceled and no charges have been made.`}
						</p>
						<p className="message mt-2 text-xs text-gray-600">
							{`If you have any questions or need assistance, please contact our support team. We are here to help.`}
						</p>
					</div>
					<div className="actions mt-3 space-y-3">
						<button
							className="history w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md shadow-sm"
							type="button"
							onClick={() => {
								router.push("/");
							}}
						>
							Cancel
						</button>
						<button
							className="track w-full py-2 px-4 bg-green-700 border border-gray-300 text-gray-800 font-medium rounded-md shadow-sm"
							type="button"
							onClick={() => {
								router.push("/plan/?try_again=true");
							}}
						>
							Try again
						</button>
					</div>
				</div>
			</div>

			{/* <form action={`${userRoutes.createPortalSession}`} method="POST">
					<input
						type="hidden"
						id="session-id"
						name="session_id"
						value={sessionId}
					/>
					<button id="checkout-and-portal-button" type="submit">
						Manage your billing information
					</button>
				</form> */}
		</section>
	);
};
