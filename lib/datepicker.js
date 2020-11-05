;(() => {
    'use strict';
    let lang = document.documentElement.lang || 'en';
    let startofweek = Number(document.documentElement.dataset['startofweek'] || '0');
    let days_of_week = [0, 1, 2, 3, 4, 5, 6].map(d => (d + startofweek) % 7);
    let in_dp = false;
    let dp = document.createElement('div');

    function buildDatePicker() {
        let th = document.createElement('div');
        th.id = '_dp_head';
        th.innerHTML = `<div id="_dp_head"><a href="#" id="_dp_prev">&lt;&lt;</a> <span id="_dp_title">&nbsp;</span><a href="#" id="_dp_next">&gt;&gt;</a></div>`;
        dp.appendChild(th);

        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        days_of_week.forEach(d => {
            let th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.innerText = (new Date(2018, 0, d)).toLocaleDateString(lang, {weekday: 'short'});
            tr.appendChild(th);
        });
        thead.appendChild(tr);

        let tbody = document.createElement('tbody');
        days_of_week.forEach(d => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
            tbody.appendChild(tr);
        });

        let table = document.createElement('table');
        table.appendChild(thead);
        table.appendChild(tbody);
        dp.appendChild(table);

        dp.id = '_dp_dp';
        dp.style.position = 'absolute';
        dp.onmouseenter = () => in_dp = true;
        dp.onmouseleave = () => in_dp = false;
    };

    function initDatePicker(el, d) {
        let y = d.getYear() + 1900;
        let m = d.getMonth();
        let dd = d.getDate();

        dp.querySelector('#_dp_prev').addEventListener('click', () => initDatePicker(el, new Date(y, m - 1, dd)));
        dp.querySelector('#_dp_title').innerText = d.toLocaleDateString(lang, {month: 'long', year: 'numeric'});
        dp.querySelector('#_dp_next').addEventListener('click', () => initDatePicker(el, new Date(y, m + 1, dd)));

        d.setDate(1);
        let skip = (d.getDay() + 7 - startofweek) % 7;
        dp.querySelectorAll('td').forEach(td => {
            td.innerText = ''; td.className = '';
            if (skip-- <= 0 && d.getMonth() == m) {
                td.className = d.getDate() == dd? 'today': '';
                td.innerHTML = `<a href="#" data-day="${d.getDate() + 1}">${d.toLocaleDateString(lang, {day: 'numeric'})}</a>`;
                d.setDate(d.getDate() + 1);
            };
        });
        dp.querySelectorAll('td a').forEach(a => {
            a.onclick = () => {
                el.value = (new Date(y, m, a.dataset['day'])).toISOString().substring(0, 10);
                el.parentNode.removeChild(dp);
            };
        })
    };

    function showPicker(el) {
        let d = new Date(el.value);
        if (isNaN(d.getDate())) d = new Date();
        initDatePicker(el, d);
        el.parentNode.appendChild(dp);
    };

    function hidePicker(el) {
        el.parentNode.removeChild(dp);
    };

    // Check if browser needs date picker
    let test = document.createElement('input');
    test.setAttribute('type', 'date');
    if (test.type != 'date') {
        buildDatePicker();
        document.querySelectorAll('input.datepicker').forEach(el => {
            el.pattern = String.raw`\d\d\d\d-\d\d-\d\d`;
            el.addEventListener('focus', function() { showPicker(el) });
            el.addEventListener('blur', function() { if (!in_dp) hidePicker(el) });
        });
    };
})();
