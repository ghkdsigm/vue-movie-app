// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
    resolve:{
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'src/assets')
        }
    },
    
    //파일을 읽어들이기 시작하는 진입점 설정
    entry:'./src/main.js',

    //결과물(번들)을 반환하는 설정
    output:{
        // path: path.resolve(__dirname, 'dist'), 
        // filename:'main.js',
        clean:true
    },

    module:{
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test:/\.s?css$/, //정규식 뜻 : .scss라는 확장자 만약없다면 css를 가지고있는 모든 css 파일같은경우에는 test라는 속성으로 매칭해서 사용하겠다
                use:[
                    'vue-style-loader',
                    //'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader:'sass-loader',
                        options:{
                            additionalData: '@import "~/scss/main";'
                        }
                    }

                ]
            },
            {
                test:/\.js$/,
                exclude: /node_modules/, //제외할 경로
                use: [
                    'babel-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|gif|webp)$/,
                use:'file-loader'
            }
        ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins:[
        new HtmlPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from:'static' }
            ]
        }),
        new VueLoaderPlugin()
    ],

    devServer: {
        host: 'localhost'
    }
}