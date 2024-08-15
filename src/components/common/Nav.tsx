import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Search from "../element/Search";

function Nav() {
	const [userDetails, setUserDetails] = useState<any | null>(null);

	const router = useRouter();

	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		if (userDetails !== null) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);
		}
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY) {
				// Scrolling down
				setIsVisible(false);
			} else {
				// Scrolling up
				setIsVisible(true);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<div
			className={`sticky w-full flex justify-between items-center px-1 z-20 transform transition-transform duration-300 ease-in-out ${
				isVisible
					? "top-0 translate-y-0 backdrop-blur-sm shadow-sm"
					: "-top-20 -translate-y-full backdrop-blur-0 shadow-none"
			} bg-white`}
		>
			<div
				className="flex justify-between items-center cursor-pointer"
				onClick={() => router.push("/")}
			>
				<Image
					src="/assets/creatorships-logo.png"
					alt="creatorships-logo"
					width={70}
					height={80}
					className="p-1 "
					priority
					title="Creatorships Logo"
				/>
				<h1 className="text-5xl bebas-neue-regular relative top-1">
					CREATORSHIP
				</h1>
			</div>
			<Search />
			<div className="flex justify-between items-center gap-5">
				<div
					onClick={() => router.push("/chat")}
					className="cursor-pointer"
				>
					<Image
						src="/icon/chat.svg"
						alt="chat-svg"
						width={40}
						height={24}
						className="p-0 "
						priority
						title="Chat"
					/>
				</div>
				<div>
					{userDetails ? (
						<>
							<button
								className="relative px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-yellow-500 to-pink-700 hover:bg-gradient-to-r hover:from-pink-700 hover:to-yellow-500 text-white transition-all ease-out duration-300 rounded-lg cursor-pointer"
								onClick={() => router.push("/account")}
							>
								<span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
								<span className="relative text-xl font-semibold">
									{userDetails?.name[0].toUpperCase() +
										userDetails?.name.slice(1)}
								</span>
							</button>
						</>
					) : (
						<>
							<button
								className="relative px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-yellow-500 to-pink-700 hover:bg-gradient-to-r hover:from-pink-700 hover:to-yellow-500 text-white transition-all ease-out duration-300 rounded-lg cursor-pointer"
								onClick={() => router.push("/login")}
							>
								<span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
								<span className="relative text-xl font-semibold">
									Log in
								</span>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
