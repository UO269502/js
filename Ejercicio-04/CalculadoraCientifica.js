"use strict";
class Calculadora {
    constructor (memoria){
        this.memoria=memoria;
        this.pantalla="";
        this.operacion="";
        this.operandoIzq = "";
        this.operandoDer = "";

        document.addEventListener('keydown', (event) => {
            const key = event.key;
                if(!isNaN(key)){
                    this.digitos(key);
                }
                else {
                    if (key === '.')
                        this.punto();
                    else if (key === '+')
                        this.suma();
                    else if (key === '-')
                        this.resta();
                    else if (key === '*')
                        this.multiplicacion();
                    else if (key === '/')
                        this.division();
                    else if (key === '%')
                        this.porcentaje();    
                    else if (key.toUpperCase() === 'C')
                        this.borrar();
                    else if (key.toUpperCase() === 'E')
                        this.borrarUltimoDigito();
                    else if (key.toUpperCase() === 'S')
                        this.cambioSigno();
                    else if (key.toUpperCase() === 'R')
                        this.raizCuadrada();
                    else if (key.toUpperCase() === 'M')
                        this.mrc();
                    else if (key.toUpperCase() === 'U')
                        this.mMas();
                    else if (key.toUpperCase() === 'D')
                        this.mMenos();
                    else if (key === 'Enter')
                        this.igual();
                }
        });
    }
    digitos(digito){
        if(this.operacion==""){
            this.operandoIzq += digito;
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }else{
            this.operandoDer +=digito;
            document.querySelector('input[type=text]').value = this.operandoDer;
        }
    }

    punto(){
        if(this.operacion!=""){
            if(this.operandoDer.substring(this.operandoDer.length -1)!='.'){
                this.operandoDer+='.';
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }
        else{
            if(this.operandoIzq.substring(this.operandoIzq.length -1)!='.'){
                this.operandoIzq+='.';
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }
        }
    }

    suma(){
        if(this.operandoDer!="")
            this.igual();
        this.operacion = "+";
        this.operandoDer = "";
    }

    resta(){
        if(this.operandoDer!="")
            this.igual();
        this.operacion = "-";
        this.operandoDer = "";
    }

    multiplicacion(){
        if(this.operandoDer!="")
            this.igual();
        this.operacion = "*";
        this.operandoDer = "";
    }

    division(){
        if(this.operandoDer!="")
            this.igual();
        this.operacion = "/";
        this.operandoDer = "";
    }
    
    cambioSigno(){
        if(this.operandoIzq!="" && this.operandoDer==""){
            this.operandoIzq = eval(this.operandoIzq + "*-1");
            document.querySelector('input[type=text]').value = Number(this.operandoIzq);
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            this.operandoDer = eval(this.operandoDer + "*-1");
            document.querySelector('input[type=text]').value = Number(this.operandoDer);
        }
    }

    raizCuadrada(){
        if(this.operandoIzq!="" && this.operandoDer==""){
            var result = Math.sqrt(Number(this.operandoIzq));
            this.operandoIzq = result;
            document.querySelector('input[type=text]').value = result;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            var result = Math.sqrt(Number(this.operandoDer));
            this.operandoDer = result;
            document.querySelector('input[type=text]').value = result;
        }
    }

    porcentaje(){
        if(this.operacion=="*"){
            var result = eval(this.operandoIzq + this.operacion + this.operandoDer);
            var aux = eval(result + "/100");
            document.querySelector('input[type=text]').value = Number(aux);
            this.operandoDer = "";
        }else if(this.operacion=="/"){
            var result = eval(this.operandoDer + "/100");
            var aux = eval(this.operandoIzq + this.operacion + result);
            document.querySelector('input[type=text]').value = Number(aux);
            this.operandoDer = "";
        }else if(this.operacion=="+" || this.operacion=="-"){
            var der = eval(this.operandoDer + "/100");
            var result = eval(this.operandoIzq + "*" + der);
            var aux = eval(this.operandoIzq + this.operacion + result);
            document.querySelector('input[type=text]').value = Number(aux);
            this.operandoDer = "";
        }
    }

    mrc(){
        if(this.operandoIzq!=""&&this.operandoDer==""){
            this.operandoIzq = this.memoria;
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            this.operandoDer = this.memoria;
            document.querySelector('input[type=text]').value = this.operandoDer;
        }else{
            this.operandoIzq = this.memoria;
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }
    }

    mMenos(){
        if(this.operandoDer!="")
            this.igual();
        this.memoria -= this.operandoIzq;
    }

    mMas(){
        if(this.operandoDer!="")
            this.igual();
        this.memoria += this.operandoIzq;
    }

    borrar(){
        this.operacion="";
        this.operandoIzq="";
        this.operandoDer="";
        document.querySelector('input[type=text]').value = Number(0);
    }

    borrarUltimoDigito(){
        if(this.operacion=="" && this.operandoIzq!=""){
            this.operandoIzq = "";
            document.querySelector('input[type=text]').value = Number(0);
        }else if(this.operacion!="" && this.operandoDer==""){
            this.operacion="";
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }else if(this.operacion!="" && this.operandoDer!=""){
            this.operandoDer="";
            document.querySelector('input[type=text]').value = Number(0);
        }
    }

    igual(){
        try{
            var resultado = eval(this.operandoIzq+""+this.operacion+""+this.operandoDer);
            document.querySelector('input[type=text]').value = Number(resultado);
            this.operandoIzq = resultado;
            this.operandoDer = "";
        } catch (err) {
            console.log("Error "+error)
        }
    }
}

class CalculadoraCientifica extends Calculadora {

