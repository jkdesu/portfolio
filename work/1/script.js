// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// Auto-advance slideshow
setInterval(() => {
    changeSlide(1);
}, 5000);

// Map initialization
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/01984d3e-b180-7b5c-95d8-d3358c517535/style.json?key=m0E6vRrf1tfFuz2sFKuW',
    center: [-73.97, 40.77],
    zoom: 2
});

// Material chain data
const materialChainData = {
    "type": "FeatureCollection",
    "features": [
        // Oil Extraction
        {
            "type": "Feature",
            "properties": {
                "name": "Oil Production - Saudi Arabia",
                "stage": "oil_extraction",
                "description": "World's largest oil exporter",
                "invisible_factors": "Oil prices: $85/barrel, Geopolitical tensions, Environmental impact"
            },
            "geometry": { "type": "Point", "coordinates": [45.0792, 24.7136] }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Oil Production - Russia",
                "stage": "oil_extraction",
                "description": "Major supplier to China",
                "invisible_factors": "Sanctions impact, Pipeline politics, Currency fluctuations"
            },
            "geometry": { "type": "Point", "coordinates": [37.6173, 55.7558] }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Oil Production - USA",
                "stage": "oil_extraction",
                "description": "Texas, North Dakota shale",
                "invisible_factors": "Fracking regulations, Domestic energy policy, Export restrictions"
            },
            "geometry": { "type": "Point", "coordinates": [-98.5795, 39.8283] }
        },
        // Ethylene Production
        {
            "type": "Feature",
            "properties": {
                "name": "Ethylene Plant - China",
                "stage": "ethylene_production",
                "description": "Guangdong, Maoming, Daqing",
                "invisible_factors": "Massive ethylene plants, Government subsidies, Environmental regulations"
            },
            "geometry": { "type": "Point", "coordinates": [113.2806, 23.1291] }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Ethylene Plant - Singapore",
                "stage": "ethylene_production",
                "description": "Jurong Island - Sinopec, ExxonMobil",
                "invisible_factors": "Shipping hub, Trade policies, Currency exchange rates"
            },
            "geometry": { "type": "Point", "coordinates": [103.8198, 1.3521] }
        },
        // PVC Production
        {
            "type": "Feature",
            "properties": {
                "name": "PVC Production - China",
                "stage": "pvc_production",
                "description": "Zhejiang, Guangdong massive PVC industry",
                "invisible_factors": "Production costs, Quality control, Export policies"
            },
            "geometry": { "type": "Point", "coordinates": [120.1551, 30.2741] }
        },
        // Toy Manufacturing
        {
            "type": "Feature",
            "properties": {
                "name": "Toy Factory - Shenzhen",
                "stage": "toy_manufacturing",
                "description": "Dongguan, Shenzhen, Taizhou toy capitals",
                "invisible_factors": "Labor conditions, Production costs, Quality control, IP protection"
            },
            "geometry": { "type": "Point", "coordinates": [114.0579, 22.5431] }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Toy Factory - Taiwan",
                "stage": "toy_manufacturing",
                "description": "Smaller, quality-controlled toy runs",
                "invisible_factors": "Higher quality standards, IP protection, Higher costs"
            },
            "geometry": { "type": "Point", "coordinates": [121.5654, 25.0330] }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Sofubi Factory - Japan",
                "stage": "toy_manufacturing",
                "description": "Sofubi (soft vinyl) toys, hand-poured",
                "invisible_factors": "Artisan craftsmanship, Higher costs, Limited production"
            },
            "geometry": { "type": "Point", "coordinates": [139.6917, 35.6895] }
        }
    ]
};

map.on('load', () => {
    Promise.all([
        loadIcon('icon2.png'),
        loadIcon('icon1.png'),
        loadIcon('icon3.png'),
        loadIcon('icon4.png'),
        loadIcon('icon.png')
    ]).then(([nycIcon, tokyoIcon, shanghaiIcon, laIcon, hoverIcon]) => {
        map.addImage('nyc-icon', nycIcon);
        map.addImage('tokyo-icon', tokyoIcon);
        map.addImage('shanghai-icon', shanghaiIcon);
        map.addImage('la-icon', laIcon);
        map.addImage('hover-icon', hoverIcon);

        // Add toy store layers
        addLayerWithPopup('nyc', 'manhattan_toy_stores.geojson', 'nyc-icon', 'nyc-layer');
        addLayerWithPopup('tokyo', 'tokyo_toy_stores.geojson', 'tokyo-icon', 'tokyo-layer');
        addLayerWithPopup('shanghai', 'shanghai_toy_stores.geojson', 'shanghai-icon', 'shanghai-layer');
        addLayerWithPopup('la', 'losangeles_toy_stores.geojson', 'la-icon', 'la-layer');

        // Add material chain layer
        addMaterialChainLayer();

        // Add connection lines
        addConnectionLines();

        // Region navigation buttons
        addRegionButtons();
    });
});

function loadIcon(path) {
    return new Promise((resolve, reject) => {
        map.loadImage(path, (err, image) => {
            if (err) reject(err);
            else resolve(image);
        });
    });
}

