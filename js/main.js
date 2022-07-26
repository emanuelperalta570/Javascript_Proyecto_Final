
let nombre;
let sexo;
let dni;

let servicioSesion;

let dataServicios;

let cantEmpleados=document.getElementById("q_emp");

let servicioSeleccionado;

const lista = document.querySelector('#servicios')

fetch("../js/data.json")
 .then((resp) => resp.json())
 .then((dataServicios)=>{
    dataServicios.clientes.forEach(servicio => {
        const li = document.createElement('li')
        li.innerHTML= `<img src="${servicio.img}" width="200" height="240"></img>
                       <h4>${servicio.nombre}</h4>
                       <p>${servicio.valor}</p> 
        `
        lista.append(li);
  });
});



class Cliente{
    constructor(nombreUsuario,dniUsuario,cantEmpleados,mail){
        this.nombre=nombreUsuario;
        this.dni=dniUsuario;
        this.cantidadEmpleados=Number(cantEmpleados);
        this.mail=mail;
        this.subtotal=3000;
        this.total=0;
    }

    calcularTotal(){
    
    this.total=(this.cantidadEmpleados)*200+this.subtotal;
    
    }
    
}

class ServicioSolic{
    constructor(nom_usuario,q_emp,valorTotal){
        this.nom_usuario=nom_usuario;
        this.q_emp=q_emp;
        this.valorTotal=valorTotal;
    }
}

let indexUsuario=-2;
const clientes=[];

const cliente1 = new Cliente ("EMANUEL",36873055,5,"ema@gmail.com");
clientes.push(cliente1);
const cliente2 = new Cliente ("MATIAS",39512645,4,"mati@gmail.com");
clientes.push(cliente2);
const cliente3 = new Cliente ("SANDRA",16874589,3,"sandra@gmail.com");
clientes.push(cliente3);
const cliente4 = new Cliente ("ALICIA",12456789,2,"alicia@gmail.com");
clientes.push(cliente4);
const cliente5 = new Cliente ("PEPITO",36852147,1,"pepito@gmail.com");
clientes.push(cliente5);


for(const cliente of clientes){
    cliente.calcularTotal();
}

do{
    do {
        if(indexUsuario==-2){
            nombre = document.getElementById("nombre");
            nombre.onchange = (e) => {
            nombre=e.target.value.toUpperCase();
                for(const cliente of clientes){
                    if(nombre==cliente.nombre){
                        indexUsuario=1;
                        swal({
                            title: "Ups",
                            text: "Nombre de usuario en uso,ingrese otro nombre de usuario",
                            icon:"warning",
                        })
                        break;
                    }
                    else{
                        indexUsuario=-1;
                    }
                } 
            if(indexUsuario<0){
                let titulo = document.getElementById("titulo")
                titulo.innerText=`Bienvenido ${nombre} !`
            }
            }  
    }   else{
            nombre = document.getElementById("nombre");
            nombre.onchange = (e) => {
            nombre=e.target.value.toUpperCase();
                for(const cliente of clientes){
                    if(nombre==cliente.nombre){
                        indexUsuario=1;
                        swal({
                            title: "Ups",
                            text: "Nombre de usuario en uso,ingrese otro nombre de usuario",
                            icon:"warning",
                        })
                        break;
                    }
                    else{
                        indexUsuario=-1;
                    }
                }
            if(indexUsuario<=0){
                    let titulo = document.getElementById("titulo")
                    titulo.innerText=`Bienvenido ${nombre} !`
                }     
            }  
        }
    }while(indexUsuario>=0)
} while((nombre == "") || (dni==NaN ))



let mail=document.getElementById("mailElement");

cantEmpleados.onchange = (e) =>{
    cantEmpleados=e.target.value;
}

mail.onchange = (e) =>{
    mail=e.target.value;
}





let enviar = document.getElementById("btn-enviar");
enviar.onclick= (e) => {
    e.preventDefault();
    let cliente6 = new Cliente (nombre,dni,cantEmpleados,mail);
    clientes.push(cliente6);
    cliente6.calcularTotal();
    let container = document.getElementById("contenedor-body");
    cliente6.mail="" ? cliente6.mail="NULL": cliente6.mail=cliente6.mail ;


    swal({
        title: "Genial",
        text: "La carga de datos ha sido exitosa",
        icon:"success",
    })

    cantEmpleados!=0 ? container.innerHTML=`<h3>DETALLE DE SERVICIO</h3> 
                        <p>Servicio solicitado para ${cantEmpleados} empleados</p> 
                        <p>El valor total del servicio es de $${cliente6.total} pesos </p>
                        <p>Su mail de contacto es: ${cliente6.mail}</p>
                        <p>Gracias por confiar en nosotros, estaremos en contacto a la brevedad</p>`
                     :
    container.innerHTML=`<h3>DETALLE DE SERVICIO</h3> 
        <p>Servicio solicitado sin empleados</p> 
        <p>El valor total del servicio es de $${cliente6.total} pesos </p>
        <p>Su mail de contacto es: ${cliente6.mail}</p>
        <p>Gracias por confiar en nosotros, estaremos en contacto a la brevedad</p>`


    
    let servicioEnCarrito = new ServicioSolic (cliente6.nombre,cantEmpleados,cliente6.total);

    const servJson = JSON.stringify(servicioEnCarrito);
       
    localStorage.setItem('ServicioSolicitado',servJson);


    const serv = JSON.parse (servJson);


    const {nom_usuario}=serv;

    const {q_emp,valorTotal} = serv;

 
    const usuariosTotales= [...clientes];

    let cantidadClientes=0;

    for (const usuario of usuariosTotales){
            cantidadClientes++;
    }
}


let cancelar = document.getElementById("btn-cancelar");

cancelar.onclick= (e) => {
    e.preventDefault();
    swal({
        title: "Ha cancelado el servicio",
        icon:"warning"
    })

    var nombre = document.getElementById("nombre");
    nombre.value = nombre.defaultValue;
    var dni = document.getElementById("dni");
    dni.value = dni.defaultValue;
    var q_emp = document.getElementById("q_emp");
    q_emp.value = q_emp.defaultValue;
    var mail = document.getElementById("mailElement");
    mail.value = mail.defaultValue;

}