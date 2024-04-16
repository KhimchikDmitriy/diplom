import { Strategy as VKStrategy } from "passport-vkontakte";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionVK(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    newUser.id = user.id;
    newUser.email = user.displayName;
    newUser.name = user.displayName;
    newUser.age = user.birthday ? date.now() - user.birthday : 0;
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new VKStrategy(
      {
        clientID: process.env.VK_CLIENT_ID,
        clientSecret: process.env.VK_CLIENT_SECRET,
        callbackURL: "http://localhost:80/auth/vkontakte/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          console.log("...");
          console.log("...");
          console.log("...");
          console.log("Полчили профиль от vk");
          logger.info("Получили профиль от vk.");
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionVK;

// const logger = require("../logs/logger");
// const VKontakteStrategy = require("passport-vkontakte").Strategy;
// require("dotenv").config();

// function passportFunctionVKontakte(passport) {
//   passport.use(
//     new VKontakteStrategy(
//       {
//         clientID: process.env.VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
//         clientSecret: process.env.VKONTAKTE_APP_SECRET,
//         callbackURL: "http://localhost/auth/vkontakte/callback",
//       },
//       function (accessToken, refreshToken, params, profile, doneVK) {
//         process.nextTick(function () {
//           logger.info(`Получили профиль от VK ${profile}`);
//           return doneVK(null, profile);
//         });
//       }
//     )
//   );
// }

// module.exports = passportFunctionVKontakte;
