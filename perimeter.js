let drawingManager;
let all_overlays = [];
let selectedShape;

function clearSelection() {
  if (selectedShape) {
    selectedShape.setEditable(false);
    selectedShape = null;
  }
}

function setSelection(shape) {
  clearSelection();
  selectedShape = shape;
  shape.setEditable(true);
}

function deleteSelectedShape() {
  if (selectedShape) {
    selectedShape.setMap(null);
  }
}

function deleteAllShape() {
  for (var i = 0; i < all_overlays.length; i++) {
    all_overlays[i].overlay.setMap(null);
  }
  all_overlays = [];
}

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

  drawingManager = new google.maps.drawing.DrawingManager({
    // drawingMode: google.maps.drawing.OverlayType.MAKER,
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon']
    },
    markerOptions: {
      draggable: false,
      editable: true,
    },
    polylineOptions: {
      editable: true
    },
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function (polygon) {
    // var coordinates = (polygon.getPath().getArray().toString());
    // console.log(coordinates);
    // paths.push(coordinates)

    all_overlays.push(polygon);

    var newShape = polygon.overlay;
    newShape.type = polygon.type;

    google.maps.event.addListener(newShape, 'click', function() {
      setSelection(newShape);
    });
    setSelection(newShape);

    drawingManager.setDrawingMode(null);

    // createPolygon(polygon.getPath())

    // showArray();
  });

  btnConcluded.addEventListener('click', ()=>{
    drawingManager.setDrawingMode(null);
    clearSelection();
  })

  btnNew.addEventListener('click', ()=>{
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  })

  function showArray(){
    console.log(paths);
  }

  getLocation();

  google.maps.event.addListener(map, 'click', clearSelection);
  google.maps.event.addDomListener(document.getElementById('btnDeleteSelected'), 'click', deleteSelectedShape);
}