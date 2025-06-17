export default {
  plugins: {
    // Use postcss-import first to process @import directives
    'postcss-import': {},
    // Use Tailwind PostCSS plugin
    '@tailwindcss/postcss': {
      // Explicitly set config path
      config: './apps/web/tailwind.config.js',
    },
    // Add autoprefixer for browser compatibility
    'autoprefixer': {},
    // Add PostCSS Preset Env for additional features
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }
  },
};
