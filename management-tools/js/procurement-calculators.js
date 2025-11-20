function calculateProcurementSavings() {
    const initialPrice = parseFloat(document.getElementById('initial-price').value);
    const finalPrice = parseFloat(document.getElementById('final-price').value);

    if (isNaN(initialPrice) || isNaN(finalPrice)) {
        showError('procurement-savings-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (initialPrice === 0) {
        showError('procurement-savings-result', 'Исходная цена не может быть нулевой');
        return;
    }

    const savings = initialPrice - finalPrice;
    const savingsPercent = ((initialPrice - finalPrice) / initialPrice) * 100;
    const interpretation = getSavingsInterpretation(savingsPercent);

    document.getElementById('procurement-savings-result').innerHTML = `
        <strong>Экономия:</strong> ${savings.toFixed(2)} руб. (${savingsPercent.toFixed(2)}%)<br>
        <small>${interpretation}</small>
    `;
}

function calculateTCO() {
    const acquisitionCost = parseFloat(document.getElementById('acquisition-cost').value);
    const operatingCost = parseFloat(document.getElementById('operating-cost').value);
    const maintenanceCost = parseFloat(document.getElementById('maintenance-cost').value);

    if (isNaN(acquisitionCost) || isNaN(operatingCost) || isNaN(maintenanceCost)) {
        showError('tco-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    const tco = acquisitionCost + operatingCost + maintenanceCost;
    const interpretation = getTCOInterpretation(tco);

    document.getElementById('tco-result').innerHTML = `
        <strong>Общая стоимость владения (TCO):</strong> ${tco.toFixed(2)} руб.<br>
        <small>${interpretation}</small>
    `;
}

function calculateTenderEffectiveness() {
    const successfulTenders = parseFloat(document.getElementById('successful-tenders').value);
    const totalTenders = parseFloat(document.getElementById('total-tenders').value);

    if (isNaN(successfulTenders) || isNaN(totalTenders)) {
        showError('tender-effectiveness-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (totalTenders === 0) {
        showError('tender-effectiveness-result', 'Общее количество тендеров не может быть нулевым');
        return;
    }

    const effectiveness = (successfulTenders / totalTenders) * 100;
    const interpretation = getTenderEffectivenessInterpretation(effectiveness);

    document.getElementById('tender-effectiveness-result').innerHTML = `
        <strong>Эффективность тендеров:</strong> ${effectiveness.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateOrderLeadTime() {
    const orderDate = new Date(document.getElementById('order-date').value);
    const deliveryDate = new Date(document.getElementById('delivery-date').value);

    if (isNaN(orderDate.getTime()) || isNaN(deliveryDate.getTime())) {
        showError('lead-time-result', 'Пожалуйста, выберите обе даты');
        return;
    }

    const timeDiff = deliveryDate.getTime() - orderDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff < 0) {
        showError('lead-time-result', 'Дата поставки не может быть раньше даты заказа');
        return;
    }

    const interpretation = getLeadTimeInterpretation(daysDiff);

    document.getElementById('lead-time-result').innerHTML = `
        <strong>Время выполнения заказа:</strong> ${daysDiff.toFixed(0)} дней<br>
        <small>${interpretation}</small>
    `;
}

function getSavingsInterpretation(savingsPercent) {
    if (savingsPercent > 20) return '✅ Отличная экономия';
    if (savingsPercent > 10) return '👍 Хорошая экономия';
    if (savingsPercent > 5) return '⚠️ Умеренная экономия';
    return '❌ Низкая экономия';
}

function getTCOInterpretation(tco) {
    if (tco < 10000) return '✅ Низкая стоимость владения';
    if (tco < 50000) return '👍 Умеренная стоимость владения';
    if (tco < 200000) return '⚠️ Высокая стоимость владения';
    return '❌ Очень высокая стоимость владения';
}

function getTenderEffectivenessInterpretation(effectiveness) {
    if (effectiveness > 80) return '✅ Отличная эффективность';
    if (effectiveness > 60) return '👍 Хорошая эффективность';
    if (effectiveness > 40) return '⚠️ Средняя эффективность';
    return '❌ Низкая эффективность';
}

function getLeadTimeInterpretation(days) {
    if (days < 7) return '✅ Быстрая поставка';
    if (days < 30) return '👍 Стандартное время поставки';
    if (days < 90) return '⚠️ Длительная поставка';
    return '❌ Очень длительная поставка';
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <span style="color: #e53e3e;">❌ ${message}</span>
    `;
}
