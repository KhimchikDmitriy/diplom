import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config.js";

const mailFunction = (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dimahima14@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    let mailOptions = {
      from: "dimahima14@gmail.com",
      to: "warcraftdimahima@gmail.com",
      subject: name,
      html: "Вам отправленно письмо от " + email + " с текстом: " + message,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("...");
        console.log("Cообщение отправлено в поддержку");
        res.redirect("back");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export default { mailFunction };
