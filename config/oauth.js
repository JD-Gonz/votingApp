'use strict';

module.exports = {
  facebookAuth: {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
    enableProof: false
  },
  
  twitterAuth: {
    consumerKey: process.env.TWRT_CONSUMER_KEY,
    consumerSecret: process.env.TWRT_CONSUMER_SECRET,
    callbackURL: process.env.TWRT_CALLBACK_URL,
    enableProof: false
  }
};