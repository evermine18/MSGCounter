var messagesCount = 50;
var messages = [];
var nuevoDiv = undefined;

console.log("Init");

checkSaved();

setInterval(() =>{
    
    if(!nuevoDiv){
        const elemento = document.querySelector('.absolute.p-1.rounded-md.md\\:bottom-3.md\\:p-2.md\\:right-3.dark\\:hover\\:bg-gray-900.dark\\:disabled\\:hover\\:bg-transparent.right-2.disabled\\:text-gray-400.enabled\\:bg-brand-purple.text-white.bottom-1\\.5.transition-colors.disabled\\:opacity-40');
        nuevoDiv = document.createElement('div');
        nuevoDiv.className = 'absolute'; // Asignar la clase "absolute"
        nuevoDiv.style.right = '40px'; // Asignar el estilo "right: 40px;"
        nuevoDiv.textContent = 50-messages.length+'/50';
        // Insertar el nuevo div después del elemento encontrado
        elemento.insertAdjacentElement('afterend', nuevoDiv);
        elemento.addEventListener('click', handleClick);
    }
    garbageCollector();
    nuevoDiv.textContent = 50-messages.length+'/50'

},5000);

function restarNumero(){
    messages-=1;
}

function handleClick() {
    messages.push(new Date().getTime());
    nuevoDiv.textContent = 50-messages.length+'/50';
    localStorage.setItem("messages",messages)
}

function checkSaved(){  
    const messagesLS = localStorage.getItem("messages");
    if (messagesLS){
        messages= messagesLS;
    }console.log(messages);
}

function garbageCollector(){
    for(let i = 0; i<messages.length;i++){
        const fechaActual = new Date();
        const diferenciaTiempoMs = messages[i]- fechaActual.getTime();
        const diferenciaHoras = diferenciaTiempoMs / (1000 * 60 * 60); // 1000 ms * 60 seg * 60 min = 1 hora
        console.log(diferenciaHoras);
        if (diferenciaHoras >= 3) {
            messages.splice(i,1);
        }
    }
}