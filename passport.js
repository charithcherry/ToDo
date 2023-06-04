const passport = require('passport');
const axios = require('axios');
const { response } = require('express');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async function(accessToken, refreshToken, profile, done) {

    // check if user already exists
    let data = {
      "userId": profile.id //profile.id
    };
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.GET_USER,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let fresponse;
    try {
       const response = await axios.request(config);
       fresponse=response.data
       
    } catch (error) {
      console.error('Error checking if user exists:', error);
      done(error);
    }
    if (fresponse.length>0 && fresponse[0].id === profile.id) 
    {
      console.log("user exists")
      done(null, profile);
    }  
    else{
      data={
          "id":profile.id,
          "username":profile.displayName,
          "email":profile.emails[0].value

      }
      config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.ADD_USER,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      fresponse = await axios.request(config)
      console.log(fresponse.data)
      done(null, profile);
    }    
    
    

  }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})