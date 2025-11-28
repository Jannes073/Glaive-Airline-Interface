// app.js - extracted from index.html
// Minimal Chart.js sample charts
const ctxTimeline = document.getElementById('timelineChart');
if (ctxTimeline) {
    new Chart(ctxTimeline, {
        type: 'line',
        data: {
            labels: ['6d','5d','4d','3d','2d','1d','Now'],
            datasets: [{
                label: 'Incidents',
                data: [20,18,25,22,19,15,14],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.15)',
                tension: 0.3,
                fill: true,
            }]
        },
        options: {responsive:true, plugins:{legend:{display:false}}}
    });
}

// Regional Threat Map (Leaflet)
const mapEl = document.getElementById('regionalMap');
if (mapEl) {
    // Use CartoDB Dark Matter tiles for a dark blue map
    const map = L.map('regionalMap', {
        center: [30, 60], // Centered between Russia, Middle East, India
        zoom: 3,
        zoomControl: false,
        attributionControl: false
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 6,
        minZoom: 2
    }).addTo(map);
    // Jamming zones as red circles
    const jammingZones = [
        // Southern Russian border
        { lat: 45, lng: 40, radius: 400000, label: 'Jamming Zone' },
        { lat: 47, lng: 44, radius: 350000, label: 'Jamming Zone' },
        { lat: 43, lng: 46, radius: 300000, label: 'Jamming Zone' },
        { lat: 48, lng: 38, radius: 250000, label: 'Jamming Zone' },
        // Middle East
        { lat: 33, lng: 44, radius: 350000, label: 'Jamming Zone' }, // Baghdad
        { lat: 31, lng: 35, radius: 250000, label: 'Jamming Zone' }, // Israel/Jordan
        { lat: 25, lng: 55, radius: 300000, label: 'Jamming Zone' }, // UAE
        { lat: 29, lng: 47, radius: 200000, label: 'Jamming Zone' }, // Kuwait
        // India
        { lat: 28, lng: 77, radius: 350000, label: 'Jamming Zone' }, // Delhi
        { lat: 19, lng: 72, radius: 300000, label: 'Jamming Zone' }, // Mumbai
        { lat: 22, lng: 88, radius: 250000, label: 'Jamming Zone' }, // Kolkata
        { lat: 13, lng: 80, radius: 200000, label: 'Jamming Zone' }, // Chennai
    ];
    jammingZones.forEach(zone => {
        L.circle([zone.lat, zone.lng], {
            color: '#ef4444',
            fillColor: '#ef4444',
            fillOpacity: 0.35,
            radius: zone.radius,
            weight: 2
        }).addTo(map).bindTooltip(zone.label, {permanent: false, direction: 'center'});
    });
}

// Panel interactions
const flightCards = document.querySelectorAll('.flight-card');
const panel = document.getElementById('flightPanel');
const overlay = document.getElementById('panelOverlay');
const panelFlightId = document.getElementById('panelFlightId');
const panelRoute = document.getElementById('panelRoute');
const closeBtn = document.getElementById('closePanelBtn');

function openPanel(id, route) {
    panel.classList.add('active');
    overlay.classList.add('active');
    panel.setAttribute('aria-hidden','false');
    panelFlightId.textContent = id;
    panelRoute.textContent = route;
}

function closePanel() {
    panel.classList.remove('active');
    overlay.classList.remove('active');
    panel.setAttribute('aria-hidden','true');
}

flightCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-flight-id');
        const route = card.getAttribute('data-route');
        openPanel(id, route);
    });
});

closeBtn && closeBtn.addEventListener('click', closePanel);
overlay && overlay.addEventListener('click', closePanel);

// Refresh button example
const refreshBtn = document.querySelector('.refresh-btn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        const valEl = document.getElementById('activeFlightsValue');
        if (!valEl) return;
        const orig = valEl.textContent;
        valEl.textContent = '...';
        setTimeout(() => { valEl.textContent = orig; }, 700);
    });
}
