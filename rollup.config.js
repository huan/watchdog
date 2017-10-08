export default {
  entry: 'dist/watchdog.js',
  dest: 'bundles/watchdog.es6.umd.js',
  sourceMap: true,
  format: 'umd',
  moduleName: 'window',
  banner: '/* watchdog version ' + require('./package.json').version + ' */',
  footer: '/* https://github.com/zixia */'
}
