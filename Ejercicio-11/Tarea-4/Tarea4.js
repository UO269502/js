"use strict";

class MapaDinamicoGoogle {

    initMap() { 
        let castilloEdimburgo = { lat: 55.948922803210095, lng: -3.200549378537096};
        let mapa = new google.maps.Map(document.querySelector("section"), 
                                                {zoom: 15, 
                                                center:castilloEdimburgo,
                        mapTypeId: "satellite"});
        mapa.setTilt(45);
        let marcador = new google.maps.Marker({
			position: castilloEdimburgo, 
			map: mapa
        });
    }

}

var mapaDinamigoGoogle = new MapaDinamicoGoogle();