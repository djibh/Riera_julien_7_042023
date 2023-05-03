import { buildRecipesDOM } from "./recipeDom.js";

/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 */
export function search(dataSource) {
  const $bsRow = document.getElementById("recipes-grid");
  const $mainSearchInput = document.getElementById("search-bar");
  const $applianceTags = document.querySelectorAll(".appliance-tag");
  const $tagsList = document.querySelectorAll(".badge");

  const userInput = $mainSearchInput.value.trim().toLowerCase();

  // refresh recipes grid
  $bsRow.innerHTML = "";

  // check for input length
  if (userInput.length < 3 && $tagsList.length === 0) {
    buildRecipesDOM(dataSource);
    return;
  }

  if (userInput.length < 3) {
    dataSource = getFilteredResults(dataSource, $applianceTags);
    buildRecipesDOM(dataSource);
    return;
  }

  // fetch results from search and update recipes grid
  if ($tagsList.length === 0) {
    dataSource = getMatchingResults(userInput);
    buildRecipesDOM(dataSource);
    return;
  }

  if (!userInput) {
    const filteredRecipes = getFilteredResults(dataSource, $applianceTags);
    buildRecipesDOM(filteredRecipes);
    return;
  } else {
    dataSource = getMatchingResults(userInput);
    const filteredRecipes = getFilteredResults(dataSource, $applianceTags);
    buildRecipesDOM(filteredRecipes);
    return;
  }

  // filters recipes with matching user input from dataSource
  function getMatchingResults(input) {
    //FIXME - add check in ingredients
    return dataSource.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(input) ||
        recipe.description.toLowerCase().includes(input)
    );
  }

  // check whether filters have been selected or not and change data source for UI result
  function getFilteredResults(data, domTags) {
    const appliancesList = [];
    domTags.forEach((appliance) =>
      appliancesList.push(appliance.innerText.toLowerCase())
    );

    return data.filter((recipe) =>
      recipe.appliance.toLowerCase().includes(appliancesList[0])
    );

    // return data.filter(
    //   (recipe) =>
    //   appliancesList.every((appliance) => {
    //     recipe.appliance.includes(appliance);
    //   })
    // );
  }
}

/**
 * @param {[string|number]} dataSource Can be recipes for the main search bar or any of filter type (ingredients / appliances / Ustensils)
 * @param {any} input User's input
 * @param {HTMLElement} container This must be the parent element used to wrap results' UI elements
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
    return dataSource.filter((data) => data.toLowerCase().includes(input));
  }
}
