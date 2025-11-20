function calculateTurnover() {
    const employeesLeft = parseFloat(document.getElementById('employees-left').value);
    const avgEmployees = parseFloat(document.getElementById('avg-employees').value);

    if (isNaN(employeesLeft) || isNaN(avgEmployees)) {
        showError('turnover-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (avgEmployees === 0) {
        showError('turnover-result', 'Среднесписочная численность не может быть нулевой');
        return;
    }

    const turnover = (employeesLeft / avgEmployees) * 100;
    const interpretation = getTurnoverInterpretation(turnover);

    document.getElementById('turnover-result').innerHTML = `
        <strong>Текучесть кадров:</strong> ${turnover.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateCostPerHire() {
    const recruitmentCosts = parseFloat(document.getElementById('recruitment-costs').value);
    const hiredCount = parseFloat(document.getElementById('hired-count').value);

    if (isNaN(recruitmentCosts) || isNaN(hiredCount)) {
        showError('cost-per-hire-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (hiredCount === 0) {
        showError('cost-per-hire-result', 'Количество нанятых сотрудников не может быть нулевым');
        return;
    }

    const costPerHire = recruitmentCosts / hiredCount;
    const interpretation = getCostPerHireInterpretation(costPerHire);

    document.getElementById('cost-per-hire-result').innerHTML = `
        <strong>Стоимость найма:</strong> ${costPerHire.toFixed(2)} руб.<br>
        <small>${interpretation}</small>
    `;
}

function calculateTrainingROI() {
    const trainingBenefits = parseFloat(document.getElementById('training-benefits').value);
    const trainingCosts = parseFloat(document.getElementById('training-costs').value);

    if (isNaN(trainingBenefits) || isNaN(trainingCosts)) {
        showError('training-roi-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (trainingCosts === 0) {
        showError('training-roi-result', 'Затраты на обучение не могут быть нулевыми');
        return;
    }

    const trainingROI = ((trainingBenefits - trainingCosts) / trainingCosts) * 100;
    const interpretation = getTrainingROIInterpretation(trainingROI);

    document.getElementById('training-roi-result').innerHTML = `
        <strong>ROI обучения:</strong> ${trainingROI.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateAbsenteeism() {
    const absentDays = parseFloat(document.getElementById('absent-days').value);
    const totalWorkdays = parseFloat(document.getElementById('total-workdays').value);

    if (isNaN(absentDays) || isNaN(totalWorkdays)) {
        showError('absenteeism-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (totalWorkdays === 0) {
        showError('absenteeism-result', 'Общее количество рабочих дней не может быть нулевым');
        return;
    }

    const absenteeism = (absentDays / totalWorkdays) * 100;
    const interpretation = getAbsenteeismInterpretation(absenteeism);

    document.getElementById('absenteeism-result').innerHTML = `
        <strong>Уровень абсентеизма:</strong> ${absenteeism.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function getTurnoverInterpretation(turnover) {
    if (turnover < 5) return '✅ Отличный показатель';
    if (turnover < 10) return '👍 Хороший показатель';
    if (turnover < 15) return '⚠️ Средний показатель';
    return '❌ Высокая текучесть';
}

function getCostPerHireInterpretation(cost) {
    if (cost < 10000) return '✅ Низкая стоимость найма';
    if (cost < 25000) return '👍 Средняя стоимость найма';
    if (cost < 50000) return '⚠️ Высокая стоимость найма';
    return '❌ Очень высокая стоимость найма';
}

function getTrainingROIInterpretation(roi) {
    if (roi > 200) return '✅ Отличная окупаемость обучения';
    if (roi > 100) return '👍 Хорошая окупаемость';
    if (roi > 50) return '⚠️ Приемлемая окупаемость';
    if (roi > 0) return '❌ Низкая окупаемость';
    return '🚫 Обучение не окупается';
}

function getAbsenteeismInterpretation(rate) {
    if (rate < 2) return '✅ Отличная посещаемость';
    if (rate < 4) return '👍 Хорошая посещаемость';
    if (rate < 6) return '⚠️ Средняя посещаемость';
    return '❌ Низкая посещаемость';
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <span style="color: #e53e3e;">❌ ${message}</span>
    `;
}
