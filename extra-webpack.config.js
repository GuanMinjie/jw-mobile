
module.exports = {
    module: {
      rules: [{
        test: /\.(frag|vert|glsl)$/,
        use: [
          { 
            loader: 'webpack-glsl-loader',
            options: {
              root: '/node_modules/vtk.js/Sources/OpenGL/glsl'
            }  
          }
        ]
      }]
    },
  };