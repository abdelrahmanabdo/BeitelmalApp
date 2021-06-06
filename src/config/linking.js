const config = {
  screens: {
    Home: 'home',
    Reports: {
      path: 'reports'
    },
    Recommendations: 'recommendations',
    Analysis: 'analysis',
    Packages: 'packages',
  },
};

const linking = {
  prefixes: ['beitelmal://'],
  config,
};

export default linking;