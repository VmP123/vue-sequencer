<script setup>
import { computed } from 'vue'
import { useSequencerStore } from '../stores/sequencerStore'

const { rowIndex, columnIndex } = defineProps(['rowIndex', 'columnIndex'])

const sequencerStore = useSequencerStore();

function toggle() {
	sequencerStore.steps[rowIndex][columnIndex] = !sequencerStore.steps[rowIndex][columnIndex];
}

const divClass = computed(() => {
	const isFirstOfFour = (columnIndex % 4) === 0;
  return "button step-button " + (isFirstOfFour ? "highlighted" : "normal")
});

</script>

<template>
  <div @click="toggle" :class="divClass" >
    <div class="step-button-inner" v-show="sequencerStore.steps[rowIndex][columnIndex]"></div>
  </div>
</template>
