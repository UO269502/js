"use strict";

class PrecioGasolina { 

    constructor() {
        this.url = "https://miguelangelcolmenero.eu/combustible/fuel_prices.json";
    }

    cargarDatos() {
        var elemento = document.createElement("section"); 
        $("button").before(elemento);
        $("button").attr("disabled","disabled");
        var output = "<h2>Precio: €/1000L</h2>"
        $.getJSON(this.url, function(datos) {
            output += "<ul>";
            for (var i in datos) {
                if(datos[i].country != null)
                    output+="<li>País: " + datos[i].country + "<ul><li>Precio gasolina 95: " + datos[i].gasoline + "€/1000L</li>" + "<li>Precio diesel: " + datos[i].diesel + "€/1000L</li></ul></li>";
            }
            output+="</ul>";
            elemento.innerHTML = output;
        });
    }
}

let precio = new PrecioGasolina();