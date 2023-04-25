import { createTagPill } from "./tags.js";

const $tagsContainer = document.querySelector('.tags-container');
const $filterButtons = document.querySelectorAll('.filters .btn');
const $ingredientsListContainer = document.querySelector(".ingredients-filter__list");
const $appliancesListContainer = document.querySelector(".appliances-filter__list");
const $ustensilsListContainer = document.querySelector(".ustensils-filter__list");

export function buildFiltersContentItems(recipes) {
  _buildIngredientsFilterItems(recipes);
  _buildAppliancesFilterItems(recipes);
  _buildUstensilsFilterItems(recipes);
  _handleFilterButtonsBehaviour();
}

function _buildIngredientsFilterItems(recipes) {
  const allIngredients = (recipes) => {
    let listOfIngredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        listOfIngredients.push(ingredient.ingredient.toLowerCase());
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
      addTagPillOnClick(this.innerText);
    });
  });
}

function _buildAppliancesFilterItems(recipes) {
  const allAppliances = (recipes) => {
    let listOfAppliances = [];
    recipes.forEach((recipe) => {
      listOfAppliances.push(recipe.appliance.toLowerCase());
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
      addTagPillOnClick(this.innerText);
    });
  });
}

function _buildUstensilsFilterItems(recipes) {
  const allUstensils = (recipes) => {
    let listOfUstensils = [];
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        listOfUstensils.push(ustensil.toLowerCase());
      });
    });
  
    // create an array with unique values
    const ustensilesFilter = [...new Set(listOfUstensils)];
    ustensilesFilter.sort();
    return ustensilesFilter;
  };

  allUstensils(recipes).forEach((ingredient) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.classList.add('filter-list__item');
    ustensilItem.innerText = ingredient;
    $ustensilsListContainer.appendChild(ustensilItem);
    ustensilItem.addEventListener('click', function() {
      addTagPillOnClick(this.innerText);
    });
  });
}

// manage filter buttons classes for UI modifications
function _handleFilterButtonsBehaviour() {
  $filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      // remove selected class when already selected class is click again
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
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
function addTagPillOnClick(elementInnerText) {
  const newTag = createTagPill(elementInnerText);
  $tagsContainer.appendChild(newTag);

  // Remove tag from container
  newTag.addEventListener('click', function() {
    this.remove();
  });
}
