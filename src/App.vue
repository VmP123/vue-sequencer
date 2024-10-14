<script setup>
import { ref } from 'vue'
import * as Tone from 'tone';
import StepButton from './components/StepButton.vue'
import TextButton from './components/TextButton.vue'
import NoteLengthButton from './components/NoteLengthButton.vue'
import { noteLengths } from './constants/noteLengths';
import { useSequencerStore } from './stores/sequencerStore';

import Clave from './assets/clave.wav';
import Kick from './assets/kick06.wav';

const columnCount = 8;
const rowCount = 5;

const sequencerStore = useSequencerStore();
const isPlaying = ref(false);
const audioContextStarted = ref(false);

const player = new Tone.Player(Clave).toDestination();
const kickPlayer = new Tone.Player(Kick).toDestination();

Tone.loaded();

function startAudioContext() {
  Tone.start().then(() => {
		audioContextStarted.value = true;
  }).catch(err => {
    console.error('Failed to start audio context:', err);
  });
}

function toggle() {
  if (!audioContextStarted.value) {
    startAudioContext();
  }

  isPlaying.value = !isPlaying.value;

  if (isPlaying.value) {
    Tone.Transport.start();
  } else {
		stopAndResetSequencer();
  }
}

function stopAndResetSequencer() {
  Tone.Transport.pause();
  Tone.Transport.position = 0;
  currentSteps = Array(rowCount).fill(0);
}

let currentSteps = Array(rowCount).fill(0);

function playStep() {
	const currentStep = getCurrentStep();

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    if (currentStep[rowIndex]) {
			if (rowIndex == 4)
				kickPlayer.start();
			else if (rowIndex == 3)
				player.start();
    }
  }
}

function getCurrentStep() {
	const steps = sequencerStore.steps;

  const result = steps.map((item, index) => {
		const speed = noteLengths[sequencerStore.rowSpeed[index]].value;
		return currentSteps[index] % speed == 0 ? item[Math.trunc(currentSteps[index] / speed)] : false
	});

  currentSteps.forEach((step, index) => {
		const speed = noteLengths[sequencerStore.rowSpeed[index]].value;
		return currentSteps[index] = (step + 1) % (steps[index].length * speed)
	});

  return result;
}

const scheduleInterval = "96hz"; //"48hz";
Tone.Transport.scheduleRepeat(playStep, scheduleInterval);
</script>

<template>
  <div class="controls">
    <TextButton @click="toggle">P</TextButton>  
  </div>
  <div class="step-button-container">
    <template v-for="rowIndex in rowCount">
      <StepButton v-for="(n, i) in columnCount" :row-index="rowIndex - 1" :column-index="i" />
      <NoteLengthButton :row-index="rowIndex - 1" />
    </template>
  </div>
</template>
