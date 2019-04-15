import helmet from 'helmet';

export const setCSP = () => helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'self\''],
    styleSrc: ['\'self\''],
    sandbox: ['allow-same-origin', 'allow-scripts'],
  },
  // Reference: https://helmetjs.github.io/docs/csp/
  browserSniff: false,
  disableAndroid: true,
});

export default {
  setCSP,
};
