export function notFound() {
    const bsRow = document.getElementById("recipes-grid");
    bsRow.innerHTML = 
        `<div style='width: 100%; text-align: center; justify-content: space-between; align-item: center'>
            <p class='not-found__message' style='margin-top: 3em; font-size: 1.5rem; color: #555'>Aucun résultat trouvé.<br/>Essayez de modifier la recherche.</p>
            <img class='not-found__image' src='../assets/koala-not-found-round.png' style='position: fixed; bottom: 0px; right: -15px; height: 200px'>
         </div>`;
    
    return bsRow;
}