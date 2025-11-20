function calculateProjectNPV() {
    const investment = parseFloat(document.getElementById('npv-investment').value);
    const discountRate = parseFloat(document.getElementById('npv-rate').value) / 100;
    const cashflowsText = document.getElementById('npv-cashflows').value;

    if (isNaN(investment) || isNaN(discountRate) || !cashflowsText) {
        showError('npv-project-result', 'Пожалуйста, заполните все поля корректно');
        return;
    }

    const cashflows = cashflowsText.split(',').map(val => parseFloat(val.trim()));

    if (cashflows.some(isNaN)) {
        showError('npv-project-result', 'Проверьте формат денежных потоков');
        return;
    }

    let npv = -investment;
    cashflows.forEach((cashflow, index) => {
        const year = index + 1;
        npv += cashflow / Math.pow(1 + discountRate, year);
    });

    const interpretation = getNPVInterpretation(npv);

    document.getElementById('npv-project-result').innerHTML = `
        <strong>Чистая приведенная стоимость (NPV):</strong> ${npv.toFixed(2)} руб.<br>
        <small>${interpretation}</small>
    `;
}

function calculateIRR() {
    const investment = parseFloat(document.getElementById('irr-investment').value);
    const cashflowsText = document.getElementById('irr-cashflows').value;

    if (isNaN(investment) || !cashflowsText) {
        showError('irr-result', 'Пожалуйста, заполните все поля корректно');
        return;
    }

    const cashflows = cashflowsText.split(',').map(val => parseFloat(val.trim()));

    if (cashflows.some(isNaN)) {
        showError('irr-result', 'Проверьте формат денежных потоков');
        return;
    }

    let irr = calculateSimpleIRR(-investment, cashflows);
    const interpretation = getIRRInterpretation(irr);

    document.getElementById('irr-result').innerHTML = `
        <strong>Внутренняя норма доходности (IRR):</strong> ${(irr * 100).toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateProjectPayback() {
    const investment = parseFloat(document.getElementById('pb-investment').value);
    const cashflow = parseFloat(document.getElementById('pb-annual-cashflow').value);

    if (isNaN(investment) || isNaN(cashflow)) {
        showError('project-payback-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (cashflow === 0) {
        showError('project-payback-result', 'Годовой денежный поток не может быть нулевым');
        return;
    }

    const payback = investment / cashflow;
    const interpretation = getPaybackInterpretation(payback);

    document.getElementById('project-payback-result').innerHTML = `
        <strong>Срок окупаемости проекта:</strong> ${payback.toFixed(2)} года(лет)<br>
        <small>${interpretation}</small>
    `;
}

function calculatePI() {
    const investment = parseFloat(document.getElementById('pi-investment').value);
    const discountRate = parseFloat(document.getElementById('pi-rate').value) / 100;
    const cashflowsText = document.getElementById('pi-cashflows').value;

    if (isNaN(investment) || isNaN(discountRate) || !cashflowsText) {
        showError('pi-result', 'Пожалуйста, заполните все поля корректно');
        return;
    }

    const cashflows = cashflowsText.split(',').map(val => parseFloat(val.trim()));

    if (cashflows.some(isNaN)) {
        showError('pi-result', 'Проверьте формат денежных потоков');
        return;
    }

    let pv = 0;
    cashflows.forEach((cashflow, index) => {
        const year = index + 1;
        pv += cashflow / Math.pow(1 + discountRate, year);
    });

    const pi = pv / investment;
    const interpretation = getPIIinterpretation(pi);

    document.getElementById('pi-result').innerHTML = `
        <strong>Индекс рентабельности (PI):</strong> ${pi.toFixed(2)}<br>
        <small>${interpretation}</small>
    `;
}

function calculateSimpleIRR(initial, cashflows) {
    let rate = 0.1;
    let npv = initial;
    cashflows.forEach((cashflow, index) => {
        npv += cashflow / Math.pow(1 + rate, index + 1);
    });

    if (npv > 0) {
        rate += 0.05;
    } else {
        rate -= 0.05;
    }

    return Math.max(0, Math.min(rate, 1));
}

function getNPVInterpretation(npv) {
    if (npv > 0) return '✅ Проект прибыльный';
    if (npv === 0) return '⚠️ Проект безубыточный';
    return '❌ Проект убыточный';
}

function getIRRInterpretation(irr) {
    if (irr > 0.25) return '✅ Отличная доходность';
    if (irr > 0.15) return '👍 Хорошая доходность';
    if (irr > 0.08) return '⚠️ Приемлемая доходность';
    return '❌ Низкая доходность';
}

function getPaybackInterpretation(payback) {
    if (payback < 2) return '✅ Быстрая окупаемость';
    if (payback < 5) return '👍 Стандартная окупаемость';
    return '❌ Длительная окупаемость';
}

function getPIIinterpretation(pi) {
    if (pi > 1.5) return '✅ Высокая рентабельность';
    if (pi > 1.2) return '👍 Хорошая рентабельность';
    if (pi > 1) return '⚠️ Приемлемая рентабельность';
    return '❌ Нерентабельный проект';
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <span style="color: #e53e3e;">❌ ${message}</span>
    `;
}
