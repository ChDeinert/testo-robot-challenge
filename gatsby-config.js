module.exports = {
  pathPrefix: '/testo-robot-challenge',
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    }
  ],
};
