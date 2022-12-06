"use strict";

class GeoLocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.error.bind(this));
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

        var datos = '<p>Longitud: ' + this.longitud + ' grados</p>';
        datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Altitud: ' + this.altitud + ' grados</p>';
        datos += '<p>Precisión de la latitud y longitud: ' + this.precision + ' metros</p>';
        datos += '<p>Precisión altitud: ' + this.precisionAltitud + ' metros</p>';
        datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
        datos += '<p>Velocidad: ' + this.velocidad + ' m/s</p>';
        
        elemento.innerHTML += datos;
    }

    error(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
            this.mensaje = "No me diste permiso para localizarte... :("
            break;

            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Posición no disponible"
                break;

            case error.TIMEOUT:
                this.mensaje = "Ha pasado demasiado tiempo"
                break;
            
            case error.UNKNOWN_ERROR:
                this.mensaje = "No entiendo qué pasa :_("
                break;
        }
    }

    getMapaEstaticoGoogle(dondeVerlo){
        var elemento = document.createElement("section"); 
        elemento.innerHTML = "<h2> Tu ubicación actual </h2>";
        $("button").before(elemento);
        $("button").attr("disabled","disabled");

        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:orange%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        elemento.innerHTML += "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
    }

}
var miPosicion = new GeoLocalizacion();