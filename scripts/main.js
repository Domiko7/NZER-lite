
import { fetchReportsNZ } from './fetch.js'

const ticker = document.getElementById('ticker');

function add() {
    ticker.innerHTML = `
    <span class="ticker-item">Real-Time New Zealand Earthquake Monitoring (GlobalQuake)&nbsp;|&nbsp;</span>
    <span class="ticker-item">Earthquakes can occur anywhere in New Zealand at any time. In the event of a large earthquake Drop, Cover and Hold.&nbsp;|&nbsp;</span>
    <span class="ticker-item"></span>
    `.repeat(2);
}

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

add();

function shakingType(mmi) {
    if (mmi <= 2) {
        return 'Weak';
    } else if (mmi <= 4) {
        return 'Light';
    } else if (mmi <= 6) {
        return 'Moderate';
    } else if (mmi <= 7) {
        return 'Strong';
    } else if (mmi <= 9) {
        return 'Violent';
    } else {
        return 'Extreme'
    }
} 

function earthquakeReport(mag, depth, time, location, mmi) {
    dissapear();
    setTimeout(() => {
        appear();
        const time24 = new Date(time).toLocaleTimeString('en-NZ', { timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', hour12: false });
        const message = `Magnitude ${mag} earthquake occurred ${location} at ${time24} NZST, at a depth of ${depth} kilometers. ${shakingType(mmi)} shaking was felt. Aftershocks are possible. Remember to Drop, Cover, and Hold On if you feel shaking or get an alert. If the shaking is strong or lasts a long time — Get Gone.`;
        ticker.innerHTML = `
        <span class="ticker-item"> ${'&nbsp;'.repeat(50)} ${message} </span>
        <span class="ticker-item"></span>
        `.repeat(2);
        const voiceMessage = new SpeechSynthesisUtterance(message);
        voiceMessage.lang = "en-GB";
        speechSynthesis.speak(voiceMessage);
    }, 1000);
    
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