// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				port: "",
				pathname: "/**", // Allow all paths from the hostname
			},
		],
		minimumCacheTTL: 2592000,
	},
};

export default nextConfig;
