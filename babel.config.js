module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "seawave-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
