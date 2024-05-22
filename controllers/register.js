import User from "../models/user.js";
import validatePassword from "../middleware/validation.js";
import validator from "validator";
import logger from "../logger/index.js";
import jwt from "jsonwebtoken";

const submit = [
  validatePassword,
  (req, res, next) => {
    const email = req.body.email;
    if (
      !validator.isEmail(email) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      res.locals.errorMessage.push("Проверьте правильность написания email.");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Неправильно записан email");
      res.redirect("/");
    }

    if (res.locals.errorMessage && res.locals.errorMessage.length > 0) {
      res.redirect("/");
    }

    User.findByEmail(email, (err, user) => {
      if (err) return next(err);
      if (!user) {
        User.create(req.body, (err) => {
          if (err) return next(err);
          console.log("...");
          console.log("произведена регестрация");
          console.log("...");
          logger.info("произведена регестрация");

          //jwt
          const token = jwt.sign(
            {
              email: req.body.email,
            },
            process.env.JWTTOKENSECRET,
            {
              expiresIn: process.env.JWTTOKENTIME,
            }
          );
          console.log("...");
          console.log("токен подготовлен");
        });
        User.authenticate(req.body, (err, data) => {
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
            logger.info(
              "Заход произведён" + " " + data.name + " " + data.email
            );

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
      } else {
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        res.locals.errorMessage.push("Такой пользователь уже существует!");
        console.log("Такой пользователь уже существует");
        console.log("...");
        logger.error("Такой пользователь уже существует");
      }
    });
  },
];

export default { submit };
