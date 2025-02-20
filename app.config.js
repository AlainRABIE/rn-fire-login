
export default {
  expo: {
    name: "YourAppName",
    slug: "your-app-slug",
    extra: {
      firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.REACT_APP_FIREBASE_APP_ID,
    },
  },
};