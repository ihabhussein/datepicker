;(function() {
    'use strict';
    let lang = document.documentElement.lang || 'en';
    let sow = Number(document.documentElement.dataset['sow'] || 0);
    let dp = document.createElement('div');
    let in_dp = false;

    function buildDatePicker() {
        let th = document.createElement('div');
        th.id = '_dp_head';

        let x = document.createElement('a');
        x.innerText = '<<';
        x.setAttribute('href', '#');
        x.id = '_dp_prev';
        th.appendChild(x);
        x = document.createElement('span');
        x.id = '_dp_title';
        th.appendChild(x);
        x = document.createElement('a');
        x.innerText = '>>';
        x.setAttribute('href', '#');
        x.id = '_dp_next';
        th.appendChild(x);
        dp.appendChild(th);

        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        [0, 1, 2, 3, 4, 5, 6].forEach(d => {
            let th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.innerText = (new Date(2018, 0, d + sow)).toLocaleDateString(lang, {weekday: 'short'});
            tr.appendChild(th);
        });
        thead.appendChild(tr);

        let tbody = document.createElement('tbody');
        for (let i = 0; i < 6; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            };
            tbody.appendChild(tr);
        };

        let table = document.createElement('table');
        table.appendChild(thead);
        table.appendChild(tbody);

        dp.appendChild(table);
        dp.id = '_dp_dp';
        dp.style.position = 'absolute';
        dp.addEventListener('mouseenter', () => in_dp = true);
        dp.addEventListener('mouseleave', () => in_dp = false);
    };

    function initDatePicker(el, d) {
        let y = d.getYear() + 1900;
        let m = d.getMonth();
        let dd = d.getDate();

        dp.querySelector('#_dp_prev').addEventListener('click', () => initDatePicker(el, new Date(y, m - 1, dd)));
        dp.querySelector('#_dp_title').innerText = d.toLocaleDateString(lang, {month: 'long', year: 'numeric'});
        dp.querySelector('#_dp_next').addEventListener('click', () => initDatePicker(el, new Date(y, m + 1, dd)));

        d.setDate(1);
        let skip = (d.getDay() + 7 - sow) % 7;
        dp.querySelectorAll('td').forEach(td => {
            td.innerText = ''; td.className = '';
            if (skip-- <= 0 && d.getMonth() == m) {
                let a = document.createElement('a');
                a.innerText = d.toLocaleDateString(lang, {day: 'numeric'});
                a.setAttribute('href', '#');
                a.dataset['day'] = d.getDate() + 1;
                a.addEventListener('click', () => {
                    el.value = (new Date(y, m, a.dataset['day'])).toISOString().substring(0, 10);
                    el.parentNode.removeChild(dp);
                });
                td.appendChild(a);
                if (d.getDate() == dd) td.className = 'today';
                d.setDate(d.getDate() + 1);
            };
        });
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
    if ((test.type != 'date') || /Firefox/.test(navigator.userAgent)) {
        buildDatePicker();
        document.querySelectorAll('input.datepicker').forEach(el => {
            el.pattern = String.raw`\d\d\d\d-\d\d-\d\d`;
            el.addEventListener('focus', function() { showPicker(el) });
            el.addEventListener('blur', function() { if (!in_dp) hidePicker(el) });
        });
    };
})();
