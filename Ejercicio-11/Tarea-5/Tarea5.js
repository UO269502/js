"use strict";

class MapaDinamicoGoogle {

    initMap() {
        let posicionUser = { lat: this.latitud, lng: this.longitud};
        let mapa = new google.maps.Map(document.querySelector("section"), 
                                                {zoom: 15, 
                                                center:posicionUser,
                        mapTypeId: "terrain"});
        mapa.setTilt(45);
        let marcador = new google.maps.Marker({
			position: posicionUser, 
			map: mapa
        });
        
        let infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				infoWindow.setPosition(pos);
				infoWindow.setContent('Esta es su posición.');
				infoWindow.open(mapa);
				mapa.setCenter(pos);
			}, 
				e => this.handleLocationError(true, mapa, infoWindow, map.getCenter())
			);
		} else 
			handleLocationError(false, infoWindow, mapa.getCenter());
	}

	handleLocationError(browserHasGeolocation, mapa, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                        'Error: Ha fallado la geolocalización' :
                        'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapa);
	}


}

var mapaDinamigoGoogle = new MapaDinamicoGoogle();