module.exports = {
  content: [
    './app/**/*.{hbs,html}', // Include all Handlebars and HTML files inside the `app` folder
    './app/components/**/*.{hbs,html}', // Include Handlebars and HTML files in the `components` folder
    './app/templates/**/*.{hbs,html}', // Include Handlebars and HTML files in the `templates` folder
    './app/styles/**/*.{css,scss}', // Optionally, if you have styles in `app/styles` (CSS/SCSS files)
    './app/**/*.{js,ts}', // Include all JS and TS files in the `app` folder (if you use any JS for class names)
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
