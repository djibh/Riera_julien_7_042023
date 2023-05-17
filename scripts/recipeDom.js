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
    const imgContainer = document.createElement('div');
    imgContainer.classList.add("card-img-top");
    const img = document.createElement('img');
    img.setAttribute('src', '../assets/logo.png');
    img.setAttribute('alt', 'Logo du site Les Petits Plats');
    img.classList.add("recipe-card__img");
    imgContainer.appendChild(img);

    recipeCard.appendChild(imgContainer);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('col-8');
    const title = document.createElement("h2");
    title.classList.add('recipe-card__title');
    title.innerText = recipe.name;
    titleContainer.appendChild(title);

    const timeContainer = document.createElement('div');
    timeContainer.classList.add('col-4', 'recipe-card__duration-container');
    const time = document.createElement("strong");
    time.classList.add('recipe-card__duration');
    timeContainer.appendChild(time);
    
    time.innerText = `${recipe.time} min `;

    const cardBodyHeader = document.createElement('div');
    cardBodyHeader.classList.add('row');
    cardBodyHeader.appendChild(titleContainer);
    cardBodyHeader.appendChild(timeContainer);

    const ingredientsListContainer = document.createElement('div');
    ingredientsListContainer.classList.add('col');
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

    ingredientsListContainer.appendChild(ingredientsList);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('col');
    const description = document.createElement("p");
    description.innerText = recipe.description;
    description.classList.add('card__description-text');
    descriptionContainer.appendChild(description);

    const cardBodyContent = document.createElement('div');
    cardBodyContent.classList.add('row');
    cardBodyContent.appendChild(ingredientsListContainer);
    cardBodyContent.appendChild(descriptionContainer);

    cardBsContainer.appendChild(recipeCard);

    cardBody.appendChild(cardBodyHeader);
    cardBody.appendChild(cardBodyContent);

    recipeCard.appendChild(cardBody);

    bsRow.appendChild(cardBsContainer);
  });
}
