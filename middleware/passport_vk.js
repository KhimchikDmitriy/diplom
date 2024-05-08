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
        callbackURL:
          "http://localhost:" + process.env.PORT + "/auth/vkontakte/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          console.log("...");
          console.log("...");
          console.log("...");
          console.log("Полчили профиль от vk");
          console.log("...");
          logger.info("Получили профиль от vk.");
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionVK;
