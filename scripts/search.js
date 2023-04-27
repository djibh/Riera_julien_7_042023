/**
 * @param {[any]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 * @param {any} input User's input
 * @param {HTMLElement} container This must be the parent element used to wrap results' UI elements
 * @param {Function} buildUiFunction This parameter is used to refer to the DOM building function
 */
export function search(dataSource, input, container, buildUiFunction) {
  input.addEventListener("input", () => {
    const userInput = input.value.trim().toLowerCase();

    // refresh recipes grid
    container.innerHTML = "";

    // check for input length
    if (userInput.length < 3) {
      buildUiFunction(dataSource);
      return;
    }

    // fetch results from search and update recipes grid
    const results = getMatchingResults(userInput);
    buildUiFunction(results);
  });

  function getMatchingResults(input) {
    //FIXME - add check in ingredients
    return dataSource.filter(
      (data) =>
        data.name.toLowerCase().includes(input) ||
        data.description.toLowerCase().includes(input)
    );
  }
}

/**
 * @param {[any]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 * @param {any} input User's input
 * @param {HTMLElement} container This must be the parent element used to wrap results' UI elements
 * @param {[any]} results This array contains data remaining after the datasource filter
 * @param {Function} buildUiFunction This parameter is used to refer to the DOM building function
 */
export function filtersSearch(dataSource, input, container, buildUiFunction) {
    input.addEventListener("input", () => {
      const userInput = input.value.trim().toLowerCase();
  
      // refresh recipes grid
      container.innerHTML = "";
  
      // check for input length
      if (userInput.length < 3) {
        buildUiFunction(dataSource);
        return;
      }
  
      // fetch results from search and update recipes grid
      const results = getMatchingResults(userInput);
      buildUiFunction(results);
    });
  
    function getMatchingResults(input) {
      return dataSource.filter(
        (data) =>
          data.toLowerCase().includes(input)
      );
    }
  }

// VERSION FUNCTIONAL PROGRAMMING
// export function searchRecipes(recipes, grid) {
//   const input = document.getElementById("search-bar");
//   let results = [];

//   input.addEventListener("input", () => {
//     const userInput = input.value.trim().toLowerCase();

//     // Supprime les anciens résultats
//     grid.innerHTML = "";

//     // Vérifie que la recherche est suffisamment longue
//     if (userInput.length < 3) {
//       // showRecipes(recipes);
//       return;
//     }

//     // Récupère les résultats correspondants à la recherche
//     results = _getMatchingResults(recipes, userInput);
//     showRecipes(results);
//   });
// }

// function _getMatchingResults(recipes, input) {
//   return recipes.filter((result) =>
//     result.name.toLowerCase().includes(input)
//   );
// }

// VERSION NATIVE FUNCTIONS PROGRAMMING
// function getMatchingResults(query) {
//   const results = [
//     'Résultat 1',
//     'Résultat 2',
//     'Résultat 3',
//     'Autre résultat',
//     'Encore un résultat'
//   ];

//   const matchingResults = [];

//   for (let i = 0; i < results.length; i++) {
//     const result = results[i];
//     if (containsSubString(result.toLowerCase(), query)) {
//       matchingResults.push(result);
//     }
//   }

//   return matchingResults;
// }

// function containsSubString(str, subStr) {
//   for (let i = 0; i < str.length; i++) {
//     if (str.slice(i, i + subStr.length).toLowerCase() === subStr) {
//       return true;
//     }
//   }
//   return false;
// }

//CHATGPT
//

// const searchInput = document.getElementById("search-input");
// const ingredientsSelect = document.getElementById("ingredients");
// const appareilsSelect = document.getElementById("appareils");
// const ustensilesSelect = document.getElementById("ustensiles");
// const tagsContainer = document.getElementById("tags-container");
// const recipesContainer = document.querySelector(".recipes-container");

// let selectedIngredients = [];
// let selectedAppareils = [];
// let selectedUstensiles = [];

