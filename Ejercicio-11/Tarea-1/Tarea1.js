"use strict";

class GeoLocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.altitud          = posicion.coords.altitude;
        this.precision        = posicion.coords.accuracy;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    buscaUsuario(){
        var elemento = document.createElement("section"); 
        elemento.innerHTML = "<h2> Tu ubicación actual </h2>";
        $("button").before(elemento);
        $("button").attr("disabled","disabled");

        var datos = '<p>Longitud: ' + this.longitud + ' grados</p>';
        datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Altitud: ' + this.altitud + ' grados</p>';
        datos += '<p>Precisión de la latitud y longitud: ' + this.precision + ' metros</p>';
        datos += '<p>Precisión altitud: ' + this.precisionAltitud + ' metros</p>';
        datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
        datos += '<p>Velocidad: ' + this.velocidad + ' m/s</p>';
        
        elemento.innerHTML += datos;
    }

}

var miPosicion = new GeoLocalizacion();