function addLayerWithPopup(sourceId, geojsonFile, defaultIcon, layerId) {
    map.addSource(sourceId, {
        type: 'geojson',
        data: geojsonFile
    });

    map.addLayer({
        id: layerId,
        type: 'symbol',
        source: sourceId,
        layout: {
            'icon-image': defaultIcon,
            'icon-size': 0.15,
            'icon-allow-overlap': true
        }
    });

    map.on('mouseenter', layerId, () => {
        map.setLayoutProperty(layerId, 'icon-image', 'hover-icon');
    });
    
    map.on('mouseleave', layerId, () => {
        map.setLayoutProperty(layerId, 'icon-image', defaultIcon);
    });

    map.on('click', layerId, (e) => {
        const props = e.features[0].properties;
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<strong>${props.Name}</strong><br>${props.Address}`)
            .addTo(map);
    });
}

function addRegionButtons() {
    const regions = [
        { name: 'NYC', center: [-73.97, 40.77] },
        { name: 'Tokyo', center: [139.7, 35.67] },
        { name: 'Shanghai', center: [121.47, 31.23] },
        { name: 'Los Angeles', center: [-118.24, 34.05] }
    ];

    const nav = document.createElement('div');
    nav.style.cssText = 'position: absolute; top: 10px; left: 10px; background: white; padding: 10px; border-radius: 8px; z-index: 1; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';

    regions.forEach(region => {
        const btn = document.createElement('button');
        btn.innerText = region.name;
        btn.style.cssText = 'margin: 5px; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;';
        btn.onclick = () => {
            map.flyTo({ center: region.center, zoom: 13 });
        };
        nav.appendChild(btn);
    });

    document.getElementById('map').appendChild(nav);
}

function addMaterialChainLayer() {
    map.addSource('material-chain', {
        type: 'geojson',
        data: materialChainData
    });

    map.addLayer({
        id: 'material-chain-layer',
        type: 'circle',
        source: 'material-chain',
        paint: {
            'circle-radius': 8,
            'circle-color': [
                'match',
                ['get', 'stage'],
                'oil_extraction', '#d32f2f',
                'ethylene_production', '#ff9800',
                'pvc_production', '#2196f3',
                'toy_manufacturing', '#9c27b0',
                '#666666'
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    map.on('mouseenter', 'material-chain-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'material-chain-layer', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'material-chain-layer', (e) => {
        const props = e.features[0].properties;
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                <strong>${props.name}</strong><br>
                <em>${props.description}</em><br><br>
                <strong>Invisible Factors:</strong><br>
                ${props.invisible_factors}
            `)
            .addTo(map);
    });

    map.setLayoutProperty('material-chain-layer', 'visibility', 'none');
}

function addConnectionLines() {
    const connections = [
        {
            from: [114.0579, 22.5431],
            to: [-73.97, 40.77],
            type: 'supply',
            label: 'Manufacturing → NYC'
        },
        {
            from: [114.0579, 22.5431],
            to: [139.7, 35.67],
            type: 'supply',
            label: 'Manufacturing → Tokyo'
        },
        {
            from: [114.0579, 22.5431],
            to: [121.47, 31.23],
            type: 'supply',
            label: 'Manufacturing → Shanghai'
        },
        {
            from: [114.0579, 22.5431],
            to: [-118.24, 34.05],
            type: 'supply',
            label: 'Manufacturing → LA'
        }
    ];

    map.addSource('connections', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: connections.map(conn => ({
                type: 'Feature',
                properties: {
                    type: conn.type,
                    label: conn.label
                },
                geometry: {
                    type: 'LineString',
                    coordinates: [conn.from, conn.to]
                }
            }))
        }
    });

    map.addLayer({
        id: 'supply-lines',
        type: 'line',
        source: 'connections',
        paint: {
            'line-color': '#4b5563',
            'line-width': 2,
            'line-opacity': 0.6
        }
    });

    map.setLayoutProperty('supply-lines', 'visibility', 'none');
}

function toggleLayer(layerType) {
    if (layerType === 'toy-stores') {
        map.setLayoutProperty('nyc-layer', 'visibility', 'visible');
        map.setLayoutProperty('tokyo-layer', 'visibility', 'visible');
        map.setLayoutProperty('shanghai-layer', 'visibility', 'visible');
        map.setLayoutProperty('la-layer', 'visibility', 'visible');
        map.setLayoutProperty('material-chain-layer', 'visibility', 'none');
        map.setLayoutProperty('supply-lines', 'visibility', 'none');
    } else if (layerType === 'material-chain') {
        map.setLayoutProperty('nyc-layer', 'visibility', 'none');
        map.setLayoutProperty('tokyo-layer', 'visibility', 'none');
        map.setLayoutProperty('shanghai-layer', 'visibility', 'none');
        map.setLayoutProperty('la-layer', 'visibility', 'none');
        map.setLayoutProperty('material-chain-layer', 'visibility', 'visible');
        map.setLayoutProperty('supply-lines', 'visibility', 'none');
    } else if (layerType === 'both') {
        map.setLayoutProperty('nyc-layer', 'visibility', 'visible');
        map.setLayoutProperty('tokyo-layer', 'visibility', 'visible');
        map.setLayoutProperty('shanghai-layer', 'visibility', 'visible');
        map.setLayoutProperty('la-layer', 'visibility', 'visible');
        map.setLayoutProperty('material-chain-layer', 'visibility', 'visible');
        map.setLayoutProperty('supply-lines', 'visibility', 'visible');
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