// function renderTags() {
//   tagsContainer.innerHTML = "";
//   if (selectedIngredients.length > 0) {
//     selectedIngredients.forEach(ingredient => {
//       const tag = document.createElement("div");
//       tag.classList.add("tag");
//       tag.innerHTML = `
//         <span>${ingredient}</span>
//         <button data-type="ingredient" data-value="${ingredient}">&times;</button>
//       `;
//       tagsContainer.appendChild(tag);
//     });
//   }
//   if (selectedAppareils.length > 0) {
//     selectedAppareils.forEach(appareil => {
//       const tag = document.createElement("div");
//       tag.classList.add("tag");
//       tag.innerHTML = `
//         <span>${appareil}</span>
//         <button data-type="appareil" data-value="${appareil}">&times;</button>
//       `;
//       tagsContainer.appendChild(tag);
//     });
//   }
//   if (selectedUstensiles.length > 0) {
//     selectedUstensiles.forEach(ustensile => {
//       const tag = document.createElement("div");
//       tag.classList.add("tag");
//       tag.innerHTML = `
//         <span>${ustensile}</span>
//         <button data-type="ustensile" data-value="${ustensile}">&times;</button>
//       `;
//       tagsContainer.appendChild(tag);
//     });
//   }
// }

// function renderRecipes(recipes) {
//   recipesContainer.innerHTML = "";
//   if (recipes.length === 0) {
//     const noResult = document.createElement("div");
//     noResult.classList.add("no-result");
//     noResult.textContent = "Aucun résultat trouvé.";
//     recipesContainer.appendChild(noResult);
//   } else {
//     recipes.forEach(recipe => {
//       const recipeCard = document.createElement("div");
//       recipeCard.classList.add("recipe-card");
//       recipeCard.innerHTML = `
//         <h3>${recipe.title}</h3>
//         <p>${recipe.description}</p>
//         <ul>
//           ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
//         </ul>
//       `;
//       recipesContainer.appendChild(recipeCard);
//     });
//   }
// }

// function filterRecipes() {
//   let filteredRecipes = data;
//   if (selectedIngredients.length > 0) {
//     filteredRecipes = filteredRecipes.filter(recipe => {
//       const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
//       return selectedIngredients.every(selectedIngredient => recipeIngredients.includes(selectedIngredient));
//     });
//   }
//   if (selectedAppareils.length > 0) {
//     filteredRecipes = filteredRecipes.filter(recipe => {
//       const recipeAppareils = recipe.appareils.map(appareil => appareil.toLowerCase());
//       return selectedAppareils.every(selectedAppareil => recipeAppareils.includes(selectedAppareil));
//     });
//   }
//   if (selectedUstensiles.length > 0) {
//     filteredRecipes = filteredRecipes.filter(recipe => {
//       const recipeUstensiles = recipe.ustensiles.map(ustensile => ustensile.toLowerCase());
//       return selectedUstensiles.every(selectedUstensile => recipeUstensiles.includes(selectedUstensile));
//     });
//   }
//   if (searchInput.value !== "") {
//     const searchValue = searchInput.value.toLowerCase();
//     filteredRecipes = filteredRecipes.filter(recipe => {
//       return recipe.title.toLowerCase().includes(searchValue) || recipe.description.toLowerCase().includes(searchValue));
//   });
// }
// renderRecipes(filteredRecipes);
// }

// searchInput.addEventListener("input", () => {
// filterRecipes();
// });

// ingredientsSelect.addEventListener("change", () => {
// selectedIngredients.push(ingredientsSelect.value);
// ingredientsSelect.value = "";
// renderTags();
// filterRecipes();
// });

// appareilsSelect.addEventListener("change", () => {
// selectedAppareils.push(appareilsSelect.value);
// appareilsSelect.value = "";
// renderTags();
// filterRecipes();
// });

// ustensilesSelect.addEventListener("change", () => {
// selectedUstensiles.push(ustensilesSelect.value);
// ustensilesSelect.value = "";
// renderTags();
// filterRecipes();
// });

// tagsContainer.addEventListener("click", event => {
// if (event.target.tagName === "BUTTON") {
//   const type = event.target.dataset.type;
//   const value = event.target.dataset.value;
//   if (type === "ingredient") {
//     selectedIngredients = selectedIngredients.filter(ingredient => ingredient !== value);
//   } else if (type === "appareil") {
//     selectedAppareils = selectedAppareils.filter(appareil => appareil !== value);
//   } else if (type === "ustensile") {
//     selectedUstensiles = selectedUstensiles.filter(ustensile => ustensile !== value);
//   }
//   renderTags();
//   filterRecipes();
// }
// });

