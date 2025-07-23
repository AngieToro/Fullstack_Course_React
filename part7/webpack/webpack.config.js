const path = require('path')
const webpack = require('webpack')

const config = ( env, argv ) => {

    console.log('Webpack config - Argv: ', argv)
    
    const backend_url = argv.mode === 'production'
        ? 'https://notes2023.fly.dev/api/notes'
        : 'http://localhost:3001/notes'

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),   //__dirname, variable en Node que almacena la ruta al directorio actual
            filename: 'main.js'
        },
        resolve: {
            extensions: ['.js', '.jsx'] // si luego se usa .jsx
        },
        devServer: {    //El comando npm start iniciará el dev-server en el puerto 3000
            static: {
                directory: path.resolve(__dirname, 'build'),
            },
            compress: true,
            port: 3000,
        },
        devtool: 'source-map',   //permite mapear los errores que ocurren durante la ejecución del bundle a la parte correspondiente en el código fuente original.
        module: {
            rules: [
                {
                test:  /\.(js|jsx)$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}
 
module.exports = config