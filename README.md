# sleepexpert

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Material Design

Use the icon from https://materialdesignicons.com/. Icon have to be added in the src/plugins/vuetify.js file. Before adding nex icon check for existing.
```
export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      yourIcon: 'mdi-iconName',
      //where iconNam = the name found in mdi-library
      },
  },
});
```
To use the added icons: 
```
<v-icon>$vuetify.icons.yourIcon</v-icon>
```
where 'yourIcon' equals the name specified in the src/plugins/vuetify.js file