let currentPokemon = 1; // Stocke l'ID du Pokémon actuellement affiché

// Fonction pour récupérer les données d'un Pokémon depuis l'API
async function getPokemonData(id) {
  // Effectue une requête à l'API Pokémon en utilisant l'ID fourni
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  // Retourne les données JSON de la réponse
  return await response.json();
}

// Fonction pour mettre à jour l'affichage du Pokémon sur la page
function updatePokemonDisplay(data) {
  // Met à jour le nom du Pokémon en majuscules
  document.getElementById("name").textContent = data.name.toUpperCase();

  // Met à jour l'image du Pokémon (sprite)
  document.getElementById("sprite").src =
    data.sprites.versions["generation-v"]["black-white"].front_default;

  // Met à jour l'ID du Pokémon sous forme de texte
  document.getElementById("id").textContent = `#${data.id}`;
}

/**
 * Conseil : Séparer les responsabilités
 *
 * Il est important de séparer les différentes tâches dans des fonctions distinctes :
 * - La fonction `getPokemonData` est responsable de la récupération des données depuis l'API.
 * - La fonction `updatePokemonDisplay` s'occupe uniquement de mettre à jour l'affichage du DOM.
 *
 * Cette approche permet d'améliorer la lisibilité, la réutilisabilité et la maintenabilité du code.
 * Si une modification est nécessaire dans l'une des fonctionnalités (récupérer les données ou afficher les informations),
 * elle peut être effectuée sans affecter l'autre partie du code.
 */

// Fonction principale pour charger un Pokémon et mettre à jour l'affichage
async function loadPokemon(id) {
  // Récupère les données du Pokémon en utilisant l'ID
  const data = await getPokemonData(id);

  // Met à jour l'affichage avec les données récupérées
  updatePokemonDisplay(data);
}

/**
 * Conseil : Utilisation d'`await` pour éviter les problèmes de rendu asynchrone
 *
 * Lorsque des opérations asynchrones sont effectuées, comme la récupération des données de l'API,
 * il est crucial d'utiliser `await` pour s'assurer que ces opérations sont terminées avant de continuer.
 * Sans `await`, il y a un risque que le DOM soit mis à jour avant que les données ne soient entièrement récupérées,
 * ce qui peut entraîner des erreurs d'affichage.
 * L'utilisation de `await` garantit que le processus d'affichage se déroule dans le bon ordre et de manière fiable.
 */

// Fonction pour afficher le Pokémon suivant
async function nextPokemon() {
  // Vérifie que l'ID ne dépasse pas 151 (limite de la première génération 🩷)
  if (currentPokemon < 151) {
    currentPokemon++; // Incrémente l'ID du Pokémon
    await loadPokemon(currentPokemon); // Charge et affiche le Pokémon suivant
  }
}

// Fonction pour afficher le Pokémon précédent
async function prevPokemon() {
  // Vérifie que l'ID ne descend pas en dessous de 1
  if (currentPokemon > 1) {
    currentPokemon--; // Décrémente l'ID du Pokémon
    await loadPokemon(currentPokemon); // Charge et affiche le Pokémon précédent
  }
}

/**
 * Conseil : Charger dynamiquement le premier Pokémon
 *
 * Il est préférable de charger dynamiquement le premier Pokémon via la fonction `loadPokemon(currentPokemon)`
 * plutôt que de définir manuellement une valeur initiale dans le DOM. Cela permet de garder une logique uniforme
 * dans le processus d'affichage des Pokémon, et facilite les modifications futures si la source des données change
 * ou si la logique de démarrage doit être ajustée.
 */

// Charge et affiche le premier Pokémon au démarrage de la page
loadPokemon(currentPokemon);
