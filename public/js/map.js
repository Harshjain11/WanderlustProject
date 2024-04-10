
	mapboxgl.accessToken = mapToken; 
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:'mapbox://styles/mapbox/streets-v12',
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });


    
      // Add markers to the map.
    
        // Create a DOM element for each marker.
        const el = document.createElement('div');
      
        el.innerHTML =` <i class="fa-regular fa-compass"></i>` ;
        el.style.backgroundColor = "white";
       
       
         const marker = new mapboxgl.Marker({element:el})
        .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided After booking</p>`))
        .addTo(map);
      
   
   
