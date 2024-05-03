import express from "express";
import favicon from "express-favicon";
import { dirname } from "path";
import { fileURLToPath } from "url";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import zag from "../controllers/zag.js";
import login from "../controllers/login.js";
import posts from "../controllers/posts.js";
import sqlLogic from "../models/sqlLogic.js";
import logger from "../logger/index.js";
import passport from "passport";
import ensureAuthenticated from "../middleware/isAuthenticated.js";
import multer from "multer";
import mailFunction from "../middleware/mail.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("media"),
  ensureAuthenticated,
  posts.addPost
);

router.post("/mailSupport", mailFunction.mailFunction);

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.get("/entries", entries.form, (req, res) => {
  posts.getPosts((err, posts) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка захода на страницу");
      console.log(err.message);
    } else {
      res.render("main", {
        title: "Главная страница",
        posts: posts,
      });
    }
  });
});
router.post("/entries", entries.submit);

router.get("/chat", zag.list, (req, res) => {
  posts.getPosts((err, posts) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка захода на страницу");
      console.log(err.message);
    } else {
      res.render("main", {
        title: "Главная страница",
        posts: posts,
      });
    }
  });
});
router.post("/chat", zag.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/logout", login.logout);

router.get("/new", ensureAuthenticated, posts.form);
router.post("/new", upload.single("media"), ensureAuthenticated, posts.addPost);

router.get("/posts/edit/:id", sqlLogic.edit);
router.post("/posts/edit/:id", sqlLogic.update);
router.get("/posts/delete/:id", sqlLogic.deleted);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res, next) {}
);
router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    res.redirect("/");
  }
);

router.get("/auth/vkontakte", passport.authenticate("vkontakte"));
router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
