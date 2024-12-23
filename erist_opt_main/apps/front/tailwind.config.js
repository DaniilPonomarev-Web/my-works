const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      margin: {
        '-50%': '-50%',
      },
    },
    boxShadow: {
      '8xl': '0px 300px 700px 0px rgba(0, 0, 0, 0.9)',
    },
    minWidth: {
      '900': '900px',
    }
  },
  plugins: [],
};
