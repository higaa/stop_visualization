"use strict";

const BASE_URL = 'https://plain.mobility-fan.com/stop_visualization';

$(async function() {
    // MapLibreインスタンスを初期化
    const map = new maplibregl.Map({
        container: 'map',
        center: [137.212071, 36.699972],
        zoom: 12,
        minZoom: 3,
        maxZoom: 17,
        hash: true,
        style: 'https://gsi-cyberjapan.github.io/gsivectortile-mapbox-gl-js/pale.json',
    });
    const geolocateControl = new maplibregl.GeolocateControl({
        trackUserLocation: true
    });
    map.addControl(geolocateControl, 'bottom-right');
    
    map.on('load', function () {
        map.addControl(new maplibregl.NavigationControl({showCompass: true, visualizePitch: true}));


        map.loadImage(
            'stop-icon.png',
            function(error, image) {
                if (error) throw error;
                map.addImage('stopicon', image);
                map.addSource('stops', {
                    type: 'vector',
                    tiles: [BASE_URL + '/tiles/{z}/{x}/{y}.pbf'],
                    maxzoom: 14
                });
                        map.addLayer({
                    id: 'stopnames-layer',
                    source: 'stops',
                    'source-layer': 'stops',
                    type: 'symbol',
                    "layout": {
                        "text-field": ['get', 'stop_name'],
                        "icon-image": "stopicon",
                        "icon-pitch-alignment": "viewport",
                        "icon-rotation-alignment": "viewport",
                        "text-font": [
                            "NotoSansCJKjp-Regular"
                        ],
                        "symbol-placement": "point",
                        "icon-allow-overlap": true,
                        "text-keep-upright": true,
                        "text-allow-overlap": false,
                        "symbol-z-order": "auto",
                        "text-max-width": 100,
                        "visibility": "visible",
                        "text-variable-anchor": ['top', 'bottom', 'left', 'right'],
                        'text-radial-offset': 0.8,
                    },
                    "paint": {
                        "text-color": "rgba(0,0,0,1)",
                        "text-halo-color": "rgba(255,255,255,1)",
                        "text-halo-width": 2
                    }
                
                });
            }
        );

    });

});
