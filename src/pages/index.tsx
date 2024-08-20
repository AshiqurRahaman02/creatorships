import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";
import NumberInc from "@/components/element/NumberInc";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const [userDetails, setUserDetails] = useState<any | null>(null);

	const router = useRouter();

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		if (userDetails !== null) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);
		}
	}, []);

	return (
		<div className="bg-white">
			<Head>
				<title>Creatorships</title>
			</Head>
			<Nav />
			<HeroSection userDetails={userDetails} router={router} />
			<About />
			<Features />
			<Stats />
			<Testimonials />
			<Blogs />
			<div className="relative isolate overflow-hidden bg-gray-900">
				<Newsletter />
				<hr className="mt-20 h-0.5 border mx-20" />
				<Footer />
				<div
					aria-hidden="true"
					className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
					/>
				</div>
			</div>
		</div>
	);
}

const HeroSection = ({ userDetails, router }: any) => {
	return (
		<div className="relative isolate px-6 pt-14 lg:px-8 -top-20">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-36">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						Join our community of creators and businesses{" "}
						<Link
							href="/application"
							className="font-semibold text-indigo-600"
						>
							<span aria-hidden="true" className="absolute inset-0" />
							take journey to the next level..
							<span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Empower Your Creative Journey
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						{`Unlock exclusive resources, connect with fellow creators, and gain access to tools that will help you grow your audience and monetize your passion. Elevate your creativity with us.`}
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<button
							onClick={() => {
								if (!userDetails) {
									router.push("/login");
								} else {
									router.push("/application");
								}
							}}
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Get started
						</button>
						<button
							onClick={() => {
								router.push("/about");
							}}
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Learn more <span aria-hidden="true">→</span>
						</button>
					</div>
					{/* <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl mt-10">
						{`Don't forget to explore`}
					</h1> */}
					<h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl mt-10">
						{`Looking for `}
					</h1>
					{/* <div className="mt-5 flex items-center justify-center gap-x-6">
						<button
							onClick={() => {
								if (!userDetails) {
									router.push("/login");
								} else {
									router.push("/creator");
								}
							}}
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Creators
						</button>
						<button
							onClick={() => {
								if (!userDetails) {
									router.push("/login");
								} else {
									router.push("/business");
								}
							}}
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Businesses
						</button>
					</div> */}
					<div className="mt-5 flex items-center justify-center gap-x-6">
						<div
							onClick={() => {
								if (!userDetails) {
									router.push("/login");
								} else {
									router.push("/creator");
								}
							}}
							className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
						>
							<div className="relative group">
								<Image
									src="/assets/creator-img.png"
									alt="creatorships-logo"
									width={100}
									height={100}
									className="p-1 rounded-full"
									priority
									title="Creatorships Logo"
								/>
								<span
									className="absolute inset-0 flex justify-center items-center invisible group-hover:visible rounded-full"
									style={{ backgroundColor: "rgba(244,244,244,0.5)" }}
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
							</div>
							<p className="text-xl">Creators</p>
						</div>
						<div
							onClick={() => {
								if (!userDetails) {
									router.push("/login");
								} else {
									router.push("/business");
								}
							}}
							className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
						>
							<div className="relative group">
								<Image
									src="/assets/business-img.png"
									alt="creatorships-logo"
									width={100}
									height={100}
									className="p-1 rounded-full"
									priority
									title="Creatorships Logo"
								/>
								<span
									className="absolute inset-0 flex justify-center items-center invisible group-hover:visible rounded-full"
									style={{ backgroundColor: "rgba(244,244,244,0.5)" }}
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
							</div>

							<p className="text-xl">Businesses</p>
						</div>
					</div>
				</div>
			</div>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				/>
			</div>
		</div>
	);
};

