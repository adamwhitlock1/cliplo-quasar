![Cliplo Application Cover](https://github.com/adamwhitlock1/cliplo-quasar/blob/master/docs/images/cliplo-cover.png)

# cliplo

A modern clipboard manager that is built for developer productivity. Access your clipboard history at any time. Share code snippets instantly on carbon.now.sh, and see where clipboard entries come from.

*currently in active development - future releases may introduce breaking changes*

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m electron
```

> Cliplo has been tested in general on MacOS, but has not yet been tested as working on Linux or Windows Operating Systems.
> > This application also requires some elevated access rights on macOS, so be sure to check the required areas within Security & Privacy settings. *Without the correct access rights, this application may not behave as expected.*

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
