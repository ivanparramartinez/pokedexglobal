<template>
  <button :class="[buttonClass, 'button-class']" :style="{ width: buttonWidth }">
    <slot name="icon" v-if="icon"></slot>
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: true,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const buttonClass = computed(() => ({
  selected: props.selected,
  unselected: !props.selected,
}))

const buttonWidth = computed(() => (props.fullWidth ? '100%' : 'auto'))
</script>

<style scoped>
.button-class {
  color: white;
  border-radius: 9999px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  box-shadow: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.selected {
  background-color: #f22539;
}
.selected:active {
  background-color: #c00e20;
}
.unselected {
  background-color: #bfbfbf;
}
</style>
