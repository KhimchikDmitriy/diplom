import express from "express";
import favicon from "express-favicon";
import { dirname } from "path";
import { fileURLToPath } from "url";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import chat from "../controllers/chat.js";
import login from "../controllers/login.js";
import posts from "../controllers/posts.js";
import sqlLogic from "../models/sqlLogic.js";
import Entry from "../models/entry.js";
import logger from "../logger/index.js";
import passport from "passport";
import ensureAuthenticated from "../middleware/isAuthenticated.js";
import multer from "multer";
import mail from "../middleware/mail.js";

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

router.post("/table", (req, res) => {
  req.session.select = req.body.select;
  res.redirect("/chat");
});
router.post(
  "/upload/post",
  upload.single("media"),
  ensureAuthenticated,
  posts.addPost
);

router.post(
  "/upload/message",
  upload.single("media"),
  ensureAuthenticated,
  posts.addMessage
);

router.post("/mailSupport", mail.mailFunction);

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.get("/oursWorks", (req, res) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    res.render("oursWorks", {
      title: "Наши работы",
      name: req.session.name,
      email: req.session.email,
      role: req.session.role,
      errorMessage: res.locals.errorMessage,
      entries: entries,
    });
    console.log("...");
    console.log("заход на /ourWorks");
    console.log("...");
    logger.info("Заход на страницу работ");
  });
});

router.get("/chat", chat.list);
router.post("/chat", chat.submit);

router.post("/register", register.submit);

router.post("/login", login.submit);

router.get("/logout", login.logout);

router.get("/posts/delete/:id", sqlLogic.deleted);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res, next) {}
);
router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/" }),
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
    failureRedirect: "/",
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
    failureRedirect: "/",
  })
);

export default router;
