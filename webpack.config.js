console.log("すごーい！君はwebpackできるフレンズなんだね！");
module.exports = {
    entry: {
        "hoge": "./client/hoge.ts",
    },
    output: {
        filename: '../public/javascripts/[name].js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}