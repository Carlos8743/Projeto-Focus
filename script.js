const html = document.querySelector('html');
const FocoBt = document.querySelector('.app__card-button--foco');
const CurtoBt = document.querySelector('.app__card-button--curto');
const LongoBt = document.querySelector('.app__card-button--longo');
const image = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const spanBT = document.querySelector('#start-pause span');
const Timer = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const player = new Audio('/sons/play.wav');
const paused = new Audio('/sons/pause.mp3');
let tempo = 1500;
let intervalo = null;
musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

FocoBt.addEventListener('click', ()=>{
    tempo = 1500;
    AlteraAtributo('foco');
    FocoBt.classList.add('active');
})
CurtoBt.addEventListener('click', ()=>{
    tempo = 300;
    AlteraAtributo('descanso-curto');
    CurtoBt.classList.add('active');
})
LongoBt.addEventListener('click', ()=>{
    tempo = 900;
    AlteraAtributo('descanso-longo');
    LongoBt.classList.add('active');
})
function AlteraAtributo(argumento){
    MostarTempo();
    botoes.forEach(function(argumento){
        argumento.classList.remove('active');
    })
    html.setAttribute('data-contexto', argumento);
    image.setAttribute('src',`imagens/${argumento}.png`);
    switch (argumento) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
    
        default:
            titulo.innerHTML = "Não Encontrado";
            break;
    }
}
const Temporizador = ()=>{
    MostarTempo();
    if(tempo <= 0 ){
        zerar();
        return
    }else{
        tempo--;
    }
    
}
startPauseBt.addEventListener('click', start);

function start(){
    if(intervalo){
        spanBT.textContent = 'Começar';
        paused.play();
        zerar();
        return
    }else{
        spanBT.textContent = 'Pausar';
        player.play();
    }
    
    intervalo = setInterval(Temporizador, 1000);
}
function zerar(){
    clearInterval(intervalo);
    intervalo = null;
}
function MostarTempo(){
    const Tempo_a = new Date(tempo *1000);
    const Tempo_formato = Tempo_a.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    Timer.innerHTML = `<h1>${Tempo_formato}</h1>`;
}
MostarTempo();