// renderTags();
// renderRecipes(data);

// AUTRE VERSION
// const searchInput = document.getElementById("search-input");
// const ingredientsSelect = document.getElementById("ingredients-select");
// const appareilsSelect = document.getElementById("appareils-select");
// const ustensilesSelect = document.getElementById("ustensiles-select");
// const tagsContainer = document.getElementById("tags-container");
// const recipesContainer = document.getElementById("recipes-container");

// let selectedIngredients = [];
// let selectedAppareils = [];
// let selectedUstensiles = [];

// function renderTags() {
//   const tags = [
//     ...selectedIngredients.map(ingredient => ({ type: "ingredient", value: ingredient })),
//     ...selectedAppareils.map(appareil => ({ type: "appareil", value: appareil })),
//     ...selectedUstensiles.map(ustensile => ({ type: "ustensile", value: ustensile }))
//   ];
//   tagsContainer.innerHTML = tags
//     .map(tag => `<button class="btn btn-outline-secondary btn-sm me-2 mb-2" data-type="${tag.type}" data-value="${tag.value}">${tag.value} <i class="fas fa-times ms-2"></i></button>`)
//     .join("");
// }

// function renderRecipes(recipes) {
//   recipesContainer.innerHTML = recipes
//     .map(recipe => `<div class="col mb-4"><div class="card h-100"><img src="${recipe.thumbnail}" class="card-img-top" alt="${recipe.name}"><div class="card-body"><h5 class="card-title">${recipe.name}</h5><p class="card-text">${recipe.description}</p></div></div></div>`)
//     .join("");
// }

// function filterRecipes() {
//   const searchValue = searchInput.value.trim().toLowerCase();
//   let filteredRecipes = data.filter(recipe => {
//     let hasIngredients = selectedIngredients.length === 0 || recipe.ingredients.some(ingredient => selectedIngredients.includes(ingredient.ingredient.toLowerCase()));
//     let hasAppareils = selectedAppareils.length === 0 || selectedAppareils.includes(recipe.appliance.toLowerCase());
//     let hasUstensiles = selectedUstensiles.length === 0 || recipe.ustensils.some(ustensile => selectedUstensiles.includes(ustensile.toLowerCase()));
//     return hasIngredients && hasAppareils && hasUstensiles && (searchValue.length === 0 || recipe.name
//         .toLowerCase()
//         .includes(searchValue) || recipe.description.toLowerCase().includes(searchValue));
//   });
//   renderRecipes(filteredRecipes);
// }

// searchInput.addEventListener("input", () => {
//   filterRecipes();
// });

// ingredientsSelect.addEventListener("change", () => {
//   selectedIngredients.push(ingredientsSelect.value);
//   ingredientsSelect.value = "";
//   renderTags();
//   filterRecipes();
// });

// appareilsSelect.addEventListener("change", () => {
//   selectedAppareils.push(appareilsSelect.value);
//   appareilsSelect.value = "";
//   renderTags();
//   filterRecipes();
// });

// ustensilesSelect.addEventListener("change", () => {
//   selectedUstensiles.push(ustensilesSelect.value);
//   ustensilesSelect.value = "";
//   renderTags();
//   filterRecipes();
// });

// tagsContainer.addEventListener("click", event => {
//   if (event.target.tagName === "BUTTON") {
//     const type = event.target.dataset.type;
//     const value = event.target.dataset.value;
//     if (type === "ingredient") {
//       selectedIngredients = selectedIngredients.filter(ingredient => ingredient !== value);
//     } else if (type === "appareil") {
//       selectedAppareils = selectedAppareils.filter(appareil => appareil !== value);
//     } else if (type === "ustensile") {
//     selectedUstensiles = selectedUstensiles.filter(ustensile => ustensile !== value);
//     renderTags();
//     filterRecipes();
//   }
// }});

// // Au chargement de la page, on affiche toutes les recettes
// renderRecipes(data);
