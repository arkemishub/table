const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@arkejs/table"],
  output: "standalone",
};

module.exports = withContentlayer(nextConfig);
