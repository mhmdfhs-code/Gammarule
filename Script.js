// Medication data
const medications = {
    levophed: { min: 0.2, max: 3 },
    dopamine: { min: 10, max: 20 }
};

let selectedMedication = null;

// Function to select Levophed
function selectLevophed() {
    selectedMedication = 'levophed';
    updateSideNote('Levophed', medications.levophed.min, medications.levophed.max);
    updateSelectionMark('levophed-btn');
}

// Function to select Dopamine
function selectDopamine() {
    selectedMedication = 'dopamine';
    updateSideNote('Dopamine', medications.dopamine.min, medications.dopamine.max);
    updateSelectionMark('dopamine-btn');
}

// Function to update the side note
function updateSideNote(medication, min, max) {
    const levophedRange = document.getElementById('levophed-range');
    const dopamineRange = document.getElementById('dopamine-range');

    if (medication === 'Levophed') {
        levophedRange.innerHTML = `<strong>Levophed:</strong> ${min} - ${max} gamma (selected)`;
        dopamineRange.innerHTML = `<strong>Dopamine:</strong> 10 - 20 gamma`;
    } else if (medication === 'Dopamine') {
        levophedRange.innerHTML = `<strong>Levophed:</strong> 0.2 - 3 gamma`;
        dopamineRange.innerHTML = `<strong>Dopamine:</strong> ${min} - ${max} gamma (selected)`;
    }
}

// Function to update the selection mark
function updateSelectionMark(selectedButtonId) {
    const levophedBtn = document.getElementById('levophed-btn');
    const dopamineBtn = document.getElementById('dopamine-btn');

    levophedBtn.classList.remove('selected');
    dopamineBtn.classList.remove('selected');

    if (selectedButtonId === 'levophed-btn') {
        levophedBtn.classList.add('selected');
    } else if (selectedButtonId === 'dopamine-btn') {
        dopamineBtn.classList.add('selected');
    }
}

// Function to calculate the result and maximum dose
function calculate() {
    const gamma = parseFloat(document.getElementById('gamma').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const concentration = parseFloat(document.getElementById('concentration').value);

    if (isNaN(gamma) || isNaN(volume) || isNaN(weight) || isNaN(concentration)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }

    // Calculate the result
    const result = (gamma * volume * weight * 60) / (concentration * 1000);
    document.getElementById('result').innerText = `Result: ${result.toFixed(2)}`;

    // Calculate the maximum dose
    let maxDose;
    if (selectedMedication === 'levophed') {
        maxDose = (medications.levophed.max * volume * weight * 60) / (concentration * 1000);
    } else if (selectedMedication === 'dopamine') {
        maxDose = (medications.dopamine.max * volume * weight * 60) / (concentration * 1000);
    } else {
        maxDose = 0;
    }

    document.getElementById('max-dose').innerText = `Maximum Dose: ${maxDose.toFixed(2)}`;
}

// Function to restart the calculator
function restart() {
    document.getElementById('gamma').value = '';
    document.getElementById('volume').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('concentration').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('max-dose').innerText = '';
    updateSideNote('', 0, 0);
    updateSelectionMark('');
    selectedMedication = null;
}