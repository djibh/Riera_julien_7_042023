const $filterButtons = document.querySelectorAll('.filters .btn');
const $ingredientsListContainer = document.querySelector('.ingredients-filter__list');
const $appliancesListContainer = document.querySelector('.appliances-filter__list');
const $ustensilsListContainer = document.querySelector('.ustensils-filter__list');

// manage filter buttons classes for UI modifications
export function handlefilterButtons() {
  $filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      // remove selected class when already selected class is click again
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
        return;
      }

      // Reduce size of other filters before increasing size of the new selected one
      removeSelectedClassFor$filterButtons();
      this.classList.toggle("selected");
    });
  });

  function removeSelectedClassFor$filterButtons() {
    $filterButtons.forEach((button) => {
      if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        return;
      }
    });
  }
}

export function buildFiltersContentItems(recipes) {
  _filterIngredientsList(allIngredients(recipes));
  _filterAppliancesList(allAppliances(recipes));
  _filterUstensilesList(allUstensils(recipes));
}

function _filterIngredientsList(ingredients) {
    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.innerText = ingredient;
        $ingredientsListContainer.appendChild(ingredientItem);
    });
}

function _filterAppliancesList(appliances) {
  appliances.forEach(appliance => {
      const applianceItem = document.createElement('li');
      applianceItem.innerText = appliance;
      $appliancesListContainer.appendChild(applianceItem);
  });
}

function _filterUstensilesList(ustensils) {
  ustensils.forEach(ingredient => {
      const ustensilItem = document.createElement('li');
      ustensilItem.innerText = ingredient;
      $ustensilsListContainer.appendChild(ustensilItem);
  });
}

// tags variables
const allIngredients = (recipes) => {
  let listOfIngredients = [];
  recipes.forEach(recipe => {
    recipe.ingredients.forEach((ingredient) => {
      listOfIngredients.push(ingredient.ingredient.toLowerCase());
    });
  });

  // create an array with unique values
  const ingredientsFilter = [...new Set(listOfIngredients)];
  ingredientsFilter.sort();
  return ingredientsFilter;
};

const allAppliances = (recipes) => {
  let listOfAppliances = [];
  recipes.forEach(recipe => {
    listOfAppliances.push(recipe.appliance.toLowerCase());
  });

  const appliancesFilter = [...new Set(listOfAppliances)];
  appliancesFilter.sort();
  return appliancesFilter;
};

const allUstensils = (recipes) => {
  let listOfUstensils = [];
  recipes.forEach(recipe => {
    recipe.ustensils.forEach((ustensil) => {
      listOfUstensils.push(ustensil.toLowerCase());
    });
  });

  // create an array with unique values
  const ustensilesFilter = [...new Set(listOfUstensils)];
  ustensilesFilter.sort();
  return ustensilesFilter;
};