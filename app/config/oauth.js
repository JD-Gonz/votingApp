'use strict';

module.exports = {
  'facebookAuth': {
    'clientID': process.env.FB_CLIENT_ID,
   'clientSecret': process.env.FB_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/facebook/callback',
    'enableProof': false
  },
  
  'twitterAuth': {
    'consumerKey': process.env.TWRT_CONSUMER_KEY,
    'consumerSecret': process.env.TWRT_CONSUMER_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/twitter/callback',
    'enableProof': false
  }
};