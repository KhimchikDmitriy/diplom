import connection from "./sql.js";
import mysql from "mysql";
import logger from "../logger/index.js";
import { join } from "path";
import fs from "fs";

const update = (req, res) => {
  const sql = "UPDATE posts SET body = ? WHERE id = ?";
  connection.query(sql, [req.body.body, req.params.id], (err, result) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка в работе sql операция update");
      console.log(err.message);
    } else {
      res.redirect("/");
      console.log("...");
      console.log("операция проведена успешно");
      console.log("...");
      logger.info("успешное выполнение операции sql update");
    }
  });
};
const deleted = (req, res) => {
  connection.query(
    "SELECT media FROM posts WHERE id = ?",
    [req.params.id],
    (err, result) => {
      const track = result[0];
      const mediaPath = join("./public/uploads/", track.media);
      fs.unlink(mediaPath, (err) => {
        if (err) {
          console.log(err);
          console.error(`Ошибка удаления файла: ${mediaPath}`);
        }
      });
    }
  );
  const sql = "DELETE FROM posts WHERE id = ?";
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка в работе sql операция delete");
      console.log(err.message);
    } else {
      res.redirect("back");
      console.log("...");
      console.log("операция проведена успешно");
      console.log("...");
      logger.info("успешное выполнение операции sql delete");
    }
  });
};

export default { update, deleted };
