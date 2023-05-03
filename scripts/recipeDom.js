export function buildRecipesDOM(recipesList) {
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
