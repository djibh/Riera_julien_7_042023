import { notFound } from "./not-found.js";

export function buildRecipesDOM(recipesList) {

  // show a no result found view when search() provides no result
  if (recipesList.length === 0) {
    notFound();
  }

  recipesList.forEach((recipe) => {
    const bsRow = document.getElementById("recipes-grid");
    const ingredients = recipe.ingredients;

    const cardBsContainer = document.createElement("div");
    cardBsContainer.classList.add(
      "col-lg-4",
      "col-md-6",
      "card-container",
      "gy-4"
    );
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
    title.classList.add('col', 'recipe-card__title');
    title.innerText = recipe.name;

    const time = document.createElement("strong");
    time.classList.add('col', 'recipe-card__duration');
    const clock = document.createElement("i");
    clock.classList.add("fa-sharp", "fa-regular", "fa-clock");
    time.innerText = `${recipe.time} min `;
    time.appendChild(clock);

    const cardBodyHeader = document.createElement('div');
    cardBodyHeader.classList.add('row');
    cardBodyHeader.appendChild(title);
    cardBodyHeader.appendChild(time);

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add('col');
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

    const description = document.createElement("p");
    description.innerText = recipe.description;
    description.classList.add('col', 'card__description-text');

    const cardBodyContent = document.createElement('div');
    cardBodyContent.classList.add('row');
    cardBodyContent.appendChild(ingredientsList);
    cardBodyContent.appendChild(description);

    cardBsContainer.appendChild(recipeCard);

    cardBody.appendChild(cardBodyHeader);
    cardBody.appendChild(cardBodyContent);

    recipeCard.appendChild(cardBody);

    bsRow.appendChild(cardBsContainer);
  });
}
