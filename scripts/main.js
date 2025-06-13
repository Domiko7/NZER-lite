
import { fetchReportsNZ } from './fetch.js'

const ticker = document.getElementById('ticker');

function dissapear() {
    ticker.style.opacity = "1";
    for (let i = 0; 100 >= i; i++) {
        setTimeout(() => {
            let currentOpacity = parseFloat(ticker.style.opacity);
            ticker.style.opacity = currentOpacity - 0.01;
        }, i * 10);
    }
}

function appear() {
    ticker.style.opacity = "0";
    for (let i = 0; 100 >= i; i++) {
        setTimeout(() => {
            let currentOpacity = parseFloat(ticker.style.opacity);
            ticker.style.opacity = currentOpacity + 0.01;
        }, i * 10);
    }
}



function earthquakeReport(mag, depth, time, location, mmi) {
    dissapear();
    setTimeout(() => {
        appear();
        const time24 = new Date(time).toLocaleTimeString('en-NZ', { timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', hour12: false });
        const message = `Magnitude ${mag} earthquake occurred ${location} at ${time24} NZST, at a depth of ${depth} kilometers.`;
        ticker.innerHTML = `
        <span class="ticker-item"> | ${message} </span>
        <span class="ticker-item"></span>
        `.repeat(2);
    }, 1000);

    setTimeout(() => {
        dissapear();
        setTimeout(() => {
            add();
            appear();
        }, 1000);
    }, 100000);
    
}
//let lastData = reportEarthquake();
let lastData;

setInterval(() => {
    let earthquakeData;
    fetchReportsNZ(0)
        .then(response => response)
        .then(data => {
            earthquakeData = data.features[0].properties;
            console.log(earthquakeData);
            if (JSON.stringify(earthquakeData) !== JSON.stringify(lastData)) {
                const { magnitude, depth, time, locality, mmi } = earthquakeData;
                earthquakeReport((Math.round(magnitude * 10) / 10), (Math.round(depth * 10) / 10), time, locality, mmi);
                lastData = earthquakeData;
            }
        });
}, 100)