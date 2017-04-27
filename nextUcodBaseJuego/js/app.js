//PARPADEA TITULO
var parpadear = function() {
    $('.main-titulo').animate({
      color: 'white',
    },100 , function(){
        $(this).animate({
            color: 'yellow'
        }, 100, parpadear);
    });
}
//FUNCION RANDOMICA
function imgRandomica(){
  var random = Math.floor(Math.random() * 4) + 1;
  return ("image/"+random+".png");
}

//Agrega Candy
function agregaCandy(elemento,imagen){
  $(elemento).prepend("<img src="+imagen+">").draggable();
}
//inicializa el tablero
function tablero(){
  $(.panel-tablero).droppable();
  for (var i=1; i<=7; i++){
    var j = 0;
    while(j < 7 ){
      agregaCandy(".col-"+i,imgRandomica());
      j++;
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
    "height": "90px"});
  parpadear();
});

/*  $('.col-1').prepend("<img src=image/1.png>")
img{
  margin: auto;
  width: 100%;
  height: 95px;
}*/
