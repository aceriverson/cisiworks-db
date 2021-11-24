## Cisiworks-DB
This is a WIP sqlite database viewer built on top of Electron using Svelte as the frontend framework.
Additionally, this project uses a modified copy of ion.css to emulate a native MacOS folder look and feel.

![Example screen shot](https://github.com/aceriverson/cisiworks-db/img/scrns.png?raw=true.png)

## Getting Started

1. Clone this repository

2. Run `npm install`

3. Run `npm start`


### Notes
Running `npm start` will build the Svelte app and then tell Electron to start the application using `main.js` as its entry point.

Running `npm run package` will use the **electron-packager** npm package to build the electron app for your current platform. You can read more about it and how to configure it [here](https://github.com/electron/electron-packager).
