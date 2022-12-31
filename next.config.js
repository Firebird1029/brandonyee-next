/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		scrollRestoration: true,
	},
	async redirects() {
		return [
			{
				source: "/project",
				destination: "/projects",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
