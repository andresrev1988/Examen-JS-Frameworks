//PARPADEA TITULO
var parpadear = function() {
    $('.main-titulo').animate({
      color: 'white'
    },100 , function(){
        $(this).animate({
            color: 'yellow'
        }, 100, parpadear);
    });
}
//PARPADEA IMAGEN
var blinkIMG = function(indice) {
$("img")[indice].animate({
      opacity : '0'
    },100 , function(){
        $(this).animate({
            opacity : '1'
        }, 100, parpadear);
    });
}
//FUNCION RANDOMICA
function imgRandomica(){
  var random = Math.floor(Math.random() * 4) + 1;
  return ("image/"+random+".png");
}

//Agrega Candy
function agregaCandy(elemento,imagen,posicion){
  $(elemento).prepend("<img src="+imagen+" alt="+posicion+">");
}
//inicializa el tablero
function tablero(){
  for (var i=0; i<8; i++){
    var j = 0;
    while(j < 7 ){
      agregaCandy(".col-"+i,imgRandomica(),i+""+j);
      j++;
    }
  }
}
//Verifica y efecto 3 en linea
function chequearColumna(seleccionado,columna){
    var imgClick = $("img")[seleccionado].src;
    var  inicio=columna*7;
    var  fin =(columna*7) + 7;
    var cont = 0;
    for(var i = seleccionado ; i< fin ; i++){
      var abajo = $("img")[i].src;
      if(imgClick==abajo){
        cont++;
        blinkIMG(i);
      }else {
        break;
      }
    }
}
////////////////////////////////////////////////////////
function chequearFila(seleccionado){
    var imgClick = $("img")[seleccionado].src;
    var cont = 0;
    for(var i = seleccionado ; i < 49 ; (i=i+7)){
      var abajo = $("img")[i].src;
      if(imgClick==abajo){
        cont++;
        blinkIMG(i);
      }else {
        break;
      }
    }
}
//llAMA A FUNCIONES
$( document ).ready(function() {
  console.log( "document loaded" );
  tablero();
  $("img").css({
    "margin": "auto",
    "width": "90%",
    "height": "90px"
  });

  $("img").on("click", function() {
    var indice =  $("img").index(this);
    var columna=($(this).parent().attr('class'));
    columna=columna.replace("col-","");
    columna--;
    chequearColumna (indice,columna);
    chequearFila(indice);
  });
  parpadear();
});
