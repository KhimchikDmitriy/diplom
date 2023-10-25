// переменные
let b = 0;

// функция переключения фона хдэра
function changeColor() {
  let back = ["url(./img/1.jpg)", "url(./img/2.png)", "url(./img/3.png)"];
  let div = document.querySelector(".head");
  div.style.background = back[b];
  b++;
  if (b > back.length) {
    b = 0;
  }
}
setInterval(changeColor, 5000);

// вставка кода для бокового меню
fetch("./dop/canvas.html")
  .then((resp) => resp.text())
  .then((code) => {
    document.querySelector(".canvas").innerHTML = code;
  });

// вставка кода для карточек примеров на заглавной странице
fetch("./dop/examples.html")
  .then((resp) => resp.text())
  .then((code) => {
    document.querySelector(".examples").innerHTML = code;
  });

// вставка кода для обратной связи
fetch("./dop/feedback.html")
  .then((resp) => resp.text())
  .then((code) => {
    document.querySelector(".feedback").innerHTML = code;
  });
