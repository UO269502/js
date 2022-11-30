"use strict";

class DatosMeteorologicos {

    constructor() {
        //Cinco ciudades de diferentes países
        this.lugares = ['Oviedo', 'Dublín', 'Akureyri', 'Oporto', 'Bruxelles'];
        //Clave personal
        this.apikey = "d3f39b9c61bcffbc665059bbed2a086a";
        //Codigo de dos letras referente a cinco paises diferentes:
        // ES -> España, IE -> Irlanda, IS -> Islandia, PT -> Portugal, BE -> Bélgica
        this.codigoPais = ["ES", "IE", "IS", "PT", "BE"];
    }

    generacionURL(lugar, code) {
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + lugar + "," + code + "&units=metric&lang=es&APPID=" + this.apikey;
    }

    recorrerCiudades() {
        for(let i=0; i<this.lugares.length; i++){
            this.cargarDatos(this.lugares[i], this.codigoPais[i]);
        }
        $("button").attr("disabled","disabled");
    }

    cargarDatos(lugar, code) {
        var elemento = document.createElement("section"); 
        elemento.innerHTML = "";
        $("button").before(elemento);
        this.generacionURL(lugar, code);
        

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var datosMeteorologicos = "<h2>" + datos.name + " - " + datos.sys.country + "</h2>";
                    datosMeteorologicos += '<img src="https://openweathermap.org/img/w/' + datos.weather[0].icon +'.png" alt="representación del tiempo en la ciudad ' + datos.name + '" />';
                    datosMeteorologicos += "<ul><li>Temperatura: " + datos.main.temp + "ºC</li>";
                    datosMeteorologicos += "<li>Temperatura máxima: " + datos.main.temp_max + "ºC</li>";
                    datosMeteorologicos += "<li>Temperatura mínima: " + datos.main.temp_min + "ºC</li>";
                    datosMeteorologicos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                    datosMeteorologicos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                    datosMeteorologicos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                    datosMeteorologicos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                    datosMeteorologicos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                    datosMeteorologicos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                    datosMeteorologicos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                    datosMeteorologicos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                    datosMeteorologicos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                    datosMeteorologicos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                
                elemento.innerHTML = datosMeteorologicos;
            }, error: function() { // no lo añadas a la aplicación
                $(elemento).remove();
            }
        });
    }

}

let meteo = new DatosMeteorologicos();