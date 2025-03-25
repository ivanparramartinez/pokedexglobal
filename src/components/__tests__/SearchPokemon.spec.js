import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SearchPokemon from '../SearchPokemon.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePokemonStore } from '@/stores/pokemonStore'

describe('SearchPokemon.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the search input', () => {
    const wrapper = mount(SearchPokemon)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search Pokémon')
  })

  it('updates the search query in the store', async () => {
    const wrapper = mount(SearchPokemon)
    const input = wrapper.find('input')
    await input.setValue('Pikachu')
    const store = usePokemonStore()
    expect(store.searchQuery).toBe('Pikachu')
  })
})
