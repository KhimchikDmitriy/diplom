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
  "CREATE TABLE IF NOT EXISTS posts ( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body TEXT, author VARCHAR(255) DEFAULT 'user', media TEXT, whom  VARCHAR(255))";

connection.query(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

const addPost = (req, res, next) => {
  const { body } = req.body;
  const author = req.session.name
    ? req.session.name
    : req.session.passport.user.displayName;
  const media = req.file ? req.file.originalname : "";
  let title = "post";

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
    res.redirect("/");
    return;
  }

  let query =
    "INSERT INTO posts (title, body, author, media) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [title, body, author, media],
    function (err, results, fields) {
      if (err) {
        console.log(err.message);
        res.redirect("/");
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
        logger.info("Пост создан " + author);
      }
    }
  );
};

const addMessage = (req, res, next) => {
  const { body } = req.body;
  const author = req.session.name
    ? req.session.name
    : req.session.passport.user.name.familyName +
      " " +
      req.session.passport.user.name.givenName;
  const media = req.file ? req.file.originalname : "";
  const select = req.session.select;
  let title = "message";
  let whom;

  if (req.session.role === "admin") {
    whom = select;
  } else {
    whom = author;
  }

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
    res.redirect("/chat");
    return;
  }

  let query =
    "INSERT INTO posts (title, body, author, media, whom) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [title, body, author, media, whom],
    function (err, results, fields) {
      if (err) {
        console.log(err.message);
        res.redirect("/chat");
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        logger.error("Ошибка создания сообщения");
      } else {
        res.redirect("/chat");
        console.log("...");
        console.log("успешное создание сообщения");
        console.log("...");
        logger.info("Сообщение создано " + author);
      }
    }
  );
};

function getPosts(callback) {
  let query = "SELECT * FROM posts ORDER BY id DESC";
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

export default { form, addPost, getPosts, addMessage };
