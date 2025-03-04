let currentPokemon = 1; // Stocke l'ID du Pokémon actuellement affiché

// Fonction pour récupérer les données d'un Pokémon depuis l'API
async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // Récupération des données via l'API
  const data = await response.json(); // Conversion de la réponse en JSON

  // MàJ du nom du Pokémon en majuscules
  document.getElementById("name").textContent = data.name.toUpperCase();

  // MàJ de l'image du Pokémon
  document.getElementById("sprite").src =
    data.sprites.versions["generation-v"]["black-white"].front_default;

  // MàJ de l'ID du Pokémon sous forme de texte
  document.getElementById("id").textContent = `#${data.id}`;
}

// Fonction pour afficher le Pokémon suivant
function nextPokemon() {
  if (currentPokemon < 151) {
    // Vérifie que l'ID ne dépasse pas 151 (limite 1ère génération 🩷)
    currentPokemon++; // Incrémente l'ID
    fetchPokemon(currentPokemon); // Met à jour l'affichage avec le nouveau Pokémon
  }
}

// Fonction pour afficher le Pokémon précédent
function prevPokemon() {
  if (currentPokemon > 1) {
    // Vérifie que l'ID ne descend pas en dessous de 1
    currentPokemon--; // Décrémente l'ID
    fetchPokemon(currentPokemon); // Met à jour l'affichage avec le nouveau Pokémon
  }
}

fetchPokemon(currentPokemon); // Charge le premier Pokémon au démarrage
