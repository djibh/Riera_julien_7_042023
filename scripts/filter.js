import { search, filtersSearch } from "./search.js";
import { createTagPill } from "./tags.js";
import { capitalize } from "./utils/capitalize.js";
import { removeFocus } from "./utils/removeFocus.js";

const $tagsContainer = document.querySelector('.tags-container');
const $filterButtons = document.querySelectorAll('.filters .btn');
const $ingredientsInput = document.getElementById('ingredients-dropdown');
const $appliancesInput = document.getElementById('appliances-dropdown');
const $ustensilsInput = document.getElementById('ustensils-dropdown');
const $ingredientsListContainer = document.querySelector(".ingredients-filter__list");
const $appliancesListContainer = document.querySelector(".appliances-filter__list");
const $ustensilsListContainer = document.querySelector(".ustensils-filter__list");


export async function buildFiltersContentItems(recipes) {
  const { ingredients, appliances, ustensils } = await getFilterListItems(recipes);

  buildIngredientsFilterItems(ingredients, recipes);
  buildAppliancesFilterItems(appliances, recipes);
  buildUstensilsFilterItems(ustensils, recipes);

  handleFilterButtonsBehaviour();

  $ingredientsInput.addEventListener('focus', () => filtersSearch(ingredients, recipes, $ingredientsInput, $ingredientsListContainer , buildIngredientsFilterItems));
  $appliancesInput.addEventListener('focus', () => filtersSearch(appliances, recipes, $appliancesInput, $appliancesListContainer , buildAppliancesFilterItems));
  $ustensilsInput.addEventListener('focus', () => filtersSearch(ustensils, recipes, $ustensilsInput, $ustensilsListContainer , buildUstensilsFilterItems));
}

// create ingredients li elements for filter buttons
function buildIngredientsFilterItems(ingredients, recipes) {
  const tagsList = document.querySelectorAll('.badge');
  ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.setAttribute('id', `ingredient-${ingredient.toLowerCase().replace(/\s/g, '')}`); // creates id with item text w/o spaces
    ingredientItem.classList.add('filter-list__item');
    ingredientItem.innerText = ingredient;
    $ingredientsListContainer.appendChild(ingredientItem);

    filterItemIsSelected(tagsList, ingredientItem);
    // create tag pill on click and disable selected item click in list
    setDisableOnClick(ingredientItem, $ingredientsInput, 'ingredient-tag', recipes);
  });
}

// create appliances li elements for filter buttons
function buildAppliancesFilterItems(appliances, recipes) {
  const tagsList = document.querySelectorAll('.badge');

  appliances.forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.setAttribute('id', `appliance-${appliance.toLowerCase().replace(/\s/g, '')}`);
    applianceItem.classList.add('filter-list__item');
    applianceItem.innerText = appliance;
    $appliancesListContainer.appendChild(applianceItem);

    filterItemIsSelected(tagsList, applianceItem);
    // create tag pill on click and disable selected item click in list
    setDisableOnClick(applianceItem, $appliancesInput, 'appliance-tag', recipes);
  });
}


// create ustensils li elements for filter buttons
function buildUstensilsFilterItems(ustensils, recipes) {
  const tagsList = document.querySelectorAll('.badge');
  ustensils.forEach((ustensil) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.setAttribute('id', `ustensil-${ustensil.toLowerCase().replace(/\s/g, '')}`);
    ustensilItem.classList.add('filter-list__item');
    ustensilItem.innerText = ustensil;
    $ustensilsListContainer.appendChild(ustensilItem);

    filterItemIsSelected(tagsList, ustensilItem);
    setDisableOnClick(ustensilItem, $ustensilsInput, 'ustensil-tag', recipes);
  });
}


// manage filter buttons classes for UI modifications via CSS
function handleFilterButtonsBehaviour() {
  $filterButtons.forEach((button) => {
    button.addEventListener("click", function() {

      // remove selected class when already selected class is click again and remove focus from input
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
        removeFocus();
        return;
      }

      // Reduce size of other filters before increasing size of the new selected one
      removeSelectedClassForFilterButtons();
      this.classList.toggle("selected");
    });
  });

  function removeSelectedClassForFilterButtons() {
    $filterButtons.forEach((button) => {
      if (button.classList.contains("selected")) {
        button.classList.remove("selected");
      }
    });
  }
}

// call tag pill creation function using the clicked list element (ingredient, appliance or ustensil) and add to UI
function addTagPillOnClick(element, tagFamily, recipes) {
  const newTag = createTagPill(element);
  newTag.classList.add(tagFamily);
  $tagsContainer.appendChild(newTag);

  // Remove tag from container
  newTag.addEventListener('click', function() {
    const itemToRemoveDisableFrom = document.getElementById(this.dataset.idSelected);
    // FIXME - remove if statement when every thing's fixed

    itemToRemoveDisableFrom.classList.remove('disabled');
    
    this.remove();
    search(recipes);
  });
}

// checks if a filter list item is in tags in order to add class 'disabled' on list regeneration (i.e. focus event in filter inputs)
function filterItemIsSelected(tags, item) {
  let attributesList = [];
  tags.forEach(tag => attributesList.push(tag.dataset.idSelected));

  if (attributesList.includes(item.id)) {
    item.classList.add('disabled');
    return;
  }
  return false;
}

// create tag pill on click and disable selected item click in list
function setDisableOnClick(item, filterInput, filterCategory, recipes) {
  item.addEventListener('click', function() {
    addTagPillOnClick(this, filterCategory, recipes);
    filterInput.value = '';
    this.classList.add('disabled');
    search(recipes);
  });
}

export async function getFilterListItems(recipes) {
  // get unique values for ingredients list, using filtered recipes

  // list of ingredients
  let listOfIngredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const formattedIngredient = capitalize(ingredient.ingredient);
      listOfIngredients.push(formattedIngredient);
    });
  });

  // create an array with unique values
  const filteredIngredients = [...new Set(listOfIngredients)];
  filteredIngredients.sort();

  // list of appliances
  let appliances = [];
  recipes.forEach((recipe) => {
    const formattedAppliance = capitalize(recipe.appliance);
    appliances.push(formattedAppliance);
  });

  const filteredAppliances = [...new Set(appliances)];
  filteredAppliances.sort();

  // list of appliances
  let listOfUstensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const formattedUstensil = capitalize(ustensil);
      listOfUstensils.push(formattedUstensil);
    });
  });

  // create an array with unique values
  const filteredUstensils = [...new Set(listOfUstensils)];
  filteredUstensils.sort();

  return {
    ingredients: [...filteredIngredients],
    appliances: [...filteredAppliances],
    ustensils: [...filteredUstensils]
  };
}