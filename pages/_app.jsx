import Script from "next/script";
import "../styles/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { usePanelbear } from "@panelbear/panelbear-nextjs";
import { usePostHog } from "next-use-posthog";

export default function App({ Component, pageProps }) {
	usePanelbear("2Y0pviSsHaz", {
		debug: process.env.NODE_ENV === "development",
	});
	usePostHog("phc_m8AmC7317Ja3SqbvvFbbbcw8Uq3s744Qb3TwUCg5Pq1", {
		api_host: "https://app.posthog.com",
		loaded: (posthog) => {
			if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
		},
	});

	return (
		<>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-Y63DPXQ189"
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					
					gtag('config', 'G-Y63DPXQ189');
				`}
			</Script>
			<Component {...pageProps} />
		</>
	);
}
