import { buildRecipesDOM } from "./recipeDom.js";
import { getFilterListItems } from "./filter.js";

let filteredRecipes = [];

/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 */
export function search(dataSource) {
  const bsRow = document.getElementById("recipes-grid");
  const mainSearchInput = document.getElementById("search-bar");
  const tagsList = document.querySelectorAll(".badge");
  const userInput = mainSearchInput.value.trim().toLowerCase();
  filteredRecipes = dataSource;
  bsRow.innerHTML = ""; // refresh recipes grid

  if (userInput.length < 3 && tagsList.length !== 0) {
    filteredRecipes = getFilteredResults(dataSource);
  }
  if (userInput.length > 2 && tagsList.length === 0) {
    filteredRecipes = getMatchingResults(userInput, dataSource);
  }
  if (userInput.length > 2 && tagsList.length !== 0) {
    filteredRecipes = getMatchingResults(userInput, dataSource);
    filteredRecipes = getFilteredResults(filteredRecipes);
  }
  buildRecipesDOM(filteredRecipes);
}

// compare input vs recipes list to fetch matching results
function getMatchingResults(input, dataSource) {
  const matchingResults = [];

  for (let i = 0; i < dataSource.length; i++) {
    const recipe = dataSource[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients;

    // check if input is in name or description
    if (recipeName.indexOf(input) !== -1 || recipeDescription.indexOf(input) !== -1) {
      matchingResults.push(recipe);
    } else {
      // check if input is in ingredients list
      for (let j = 0; j < recipeIngredients.length; j++) {
        const ingredient = recipeIngredients[j].ingredient.toLowerCase();
        if (ingredient.indexOf(input) !== -1) {
          matchingResults.push(recipe);
          break;
        }
      }
    }
    
  }
  return matchingResults;
}


// check whether filters have been selected or not and change data source for UI result
function getFilteredResults(data) {
  const $ustensilsTags = document.querySelectorAll(".ustensil-tag");
  const $ingredientsTags = document.querySelectorAll(".ingredient-tag");
  const $applianceTags = document.querySelectorAll(".appliance-tag");
  filteredRecipes = [];

  let tags = {
    ingredients: Array.from($ingredientsTags).map((i) => i.innerText.toLowerCase()),
    appliances: Array.from($applianceTags).map((a) => a.innerText.toLowerCase()),
    ustentils: Array.from($ustensilsTags).map((u) => u.innerText.toLowerCase()),
  };

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


/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 * @param {any} input User's input
 * @param {HTMLElement} container This must be the parent element used to wrap results' UI elements
 * @param {Function} buildUiFunction This parameter is used to refer to the DOM building function
 */
export function filtersSearch(dataSource, recipes, input, container, buildUiFunction) {
  container.innerHTML = "";
  let filters = [];
  let currentData = '';
  const initialDataSource = {...dataSource};
  search(recipes);
  const { ingredients, appliances, ustensils } = getFilterListItems(filteredRecipes);

  switch (document.activeElement.id) {
    case "ingredients-dropdown":
      if (filteredRecipes.length > 0) {
        dataSource.ingredients = ingredients;
        filters = ingredients;
        currentData = 'ingredients';
      }
      break;
    case "appliances-dropdown":
      if (filteredRecipes.length > 0) {
        dataSource.appliances = appliances;
        filters = appliances;
        currentData = 'appliances';
      }
      break;
    case "ustensils-dropdown":
      if (filteredRecipes.length > 0) {
        dataSource.ustensils = ustensils;
        filters = ustensils;
        currentData = 'ustensils';
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
      buildUiFunction(initialDataSource, recipes);
      return;
    }

    if (currentData === 'ingredients') {
      dataSource.ingredients = filters.filter((data) => data.toLowerCase().includes(userInput));
    }
    if (currentData === 'appliances') {
      dataSource.appliances = filters.filter((data) => data.toLowerCase().includes(userInput));
    }
    if (currentData === 'ustensils') {
      dataSource.ustensils = filters.filter((data) => data.toLowerCase().includes(userInput));
    }
    buildUiFunction(dataSource, recipes);
  });
}