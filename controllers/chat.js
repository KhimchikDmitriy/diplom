import logger from "../logger/index.js";
import Entry from "../models/entry.js";

const list = (req, res, next) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    res.render("chat", {
      title: "chat",
      name: req.session.name,
      email: req.session.email,
      role: req.session.role,
      entries: entries,
    });
    console.log("...");
    console.log("заход на /chat");
    console.log("...");
    logger.info("Заход на страницу chat");
  });
};

const form = (req, res, next) => {
  res.render("chat", { title: "Post" });
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
    res.redirect("/chat");
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
