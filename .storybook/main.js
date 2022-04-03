module.exports = {
  stories: [
    // // src
    // "../stories/App.stories.tsx",
    // src/components
    "../stories/components/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal(config) {
    return config;
  },
};
