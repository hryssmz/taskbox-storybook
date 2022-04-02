module.exports = {
  "{src,tests}/**/*.{js,jsx,ts,tsx}": [
    "eslint --max-warnings=0",
    "prettier --check",
  ],
  "*.{md,html,css,yml}": ["prettier --check"],
};
