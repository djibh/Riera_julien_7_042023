import { buildRecipesDOM } from "./recipeDom.js";

/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 */
export function search(dataSource) {
  const $bsRow = document.getElementById('recipes-grid');
  const $mainSearchInput = document.getElementById('search-bar');
  const $ingredientsTags = document.querySelectorAll('.ingredient-tag');
  const $applianceTags = document.querySelectorAll('.appliance-tag');
  const $ustensilsTags = document.querySelectorAll('.ustensil-tag');
  const $tagsList = document.querySelectorAll('.badge');

  const userInput = $mainSearchInput.value.trim().toLowerCase();

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
    dataSource = getMatchingResults(userInput);
    buildRecipesDOM(dataSource);
    return;
  }

  // check whether we have an user input in search bar before filtering data
  if (!userInput) {
    const filteredRecipes = getFilteredResults(dataSource);
    buildRecipesDOM(filteredRecipes);
    return;
  } else {
    dataSource = getMatchingResults(userInput);
    const filteredRecipes = getFilteredResults(dataSource);
    buildRecipesDOM(filteredRecipes);
    return;
  }

  // filters recipes with matching user input from dataSource
  function getMatchingResults(input) {
    return dataSource.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(input) ||
        recipe.description.toLowerCase().includes(input) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))
    );
  }

  // check whether filters have been selected or not and change data source for UI result
  function getFilteredResults(data) {
    let filteredRecipes = [];
    let tags = {
      "ingredients": [],
      "appliances": [],
      "ustentils": []
    };

    // fill in tags objects according to tags found in DOM
    $ingredientsTags.forEach(ingredient => tags.ingredients.push(ingredient.innerText.toLowerCase()));
    $applianceTags.forEach(appliance => tags.appliances.push(appliance.innerText.toLowerCase()));
    $ustensilsTags.forEach(ustensil => tags.ustentils.push(ustensil.innerText.toLowerCase()));
    
    // ingredients based filter
    if (tags.ingredients.length > 0) {
      const filteredIngredients = data.filter((recipe) => {
        return tags.ingredients.every(ingredient => {
          return recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase().includes(ingredient));
        });
      });
      filteredRecipes.push(...filteredIngredients);
    } else {
      return filteredRecipes = data;
    }

    // appliances based filter
    if (tags.appliances.length > 0) {
      const filteredAppliances = filteredRecipes.filter((recipe) => {
        return tags.appliances.some(appliance => {
          return recipe.appliance.toLowerCase().includes(appliance);
        });
      });
      filteredRecipes = [];
      filteredRecipes.push(...filteredAppliances);
    }
   
    // ustensils based filter
    if (tags.ustentils.length > 0) {
      const filteredUstentils = filteredRecipes.filter((recipe) => {
        return tags.ustentils.some(ustensil => {
          return recipe.ustensils.some(recipeUst => recipeUst.toLowerCase().includes(ustensil));
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
export function filtersSearch(dataSource, recipes, input, container, buildUiFunction) {

  container.innerHTML = "";
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
