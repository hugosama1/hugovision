const path = require('path');
var webpack = require('webpack');

const NpmInstallPlugin = require('npm-install-webpack-plugin');


const PATH = {
    app: path.join(__dirname,'app'),
    build: path.join(__dirname,'build')
};

module.exports =  {
    devServer: {
        contentBase: PATH.build,
        // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
        historyApiFallback: true,
        hot:true,
        inline: true,
        progress: true,
      // Display only errors to reduce the amount of output.
      status: 'errors-only',
            // Parse host and port from env so this is easy to customize.
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT
    },
    // Add resolve.extensions.
    // '' is needed to allow imports without an extension.
    // Note the .'s before extensions as it will fail to match without!!!
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
     plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ],
    devtool: 'eval-source-map',
     // Entry accepts a path or an object of entries.
    entry: {
        app: PATH.app
    },
    output: {
        path: PATH.build,
        filename: 'bundle.js'
    },
    module: {
        //these loaders remove the app need to reload in order to load changes
        loaders: [
            {
                test:/\.css$/,
                loaders: ['style', 'css'],
                // Include accepts either a path or an array of paths.
                include: PATH.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot','babel?cacheDirectory'],
                include: PATH.app
            }
        ]
    }
};