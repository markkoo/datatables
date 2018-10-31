const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // create index.html
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // split out css 
const webpack = require('webpack');
//  const InlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry: {
        home: './src/home/home.ts',
        // about: './src/about/about.ts',
        // contact: './src/contact/contact.ts',
        //  service: './src/service/service.ts',
        //  app: './src/index.ts',
        // polyfills: './src/polyfills.ts'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/home/template.html',
            inject: false,
            filename: path.resolve(__dirname, 'src/home/index.html'),
            sName: 'home'
        }),
        //  new HtmlWebpackPlugin({
        //      template: './src/about/template.html',
        //      inject: false,
        //      filename: path.resolve(__dirname, 'src/about/index.html'),
        //      sName: 'about'
        //  }),
        //  new HtmlWebpackPlugin({
        //      template: './src/contact/template.html',
        //      inject: false,
        //      filename: path.resolve(__dirname, 'src/contact/index.html'),
        //      sName: 'contact'
        //  }),
        // new InlineSourcePlugin(),
        // new HtmlWebpackPlugin({
        //     template: './src/service/template.html',
        //     inject: false,
        //     chunks: ['service'],
        //     filename: path.resolve(__dirname, 'src/service/index.html')
        // }),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css',
            chunkFilename: '[name][contenthash].css'
        }),
        new webpack.ProvidePlugin({
           jQuery: 'jquery',
           'window.jQuery': 'jquery'            
        })
    ],
    output: {
        publicPath: '/dist',
        // publicPath: '/',
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // vendor
    optimization: {
        //runtimeChunk: true,
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'polyfills' && chunk.name !== 'landingPage';
            },
            minSize: 1,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 2,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                    loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },{
                    loader: 'resolve-url-loader',
                    options: {
                        absolute: true
                    }
                  }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },{
                    loader: 'resolve-url-loader',
                    options: {
                        sourceMap: true
                    }
                  }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader', // base64
                    options: {
                        limit: 8192,
                        fallback: 'file-loader',
                        //outputPath: '/',
                        outputPath: 'images/',
                        publicPath: '/dist/images/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader', 
                    options: {
                        //outputPath: '/',
                        publicPath: '/dist/'
                    }
                }]
            }
        ]
    }
};