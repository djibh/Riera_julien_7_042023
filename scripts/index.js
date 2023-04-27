import { recipes } from "../data/recipes.js";
import { buildFiltersContentItems } from "./filter.js";

const bsRow = document.getElementById("recipes-grid");
let results = recipes;

showRecipes(recipes);
searchRecipes();
buildFiltersContentItems(recipes);

function searchRecipes() {
  const input = document.getElementById("search-bar");

  input.addEventListener("input", () => {
    const userInput = input.value.trim().toLowerCase();

    // refresh recipes grid
    bsRow.innerHTML = "";

    // check for input length
    if (userInput.length < 3) {
      showRecipes(recipes);
      return;
    }

    // fetch results from search and update recipes grid
    results = getMatchingResults(userInput);
    showRecipes(results);
  });

  function getMatchingResults(input) {
    //FIXME - add check in ingredients
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(input) ||
        recipe.description.toLowerCase().includes(input)
    );
  }
}

function filterByTags(recipesList) {
  const ingredientTags = document.querySelectorAll('.ingredient-tag');
  const applianceTags = document.querySelectorAll('.appliance-tag');
  const ustensilTags = document.querySelectorAll('.ustensile-tag');

  let filterredResults = [];


}

function showRecipes(recipesList) {
  recipesList.forEach((recipe) => {
    const ingredients = recipe.ingredients;

    const cardBsContainer = document.createElement("div");
    cardBsContainer.classList.add('col-lg-4', 'col-md-6', 'card-container', 'gy-4');
    const recipeCard = document.createElement("article");
    recipeCard.classList.add("card");
    recipeCard.classList.add("recipe-card");
    const img = document.createElement("img");
    img.classList.add("recipe-card__img");
    img.classList.add("card-img-top");
    recipeCard.appendChild(img);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const title = document.createElement("h2");
    title.classList.add("recipe-card__title");
    title.innerText = recipe.name;

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredients-list");

    ingredients.forEach((ingredient) => {
      let text = `${ingredient.ingredient}`;

      if (ingredient.quantity) {
        text += `: ${ingredient.quantity}`;
      }

      if (ingredient.unit) {
        text += ` ${ingredient.unit}`;
      }

      const ingredientItem = document.createElement("li");
      ingredientItem.classList.add("card-text");
      ingredientItem.innerText = text;
      ingredientsList.appendChild(ingredientItem);
    });

    cardBsContainer.appendChild(recipeCard);
    cardBody.appendChild(title);
    cardBody.appendChild(ingredientsList);
    recipeCard.appendChild(cardBody);

    bsRow.appendChild(cardBsContainer);
  });
}
