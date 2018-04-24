(function(config) {
  var defaultMapConfig = config.MAPS.MAPBOX_STREETS;
  var map = createMap();
  var clusterGroup = createClusterGroup();

  firebase.initializeApp(config.FIREBASE_CONFIG);
  loadStations();
  centerMapToGeolocation();

  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a map using the default config options.
   * @return {L.map} Leaflet map object
   */
  function createMap() {
    var mapOptions = {
      center: config.MAP_VIEW_CONFIG.center,
      zoom: config.MAP_VIEW_CONFIG.initialZoom,
      minZoom: config.MAP_VIEW_CONFIG.minZoom,
      maxZoom: config.MAP_VIEW_CONFIG.maxZoom,
      zoomControl: config.MAP_VIEW_CONFIG.zoomControl,
      scrollWheelZoom: config.MAP_VIEW_CONFIG.scrollWheelZoom
    };

    var map = L.map('map', mapOptions);

    L.tileLayer(defaultMapConfig.urlTemplate, defaultMapConfig.options).addTo(map);

    return map;
  }

  /**
   * Centers the map to user's location if geolocation services are available
   * and enabled in the browser. Quietly fails otherwise.
   * @return {void}
   */
  function centerMapToGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        map.setView([position.coords.latitude, position.coords.longitude], 16);
      });
    }
    else {
      console.log("Geolocation not available");
    }
  }

  /**
   * Creates a cluster group object for the Refill station markers.
   * @return {L.markerClusterGroup} Leaflet cluster group object
   */
  function createClusterGroup() {
    return L.markerClusterGroup({
      iconCreateFunction: function(cluster) {
        var numDigits = cluster.getChildCount().toString().length;

        return L.divIcon({
          html: cluster.getChildCount(),
          className: "cluster digits-" + numDigits
        });
      }
    }).addTo(map);
  }

  /**
   * Fetches all Refill stations from Firebase and loads them into the map.
   */
  function loadStations() {
    firebase
      .database()
      .ref()
      .child('refillStations')
      .once('value', addStationMarkers, console.error);
  }

  /**
   * Adds markers for entire station list.
   * @param   {firebase.database.DataSnapshot} stations Stations snapshot
   * @return  {void}
   */
  function addStationMarkers(stations) {
    var refillStations = stations.val();

    for (id in refillStations) {
      var station = refillStations[id];
      addStationMarker(station);
    }
  }

  /**
   * Adds a singular station marker to the map.
   * @param   {Object} station Station data Object
   * @return  {void}
   */
  function addStationMarker(station) {
    var droplet = L.icon({
      iconUrl: 'assets/droplet.svg',
      iconSize: 40,
      iconAnchor: [20, 40]
    });

    try {
      if (!isNaN(station.latitude) && !isNaN(station.longitude)) {
        var marker = L.marker([station.latitude, station.longitude], {icon: droplet});
        var popup = createPopup(station);

        marker.bindPopup(popup, {offset: [0, -25]});
        clusterGroup.addLayer(marker);
      } else {
        console.error("Marker doesn't have latitude and/or longitude", station);
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  /**
   *
   * @return {L.popup} Leaflet popup object
   */
  function createPopup(station) {
    var content = '<strong>%1%</strong><br>%2%<br>%3%'
      .replace('%1%', station.name)
      .replace('%2%', station.postcode)
      .replace('%3%', station.city);

    return L.popup().setContent(content);
  }
})(window.config);
