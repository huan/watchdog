import json from 'rollup-plugin-json'

export default {
  input: 'dist/watchdog.js',
  output: {
    file: 'bundles/watchdog.es6.umd.js',
    sourceMap: true,
    format: 'umd',
    name: 'window',
    banner: '/* watchdog version ' + require('./package.json').version + ' */',
    footer: '/* https://github.com/huan */',
  },
  plugins: [
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      // include: 'node_modules/**',  // Default: undefined
      // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      preferConst: true, // Default: false
    })
  ]
}
