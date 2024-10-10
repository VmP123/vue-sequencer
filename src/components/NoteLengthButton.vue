<script setup>
import { useSequencerStore } from '../stores/sequencerStore'
import { noteLengths } from '../constants/noteLengths';

const { rowIndex, columnIndex } = defineProps(['rowIndex'])

const sequencerStore = useSequencerStore();

function changeNextValue() {
	sequencerStore.rowSpeed[rowIndex] = (sequencerStore.rowSpeed[rowIndex] + 1) % noteLengths.length;
}
</script>

<template>
  <div @click="changeNextValue" class="button" >
    <span style="font-size: 40px;">{{noteLengths[sequencerStore.rowSpeed[rowIndex]].text}}</span>
  </div>
</template>
