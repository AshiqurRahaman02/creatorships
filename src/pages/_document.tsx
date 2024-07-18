// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* Add meta tags, external stylesheets, or other head elements */}
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
