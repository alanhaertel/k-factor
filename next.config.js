// /** @type {import('next').NextConfig} */


module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node$/,
        use: [
          {
            loader: "nextjs-node-loader",
          },
        ],
      });
      return config;
    },
  };
