const settings = {
    graphql: {
      uri: "http://localhost:300",
    },
    meta: {
      rootUrl: "http://localhost:3000",
      title: "CÔNG TY CỔ PHẦN TẬP ĐOÀN SHESHI",
      description: "The app description goes here.",
      // social: {
      //   graphic:
      //     "https://cheatcode-assets.s3.amazonaws.com/default-social-graphic.png",
      //   twitter: "@cheatcodetuts",
      // },
    },
    routes: {
      authenticated: {
        pathAfterFailure: "/gioi-thieu",
      },
      public: {
        pathAfterFailure: "/",
      },
    },
  };
  
  export default settings;