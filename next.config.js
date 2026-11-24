/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Load all .md files as raw strings (asset/source = the file content as a JS string)
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
