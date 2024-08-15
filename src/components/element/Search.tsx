import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type ActiveTab = "applications" | "creators" | "businesses";

function Search() {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState<string>("");
	const [active, setActive] = useState<ActiveTab>("applications");
	const [placeholder, setPlaceholder] = useState<string>("");

	useEffect(() => {
		let path = router.pathname;

		// Update the active tab based on the current path
		if (path.includes("creator")) {
			setActive("creators");
		} else if (path.includes("business")) {
			setActive("businesses");
		} else {
			setActive("applications");
		}

		if (router.query.searchValue) {
			setSearchValue(router.query.searchValue as string);
		}
	}, [router.pathname, router.query.searchValue]);

	const handelSearch = () => {
		if (active === "applications") {
			router.push(`/application?searchValue=${searchValue}`);
		}
		if (active === "creators") {
			router.push(`/creator?searchValue=${searchValue}`);
		}
		if (active === "businesses") {
			router.push(`/business?searchValue=${searchValue}`);
		}
	};

	useEffect(() => {
		if (active === "applications") {
		  setPlaceholder(
			"Search applications by heading, description, benefits, or user..."
		  );
		}
		if (active === "creators") {
		  setPlaceholder("Search creators by name or description...");
		}
		if (active === "businesses") {
		  setPlaceholder("Search businesses by name, description, or industry...");
		}
	  }, [active]);
	  
	return (
		<div className="bg-white w-2/4 relative">
			<div
				className="inputForm flex items-center gap-1"
				style={{ paddingLeft: 0 }}
			>
				<div
					className="input relative pr-3"
					style={{
						width: "min-content",
						border: "1px solid #ecedec",
						margin: "0",
						borderLeft: "none",
						height: "100%",
					}}
				>
					<select
						name=""
						id="aciveSearch"
						className="input appearance-none p-1 pl-0 pr-3 text-center"
						style={{ width: "min-content" }}
						value={active}
						onChange={(e) => setActive(e.target.value as ActiveTab)}
					>
						<option value="applications">Applications</option>
						<option value="creators">Creators</option>
						<option value="businesses">Businesses</option>
					</select>
					<label
						className="absolute top-3 left-24 ml-1 bg-transparent"
						htmlFor="aciveSearch"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#666"
							className="-rotate-90"
						>
							<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
						</svg>
					</label>
				</div>
				<input
					type="text"
					className="input pl-2"
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handelSearch();
						}
					}}
				/>
				<button
					onClick={handelSearch}
					className="p-1 pl-2 input"
					title="Search"
					style={{
						width: "min-content",
						border: "1px solid #ecedec",
						margin: "0",
						borderRight: "none",
						height: "100%",
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="30px"
						viewBox="0 -960 960 960"
						width="30px"
						fill="#222"
					>
						<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default Search;
