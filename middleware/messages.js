import express from "express";

function message(req) {
  return (msg, type) => {
    type = type || "info";
    let sess = req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({ type: type, string: msg });
  };
}

export default (req, res, next) => {
  res.message = message(req);
  res.error = (msg) => {
    return res.message(msg, "error");
  };
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessage = function () {
    req.session.messages = [];
  };
  next();
};
