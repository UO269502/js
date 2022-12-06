"use strict";

class GeoLocalizacion {

    constructor() {
        this.lugares = ['Madrid', 'Dublín', 'Berlin', 'Oslo', 'Roma', 'Lisbon', 'Paris', 'London', 'Brussels', 'Amsterdam', 'Copenhagen'
                        , 'Stockholm', 'Reykjavik', 'Bern', 'Vienna', 'Ljubljana', 'Zagreb', 'Sarajevo', 'Podgorica', 'Tirana'
                        , 'Athens', 'Sofia', 'Bucharest', 'Belgrade', 'Budapest', 'Bratislava', 'Prague', 'Warsaw'];
        this.arrayLongitudes = [-3.6884588437540007, -6.275444397259708, 13.376549826881842, 10.746862273843597, 12.491955719326713, -9.215810818839065
                                , 2.2951681714952, -0.14103261945870507, 4.341492061826698, 4.884331664277236, 12.576867450815683
                                , 18.08274084093862, -21.927285417576893, 7.416352374286518, 16.380985067477376, 14.50919022090958
                                , 15.978224771039303, 18.413521477578428, 19.24868380209333, 19.824662262023477, 23.727142474157066
                                , 23.32218729611833, 26.09694767725837, 20.451748577468763, 19.058977435151856, 17.101034200158683
                                , 14.42048560975433, 21.026141428715516];
        this.arrayLatitudes = [40.419648690585426, 53.36244109889026, 52.51639118842605, 59.91253702953043, 41.889215821895704, 38.69172609740138
                                , 48.87356660617, 51.50165685332876, 50.89464346936128, 52.359341597699775, 55.686088218207416
                                , 59.326190776094016, 64.14211026689046, 46.9303020263489, 48.19117124426144, 46.0486075028771
                                , 45.809327959800065, 43.85777401023001, 42.44562520887648, 41.32555628032016, 37.971602342284456
                                , 42.698328560002295, 44.441174440074796, 44.822929732038645, 47.50234089999808, 48.142649157305556
                                , 50.06466195168251, 52.2510750860793];

        this.apikey = "d3f39b9c61bcffbc665059bbed2a086a";
        //this.codigoPais = ["ES", "IE", "DE", "NO", "IT"];
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    getMapaEstaticoGoogle(number){
        document.querySelector("section");
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.arrayLatitudes[number] + "," + this.arrayLongitudes[number];
        var zoom ="&zoom=17";
        var tamaño= "&size=800x600";
        var style = "&maptype=satellite";
        var marcador = "&markers=color:orange%7Clabel:S%7C" + this.arrayLatitudes[number] + "," + this.arrayLongitudes[number];
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + style + marcador + sensor + apiKey;
        $('img').remove();
        $('ul').remove();
        $('h2').remove();
        $("section").append("<img src='"+this.imagenMapa+"' alt='mapa estático google' />");
        this.cargarDatos(this.lugares[number]);//, this.codigoPais[number]);
    }

    generarUrl(lugar, code) {
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + lugar + "," + code + "&units=metric&lang=es&APPID=" + this.apikey;
    }

    cargarDatos(lugar, code) {
        this.generarUrl(lugar, code);
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var datosMeteorologicos = "<h2>" + datos.name + " - " + datos.sys.country + "</h2>";
                    datosMeteorologicos += '<img src="https://openweathermap.org/img/w/' + datos.weather[0].icon +'.png" alt="icono que representa el tiempo de la ciudad ' + datos.name + '" />';
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
                $("section").append(datosMeteorologicos);
            }, error: function() {
                $(elemento).remove();
            }
        });
    }
}
var miPosicion = new GeoLocalizacion();