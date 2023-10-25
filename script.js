let colors = ["url(./img/1.jpg)", "url(./img/2.png)", "url(./img/3.png)"];
let c = 0;

function changeColor() {
  let div = document.querySelector(".head");
  div.style.background = colors[c];
  c++;
  if (c >= colors.length) {
    c = 0;
  }
}
setInterval(changeColor, 5000);

fetch("./dop/canvas.html")
  .then((resp) => resp.text())
  .then((code) => {
    document.querySelector(".canvas").innerHTML = code;
  });

fetch("./dop/examples.html")
  .then((resp) => resp.text())
  .then((code) => {
    document.querySelector(".examples").innerHTML = code;
  });

fetch("./dop/feedback.html")
  .then((resp) => resp.text())
  .then((code) => {
    document.querySelector(".feedback").innerHTML = code;
  });
