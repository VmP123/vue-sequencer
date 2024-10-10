import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSequencerStore = defineStore('sequencer', () => {
  const steps = ref(Array.from({ length: 5 }, () => Array(8).fill(false)));
	const rowSpeed = ref([0, 1, 2, 1, 1]);
  return { steps, rowSpeed }
})
