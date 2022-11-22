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

var calculadora = new Calculadora(0);