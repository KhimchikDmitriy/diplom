import nodemailer from "nodemailer";
import "dotenv/config.js";

const mailFunction = () => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dimahima14@gmail.com",
        pass: "qpjhkjfihiocuzwv",
      },
    });

    let mailOptions = {
      from: "dimahima14@gmail.com",
      to: "warcraftdimahima@gmail.com",
      subject: "Support moment",
      text: "req.body.message",
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
