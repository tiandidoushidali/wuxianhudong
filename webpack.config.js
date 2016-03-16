module.exports.getConfig = function(type) {

  var isDev = type === 'development';

  var config = {
    entry: './app/js/index.js',
    output: {
      path: __dirname,
      filename: 'index.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }]
    }
  };

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
}