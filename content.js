var messagesCount = 50;
var messages = [];

console.log("Init");

checkSaved();

setInterval(() =>{
    let counterDiv = document.getElementById('messageCounter');
    if(isGPT4() && !counterDiv){
        const targetElm = document.querySelector('.absolute.p-1.rounded-md.md\\:bottom-3.md\\:p-2.md\\:right-3.dark\\:hover\\:bg-gray-900.dark\\:disabled\\:hover\\:bg-transparent.right-2.disabled\\:text-gray-400.enabled\\:bg-brand-purple.text-white.bottom-1\\.5.transition-colors.disabled\\:opacity-40');
        counterDiv = document.createElement('div');
        counterDiv.id = "messageCounter"
        counterDiv.className = 'absolute';
        counterDiv.style.right = '40px';
        counterDiv.textContent = 50-messages.length+'/50';

        targetElm.insertAdjacentElement('afterend', counterDiv);
        targetElm.addEventListener('click', handleClick);
        document.getElementById('prompt-textarea').addEventListener('keyup',handleKey)
    }
    if(counterDiv){
        garbageCollector();
        counterDiv.textContent = 50-messages.length+'/50'
    }
},5000);


function isGPT4(){
    const gptSelector = (document.querySelector('[data-testid="gpt-4"] button'));
    const gptTitle = document.querySelector('.flex.flex-1.flex-grow.items-center.gap-1.p-1.text-gray-600.dark\\:text-gray-200.sm\\:justify-center.sm\\:p-0');
    if (gptSelector && gptSelector.firstElementChild.classList.contains('bg-white')){
        return true;
    }else if(gptTitle && gptTitle.querySelector('span').textContent=='GPT-4'){
        return true;
    }
    return false
}
function handleClick(event) {
    if(event.button === 0){
        if(isGPT4()){
            messages.push(new Date().getTime());
            document.getElementById('messageCounter').textContent = 50-messages.length+'/50';
            localStorage.setItem("messages",JSON.stringify(messages))
        }
    }
}
function handleKey(event) {
    console.log(event);
    var key = event.which || event.keyCode;
    if ((event.keyCode === 13 || event.which === 13) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        if(isGPT4()){
            messages.push(new Date().getTime());
            document.getElementById('messageCounter').textContent = 50-messages.length+'/50';
            localStorage.setItem("messages",JSON.stringify(messages))
        }
    }
}
function checkSaved(){  
    const messagesLS = localStorage.getItem("messages");
    if (messagesLS){
        messages= JSON.parse(messagesLS);
    }console.log(messages);
}

function garbageCollector(){
    for(let i = 0; i<messages.length;i++){
        const fechaActual = new Date();
        const diferenciaTiempoMs = fechaActual.getTime() - messages[i];
        const diferenciaHoras = diferenciaTiempoMs / (1000 * 60 * 60); 
        console.log(diferenciaHoras);
        if (diferenciaHoras >= 3) {
            messages.splice(i,1);
        }
    }
}