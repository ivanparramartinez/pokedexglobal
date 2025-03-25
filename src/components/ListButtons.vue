<template>
  <div class="buttons-container">
    <div class="buttons-content">
      <CompButton
        text="All"
        :selected="selectedButton === 'all'"
        @click="selectButton('all')"
        icon
        full-width
      >
        <template #icon>
          <IconList />
        </template>
      </CompButton>
      <CompButton
        text="Favorites"
        :selected="selectedButton === 'favorites'"
        @click="selectButton('favorites')"
        icon
        full-width
      >
        <template #icon>
          <IconStar />
        </template>
      </CompButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CompButton from './CompButton.vue'
import IconStar from './icons/IconStar.vue'
import IconList from './icons/IconList.vue'

const selectedButton = ref('all')

function selectButton(button) {
  selectedButton.value = button
}
</script>

<style scoped>
.buttons-container {
  background-color: var(--primary-color);
  padding: var(--padding) 1.5rem;
  border-top: 1px solid var(--secondary-color);
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  box-shadow:
    0 -4px 6px -1px rgba(0, 0, 0, 0.1),
    0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

.buttons-content {
  display: flex;
  justify-content: center;
  gap: var(--gap);
  width: 100%;
}

.buttons-content > * {
  flex: 1;
}

@media (min-width: 1024px) {
  .buttons-container {
    display: flex;
    justify-content: center;
  }

  .buttons-content {
    width: 570px;
  }
}
</style>
