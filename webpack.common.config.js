import path from 'path';

const __dirname = import.meta.dirname;

export default {
    // mode: "development",
    entry: {
        zeroCss: {
            import: "./main.js",
            filename: 'zeroCss.[contenthash].js'
        },
        
    },
    output: {
        // filename: 'zeroCss.js', -- optional if entry object is used
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
}