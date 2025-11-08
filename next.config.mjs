/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
};

export default withNextIntl(nextConfig);
