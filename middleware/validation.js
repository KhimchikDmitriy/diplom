import logger from "../logger/index.js";

const validatePassword = (req, res, next) => {
  const password = req.body.password;
  let errorMessage = [];

  if (password.length < 8) {
    errorMessage.push("Пароль должен содержать не менее 8 символов. ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Пароль должен содержать не менее 8 символов.");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Ошибка пароля - менее 8 символов");
  }

  if (/[а-яА-ЯЁё]/.test(password)) {
    errorMessage.push("Пароль не должен содержать кириллицу.");
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Пароль не должен содержать кириллицу.");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Ошибка пароля - использована кириллица");
  }

  if (errorMessage !== "") {
    res.locals.errorMessage = errorMessage;
  }
  next();
};

export default validatePassword;
