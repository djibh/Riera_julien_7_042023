import { search, filtersSearch } from "./search.js";
import { createTagPill } from "./tags.js";
import { capitalize, nodeListToArray } from "./utils/utils.js";
import { removeFocus } from "./removeFocus.js";

const $tagsContainer = document.querySelector('.tags-container');
const $filterButtons = document.querySelectorAll('.filters .btn');
const $ingredientsInput = document.getElementById('ingredients-dropdown');
const $appliancesInput = document.getElementById('appliances-dropdown');
const $ustensilsInput = document.getElementById('ustensils-dropdown');
const $ingredientsListContainer = document.querySelector(".ingredients-filter__list");
const $appliancesListContainer = document.querySelector(".appliances-filter__list");
const $ustensilsListContainer = document.querySelector(".ustensils-filter__list");

export function buildFiltersContentItems(recipes) {
  const { ingredients, appliances, ustensils } = getFilterListItems(recipes);
  const categories = { ingredients, appliances, ustensils };
  handleFilterButtonsBehaviour();
  $ingredientsInput.addEventListener('focus', () => filtersSearch(categories, recipes, $ingredientsInput, $ingredientsListContainer , buildFilterItems));
  $appliancesInput.addEventListener('focus', () => filtersSearch(categories, recipes, $appliancesInput, $appliancesListContainer , buildFilterItems));
  $ustensilsInput.addEventListener('focus', () => filtersSearch(categories, recipes, $ustensilsInput, $ustensilsListContainer , buildFilterItems));
}

// create ingredients li elements for filter buttons
function buildFilterItems(items, recipes) {
  Object.entries(items).forEach(([type, subItems]) => {
    const tagsList = document.querySelectorAll('.badge');

    subItems.forEach((item) => {
      const domItem = document.createElement("li");
      domItem.setAttribute('id', `${type.slice(0, -1)}-${item.toLowerCase().replace(/\s/g, '')}`); // creates id with item text w/o spaces
      domItem.classList.add('filter-list__item');
      domItem.innerText = item;
      if (type === 'ingredients') {
        $ingredientsListContainer.appendChild(domItem);
        setDisableOnClick(domItem, $ingredientsInput, 'ingredient-tag', recipes);
      }
      if (type === 'appliances') {
        $appliancesListContainer.appendChild(domItem);
        setDisableOnClick(domItem, $appliancesInput, 'appliance-tag', recipes);
      }
      if (type === 'ustensils') {
        $ustensilsListContainer.appendChild(domItem);
        setDisableOnClick(domItem, $ustensilsInput, 'ustensil-tag', recipes);
      }
      isFilterItemSelected(tagsList, domItem);
    });
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
    nodeListToArray($filterButtons)
      .filter((button) => button.classList.contains("selected"))
      .forEach((button) => button.classList.remove("selected"));
  }
}

// call tag pill creation function using the clicked list element (ingredient, appliance or ustensil) and add to UI
function addTagPillOnClick(element, tagFamily, recipes) {
  const newTag = createTagPill(element);
  newTag.classList.add(tagFamily);
  $tagsContainer.appendChild(newTag);
  newTag.addEventListener('click', function() {
    const itemToRemoveDisableFrom = document.getElementById(this.dataset.idSelected);
    itemToRemoveDisableFrom.classList.remove('disabled');
    this.remove();
    search(recipes);
  });
}

// checks if a filter list item is in tags in order to add class 'disabled' on list regeneration (i.e. focus event in filter inputs)
function isFilterItemSelected(tags, item) {
  let attributesList = [];
  tags.forEach(tag => attributesList.push(tag.dataset.idSelected));
  if (attributesList.includes(item.id)) return item.classList.add('disabled');
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

export function getFilterListItems(recipes) {
  const listOfIngredients = [];
  const appliances = [];
  const listOfUstensils = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      listOfIngredients.push(capitalize(ingredient.ingredient));
    });
    appliances.push(capitalize(recipe.appliance));
    recipe.ustensils.forEach((ustensil) => {
      listOfUstensils.push(capitalize(ustensil));
    });
  });
  // Set is used to return array with unique values
  return {
    ingredients: [...new Set(listOfIngredients)].sort(),
    appliances: [...new Set(appliances)].sort(),
    ustensils: [...new Set(listOfUstensils)].sort()
  };
}