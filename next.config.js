
module.exports = {
  // reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: `[name].[contenthash].[ext]`,
            outputPath: 'static',//硬盘路径
            publicPath: '_next/static'//网站路径
          }

        },
      ],
    })
    return config
  },
}