    constructor() {
        super(0);
        this.isShift = false;
        this.angleUnit = 'deg';

        document.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key !== ' ') { 
                if (key === '(')
                    this.operador(key);
                else if (key === ')')
                    this.operador(key);
                else if (key === '!')
                    this.factorial();
                else if (key === 'Backspace')
                    this.backspace();
                else if (key === 'Shift')
                    this.cambioTrigonometría();
                else if (key === 'A')
                    this.cambiaUnidadAngulos();
                else if (key.toUpperCase() === 'B')
                    this.cuadrado();
                else if (key.toUpperCase() === 'F')
                    this.potencia();
                else if (key.toUpperCase() === 'G')
                    this.seno();
                else if (key.toUpperCase() === 'H')
                    this.coseno();
                else if (key.toUpperCase() === 'I')
                    this.tangente();
                else if (key.toUpperCase() === 'K')
                    this.potencia10();
                else if (key.toUpperCase() === 'L')
                    this.log();
                else if (key.toUpperCase() === 'N')
                    this.exp();
                else if (key.toUpperCase() === 'O')
                    this.modulo();
                else if (key.toUpperCase() === 'P')
                    this.masMenos();
            }
        });
    }

    digitos(digito){
        if(digito!=Math.PI){
            if(this.operacion==""){
                this.operandoIzq += digito;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else{
                this.operandoDer +=digito;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }else{
            /* El número PI tiene como particularidad según la calculadora de Windows que
               si se está escribiendo un número y antes de escoger cualquier operación se
               aprieta el botón PI el valor se sustituye por este. 
               Es decir, si estuviesemos escribiendo el número 656 y se da al número PI,
               el nuevo valor de la pantalla será 3.141592...*/
            if(this.operacion=="" && this.operandoDer==""){
                this.operandoIzq = digito;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operacion!=""){
                this.operandoDer = digito;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }
    }

    #unaryOperation(func) {
        if (this.operands.length > 0)
            this.pantalla = 'SYNTAX ERROR'
        else {
            this.n1 = func(Number(this.n1));
            this.pantalla = this.n1;
        }

        this.reinicia();
        this.actualizaPantalla();
        this.pantalla = ''; 
    } 

    cuadrado() {
        if(this.operandoIzq!="" && this.operandoDer==""){
            var aux = Math.pow(this.operandoIzq, 2);
            this.operandoIzq = Number(aux);
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            var aux = Math.pow(this.operandoDer, 2);
            this.operandoDer = Number(aux);
            document.querySelector('input[type=text]').value = this.operandoDer;
            this.operandoDer="";
        }
    }

    potencia() {
        if(this.operandoDer!="")
            this.igual();
        this.operacion = "**";
        this.operandoDer = "";
    }

    potencia10() {
        if(this.operandoIzq!="" && this.operandoDer==""){
            var aux = Math.pow(10, this.operandoIzq);
            this.operandoIzq = Number(aux);
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            var aux = Math.pow(10, this.operandoDer);
            this.operandoDer = Number(aux);
            document.querySelector('input[type=text]').value = this.operandoDer;
        }
    }

    log() {
        if(this.operandoIzq!="" && this.operandoDer==""){
            var aux = Math.log10(this.operandoIzq);
            this.operandoIzq = Number(aux);
            document.querySelector('input[type=text]').value = this.operandoIzq;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            var aux = Math.log10(this.operandoDer);
            this.operandoDer = Number(aux);
            document.querySelector('input[type=text]').value = this.operandoDer;
        }
    }

    exp(){
        //if(this.operandoDer!=""){

        //}
        //this.operacion="*10**";
        //document.querySelector('input[type=text]').value = this.operandoIzq+",e+0";
    }

    modulo() {
        if(this.operandoDer!="")
            this.igual();
        this.operacion = "%";
        this.operandoDer = "";
    }

    masMenos() {
        this.n1 = Number(this.n1) * Number(-1);
        this.actualizaPantalla();
    }

    factorial() {
        var x = Number(document.querySelector('input[type=text]').value);
        x = Math.round(x);
        var i = x;
        while(i>'1'){
            i--;
            x = x * i;
        }
        if(this.operandoIzq!="" && this.operandoDer=="")
            this.operandoIzq = x;
        else if(this.operandoIzq!="" && this.operacion!="")
            this.operandoDer = x;
        document.querySelector('input[type=text]').value = x;
    }

    seno() {
        if(this.isShift){
            if(this.operandoIzq!="" && this.operandoDer==""){
                /*Este resultado está en radianes y mi calculadora lo muestra en grados
                  por lo que tengo que hacer la conversión.*/
                var aux = Math.asin(this.operandoIzq);
                this.operandoIzq = aux*180/Math.PI;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operandoDer!=""){
                var aux = Math.asin(this.operandoDer);
                this.operandoDer = aux*180/Math.PI;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }else{
            if(this.operandoIzq!="" && this.operandoDer==""){
                var aux = Math.sin(this.angulo(this.operandoIzq));
                this.operandoIzq = aux;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operandoDer!=""){
                var aux = Math.sin(this.angulo(this.operandoDer));
                this.operandoDer = aux;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }
    }

    coseno() {
        if(this.isShift){
            if(this.operandoIzq!="" && this.operandoDer==""){
                /*Este resultado está en radianes y mi calculadora lo muestra en grados
                  por lo que tengo que hacer la conversión.*/
                var aux = Math.acos(this.operandoIzq);
                this.operandoIzq = aux*180/Math.PI;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operandoDer!=""){
                var aux = Math.acos(this.operandoDer);
                this.operandoDer = aux*180/Math.PI;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }else{
            if(this.operandoIzq!="" && this.operandoDer==""){
                var aux = Math.cos(this.angulo(this.operandoIzq));
                this.operandoIzq = aux;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operandoDer!=""){
                var aux = Math.cos(this.angulo(this.operandoDer));
                this.operandoDer = aux;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }
    }

    tangente() {
        if(this.isShift){
            if(this.operandoIzq!="" && this.operandoDer==""){
                /*Este resultado está en radianes y mi calculadora lo muestra en grados
                  por lo que tengo que hacer la conversión.*/
                var aux = Math.atan(this.operandoIzq);
                this.operandoIzq = aux*180/Math.PI;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operandoDer!=""){
                var aux = Math.atan(this.operandoDer);
                this.operandoDer = aux*180/Math.PI;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }else{
            if(this.operandoIzq!="" && this.operandoDer==""){
                var aux = Math.tan(this.angulo(this.operandoIzq));
                this.operandoIzq = aux;
                document.querySelector('input[type=text]').value = this.operandoIzq;
            }else if(this.operandoIzq!="" && this.operandoDer!=""){
                var aux = Math.tan(this.angulo(this.operandoDer));
                this.operandoDer = aux;
                document.querySelector('input[type=text]').value = this.operandoDer;
            }
        }
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

    backspace() {
        if(this.operandoIzq!="" && this.operandoDer==""){
            var aux = this.operandoIzq.substring(0, this.operandoIzq.length-1);
            this.operandoIzq = aux;
            document.querySelector('input[type=text]').value=this.operandoIzq;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            var aux = this.operandoDer.substring(0, this.operandoDer.length-1);
            this.operandoDer = aux;
            document.querySelector('input[type=text]').value=this.operandoDer;
        }
    }

    numPI(){
        if(this.operandoIzq!="" && this.operandoDer==""){
            this.operandoIzq = Math.PI;
            document.querySelector('input[type=text]').value=this.operandoIzq;
        }else if(this.operandoIzq!="" && this.operandoDer!=""){
            this.operandoDer = Math.PI;
            document.querySelector('input[type=text]').value=this.operandoDer;
        }else if(this.operandoIzq==""){
            this.operandoIzq = Math.PI;
            document.querySelector('input[type=text]').value=this.operandoIzq;
        }else if(this.operandoDer==""){
            this.operandoDer = Math.PI;
            document.querySelector('input[type=text]').value=this.operandoDer;
        }
    }

    guardarEnMemoria() {
        this.memoria = this.n1;
    }

    mc() {
        this.isPressed = true;
        this.mrc();
    }

    mr() {
        this.isPressed = false;
        this.mrc();
    }

    cambiaUnidadAngulos() {
        this.angleUnit = this.angleUnit === 'deg' ? 'rad' : 'deg';
        document.getElementById('angleUnit').value = this.angleUnit.toUpperCase();
    }

    angulo (x) {
        return this.angleUnit === 'deg' ? (x * (Math.PI / 180.0)) : x;
    }
}

let calc = new CalculadoraCientifica();