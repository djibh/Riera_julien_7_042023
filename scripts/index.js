import { recipes } from "../data/recipes.js";

const bsRow = document.getElementById("recipes-grid");

recipes.forEach((recipe) => {
  const cardBsContainer = document.createElement('div');
  cardBsContainer.classList.add('col-lg-4');
  cardBsContainer.classList.add('gy-4');
  const recipeCard = document.createElement("article");
  recipeCard.classList.add('recipe-card');
  const title = document.createElement("h2");
  title.classList.add('recipe-card__title')
  title.innerText = recipe.name;

  cardBsContainer.appendChild(recipeCard);
  recipeCard.appendChild(title);

  bsRow.appendChild(cardBsContainer);
});