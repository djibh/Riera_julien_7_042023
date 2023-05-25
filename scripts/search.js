import { buildRecipesDOM } from "./recipeDom.js";
import { getFilterListItems } from "./filter.js";

let filteredRecipes = [];

/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 */
export function search(dataSource) {
  const $bsRow = document.getElementById("recipes-grid");
  const $mainSearchInput = document.getElementById("search-bar");
  const $ingredientsTags = document.querySelectorAll(".ingredient-tag");
  const $applianceTags = document.querySelectorAll(".appliance-tag");
  const $ustensilsTags = document.querySelectorAll(".ustensil-tag");
  const $tagsList = document.querySelectorAll(".badge");

  const userInput = $mainSearchInput.value.trim().toLowerCase();
  filteredRecipes = dataSource;

  // refresh recipes grid
  $bsRow.innerHTML = "";

  // check for input length
  if (userInput.length < 3 && $tagsList.length === 0) {
    buildRecipesDOM(dataSource);
    return;
  }

  if (userInput.length < 3) {
    dataSource = getFilteredResults(dataSource);
    buildRecipesDOM(dataSource);
    return;
  }

  // fetch results from search and update recipes grid
  if ($tagsList.length === 0) {
    filteredRecipes = getMatchingResults(userInput);
    buildRecipesDOM(filteredRecipes);
    return;
  }

  // check whether we have an user input in search bar before filtering data
  if (!userInput) {
    filteredRecipes = getFilteredResults(dataSource);
    buildRecipesDOM(filteredRecipes);
    return;
  } else {
    filteredRecipes = getMatchingResults(userInput);
    filteredRecipes = getFilteredResults(filteredRecipes);
    buildRecipesDOM(filteredRecipes);
    return;
  }

  // filters recipes with matching user input from dataSource
  function getMatchingResults(input) {
    return dataSource.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(input) ||
        recipe.description.toLowerCase().includes(input) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(input)
        )
    );
  }

  // check whether filters have been selected or not and change data source for UI result
  function getFilteredResults(data) {
    filteredRecipes = [];

    let tags = {
      ingredients: [],
      appliances: [],
      ustentils: [],
    };

    // fill in tags objects according to tags found in DOM
    $ingredientsTags.forEach((ingredient) =>
      tags.ingredients.push(ingredient.innerText.toLowerCase())
    );
    $applianceTags.forEach((appliance) =>
      tags.appliances.push(appliance.innerText.toLowerCase())
    );
    $ustensilsTags.forEach((ustensil) =>
      tags.ustentils.push(ustensil.innerText.toLowerCase())
    );

    // ingredients based filter
    if (tags.ingredients.length > 0) {
      const filteredIngredients = data.filter((recipe) => {
        return tags.ingredients.every((ingredient) => {
          return recipe.ingredients.some((recipeIng) =>
            recipeIng.ingredient.toLowerCase().includes(ingredient)
          );
        });
      });
      filteredRecipes.push(...filteredIngredients);
    } else {
      filteredRecipes = data;
    }

    // appliances based filter
    if (tags.appliances.length > 0) {
      const filteredAppliances = filteredRecipes.filter((recipe) => {
        return tags.appliances.every((appliance) => {
          return recipe.appliance.toLowerCase().includes(appliance);
        });
      });
      filteredRecipes = [];
      filteredRecipes.push(...filteredAppliances);
    }

    // ustensils based filter
    if (tags.ustentils.length > 0) {
      const filteredUstentils = filteredRecipes.filter((recipe) => {
        return tags.ustentils.every((ustensil) => {
          return recipe.ustensils.some((recipeUst) =>
            recipeUst.toLowerCase().includes(ustensil)
          );
        });
      });
      filteredRecipes = [];
      filteredRecipes.push(...filteredUstentils);
    }

    return filteredRecipes;
  }
}

/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 * @param {any} input User's input
 * @param {HTMLElement} container This must be the parent element used to wrap results' UI elements
 * @param {Function} buildUiFunction This parameter is used to refer to the DOM building function
 */
export async function filtersSearch(dataSource, recipes, input, container, buildUiFunction) {
  container.innerHTML = "";
  search(recipes);
  const { ingredients, appliances, ustensils } = await getFilterListItems(filteredRecipes);

  switch (document.activeElement.id) {
    case "ingredients-dropdown":
      if (filteredRecipes.length > 0) {
        dataSource = ingredients;
      }
      break;
    case "appliances-dropdown":
      if (filteredRecipes.length > 0) {
        dataSource = appliances;
      }
      break;
    case "ustensils-dropdown":
      if (filteredRecipes.length > 0) {
        dataSource = ustensils;
      }
      break;
    default:
      break;
  }

  filteredRecipes = [];
  buildUiFunction(dataSource, recipes);

  input.addEventListener("input", () => {
    const userInput = input.value.trim().toLowerCase();

    // refresh recipes grid
    container.innerHTML = "";

    // check for input length
    if (userInput.length < 1) {
      buildUiFunction(dataSource, recipes);
      return;
    }

    // fetch results from search and update recipes grid
    const results = getMatchingResults(userInput);
    buildUiFunction(results, recipes);
  });

  function getMatchingResults(input) {
    return dataSource.filter((data) => data.toLowerCase().includes(input));
  }
}

// export function getFilterListItems() {
//   // get unique values for ingredients list, using filtered recipes

//   // list of ingredients
//   let listOfIngredients = [];
//   filteredRecipes.forEach((recipe) => {
//     recipe.ingredients.forEach((ingredient) => {
//       const formattedIngredient = capitalize(ingredient.ingredient);
//       listOfIngredients.push(formattedIngredient);
//     });
//   });

//   // create an array with unique values
//   const filteredIngredients = [...new Set(listOfIngredients)];
//   filteredIngredients.sort();

//   // list of appliances
//   let appliances = [];
//   filteredRecipes.forEach((recipe) => {
//     const formattedAppliance = capitalize(recipe.appliance);
//     appliances.push(formattedAppliance);
//   });

//   const filteredAppliances = [...new Set(appliances)];
//   filteredAppliances.sort();

//   // list of appliances
//   let listOfUstensils = [];
//   filteredRecipes.forEach((recipe) => {
//     recipe.ustensils.forEach((ustensil) => {
//       const formattedUstensil = capitalize(ustensil);
//       listOfUstensils.push(formattedUstensil);
//     });
//   });

//   // create an array with unique values
//   const filteredUstensils = [...new Set(listOfUstensils)];
//   filteredUstensils.sort();

//   return {
//     ingredients: [...filteredIngredients],
//     appliances: [...filteredAppliances],
//     ustensils: [...filteredUstensils]
//   };
// }
