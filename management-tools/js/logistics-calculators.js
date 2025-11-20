function calculateInventoryTurnover() {
    const cogs = parseFloat(document.getElementById('cogs').value);
    const avgInventory = parseFloat(document.getElementById('avg-inventory').value);

    if (isNaN(cogs) || isNaN(avgInventory)) {
        showError('inventory-turnover-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (avgInventory === 0) {
        showError('inventory-turnover-result', 'Средний запас не может быть нулевым');
        return;
    }

    const turnover = cogs / avgInventory;
    const interpretation = getTurnoverInterpretation(turnover);

    document.getElementById('inventory-turnover-result').innerHTML = `
        <strong>Оборачиваемость запасов:</strong> ${turnover.toFixed(2)} раз(а) за период<br>
        <small>${interpretation}</small>
    `;
}

function calculateServiceLevel() {
    const ordersDelivered = parseFloat(document.getElementById('orders-delivered').value);
    const totalOrders = parseFloat(document.getElementById('total-orders').value);

    if (isNaN(ordersDelivered) || isNaN(totalOrders)) {
        showError('service-level-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (totalOrders === 0) {
        showError('service-level-result', 'Общее количество заказов не может быть нулевым');
        return;
    }

    const serviceLevel = (ordersDelivered / totalOrders) * 100;
    const interpretation = getServiceLevelInterpretation(serviceLevel);

    document.getElementById('service-level-result').innerHTML = `
        <strong>Уровень обслуживания:</strong> ${serviceLevel.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculatePickingProductivity() {
    const pickedLines = parseFloat(document.getElementById('picked-lines').value);
    const manHours = parseFloat(document.getElementById('man-hours').value);

    if (isNaN(pickedLines) || isNaN(manHours)) {
        showError('picking-productivity-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (manHours === 0) {
        showError('picking-productivity-result', 'Затраты человеко-часов не могут быть нулевыми');
        return;
    }

    const productivity = pickedLines / manHours;
    const interpretation = getProductivityInterpretation(productivity);

    document.getElementById('picking-productivity-result').innerHTML = `
        <strong>Производительность отбора:</strong> ${productivity.toFixed(2)} строк/чел.-час<br>
        <small>${interpretation}</small>
    `;
}

function calculatePickingAccuracy() {
    const totalPicked = parseFloat(document.getElementById('total-picked').value);
    const errorPicked = parseFloat(document.getElementById('error-picked').value);

    if (isNaN(totalPicked) || isNaN(errorPicked)) {
        showError('picking-accuracy-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (totalPicked === 0) {
        showError('picking-accuracy-result', 'Общее количество отобранных позиций не может быть нулевым');
        return;
    }

    const accuracy = ((totalPicked - errorPicked) / totalPicked) * 100;
    const interpretation = getAccuracyInterpretation(accuracy);

    document.getElementById('picking-accuracy-result').innerHTML = `
        <strong>Точность отбора:</strong> ${accuracy.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function getTurnoverInterpretation(turnover) {
    if (turnover > 12) return '✅ Отличная оборачиваемость';
    if (turnover > 8) return '👍 Хорошая оборачиваемость';
    if (turnover > 4) return '⚠️ Средняя оборачиваемость';
    return '❌ Низкая оборачиваемость';
}

function getServiceLevelInterpretation(serviceLevel) {
    if (serviceLevel > 98) return '✅ Отличный уровень обслуживания';
    if (serviceLevel > 95) return '👍 Хороший уровень обслуживания';
    if (serviceLevel > 90) return '⚠️ Приемлемый уровень обслуживания';
    return '❌ Низкий уровень обслуживания';
}

function getProductivityInterpretation(productivity) {
    if (productivity > 60) return '✅ Высокая производительность';
    if (productivity > 40) return '👍 Хорошая производительность';
    if (productivity > 25) return '⚠️ Средняя производительность';
    return '❌ Низкая производительность';
}

function getAccuracyInterpretation(accuracy) {
    if (accuracy > 99.5) return '✅ Отличная точность';
    if (accuracy > 99) return '👍 Хорошая точность';
    if (accuracy > 98) return '⚠️ Приемлемая точность';
    return '❌ Низкая точность';
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <span style="color: #e53e3e;">❌ ${message}</span>
    `;
}
