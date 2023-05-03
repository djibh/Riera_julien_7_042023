import { recipes } from "../data/recipes.js";
import { buildFiltersContentItems } from "./filter.js";
import { search } from "./search.js";
import { buildRecipesDOM } from "./recipeDom.js";

const $mainSearchInput = document.getElementById("search-bar");

function init() {
  buildRecipesDOM(recipes);
  buildFiltersContentItems(recipes);
  search(recipes);

  $mainSearchInput.addEventListener('input', () => {search(recipes);});
}

init();