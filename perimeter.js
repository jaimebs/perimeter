function initMap() {
  let btnConcluded = document.getElementById('btnConcluded');
  let btnNew = document.getElementById('btnNew');
  let paths = [];
  let latitude = 0;
  let longitude = 0;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    map.setCenter({lat: latitude, lng: longitude})
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: latitude, lng: longitude},
    zoom: 13
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    // drawingMode: google.maps.drawing.OverlayType.MAKER,
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon']
    },
  });
  drawingManager.setMap(map);

  // google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
  //   console.log(e.type);
  //   console.log(e.getPath().getArray().toString());
    
  // })

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
    var coordinates = (polygon.getPath().getArray().toString());
    console.log(coordinates);
    paths.push(coordinates)

    showArray();
  });

  btnConcluded.addEventListener('click', ()=>{
    drawingManager.setDrawingMode(null);
  })

  btnNew.addEventListener('click', ()=>{
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  })

  function showArray(){
    console.log(paths);
    
  }

  getLocation();
}