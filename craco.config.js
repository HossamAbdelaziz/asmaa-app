module.exports = {
    webpack: {
        resolve: {
            fallback: {
                "path": require.resolve("path-browserify"),
                "fs": false, // fs is not needed in frontend
            },
        },
    },
};
