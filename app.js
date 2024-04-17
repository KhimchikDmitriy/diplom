import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import myRoutes from "./routers/index_routers.js";
import session from "express-session";
import user_session from "./middleware/user_session.js";
import messages from "./middleware/messages.js";
import logger from "./logger/index.js";
// import morgan from "morgan";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import passport from "passport";
// import passportFunction from "./middleware/passport.js";
import passportFunctionYandex from "./middleware/passport_yandex.js";
import passportFunctionGoogle from "./middleware/passport_goo.js";
import passportFunctionVK from "./middleware/passport_vk.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;
const currentTime = new Date().toLocaleString();

app.set("view engine", "ejs");
app.set("\views", __dirname + "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(
  "/bootstrap.css",
  express.static(
    join(__dirname, "public/css/bootstrap-5.3.2/dist/css/bootstrap.css")
  )
);
app.use("publics", express.static(join(__dirname, "public/")));
app.use(
  "/bootstrap.js",
  express.static(
    join(__dirname, "public/css/bootstrap-5.3.2/dist/js/bootstrap.js")
  )
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(morgan("tiny"));

app.use(favicon(join(__dirname, "/public/img/ico.jpg")));
app.use(messages);
app.use(user_session);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportFunctionVK(passport);
passportFunctionYandex(passport);
passportFunctionGoogle(passport);
app.use(myRoutes);

app.listen(port, () => {
  console.log("...");
  console.log("проверка console.log пройдена");
  console.log("...");
  console.log("начинается логгирование");
  console.log("...");
  addline("server started");
  console.log("логгирование завершено");
  console.log("...");
  console.log("в данный момент используется версия " + app.get("env"));
  console.log("...");
  logger.info("Запуск сервера");
});

function addline(line) {
  line = line + " timestamp: " + currentTime + "\n";
  fs.appendFile(__dirname + "/logger/logger.txt", line, (err) => {
    if (err) return console.log(err);
  });
}

// error handler
app.use((req, res, next) => {
  const err = new Error("какая-то непонятная ошибка");
  err.status = 404;
  next(err);
});

//production error handler
app.get("env") == "production";
console.log("переход на " + app.get("env"));

if (app.get("env") != "development") {
  app.use((err, req, res, next) => {
    res.render("error.ejs", { error: err.message, status: err.status });
    logger.error(err.message);
  });
} else {
  app.use((err, req, res, next) => {
    res.status = 404;
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка " + res.status);
    console.log("! ! !");
    console.log(app.get);
    console.log("! ! !");
    console.log(err.message);
    console.log("! ! !");
    logger.error(err.message);
    res.end("Omnissia not satisfied!");
  });
}
