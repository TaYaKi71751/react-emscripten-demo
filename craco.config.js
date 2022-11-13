// craco.config.js
module.exports = {
  webpack: {
			alias:{
//      'fs': 'browserfs/dist/shims/fs.js',
//      'buffer': 'browserfs/dist/shims/buffer.js',
//      'path': 'browserfs/dist/shims/path.js',
//      'processGlobal': 'browserfs/dist/shims/process.js',
//      'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
//      'bfsGlobal': require.resolve('browserfs')
			},
    configure: {
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
										'@testing/string-number': require.resolve("@testing/string-number")
        },
      },
    },
  },
};
