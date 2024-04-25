import logger from "../logger/index.js";
import Entry from "../models/entry.js";

const form = (req, res, next) => {
  res.render("chat", { title: "Chat" });
};

const submit = (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    Entry.create(entry);
    res.redirect("/");
  } catch (err) {
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    logger.error(err.message);
    return next(err);
  }
};

export default { list, form, submit };
