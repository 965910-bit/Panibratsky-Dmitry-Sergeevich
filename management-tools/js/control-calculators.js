function calculateSecurityIncidents() {
    const incidents = parseFloat(document.getElementById('security-incidents').value);
    const employees = parseFloat(document.getElementById('total-employees').value);

    if (isNaN(incidents) || isNaN(employees)) {
        showError('security-incidents-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (employees === 0) {
        showError('security-incidents-result', 'Численность сотрудников не может быть нулевой');
        return;
    }

    const incidentRate = (incidents / employees) * 1000; // на 1000 сотрудников
    const interpretation = getIncidentRateInterpretation(incidentRate);

    document.getElementById('security-incidents-result').innerHTML = `
        <strong>Уровень инцидентов:</strong> ${incidentRate.toFixed(2)} на 1000 сотрудников<br>
        <small>${interpretation}</small>
    `;
}

function calculateAuditEffectiveness() {
    const issuesFound = parseFloat(document.getElementById('issues-found').value);
    const totalAudited = parseFloat(document.getElementById('total-audited').value);

    if (isNaN(issuesFound) || isNaN(totalAudited)) {
        showError('audit-effectiveness-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (totalAudited === 0) {
        showError('audit-effectiveness-result', 'Количество проверенных процессов не может быть нулевым');
        return;
    }

    const effectiveness = (issuesFound / totalAudited) * 100;
    const interpretation = getAuditEffectivenessInterpretation(effectiveness);

    document.getElementById('audit-effectiveness-result').innerHTML = `
        <strong>Эффективность аудита:</strong> ${effectiveness.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateRiskCoverage() {
    const managedRisks = parseFloat(document.getElementById('managed-risks').value);
    const totalRisks = parseFloat(document.getElementById('total-risks').value);

    if (isNaN(managedRisks) || isNaN(totalRisks)) {
        showError('risk-coverage-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (totalRisks === 0) {
        showError('risk-coverage-result', 'Общее количество рисков не может быть нулевым');
        return;
    }

    const coverage = (managedRisks / totalRisks) * 100;
    const interpretation = getRiskCoverageInterpretation(coverage);

    document.getElementById('risk-coverage-result').innerHTML = `
        <strong>Покрытие рисков:</strong> ${coverage.toFixed(2)}%<br>
        <small>${interpretation}</small>
    `;
}

function calculateAverageResponseTime() {
    const totalResponseTime = parseFloat(document.getElementById('total-response-time').value);
    const incidentsCount = parseFloat(document.getElementById('incidents-count').value);

    if (isNaN(totalResponseTime) || isNaN(incidentsCount)) {
        showError('response-time-result', 'Пожалуйста, введите корректные числовые значения');
        return;
    }

    if (incidentsCount === 0) {
        showError('response-time-result', 'Количество инцидентов не может быть нулевым');
        return;
    }

    const averageTime = totalResponseTime / incidentsCount;
    const interpretation = getResponseTimeInterpretation(averageTime);

    document.getElementById('response-time-result').innerHTML = `
        <strong>Среднее время реагирования:</strong> ${averageTime.toFixed(2)} часов<br>
        <small>${interpretation}</small>
    `;
}

function getIncidentRateInterpretation(rate) {
    if (rate < 1) return '✅ Отличный показатель безопасности';
    if (rate < 5) return '👍 Хороший показатель';
    if (rate < 10) return '⚠️ Средний показатель';
    return '❌ Высокий уровень инцидентов';
}

function getAuditEffectivenessInterpretation(effectiveness) {
    if (effectiveness > 20) return '✅ Высокая эффективность аудита';
    if (effectiveness > 10) return '👍 Хорошая эффективность';
    if (effectiveness > 5) return '⚠️ Средняя эффективность';
    return '❌ Низкая эффективность аудита';
}

function getRiskCoverageInterpretation(coverage) {
    if (coverage > 90) return '✅ Отличное покрытие рисков';
    if (coverage > 75) return '👍 Хорошее покрытие';
    if (coverage > 50) return '⚠️ Среднее покрытие';
    return '❌ Низкое покрытие рисков';
}

function getResponseTimeInterpretation(time) {
    if (time < 2) return '✅ Быстрое реагирование';
    if (time < 8) return '👍 Приемлемое время реагирования';
    if (time < 24) return '⚠️ Длительное реагирование';
    return '❌ Очень медленное реагирование';
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <span style="color: #e53e3e;">❌ ${message}</span>
    `;
}
