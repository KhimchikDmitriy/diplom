import connection from "../models/sql.js";
import logger from "../logger/index.js";
import multer from "multer";

const form = (req, res) => {
  res.render("posts/new", {
    title: "Создать пост",
    errorMessage: res.locals.errorMessage,
  });
  console.log("...");
  console.log("заход на /new");
  console.log("...");
  logger.info("заход на страницу создания поста");
};

const sql =
  "CREATE TABLE IF NOT EXISTS messages( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, body TEXT, for VARCHAR(255), media TEXT)";

connection.query(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

const addMessages = (req, res, next) => {
  const { body } = req.body;
  const name = req.session.name
    ? req.session.name
    : req.session.passport.user.displayName;
  const media = req.file.originalname ? req.file.originalname : "  ";

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  if (!body) {
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Все поля должны быть заполнены!");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Не заполнены поля для создания поста");
    res.redirect("back");
    return;
  }

  let query = "INSERT INTO messages (body, media) VALUES (?, ?)";
  connection.query(query, [body, media], function (err, results, fields) {
    if (err) {
      console.log(err.message);
      res.redirect("/new");
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка создания поста");
    } else {
      res.redirect("/");
      console.log("...");
      console.log("успешное создание поста");
      console.log("...");
      logger.info("Пост создан " + name);
    }
  });
};

function getMessages(callback) {
  let query = "SELECT * FROM messages ORDER BY id DESC";
  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Error");
      console.log(err.message);
      callback(err, null);
    } else {
      callback(null, results);
      console.log("...");
      console.log("операция прошла успешно");
      console.log("...");
      logger.info("Успешно!");
    }
  });
}

export default { form, addMessages, getMessages };
