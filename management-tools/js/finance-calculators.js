function calculateROS() {
    const revenue = parseFloat(document.getElementById('revenue').value);
    const profit = parseFloat(document.getElementById('profit').value);

    if (isNaN(revenue) || isNaN(profit)) {
        showError('ros-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (revenue === 0) {
        showError('ros-result', 'Выручка не может быть нулевой');
        return;
    }

    const ros = (profit / revenue) * 100;
    const interpretation = getROSInterpretation(ros);

    document.getElementById('ros-result').innerHTML = `
        <strong>Рентабельность продаж (ROS):</strong> ${ros.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateROI() {
    const investment = parseFloat(document.getElementById('investment-roi').value);
    const netProfit = parseFloat(document.getElementById('net-profit').value);

    if (isNaN(investment) || isNaN(netProfit)) {
        showError('roi-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (investment === 0) {
        showError('roi-result', 'Сумма инвестиций не может быть нулевой');
        return;
    }

    const roi = (netProfit / investment) * 100;
    const interpretation = getROIInterpretation(roi);

    document.getElementById('roi-result').innerHTML = `
        <strong>Рентабельность инвестиций (ROI):</strong> ${roi.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculatePayback() {
    const investment = parseFloat(document.getElementById('investment-payback').value);
    const cashflow = parseFloat(document.getElementById('annual-cashflow').value);

    if (isNaN(investment) || isNaN(cashflow)) {
        showError('payback-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (cashflow === 0) {
        showError('payback-result', 'Денежный поток не может быть нулевым');
        return;
    }

    const payback = investment / cashflow;
    const interpretation = getPaybackInterpretation(payback);

    document.getElementById('payback-result').innerHTML = `
        <strong>Срок окупаемости:</strong> ${payback.toFixed(2)} года(лет)<br>
        <small>${interpretation}</small>
    `;
}

function calculateNPV() {
    const investment = parseFloat(document.getElementById('initial-investment').value);
    const discountRate = parseFloat(document.getElementById('discount-rate').value) / 100;
    const cashflowsText = document.getElementById('cashflows').value;

    if (isNaN(investment) || isNaN(discountRate) || !cashflowsText) {
        showError('npv-result', 'Пожалуйста, заполните все поля корректно');
        return;
    }

    const cashflows = cashflowsText.split(',').map(val => parseFloat(val.trim()));

    if (cashflows.some(isNaN)) {
        showError('npv-result', 'Проверьте формат денежных потоков (только числа, через запятую)');
        return;
    }

    let npv = -investment;
    cashflows.forEach((cashflow, index) => {
        const year = index + 1;
        npv += cashflow / Math.pow(1 + discountRate, year);
    });

    const interpretation = getNPVInterpretation(npv);

    document.getElementById('npv-result').innerHTML = `
        <strong>Чистая приведенная стоимость (NPV):</strong> ${npv.toFixed(2)} руб.<br>
        <small>${interpretation}</small>
    `;
}

function getROSInterpretation(ros) {
    if (ros > 20) return '✅ Отличная рентабельность';
    if (ros > 10) return '👍 Хорошая рентабельность';
    if (ros > 5) return '⚠️ Средняя рентабельность';
    if (ros > 0) return '❌ Низкая рентабельность';
    return '🚫 Убыточность';
}

function getROIInterpretation(roi) {
    if (roi > 50) return '✅ Отличная доходность инвестиций';
    if (roi > 25) return '👍 Хорошая доходность';
    if (roi > 10) return '⚠️ Приемлемая доходность';
    if (roi > 0) return '❌ Низкая доходность';
    return '🚫 Убыточные инвестиции';
}

function getPaybackInterpretation(payback) {
    if (payback < 2) return '✅ Быстрая окупаемость';
    if (payback < 5) return '👍 Стандартная окупаемость';
    if (payback < 10) return '⚠️ Длительная окупаемость';
    return '❌ Очень длительная окупаемость';
}

function getNPVInterpretation(npv) {
    if (npv > 0) return '✅ Проект прибыльный (рекомендуется к реализации)';
    if (npv === 0) return '⚠️ Проект безубыточный';
    return '❌ Проект убыточный (не рекомендуется)';
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <span style="color: #e53e3e;">❌ ${message}</span>
    `;
}
