"use strict"

class Ejercicio07 {
    
    ocultarInformacion() {
        $('h3').hide();
        $('footer').hide();
        $('address').hide();
    }
    
    mostrarInformacion() {
        $('h3').show();
        $('footer').show();
        $('address').show();
    }

    //Modificar párrafo
    modificarAddress() {
        $("address").html('<p>Si deseas ponerte en contacto con nosotros envía un mensaje al siguiente correo <a href=mailto:luismanuelglezbaizan@gmail.es>contacto@email.es</a></p>');
    }

    // Añadir elementos al html
    añadirParrafo() {
        var texto = "Hay muchos más libros relacionados con este tema" 
        + ", si de verdad te interesa aprender más sobre Laravel entra en la página oficial de la empresa " + 
        "y encontrarás mucha más información.";
        $("section").append('<p>' + texto + '</p>');
    }

    eliminarH3() {
        $('h3').remove();
    }

    // Recorrer los elementos del documento
    recorrerElementos() {
        $("*", document.body).each(function () {
            var parent = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode("Padre : <" + parent + "> elemento : <" + $(this).get(0).tagName + "> valor: "));
        });
    }

    recorrerDOM() {
            $('table').after('<section><h2>Recorrido</h2></section>');
            $("*", document.body).each(function () {
                var etiquetaPadre = $(this).parent().get(0).tagName;
                $("h2:contains('Recorrido')").after('<p>' + "Elemento padre: " + etiquetaPadre + " tipo de elemento: "
                    + $(this).get(0).tagName + '</p>');
            });
    }

    // Sumar filas y columnas de la tabla
    sumarFilasyColumnas() {
        var rowCount = $("table tr").length;
		var colCount = $("table tr th").length - $("table tr").length + 1;
        $("section").append('<p> La tabla contiene ' + rowCount + ' filas.</p>');
        $("section").append('<p> La tabla contiene ' + colCount + ' columnas.</p>');
        $("section").append('<p> La suma de filas y columnas de la tabla es de ' + (colCount+rowCount) + '.</p>');
    }
}

let ejercicio = new Ejercicio07();