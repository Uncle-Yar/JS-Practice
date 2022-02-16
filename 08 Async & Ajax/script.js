"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//returns a promise
const getJSON = function (url, error = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${error}, ${response.status}`);
    }
    return response.json();
  });
};

const renderCountry = function (data, className = "") {
  const html = `
        <article class="country ${className}">
              <img class="country__img" src="${data.flags.svg}"/>
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                 <h4 class="country__region">${data.region}</h4>
               <p class="country__row"><span>Population:</span>${(
                 +data.population / 1000000
               ).toFixed(1)}</p>
                <p class="country__row"><span>Language:</span>${Object.values(
                  data.languages
                )}</p>
                <p class="country__row"><span>Currency</span>${Object.keys(
                  data.currencies
                )}/ ${Object.values(
    data.currencies[Object.keys(data.currencies)[0]]
  )}</p>
              </div>
            </article>
            `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

//////////////////////////////////////////////////
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Wrong country`)
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((error) => {
      renderError(`Something went wrong, try again
      ${error}`);
      console.log(error);
    })
    .finally((countriesContainer.style.opacity = 1));
};
getCountryData("italy");

document.querySelector("button").addEventListener("click", function (e) {
  e.preventDefault();
  getCountryData(
    window.prompt(`Country: 
    (https://en.wikipedia.org/wiki/ISO_3166-1)`)
  );
});

// 16 257 /80

// //////////////////////////////////////////////////////////
// const renderCountry = function (data, className = "") {
//     const html = `
//           <article class="country ${className}">
//                 <img class="country__img" src="${data.flags.svg}"/>
//                 <div class="country__data">
//                   <h3 class="country__name">${data.name.common}</h3>
//                    <h4 class="country__region">${data.region}</h4>
//                  <p class="country__row"><span>Population:</span>${(
//                    +data.population / 1000000
//                  ).toFixed(1)}</p>
//                   <p class="country__row"><span>Language:</span>${Object.values(
//                     data.languages
//                   )}</p>
//                   <p class="country__row"><span>Currency</span>${Object.keys(
//                     data.currencies
//                   )}/ ${Object.values(
//       data.currencies[Object.keys(data.currencies)[0]]
//     )}</p>
//                 </div>
//               </article>
//               `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//   };
//   const renderError = function (msg) {
//     countriesContainer.insertAdjacentText("beforeend", msg);
//   };

//   const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Country not found (${response.status})`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         renderCountry(data[0]);
//       })
//       .catch((error) => {
//         renderError(`Something went wrong, try again
//         ${error}`);
//         console.log(error);
//       })
//       .finally((countriesContainer.style.opacity = 1));
//   };
//   getCountryData("italy");

//   document.querySelector("button").addEventListener("click", function (e) {
//     e.preventDefault();
//     getCountryData(
//       window.prompt(`Country:
//       (https://en.wikipedia.org/wiki/ISO_3166-1)`)
//     );
//   });
///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // setTimeout(()=>console.log(request.responseText),3000);

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);
//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>Population:</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>Language:</span>${Object.values(
//               data.languages
//             )}</p>
//             <p class="country__row"><span>Currency</span>${Object.keys(
//               data.currencies
//             )}/ ${Object.values(
//       data.currencies[Object.keys(data.currencies)[0]]
//     )}</p>
//           </div>
//         </article>
//         `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);

//     console.log([data]);
//   });
// };

// document.querySelector("button").addEventListener('click',function(e){
//     e.preventDefault();

//     const result = window.prompt(`Country:`);
//     getCountryData(result);
// })
