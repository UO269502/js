"use strict";

class Paint {

    constructor() {
        this.arrayColors = ['orange', 'green', 'blue', 'red', 'yellow', 'purple', 'black', 'gold', 'magenta', 'aquamarine'
                            , 'aqua', 'bisque', 'burlywood', 'brown', 'chartreuse', 'chocolate'];
        this.arrayColdColors = ['blue', 'aqua', 'aquamarine'];
        this.arrayWarmColors = ['bisque', 'chocolate', 'chartreuse'];
        this.arrayHotColors = ['orange', 'red', 'gold'];
        this.lugares = ['Oviedo'];
        //Clave personal
        this.apikey = "d3f39b9c61bcffbc665059bbed2a086a";
        this.codigoPais = ["ES"];
    }

    showSquare() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        for(let i=0; i<16; i++){
            ctx.strokeStyle = this.arrayColors[i];
            ctx.strokeRect(Math.random()*250, Math.random()*100, Math.random()*50, Math.random()*50);
        }
    }

    dripping() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        for(let i=0; i<1600; i++){
            ctx.beginPath();
            ctx.arc(Math.random()*300, Math.random()*150, Math.random()*3, 0, Math.PI + (Math.PI * 2) / 2, true);
            ctx.fillStyle = this.arrayColors[(i%16)];
            ctx.fill();
        }
    }

    dragOverHandler(event) {

        event.preventDefault();
    }

    dropHandler(event) {
        event.preventDefault();
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var lector = new FileReader();
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            lector.onload = function(e) {
                var contenido = e.target.result;
                var pila = contenido.split("\n");
                for (var j = 0; j<pila.length; j++){
                    var a = pila[j];
                    if (a.includes("rect")) {
                        ctx.beginPath();
                        ctx.fillRect(pila[j+1], pila[j+2], pila[j+3], pila[j+4]);
                        j+=5;
                        ctx.fillStyle = pila[j];
                        ctx.fill();                        
                    }
                }
            };
            lector.readAsText(event.dataTransfer.files[i]);
        }

        this.removeDragData(event)
    }

    removeDragData(ev) {
      
        if (ev.dataTransfer.items) {
          ev.dataTransfer.items.clear();
        } else {
          ev.dataTransfer.clearData();
        }
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
        this.generacionURL(lugar, code);
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');
                if(datos.main.temp<5) {
                    for(let i=0; i<15; i++){
                        if(i%3==0)
                            ctx.strokeStyle = 'aqua';
                        else if(i%3==1)
                            ctx.strokeStyle = 'aquamarine';
                        else
                            ctx.strokeStyle = 'blue';
                        ctx.strokeRect(Math.random()*250, Math.random()*100, Math.random()*50, Math.random()*50);
                    }
                }else if(datos.main.temp>=5 && datos.main.temp<15){
                    for(let i=0; i<15; i++){
                        if(i%3==0)
                            ctx.strokeStyle = 'chartreuse';
                        else if(i%3==1)
                            ctx.strokeStyle = 'chocolate';
                        else
                            ctx.strokeStyle = 'bisque';
                        ctx.strokeRect(Math.random()*250, Math.random()*100, Math.random()*50, Math.random()*50);
                    }
                }else{
                    for(let i=0; i<15; i++){
                        if(i%3==0)
                            ctx.strokeStyle = 'orange';
                        else if(i%3==1)
                            ctx.strokeStyle = 'gold';
                        else
                            ctx.strokeStyle = 'red';
                        ctx.strokeRect(Math.random()*250, Math.random()*100, Math.random()*50, Math.random()*50);
                    }
                }
                if(datos.clouds.all<33){
                    for(let i=0; i<10; i++){
                        ctx.beginPath();
                        ctx.arc(Math.random()*300, Math.random()*150, Math.random()*3, 0, Math.PI + (Math.PI * 2) / 2, true);
                        ctx.fillStyle = 'black';
                        ctx.fill();
                    }
                }else if(datos.clouds.all>=33 && datos.cloud<66){
                    for(let i=0; i<30; i++){
                        ctx.beginPath();
                        ctx.arc(Math.random()*300, Math.random()*150, Math.random()*3, 0, Math.PI + (Math.PI * 2) / 2, true);
                        ctx.fillStyle = 'black';
                        ctx.fill();
                    }
                }else{
                    for(let i=0; i<50; i++){
                        ctx.beginPath();
                        ctx.arc(Math.random()*300, Math.random()*150, Math.random()*3, 0, Math.PI + (Math.PI * 2) / 2, true);
                        ctx.fillStyle = 'black';
                        ctx.fill();
                    }
                }
                if(datos.wind.speed<25){
                    for(let i=0; i<15; i++){
                        ctx.beginPath(); // Start a new path
                        ctx.moveTo(Math.random()*250, Math.random()*100);
                        ctx.lineTo(Math.random()*250, Math.random()*100);
                        ctx.strokeStyle = 'gray';
                        ctx.stroke();
                        ctx.closePath();
                    }
                }else if(datos.wind.speed>=25 && datos.wind.speed<60){
                    for(let i=0; i<42; i++){
                        ctx.beginPath();
                        ctx.moveTo(Math.random()*250, Math.random()*100);
                        ctx.lineTo(Math.random()*250, Math.random()*100);
                        ctx.strokeStyle = 'gray';
                        ctx.stroke();
                        ctx.closePath();
                    }
                }else if(datos.wind.speed>=60){
                    for(let i=0; i<75; i++){
                        ctx.beginPath(); 
                        ctx.moveTo(Math.random()*250, Math.random()*100);
                        ctx.lineTo(Math.random()*250, Math.random()*100);
                        ctx.strokeStyle = 'gray';
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }, error: function() {
                $(elemento).remove();
            }
        });
    }
}

let paint = new Paint();