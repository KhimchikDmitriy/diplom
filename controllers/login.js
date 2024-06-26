import logger from "../logger/index.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const submit = (req, res, next) => {
  User.authenticate(req.body.loginForm, (err, data) => {
    //data is user
    if (err) return next(err);
    if (!data) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("Имя или пароль неверны!");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка ввода пароля");
      res.redirect("/");
    }
    if (data) {
      req.session.email = data.email;
      req.session.name = data.name;
      req.session.password = data.password;
      req.session.role = data.role;
      console.log("...");
      console.log("Всё верно!");
      console.log("...");
      logger.info("Заход произведён" + " " + data.name + " " + data.email);

      //jwt
      const token = jwt.sign(
        {
          email: data.email,
        },
        process.env.JWTTOKENSECRET,
        {
          expiresIn: process.env.JWTTOKENTIME,
        }
      );
      console.log("...");
      console.log("токен подготовлен");

      //jwt cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      console.log("...");
      console.log("куки подготовлен");

      res.redirect("/");
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  req.session.destroy((err) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка выхода");
      console.log(err.message);
    }
    return res.redirect("/");
  });
};

export default { submit, logout };
