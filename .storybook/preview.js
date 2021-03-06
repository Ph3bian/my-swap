import light from "!!style-loader?injectType=lazyStyleTag!css-loader!../src/styles/variables.css";
import dark from "!!style-loader?injectType=lazyStyleTag!css-loader!../src/styles/variables.css";
import cssVariablesTheme from "@etchteam/storybook-addon-css-variables-theme";

export const decorators = [cssVariablesTheme];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssVariables: {
    files: {
      light,
      dark,
    },
  },
};
