const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var map = L.map('map', {
    center: [39.82, -98.57],
    zoom: 5
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

function onEachFeature(feature, layer){
    if (feature.properties.title){
        layer.bindPopup(feature.properties.title)
    }
};

var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
        grades = ["<1", "1-4", "4-7", "7-10", "10+"],
        colors = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"].reverse();
    for (var i = 0; i < grades.length; i++){
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            grades[i] + '<br>';
    };
    return div
};

legend.addTo(map);

function pointToLayer(feature,latlng){
    let colors = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"].reverse();
    let markeroptions = {
        fillOpacity: 255,
        fill: true
    }
    feature.properties.mag *= 3
    if (feature.geometry.coordinates[2] < 1){
        markeroptions.fillColor = markeroptions.color = colors[0]
        markeroptions.radius = feature.properties.mag
        return L.circleMarker(latlng, markeroptions);
    }
    else if(feature.geometry.coordinates[2] < 4) {
        markeroptions.fillColor = markeroptions.color = colors[1]
        markeroptions.radius = feature.properties.mag
        return L.circleMarker(latlng, markeroptions);

    }
    else if(feature.geometry.coordinates[2] < 7){
        markeroptions.fillColor = markeroptions.color = colors[2]
        markeroptions.radius = feature.properties.mag
        return L.circleMarker(latlng, markeroptions);

    }
    else if(feature.geometry.coordinates[2] < 10){
        markeroptions.fillColor = markeroptions.color = colors[3]
        markeroptions.radius = feature.properties.mag
        return L.circleMarker(latlng, markeroptions);

    }
    else {
        markeroptions.fillColor = markeroptions.color = colors[4]
        markeroptions.radius = feature.properties.mag
        return L.circleMarker(latlng, markeroptions);

    }
}

d3.json(link).then(function(data){
    console.log(data.features)

    L.geoJSON(data.features, {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
    }).addTo(map)
});