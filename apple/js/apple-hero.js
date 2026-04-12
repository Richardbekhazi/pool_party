// js/apple-hero.js
// Random local hero image for Apple Farewell
document.addEventListener("DOMContentLoaded", function () {
  var heroImg = document.getElementById("heroImg");
  if (!heroImg) return;

  fetch("data/pictures.json")
    .then(function (r) { return r.json(); })
    .then(function (pics) {
      if (!pics.length) return;
      var pick = pics[Math.floor(Math.random() * pics.length)];
      heroImg.src = pick.src;
      heroImg.alt = pick.title;
      heroImg.addEventListener("load", function () {
        heroImg.classList.add("loaded");
      });
    })
    .catch(function () {
      // Fallback: use first pic
      heroImg.src = "pics/Apple%20Pic%20(1).jpeg";
      heroImg.alt = "Apple farewell";
      heroImg.addEventListener("load", function () {
        heroImg.classList.add("loaded");
      });
    });
});
