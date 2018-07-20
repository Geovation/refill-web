(function() {
  window.config = {
    MAP_VIEW_CONFIG: {
      zoomControl: true,
      scrollWheelZoom: true,
      initialZoom: 14,
      minZoom: 0,
      maxZoom: 17,
      center: [51.4545, -2.5979] // [52.072754,-1.318359]
    },
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyA6DqD6Gnn7GUn7dzDJLU15VFrTIU6hims",
      authDomain: "refill.firebaseapp.com",
      databaseURL: "https://refill.firebaseio.com",
      storageBucket: "project-6073170641237050614.appspot.com"
    },
    MAPS: {
      OS: {
        // Refill API key for Data Exploration License. TODO: replace when going into production.
        urlTemplate: 'https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Road 3857/{z}/{x}/{y}.png?key=LnU213FSLGgJEJSyQftosrMyvyC2Kb0p',
        options: {
          attribution: '© <a href="http://www.os.uk">Ordnance Survey</a>',
          detectRetina: true // enabling this requests 4 tiles instead of a single one
        }
      },
      OS_X2: {
        // Refill API key for Data Exploration License. TODO: replace when going into production.
        urlTemplate: 'https://ordnance-eu-test.apigee.net/mapping_api/v1/service/zxy/EPSG:3857/Roadx2+3857/{z}/{x}/{y}.png?FORMAT_OPTIONS=dpi:180&demo=true&key=LnU213FSLGgJEJSyQftosrMyvyC2Kb0p',
        options: {
          attribution: '© <a href="http://www.os.uk">Ordnance Survey</a>',
          detectRetina: true // enabling this requests 4 tiles instead of a single one
        }
      },
      MAPBOX_STREETS: {
        // mapbox Token: using Geovation one (Sebastian). TODO: replace with Refill one.
        urlTemplate: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1Ijoic2ViYXN0aWFub3ZpZGVnZW92YXRpb251ayIsImEiOiJjamp0cTRiazU0b293M2xteDFtOXZwamtnIn0.hSJ5KscdUtQGAV11ohjLLw',
        options: {
          attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      }
    }
  };
})();
