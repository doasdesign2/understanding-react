# Mini React

## How to Install

### Before all
You can use npm or Yarn, as you wish.

To install Yarn run in your terminal:

```cmd
npm i -g yarn
```

Then install globally:

```cmd
npm i -g cross-env@5.2.0 identity-obj-proxy@3.0.0 jest@23.3.0 ts-jest@23.0.0 webpack@4.15.1 webpack-cli@3.0.8 webpack-dev-server@3.1.4
```

### Cloning the repository
Go to the folder where you want to install the project and run:

```cmd
git clone https://github.com/doasdesign2/understanding-react.git
```

### Installing

After installing all the global dependencies, at the root folder `/mini-react` run the command `yarn`

### Running the project

Still at the root folder, run `yarn start` to run locally at the http://localhost:8080. The browser will open automatically.

### Building the project

Also at the root folder, run `yarn build` to build the files inside the `/dist` folder.

### Running the tests

At the root folder, run `yarn test` or `yarn test:watch` to keep watching the changes. If you want to run through the Wallaby app, there's also an `wallaby.js` file at the root folder.