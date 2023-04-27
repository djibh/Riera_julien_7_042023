import { createTagPill } from "./tags.js";

const $tagsContainer = document.querySelector('.tags-container');
const $filterButtons = document.querySelectorAll('.filters .btn');
const $ingredientsListContainer = document.querySelector(".ingredients-filter__list");
const $appliancesListContainer = document.querySelector(".appliances-filter__list");
const $ustensilsListContainer = document.querySelector(".ustensils-filter__list");

export function buildFiltersContentItems(recipes) {
  buildIngredientsFilterItems(recipes);
  buildAppliancesFilterItems(recipes);
  buildUstensilsFilterItems(recipes);
  handleFilterButtonsBehaviour();
}

// create ingredients li elements for filter buttons
function buildIngredientsFilterItems(recipes) {
  const allIngredients = (recipes) => {
    let listOfIngredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const formattedIngredient = capitalize(ingredient.ingredient);
        listOfIngredients.push(formattedIngredient);
      });
    });

    // create an array with unique values
    const ingredientsFilter = [...new Set(listOfIngredients)];
    ingredientsFilter.sort();
    return ingredientsFilter;
  };

  allIngredients(recipes).forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.classList.add('filter-list__item');
    ingredientItem.innerText = ingredient;
    $ingredientsListContainer.appendChild(ingredientItem);
    ingredientItem.addEventListener('click', function() {
      addTagPillOnClick(this.innerText, 'ingredient-tag');
    });
  });
}

// create appliances li elements for filter buttons
function buildAppliancesFilterItems(recipes) {
  const allAppliances = (recipes) => {
    let listOfAppliances = [];
    recipes.forEach((recipe) => {
      const formattedAppliance = capitalize(recipe.appliance);
      listOfAppliances.push(formattedAppliance);
    });

    const appliancesFilter = [...new Set(listOfAppliances)];
    appliancesFilter.sort();
    return appliancesFilter;
  };

  allAppliances(recipes).forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.classList.add('filter-list__item');
    applianceItem.innerText = appliance;
    $appliancesListContainer.appendChild(applianceItem);
    applianceItem.addEventListener('click', function() {
      addTagPillOnClick(this.innerText, 'appliance-tag');
    });
  });
}


// create ustensils li elements for filter buttons
function buildUstensilsFilterItems(recipes) {
  const allUstensils = (recipes) => {
    let listOfUstensils = [];
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        const formattedUstensil = capitalize(ustensil);
        listOfUstensils.push(formattedUstensil);
      });
    });
  
    // create an array with unique values
    const ustensilesFilter = [...new Set(listOfUstensils)];
    ustensilesFilter.sort();
    return ustensilesFilter;
  };

  allUstensils(recipes).forEach((ustensil) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.classList.add('filter-list__item');
    ustensilItem.innerText = ustensil;
    $ustensilsListContainer.appendChild(ustensilItem);
    ustensilItem.addEventListener('click', function() {
      addTagPillOnClick(this.innerText, 'ustensil-tag');
    });
  });
}

// manage filter buttons classes for UI modifications
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
      removeSelectedClassForfilterButtons();
      this.classList.toggle("selected");
    });
  });

  function removeSelectedClassForfilterButtons() {
    $filterButtons.forEach((button) => {
      if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        return;
      }
    });
  }
}

// call tag pill creation function using the clicked list element (ingredient, appliance or ustensil) and add to UI
function addTagPillOnClick(elementInnerText, tagFamily) {
  const newTag = createTagPill(elementInnerText);
  newTag.classList.add(tagFamily);
  $tagsContainer.appendChild(newTag);

  // Remove tag from container
  newTag.addEventListener('click', function() {
    this.remove();
  });
}

// takes a text in argument and return that text with first letter only to uppercase
function capitalize(text) {
  const uppercaseFirstLetter = text.charAt(0).toUpperCase();
  const formattedText = uppercaseFirstLetter + text.slice(1).toLowerCase();
  return formattedText;
}

// remove keyboard focus on active element - used in filter inputs
function removeFocus() {
  document.activeElement?.blur();
}