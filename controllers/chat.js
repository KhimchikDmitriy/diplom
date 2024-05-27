import logger from "../logger/index.js";
import Entry from "../models/entry.js";
import connection from "../models/sql.js";

const list = (req, res, next) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    res.render("chat", {
      title: "чат",
      name: req.session.name,
      email: req.session.email,
      role: req.session.role,
      select: req.session.select,
      entries: entries,
    });

    let nameInTable;

    if (req.session.name) {
      nameInTable = req.session.name;
    } else {
      nameInTable =
        req.session.passport.user.name.familyName +
        " " +
        req.session.passport.user.name.givenName;
    }

    function findByName(nameInTable, cb) {
      const sql = "SELECT * FROM chat WHERE name = ?";
      connection.query(sql, [nameInTable], (err, rows) => {
        if (err) {
          console.log("! ! !");
          console.log("! ! !");
          console.log("! ! !");
          console.log("ошибка ");
          console.log("! ! !");
          console.log("! ! !");
          logger.error("Error");
          console.log(err.message);
          cb(err, null);
        } else {
          cb(null, rows[0]);
        }
      });
    }
    findByName(nameInTable, (err, name) => {
      if (err) return next(err);
      if (!name) {
        let query = "INSERT INTO chat (name) VALUES (?)";
        connection.query(query, [nameInTable], function (err, results, fields) {
          if (err) {
            console.log(err.message);
            res.redirect("/");
            console.log("! ! !");
            console.log("! ! !");
            console.log("! ! !");
            console.log("ошибка ");
            console.log("! ! !");
            console.log("! ! !");
            logger.error("Ошибка захода в чат");
          }
        });
      }
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
