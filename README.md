# react-typescript-quickstart

This is a template TypeScript React project with my preferred project structure and configs. It's a good place to start for developers who are new to React and would like to enforce good code style and project structure. The template was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run-script build`

Builds the app for production to the `build` folder.<br />

## Configuration

Open [`workspace.code-workspace`](.vscode/workspace.code-workspace) in VSCode to take advantage of the built-in configurations of this template, including ESLint configs, Prettier configs, and VSCode settings. You may rename the workspace to whatever you wish. It is highly recommended that you install all of the recommended VSCode extensions listed in [`extensions.json`](.vscode/extensions.json). If you are missing any of the recommended extensions, VSCode will prompt you to install them.

## Project Structure

The [`src`](src) directory contains three subdirectories: [`assets`](src/assets), [`components`](src/components), and [`styles`](src/styles). Additional subdirectories, such as `services` and `utilities` may be added as needed. [Barrelling](https://basarat.gitbook.io/typescript/main-1/barrel) is highly recommended to simplify imports as the project gets larger. If you have [export-typescript](https://marketplace.visualstudio.com/items?itemName=mscolnick.export-typescript) installed, you can run "Export typescript - all declarations (as star)" within an `index.ts` file to automatically add `export * from ./<FILE_OR_FOLDER>` for each sibling file/folder in the current directory.

## React Recommendations

It is recommended that you use [functional components](https://reactjs.org/docs/components-and-props.html) over class components to utilize the [React Hooks](https://reactjs.org/docs/hooks-intro.html) API.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
