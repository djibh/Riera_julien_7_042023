import { recipes } from "../data/recipes.js";

const bsRow = document.getElementById("recipes-grid");
let results = [];

showRecipes(recipes);
searchRecipes();

function searchRecipes() {
  const input = document.getElementById("search-bar");

  input.addEventListener("input", () => {
    const userInput = input.value.trim().toLowerCase();

    // Supprime les anciens résultats
    bsRow.innerHTML = "";

    // Vérifie que la recherche est suffisamment longue
    if (userInput.length < 3) {
      showRecipes(recipes);
      return;
    }

    // Récupère les résultats correspondants à la recherche
    results = getMatchingResults(userInput);
    showRecipes(results);
  });

  function getMatchingResults(input) {
    return recipes.filter((result) =>
      result.name.toLowerCase().includes(input)
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
    img.setAttribute("src", "../assets/logo.png");
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
