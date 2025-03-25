import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemonStore'

export function usePokemon() {
  const pokemonStore = usePokemonStore()
  const { favorites, currentFilter } = storeToRefs(pokemonStore)
  const { toggleFavorite, updateDisplayedPokemon } = pokemonStore

  function toggleFavoriteAndFilter(pokemon) {
    toggleFavorite(pokemon)
    updateDisplayedPokemon()
  }

  function isFavorite(pokemon) {
    return favorites.value.some((fav) => fav.name === pokemon.name)
  }

  return {
    toggleFavoriteAndFilter,
    isFavorite,
    currentFilter,
  }
}
