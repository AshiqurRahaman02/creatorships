import React, { useState } from "react";
import Loading from "@/components/common/Loading";
import FormInput from "@/components/element/FormInput";
import notify from "@/components/common/Notify";
import { signIn, signUp } from "@/services/userService";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import GenerateOtpButton from "@/components/element/GenerateOtpButton";
import { handleSendOtp } from "@/services/mailService";

function SignUp() {
	const [type, setType] = useState<"" | "creator" | "business">("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [sentOtp, setSentOtp] = useState(0);
	const [otp, setOtp] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);

	const router = useRouter();

	const handleSignUpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !email || !password) {
			notify("Please enter a valid name, email and password", "warning");
			return;
		}

		if (!emailVerified) {
			notify("Please verify your email first", "warning");
			return;
		}

		setLoading(true);

		try {
			console.log(type)
			const res = await signUp(name, email, password, type);
			if (res.isError) {
				notify(res.message, "warning");
			} else {
				handleSuccessfulSignup(res);
			}
		} catch (error: any) {
			notify(error.message, "error");
		} finally {
			setLoading(false);
		}
	};

	const handleSuccessfulSignup = (res: any) => {
		localStorage.setItem("userInfo", JSON.stringify(res.user));
		localStorage.setItem("token", res.token);

		setTimeout(() => {
			router.push("/plan");
		}, 1000);
	};

	const handleSendEmail = async () => {
		const otp = Math.floor(1000 + Math.random() * 9000);
		setSentOtp(otp);

		console.log("otp: " + otp);

		try {
			if (!email) {
				notify("Please enter a valid email", "warning");
				return;
			}
			const res = await handleSendOtp(email, otp);

			if (res.isError) {
				notify(res.message, "warning");
			} else {
				notify(res.message, "success");
			}
		} catch (error: any) {
			notify(error.message, "error");
		}
	};

	return (
		<div>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg">
				{type ? (
					<form className="form" onSubmit={handleSignUpSubmit}>
						<FormInput
							label={`${type==="creator"? "Personal": "Company"} Name`}
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
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
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
							}
						/>

						<FormInput
							label={`${type==="creator"? "Personal": "Company"} Email`}
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							icon2={
								<>
									{emailVerified && (
										<span className=" p-1 mr-1" title="verify otp">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="25px"
												viewBox="0 -960 960 960"
												width="25px"
												fill="#00ff00"
											>
												<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
											</svg>
										</span>
									)}
								</>
							}
						/>
						<div className="flex justify-between items-center">
							<GenerateOtpButton onClickFunction={handleSendEmail} />
							<FormInput
								label="Otp"
								type="number"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								icon={<></>}
								icon2={
									<span
										className="border p-1 mr-1 cursor-pointer"
										title="verify otp"
										onClick={() => {
											if (sentOtp === +otp) {
												setEmailVerified(true);
											} else {
												notify("Wrong otp", "warning");
											}
										}}
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
									</span>
								}
							/>
						</div>
				<FormInput
					label="Password"
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
					icon2={
						<span
							title={showPassword ? "Hide password" : "Show password"}
							className=" cursor-pointer mr-2"
							onClick={() => setShowPassword((pre) => !pre)}
						>
							{showPassword ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.4"
									stroke="currentColor"
									style={{ width: "24px" }}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.4"
									stroke="currentColor"
									style={{ width: "24px" }}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
							)}
						</span>
					}
				/>

						<div className="flex-row">
							<div>
								<input type="checkbox" />
								<label>Remember me </label>
							</div>
							<span className="span">Forgot password?</span>
						</div>
						<button
							className="button-submit"
							onClick={handleSignUpSubmit}
						>
							Sign Up
						</button>
						<p className="p">
							{"Don't have an account? "}
							<span
								className="span"
								onClick={() => router.push("/login")}
							>
								Sign In
							</span>
						</p>
						<p className="p line">Or With</p>

						<div className="flex-row">
							<button className="btn google">
								<svg
									version="1.1"
									width="20"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 512 512"
									style={{ background: "new 0 0 512 512" }}
									xmlSpace="preserve"
								>
									<path
										style={{ fill: "#FBBB00" }}
										d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
        c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
        C103.821,274.792,107.225,292.797,113.47,309.408z"
									></path>
									<path
										style={{ fill: "#518EF8" }}
										d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
        c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
        c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
									></path>
									<path
										style={{ fill: "#28B446" }}
										d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
        c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
        c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
									></path>
									<path
										style={{ fill: "#F14336" }}
										d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
        c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
        C318.115,0,375.068,22.126,419.404,58.936z"
									></path>
								</svg>
								Google
							</button>
							<button className="btn apple">
								<svg
									version="1.1"
									height="20"
									width="20"
									id="Capa_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 22.773 22.773"
									style={{ background: "new 0 0 22.773 22.773" }}
									xmlSpace="preserve"
								>
									<g>
										<g>
											<path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path>
											<path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path>
										</g>
									</g>
								</svg>
								Apple
							</button>
						</div>
					</form>
				) : (
					<div className="flex flex-col gap-2 form">
						<div
							className="inputForm cursor-pointer hover:border-blue-500 flex gap-4"
							style={{ height: "100px" }}
							onClick={() => setType("creator")}
						>
							<div className="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="60px"
									width="60px"
									viewBox="0 -960 960 960"
									fill="#434343"
								>
									<path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
								</svg>
							</div>
							<div>
								<h1 className="text-2xl font-semibold">
									{"I'm a creator"}
								</h1>{" "}
								<p>{"and looking for company"}</p>
							</div>
						</div>
						<div
							className="inputForm cursor-pointer hover:border-blue-500 flex gap-4"
							style={{ height: "100px" }}
							onClick={() => setType("business")}
						>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="60px"
									width="60px"
									viewBox="0 -960 960 960"
									fill="#434343"
								>
									<path d="M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5t22.23 2.15q-8 17.35-12 35.17-4 17.81-4 37.18v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5 67.5 0 108.75 23.77T960-293v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480-390q-79 0-129.5 23.5T300-305v5ZM149.57-410q-28.57 0-49.07-20.56Q80-451.13 80-480q0-29 20.56-49.5Q121.13-550 150-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T149.57-410Zm660 0q-28.57 0-49.07-20.56Q740-451.13 740-480q0-29 20.56-49.5Q781.13-550 810-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T809.57-410ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm.35-60Q506-540 523-557.35t17-43Q540-626 522.85-643t-42.5-17q-25.35 0-42.85 17.15t-17.5 42.5q0 25.35 17.35 42.85t43 17.5ZM480-300Zm0-300Z" />
								</svg>
							</div>
							<div>
								<h1 className="text-2xl font-semibold">
									{"I'm a business person"}
								</h1>{" "}
								<p>{"and looking for creator"}</p>
							</div>
						</div>
					</div>
				)}
			</div>
			{loading && <Loading />}
			<ToastContainer />
		</div>
	);
}

export default SignUp;
