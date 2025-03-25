import { shallowMount } from '@vue/test-utils'
import PokemonIcon from '@/components/icons/PokemonIcon.vue'
import IconStar from '@/components/icons/IconStar.vue'
import { describe, it, expect, vi } from 'vitest'

describe('PokemonIcon.vue', () => {
  it('renders IconStar component', () => {
    const pokemon = { name: 'Pikachu' }
    const toggleFavoriteAndFilter = vi.fn()
    const isFavorite = vi.fn().mockReturnValue(true)

    const wrapper = shallowMount(PokemonIcon, {
      props: {
        pokemon,
        toggleFavoriteAndFilter,
        isFavorite,
      },
    })

    expect(wrapper.findComponent(IconStar).exists()).toBe(true)
  })

  it('calls toggleFavoriteAndFilter when clicked', async () => {
    const pokemon = { name: 'Pikachu' }
    const toggleFavoriteAndFilter = vi.fn()
    const isFavorite = vi.fn().mockReturnValue(true)

    const wrapper = shallowMount(PokemonIcon, {
      props: {
        pokemon,
        toggleFavoriteAndFilter,
        isFavorite,
      },
    })

    await wrapper.find('.pokemon-icon').trigger('click')
    expect(toggleFavoriteAndFilter).toHaveBeenCalledWith(pokemon)
  })

  it('passes isFavorite prop to IconStar', () => {
    const pokemon = { name: 'Pikachu' }
    const toggleFavoriteAndFilter = vi.fn()
    const isFavorite = vi.fn().mockReturnValue(true)

    const wrapper = shallowMount(PokemonIcon, {
      props: {
        pokemon,
        toggleFavoriteAndFilter,
        isFavorite,
      },
    })

    const iconStar = wrapper.findComponent(IconStar)
    expect(iconStar.props('isFavorite')).toBe(true)
  })
})
