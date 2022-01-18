const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //va a las reglas y plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //para extraer el css

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve:{
        extensions:['.js','.jsx']
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
        })
    ],
    devServer:{
        static: path.join(__dirname,'dist'),
        compress:true,
        port:3006,
    }
}