const links = [
	{ name: "Open roles", href: "#" },
	{ name: "Internship program", href: "#" },
	{ name: "Our values", href: "#" },
	{ name: "Meet our leadership", href: "#" },
];
const aboutStats = [
	{ name: "Offices worldwide", value: "12" },
	{ name: "Full-time colleagues", value: "300+" },
	{ name: "Hours per week", value: "30" },
	{ name: "Paid time off", value: "Unlimited" },
];

const About = () => {
	return (
		<div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
			<Image
				alt=""
				src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
				className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
				width={1920}
				height={1080}
				priority
				title="Chat"
			/>
			<div
				aria-hidden="true"
				className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
				/>
			</div>
			<div
				aria-hidden="true"
				className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
				/>
			</div>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
						Work with us
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-300">
					Creatorships is a platform dedicated to empowering creators by connecting them with opportunities and like-minded individuals. Designed to simplify the creative process, our user-friendly interface allows creators to showcase their skills, collaborate on projects, and grow their personal brand. Whether you’re a seasoned professional or just starting out, Creatorships offers the tools and support you need to thrive in the digital world. Join us and be part of a vibrant community where creativity meets opportunity.
					</p>
				</div>
				<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
					<div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
						{links.map((link) => (
							<a key={link.name} href={link.href}>
								{link.name} <span aria-hidden="true">&rarr;</span>
							</a>
						))}
					</div>
					<dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
						{aboutStats.map((stat) => (
							<div key={stat.name} className="flex flex-col-reverse">
								<dt className="text-base leading-7 text-gray-300">
									{stat.name}
								</dt>
								<dd className="text-2xl font-bold leading-9 tracking-tight text-white">
									{stat.value}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

const features = [
	{
		name: "Instant Publishing",
		description:
			"Easily publish your content with one click. Share your creativity with the world effortlessly.",
		icon: "/icon/publish.svg",
	},
	{
		name: "Exclusive Content Access",
		description:
			"Provide your audience with exclusive content. Build deeper connections and reward your loyal followers.",
		icon: "/icon/file.svg",
	},
	{
		name: "Streamlined Collaboration",
		description:
			"Collaborate with other creators smoothly. Manage projects and ideas efficiently with our tools.",
		icon: "/icon/collaboration.svg",
	},
	{
		name: "Enhanced Security",
		description:
			"Keep your content and personal information secure. Our advanced security measures protect your creative work.",
		icon: "/icon/encrypted.svg",
	},
];

const Features = () => {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl lg:text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-600">
						Explore faster
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Everything you need to explore your need
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Quis tellus eget adipiscing convallis sit sit eget aliquet
						quis. Suspendisse eget egestas a elementum pulvinar et feugiat
						blandit at. In mi viverra elit nunc.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-900">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
										<Image
											src={feature.icon}
											alt="icon-svg"
											width={40}
											height={24}
											className="p-0 "
											priority
											title="Chat"
										/>
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

function getCurrentDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return Number(`${year}${month}${day}`);
}

const stats = [
	{ id: 1, name: "Transactions every 30 days", value: getCurrentDate() },
	{
		id: 2,
		name: "Assets under holding",
		value: Math.floor(new Date().getTime() / 10),
	},
	{ id: 3, name: "New users annually", value: 35000 },
];

const Stats = () => {
	const [startAnimation, setStartAnimation] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setStartAnimation(true);
				}
			},
			{ threshold: 0.5 } // Trigger when 50% of the component is visible
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		// Cleanup observer on component unmount
		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);
	return (
		<div className="bg-white py-16 sm:py-16">
			<div className="mx-auto max-w-3xl lg:text-center">
				<h2 className="text-base font-semibold leading-7 text-indigo-600">
					Safe Transaction
				</h2>
				<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Trusted by creators and businesses from over 100+ countries
				</p>
				<p className="mt-6 text-lg leading-8 text-gray-600">
					Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
					Suspendisse eget egestas a elementum pulvinar et feugiat blandit
					at. In mi viverra elit nunc.
				</p>
			</div>{" "}
			<div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
				<dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
					{stats.map((stat) => (
						<div
							key={stat.id}
							className="mx-auto flex max-w-xs flex-col gap-y-4 border rounded-md bg-gray-100 w-72 h-52 items-center justify-center"
							style={{ boxShadow: "0px 0px 100px 0px rgba(0,0,0,0.19)" }}
						>
							<dt className="text-base leading-7 text-gray-600">
								{stat.name}
							</dt>
							<dd
								ref={ref}
								className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
							>
								{stat.id === 2 && `$`}{" "}
								<NumberInc
									number={stat.value}
									speed={20}
									startAnimation={startAnimation}
								/>
								{"+"}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
	);
};

const Newsletter = () => {
	return (
		<div className="pt-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
					<div className="max-w-xl lg:max-w-lg">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Subscribe to our newsletter.
						</h2>
						<p className="mt-4 text-lg leading-8 text-gray-300">
							Nostrud amet eu ullamco nisi aute in ad minim nostrud
							adipisicing velit quis. Duis tempor incididunt dolore.
						</p>
						<div className="mt-6 flex max-w-md gap-x-4">
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								required
								placeholder="Enter your email"
								autoComplete="email"
								className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
							/>
							<button
								type="submit"
								className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								Subscribe
							</button>
						</div>
					</div>
					<dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
						<div className="flex flex-col items-start">
							<div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="#e8eaed"
								>
									<path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
								</svg>
							</div>
							<dt className="mt-4 font-semibold text-white">
								Weekly articles
							</dt>
							<dd className="mt-2 leading-7 text-gray-400">
								Non laboris consequat cupidatat laborum magna. Eiusmod
								non irure cupidatat duis commodo amet.
							</dd>
						</div>
						<div className="flex flex-col items-start">
							<div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="#e8eaed"
								>
									<path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z" />
								</svg>
							</div>
							<dt className="mt-4 font-semibold text-white">No spam</dt>
							<dd className="mt-2 leading-7 text-gray-400">
								Officia excepteur ullamco ut sint duis proident non
								adipisicing. Voluptate incididunt anim.
							</dd>
						</div>
					</dl>
				</div>
			</div>
			{/* <div
				aria-hidden="true"
				className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
				/>
			</div> */}
		</div>
	);
};

const testimonials = [
	{
		name: "Kenzie Edgar",
		imgSrc: "https://i.pravatar.cc/100?img=1",
		quote: "Creatorships has completely transformed my content creation process. The tools are intuitive and the support is top-notch. I can't imagine creating without it now!",
	},
	{
		name: "Stevie Tifft",
		imgSrc: "https://i.pravatar.cc/100?img=2",
		quote: "Thanks to Creatorships, I've been able to grow my audience and monetize my content effectively. The platform is a game-changer for creators!",
	},
	{
		name: "Tommie Ewart",
		imgSrc: "https://i.pravatar.cc/100?img=3",
		quote: "Creatorships offers everything I need in one place. From content management to audience engagement, it's a comprehensive solution that has boosted my productivity.",
	},
	{
		name: "Charlie Howse",
		imgSrc: "https://i.pravatar.cc/100?img=4",
		quote: "The community and resources available on Creatorships are unmatched. It's not just a platform, it's a supportive ecosystem for creators.",
	},
	{
		name: "Nevada Herbertson",
		imgSrc: "https://i.pravatar.cc/100?img=5",
		quote: "I love how Creatorships simplifies the technical aspects of content creation, allowing me to focus on what I do best—creating. Highly recommended!",
	},
	{
		name: "Kris Stanton",
		imgSrc: "https://i.pravatar.cc/100?img=6",
		quote: "Since joining Creatorships, I've seen a significant increase in my engagement and revenue. It's an essential tool for any serious content creator.",
	},
];

const Testimonials = () => {
	return (
		<div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
			<div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
				<div className="w-full max-w-6xl mx-auto">
					<div className="text-center max-w-xl mx-auto">
						<h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
							What people are saying.
						</h1>
						<h3 className="text-xl mb-5 font-light">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</h3>
						<div className="text-center mb-10">
							<span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
							<span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
							<span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
							<span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
							<span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
						</div>
					</div>
					<div className="-mx-3 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full">
						{testimonials.map((testimonial, index) => (
							<div className="px-3" key={index}>
								<div className=" mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
									<div className="w-full flex mb-4 items-center">
										<div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
											<Image
												src={testimonial.imgSrc}
												alt={testimonial.name}
												width={100}
												height={100}
											/>
										</div>
										<div className="flex-grow pl-3">
											<h6 className="font-bold text-sm uppercase text-gray-600">
												{testimonial.name}
											</h6>
										</div>
									</div>
									<div className="w-full">
										<p className="text-sm leading-tight">
											<span className="text-lg leading-none italic font-bold text-gray-400 mr-1">{`"`}</span>
											{testimonial.quote}
											<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">{`"`}</span>
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const blogs = [
	{
		id: 1,
		title: "Maximize Your Audience Engagement",
		href: "#",
		description:
			"Discover the best strategies to keep your audience engaged and coming back for more. Learn how to create compelling content that resonates with your followers.",
		date: "Jul 20, 2024",
		datetime: "2024-07-20",
		imageUrl:
			"https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
		category: { title: "Content Creation", href: "#" },
		author: {
			name: "Alex Johnson",
			role: "Content Strategist",
			href: "#",
			imageUrl:
				"https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	{
		id: 2,
		title: "Monetizing Your Content: A Comprehensive Guide",
		href: "#",
		description:
			"Explore various ways to monetize your content effectively. From sponsorships to ad revenue, this guide covers everything you need to know to start earning from your creations.",
		date: "Jul 15, 2024",
		datetime: "2024-07-15",
		imageUrl:
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
		category: { title: "Monetization", href: "#" },
		author: {
			name: "Emily Carter",
			role: "Financial Advisor",
			href: "#",
			imageUrl:
				"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	{
		id: 3,
		title: "Building Your Personal Brand as a Creator",
		href: "#",
		description:
			"Learn how to build a strong personal brand that sets you apart from the competition. This blog covers tips on consistency, authenticity, and leveraging social media.",
		date: "Jul 10, 2024",
		datetime: "2024-07-10",
		imageUrl:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
		category: { title: "Branding", href: "#" },
		author: {
			name: "Sophia Brown",
			role: "Brand Consultant",
			href: "#",
			imageUrl:
				"https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
];

const Blogs = () => {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						From the blog
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						Learn how to grow your business with our expert advice.
					</p>
				</div>
				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{blogs.map((blog) => (
						<article
							key={blog.id}
							className="flex max-w-xl flex-col items-start justify-between"
						>
							<Image
								src={blog.imageUrl}
								alt=""
								width={500}
								height={500}
								priority
								className="rounded-lg mb-5"
							/>
							<div className="flex items-center gap-x-4 text-xs">
								<time
									dateTime={blog.datetime}
									className="text-gray-500"
								>
									{blog.date}
								</time>
								<a
									href={blog.category.href}
									className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
								>
									{blog.category.title}
								</a>
							</div>
							<div className="group relative">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<a href={blog.href}>
										<span className="absolute inset-0" />
										{blog.title}
									</a>
								</h3>
								<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
									{blog.description}
								</p>
							</div>
							<div className="relative mt-8 flex items-center gap-x-4">
								<Image
									alt=""
									src={blog.author.imageUrl}
									className="h-10 w-10 rounded-full bg-gray-50"
									width={100}
									height={100}
								/>
								<div className="text-sm leading-6">
									<p className="font-semibold text-gray-900">
										<a href={blog.author.href}>
											<span className="absolute inset-0" />
											{blog.author.name}
										</a>
									</p>
									<p className="text-gray-600">{blog.author.role}</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
};
