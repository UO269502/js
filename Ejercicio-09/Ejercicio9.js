"use strict";

class DatosMeteorologicos {

    constructor() {
        this.lugares = ['Oviedo', 'Dublín', 'Akureyri', 'Oporto', 'Bruxelles'];

        this.apikey = "d3f39b9c61bcffbc665059bbed2a086a";
        this.codigoPais = ["ES", "IE", "IS", "PT", "BE"];
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    generacionURL(lugar, code) {
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + lugar + "," + code + "&units=metric&lang=es&mode=xml&APPID=" + this.apikey;
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
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var ciudad                = $('city',datos).attr("name");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var amanecerMiliSeg1970   = Date.parse(amanecer);
                var oscurecer             = $('sun',datos).attr("set");          
                var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var humedad               = $('humidity',datos).attr("value");
                var presion               = $('pressure',datos).attr("value");
                var velocidadViento       = $('speed',datos).attr("value");
                var direccionViento       = $('direction',datos).attr("value");
                var nubosidad             = $('clouds',datos).attr("value");
                var visibilidad           = $('visibility',datos).attr("value");
                var precipitacionValue    = $('precipitation',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");

                var datosMeteorologicos = "<h2>" + ciudad + " - " + pais + "</h2>";
                    datosMeteorologicos += '<img src="https://openweathermap.org/img/w/' + $('weather',datos).attr("icon") +'.png" alt="icono que representa el tiempo" />';
                    datosMeteorologicos += "<ul><li>Temperatura: " + temperatura + "ºC</li>";
                    datosMeteorologicos += "<li>Temperatura máxima: " + temperaturaMin + "ºC</li>";
                    datosMeteorologicos += "<li>Temperatura mínima: " + temperaturaMax + "ºC</li>";
                    datosMeteorologicos += "<li>Presión: " + presion + " milibares</li>";
                    datosMeteorologicos += "<li>Humedad: " + humedad + " %</li>";
                    datosMeteorologicos += "<li>Amanece a las: " + (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES") + "</li>";
                    datosMeteorologicos += "<li>Oscurece a las: " + (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES") + "</li>";
                    datosMeteorologicos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
                    datosMeteorologicos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                    datosMeteorologicos += "<li>Hora de la medida: " + (new Date(horaMedida)).toLocaleTimeString("es-ES") + "</li>";
                    datosMeteorologicos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                    datosMeteorologicos += "<li>Visibilidad: " + precipitacionValue + " metros</li>";
                    datosMeteorologicos += "<li>Precipitación: " + visibilidad + " metros</li>";
                    datosMeteorologicos += "<li>Nubosidad: " + nubosidad + "%</li></ul>";
                
                elemento.innerHTML = datosMeteorologicos;
            }, error: function() { // no lo añadas a la aplicación
                $(elemento).remove();
            }
        });
    }

}

let meteo = new DatosMeteorologicos();