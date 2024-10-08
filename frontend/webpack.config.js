module.exports = {
    // change to .tsx if necessary
    entry: './src/index.ts',
    output: {
      filename: './bundle.js'
    },
    resolve: {
      // changed from extensions: [".js", ".jsx"]
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
        { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },  
        // addition - add source-map support
        { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
        // search for css files and include them using css-loader
        { test: /\.css$/i, use: { loader: 'css-loader' }, options: {url: false} },
      ]
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
    },
    // addition - add source-map support
    devtool: "source-map",
    mode: 'development',
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }, 
    ]
  }