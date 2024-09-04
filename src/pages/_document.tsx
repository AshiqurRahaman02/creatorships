// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* <-- SEO Meta Tags --> */}
					<meta
						name="description"
						content="Discover the perfect creators to elevate your brand. Creatorships connects businesses with talented creators for impactful and authentic promotions."
					/>
					<meta
						name="keywords"
						content="creators, business promotion, brand elevation, content creation, social media influencers, marketing campaigns, Creatorships"
					/>
					<meta
						property="og:title"
						content="Creatorships - Connect with Talented Creators"
					/>
					<meta
						property="og:description"
						content="Creatorships is your go-to platform for finding the perfect creators to boost your brand. Join now to collaborate with influencers who align with your brand values."
					/>

					<meta
						property="og:image"
						content="./assets/images/creatorships-logo.png"
					/>
					<meta
						property="og:url"
						content="https://creator-ships.vercel.app/"
					/>
					<meta name="twitter:card" content="summary_large_image" />

					{/* <-- Favicon --> */}
					<link
						rel="shortcut icon"
						href="./assets/images/creatorships-logo.png"
						type="image/x-icon"
					/>
					<link rel="icon" href="/assets/images/creatorships-logo.png" />

					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
						rel="stylesheet"
					/>

					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
					/>
					{/* <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')</style> */}
				</Head>
				<body>
					<div>
						<Main />
						<NextScript />
					</div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
