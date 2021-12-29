module.exports = {
   images: {
      domains: ['res.cloudinary.com'],
   },
   reactStrictMode: true,
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ['@svgr/webpack'],
      });

      return config;
   },
};
