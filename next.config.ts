import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(self)",
	},
	...(isProd
		? [
				{
					key: "Strict-Transport-Security",
					value: "max-age=63072000; includeSubDomains; preload",
				},
			]
		: []),
];

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	// async headers() {
	// 	return [
	// 		{
	// 			source: "/:path*",
	// 			headers: securityHeaders,
	// 		},
	// 	];
	// },
	reactCompiler: true,
	typedRoutes: true,
	experimental: {
		// Enable filesystem caching for `next dev`
		turbopackFileSystemCacheForDev: true,
		// Enable filesystem caching for `next build`
		turbopackFileSystemCacheForBuild: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
