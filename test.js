const steps = [
  [true, true, false, true ],
  [true, false, true, false]
];

const speeds = [1, 2];

const currentStep = [0, 0];

function getNextSteps() {
  const result = steps.map((item, index) =>
		currentStep[index] % speeds[index] == 0 ? item[Math.trunc(currentStep[index] / speeds[index])] : false
  );

  currentStep.forEach((step, i) =>
    currentStep[i] = (step + 1) % (steps[i].length * speeds[i])
  );

  return result;
}

for (let i = 0; i < 8; i++) {
  console.log(getNextSteps(steps));  
}

var a = [4, 6, 12, 24, 36];

for (let i = 0; i < a.length; i++) {
  console.log(a[Math.floor(a.length / 2)] / a[i]);
}


// 1 2 (4) 6 8
// 4x 2x 1x 1/3x 1/2x




// 4, 6, 12, 24, 36
// x3 2x 1x 1/2x 1/3x