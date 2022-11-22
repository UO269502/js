"use strict";

class CalculadoraRPN {
    
    constructor() {
        // Establecemos los valores de las pantallas
        this.pantalla = '';
        this.pantallaPila = '';
        this.operacion = "";
        this.operandoIzq = "";
        this.operandoDer = "";
        this.isShift = false;

        // Creamos una pila para poder hacer las operaciones
        this.pila = new Pila();

        // Establecemos los eventos de teclado
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (key !== ' ') { // no aceptamos el espacio
                if (Number.isInteger(Number(key)) || key === '.')
                    this.digitos(key);
                else {
                    if (key === '+')
                        this.suma();
                    else if (key === '-')
                        this.resta();
                    else if (key === '*')
                        this.multiplicacion();
                    else if (key === '/')
                        this.division();
                    else if (key.toUpperCase() === 'E')
                        this.exponencial();
                    else if (key.toUpperCase()  === 'F')
                        this.potencia();
                    else if (key.toUpperCase()  === 'S')
                        this.cambioSigno();
                    else if (key.toUpperCase()  === 'P')
                        this.potencia10();
                    else if (key.toUpperCase()  === 'R')
                        this.raizCuadrada();
                    else if (key.toUpperCase()  === 'D')
                        this.cuadrado();
                    else if (key.toUpperCase()  === 'L')
                        this.logaritmo();
                    else if (key.toUpperCase()  === 'H')
                        this.shift();
                    else if (key.toUpperCase()  === 'N')
                        this.seno();
                    else if (key.toUpperCase()  === 'O')
                        this.coseno();
                    else if (key.toUpperCase()  === 'T')
                        this.tangente();
                    else if (key.toUpperCase()  === 'C')
                        this.borrar();
                    else if (key === 'Enter')
                        this.enter();
                }
            }
        });
    }

    enter() {
        this.pila.push(Number(this.pantalla));
        this.pantalla = '';
        document.querySelector('input[type=text]').value = this.pantalla;
        this.actualizaPantallaPila();
    }

    // Refrescamos el documento para que se muestre el valor deseado
    actualizaPantalla() {        
        document.querySelector('input[type=text]').value = this.pantalla;
    }

    // Refrescamos el documento para que se muestre el valor deseado
    actualizaPantallaPila() {
        this.pantallaPila = ''; // reseteamos la pantalla de la pila
        for (let i = 0; i < this.pila.len(); i++)
            this.pantallaPila += this.pila.get(i).toString() + '\n';
        
        document.querySelector('textarea').value = this.pantallaPila;
    }

    digitos(value) {
        this.pantalla += value;
        this.actualizaPantalla();
    }

    suma() {
        this.operandoDer = this.pila.pop();
        this.operandoIzq = this.pila.pop();
        let result = Number(this.operandoIzq) + Number(this.operandoDer);
        this.pantalla = result;
        this.enter();
    }

    resta() {
        this.operandoDer = this.pila.pop();
        this.operandoIzq = this.pila.pop();
        let result = Number(this.operandoIzq) - Number(this.operandoDer);
        this.pantalla = result;
        this.enter();
    }

    multiplicacion() {
        this.operandoDer = this.pila.pop();
        this.operandoIzq = this.pila.pop();
        let result = Number(this.operandoIzq) * Number(this.operandoDer);
        this.pantalla = result;
        this.enter();
    }

    division() {
        this.operandoDer = this.pila.pop();
        this.operandoIzq = this.pila.pop();
        let result = Number(this.operandoIzq) / Number(this.operandoDer);
        this.pantalla = result;
        this.enter();
    }

    raizCuadrada() {
        this.operandoDer = this.pila.pop();
        let result = Math.sqrt(Number(this.operandoDer));
        this.pantalla = result;
        this.enter();
    }

    cuadrado() {
        this.operandoDer = this.pila.pop();
        let result = Math.pow(Number(this.operandoDer), 2);
        this.pantalla = result;
        this.enter();
    }

    potencia() {
        this.operandoDer = this.pila.pop();
        this.operandoIzq = this.pila.pop();
        let result = Math.pow(Number(this.operandoIzq), Number(this.operandoDer));
        this.pantalla = result;
        this.enter();
    }

    cambioSigno() {
        this.operandoDer = this.pila.pop();
        let result = Number(this.operandoDer) * -1;
        this.pantalla = result;
        this.enter();
    }

    potencia10() {
        this.operandoDer = this.pila.pop();
        let result = Math.pow(10, Number(this.operandoDer));
        this.pantalla = result;
        this.enter();
    }

    logaritmo() {
        this.operandoDer = this.pila.pop();
        let result = Math.log(Number(this.operandoDer));
        this.pantalla = result;
        this.enter();
    }

    exponencial() {
        this.operandoDer = this.pila.pop();
        let result = Math.pow(Math.E, Number(this.operandoDer));
        this.pantalla = result;
        this.enter();
    }

    seno() {
        if(this.isShift){
            /*Este resultado está en radianes y mi calculadora lo muestra en grados
              por lo que tengo que hacer la conversión.*/
            this.operandoDer = this.pila.pop();
            var aux = Math.asin(Number(this.operandoDer));
            aux = aux*180/Math.PI;
            this.pantalla = aux;
            this.enter();
        }else{
            this.operandoDer = this.pila.pop();
            var operando = Number(this.operandoDer) * (Math.PI / 180);
            var aux = Math.sin(Number(operando));
            this.pantalla = aux;
            this.enter();
        }
    }

    coseno() {
        if(this.isShift){
            /*Este resultado está en radianes y mi calculadora lo muestra en grados
              por lo que tengo que hacer la conversión.*/
            this.operandoDer = this.pila.pop();
            var aux = Math.acos(Number(this.operandoDer));
            aux = aux*180/Math.PI;
            this.pantalla = aux;
            this.enter();
        }else{
            this.operandoDer = this.pila.pop();
            var operando = Number(this.operandoDer) * (Math.PI / 180);
            var aux = Math.cos(Number(operando));
            this.pantalla = aux;
            this.enter();
        }
    }

    tangente() {
        if(this.isShift){
            /*Este resultado está en radianes y mi calculadora lo muestra en grados
              por lo que tengo que hacer la conversión.*/
            this.operandoDer = this.pila.pop();
            var aux = Math.atan(Number(this.operandoDer));
            aux = aux*180/Math.PI;
            this.pantalla = aux;
            this.enter();
        }else{
            this.operandoDer = this.pila.pop();
            var operando = Number(this.operandoDer) * (Math.PI / 180);
            var aux = Math.tan(Number(operando));
            this.pantalla = aux;
            this.enter();
        }
    }

    limpiarPantalla() {
        this.pantalla = '';
    }

    borrar() {
        this.pila = new Pila();
        this.pantalla = '';
        document.querySelector('input[type=text]').value = this.pantalla;
        this.actualizaPantallaPila();
    }

    shift(){
        if(this.isShift){
            this.isShift=false;
            document.querySelector('input[value="sin^-1"]').value = "sin";
            document.querySelector('input[value="cos^-1"]').value = "cos";
            document.querySelector('input[value="tan^-1"]').value = "tan";
        }else{
            this.isShift=true;
            document.querySelector('input[value="sin"]').value = "sin^-1";
            document.querySelector('input[value="cos"]').value = "cos^-1";
            document.querySelector('input[value="tan"]').value = "tan^-1";
        }
    }

}

class Pila {

    constructor() {
        this.pila = new Array();
    }

    push(valor) {
        this.pila.push(valor);
    }

    pop() {
        return (this.pila.pop());
    }

    get(index) {
        return this.pila[index];
    }

    len() {
        return this.pila.length;
    }

}

let calc = new CalculadoraRPN();