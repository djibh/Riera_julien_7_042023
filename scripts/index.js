import { recipes } from "../data/recipes.js";
import { buildFiltersContentItems } from "./filter.js";

const bsRow = document.getElementById("recipes-grid");
let results = [];

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

function showRecipes(recipesList) {
  recipesList.forEach((recipe) => {
    const ingredients = recipe.ingredients;

    const cardBsContainer = document.createElement("div");
    cardBsContainer.classList.add("col-lg-4");
    cardBsContainer.classList.add("col-md-6");
    cardBsContainer.classList.add("card-container");
    cardBsContainer.classList.add("gy-4");
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
      const ingredientItem = document.createElement("li");
      ingredientItem.classList.add("card-text");
      ingredientItem.innerText = `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`;
      ingredientsList.appendChild(ingredientItem);
    });

    cardBsContainer.appendChild(recipeCard);
    cardBody.appendChild(title);
    cardBody.appendChild(ingredientsList);
    recipeCard.appendChild(cardBody);

    bsRow.appendChild(cardBsContainer);
  });
}
