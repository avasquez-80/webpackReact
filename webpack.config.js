const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //va a las reglas y plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //para extraer el css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //para minificar el css
const TerserPlugin = require('terser-webpack-plugin'); //para minificar el js
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //para limpiar la carpeta dist

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //para optimizar el codigo
        publicPath: '/',
    },
    resolve:{
        extensions:['.js','.jsx'],
        //para optimizar el codigo indicar carpetas
        alias:{
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
        }
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                }
            },
            {       //Se crea la regla para trabajar con html-webpack-plugin
                test:/\.html$/,
                use:{   //Se crea un objeto con el loader que se va a usar
                    loader:'html-loader'
                }
            },
            {
                test: /\.s[ac]ss$/, //para sass y css
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({ //Se crea una instancia del plugin para trabajar con html-webpack-plugin y enviarlo a la carpeta de distribucion
            template: './public/index.html',    //Se indica el archivo que se va a usar
            filename: './index.html'    //Se indica el nombre del archivo que se va a generar
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        //para optimizar el codigo
        new CleanWebpackPlugin(),
    ],
    //para optimizar el codigo
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
    }
}