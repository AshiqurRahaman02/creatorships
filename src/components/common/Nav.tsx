import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
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
					src="/assets/images/creatorships-logo.png"
					alt="creatorships-logo"
					width={70}
					height={80}
					className="p-1 "
					priority
					title="Creatorships Logo"
				/>
				<h1 className="text-2xl  relative top-1">
					CREATORSHIP
				</h1>
			</div>
			<Search />
			<div className="flex justify-between items-center gap-5">	
				<div>
					{userDetails ? (
						<>
							<Button style={{background:'#2F27FF'}} variant="contained" onClick={() => router.push("/account")}>
								{userDetails?.name[0].toUpperCase() +
										userDetails?.name.slice(1)}
										</Button> 
						</>
					) : (
						<>
				<Button style={{background:'#2F27FF'}} variant="contained">Sign up</Button> &nbsp;
							<Button  variant="outlined" onClick={() => router.push("/login")}>Sign in</Button> 
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
