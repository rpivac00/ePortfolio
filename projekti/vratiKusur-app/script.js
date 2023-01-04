"use strict";

const eurUnos = document.querySelector(
  ".container_input.container_input--racun"
);
const kunaUnos = document.querySelector(
  ".container_input.container_input--kuna"
);
const kusurIznos = document.querySelector(
  ".container_input.container_input--kusur"
);

const countButton = document.querySelector(".countButton");

//

let racunEur;
let kuna;
let kusurEur;

countButton.addEventListener("click", function (e) {
  e.preventDefault();
  racunEur = eurUnos.value;
  kuna = kunaUnos.value;

  if (racunEur <= 0 || kuna <= 0) {
    alert("Unosi moraju biti pozitivni brojevi");
    eurUnos.value = "";
    kunaUnos.value = "";
    kusurIznos.value = "";
  } else {
    if (racunEur * 7.5345 > kuna) {
      alert("Iznos kuna je manji od potrebnog");
      let preporuceniIznos = racunEur * 7.5345;

      const html = `<p class="container_item" id="preporuceniUnos">Vaš uneseni iznos kuna nije dovoljan <br /><br/>Molimo Vas ponovite unos <br/><br/>Preporučeni iznos kuna za plaćanje je: ${(
        preporuceniIznos + 1
      ).toFixed(0)} kn</p>`;

      document.getElementById("kuna").insertAdjacentHTML("beforeend", html);
      countButton.style.opacity = 0;

      kunaUnos.addEventListener("click", function () {
        const element = document.getElementById("preporuceniUnos");
        element?.remove();
        kunaUnos.value = "";
        countButton.style.opacity = 1;
      });
    } else {
      kusurEur = (kuna / 7.5326 - racunEur).toFixed(2);
      kusurIznos.value = kusurEur;
    }
  }
});
