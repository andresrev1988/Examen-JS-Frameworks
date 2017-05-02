//PARPADEA TITULO
function parpadear() {
    $('.main-titulo').animate({
      color: 'white'
    },400 , function(){
      $(this).animate({
        color: 'yellow'
      }, 400, parpadear);
    });
  }
//Parpadea Caramelo
  function parpadearCandy(items) {
    for (var i=0;i<items.length;i++){
      $("#"+items[i]).animate({
        opacity: '0.25',
      },50,function(){
        $(this).animate({
          opacity: '1',
        },50, parpadearCandy(items));
      });
    }
}
//Detinene Parpadeo Caramelo
function parpadearCandyStop(items) {
  for (var i=0;i<items.length;i++){
    $("#"+items[i]).clearQueue();
    $("#"+items[i]).stop();
  }
}
//Agrega Estructura
  function estructura(){
    var cuadricula= [];
    for(var i = 1; i<8; i++){
      for(var j = 1; j<8; j++){
        cuadricula.push(i+""+j);
      }
    }
    agregaCandy(cuadricula);
  }
  //Funcion para eliminar repetidos en un Array
  function arrayUnique(array) {
      var a = array.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }
      return a;
  }
  //Reordena ID's
  function arreglaIndices(){
      for (var i =1; i<8;i++){
        var j =7;
        $("div.col-"+i).children().each(function(){
          $(this).attr("id","item"+j+""+i);
          $(this).children().attr("id",j+""+i);
          j--;
        });
      }
    }
  //Verifica y efecto 3 en linea vertucal
  function movimientoAcertado(item){
      var eliminar = CHEKEADO(item);
      setTimeout(function() {
          parpadearCandy(eliminar);
      }, 500);
      parpadearCandyStop(eliminar);
      eliminaCandy(eliminar);
      agregaCandy(eliminar);
      setTimeout(function() {
          validaTablero();
        }, 1500);

  }
  //Elimina Columnas y agrega nuevas
  function eliminaCandy(items){
    setTimeout(function() {
        for (var i=0;i<items.length;i++){
          $("#item"+items[i]).remove();
          puntaje = puntaje +10;
          $("#score-text").text(puntaje);
        }
      }, 1000);
  }
  //Agrega Candy
  function agregaCandy(items){
    setTimeout(function() {
      for (var i=0;i<items.length;i++){
        var itemArray = items[i].split("");
        var fila = itemArray[0];
        var columna = itemArray[1];
        var random = Math.floor(Math.random() * 4) + 1;
        var imagen = "image/"+random+".png";
        $(".panel-tablero").find("div.col-"+columna).prepend("<div id=item"+items[i]+"><img id="+items[i]+" src="+imagen+"></div>");
        $("#"+items[i]).draggable({
          revert: true,
          containment: ".panel-tablero",
          drag: function(event, ui){}
        });
      $("#item"+items[i]).droppable({
        drop: function(event, ui){
          imagenUno = event.target.lastChild;
          imagenDos = ui.draggable[0];
          imgUno = $(imagenUno).attr("src");
          imgDos = $(imagenDos).attr("src");
          $(imagenUno).attr("src", imgDos);
          $(imagenDos).attr("src", imgUno);
          if(imgUno!=imgDos){
            cont++;
            $("#movimientos-text").text(cont);
            movimientoAcertado ($(imagenUno).attr("id"));
          }
      }
      });
      $("img").css({
        "margin": "auto",
        "width": "90%",
        "height": "90px"
      });
    }
    arreglaIndices();
  }, 1500);
}

//Valida tablero
function validaTablero(){
  var num = 0;
  var uno = [];
  for (var i=1; i<8;i++){
    for (var j=1; j<8;j++){
      uno=arrayUnique(uno.concat(CHEKEADO (i+""+j)));
      }
  }
  if(uno.length>0){
      setTimeout(function() {
          parpadearCandy(uno);
      }, 500);
      parpadearCandyStop(uno);
      eliminaCandy(uno);
      agregaCandy(uno);
      setTimeout(function() {
          validaTablero();
        }, 2000);
  }
}

//VAlIDA LINEAS
function CHEKEADO(item){
  var imgClick = $("#"+item).attr("src");
  var itemArray = item.split("");
  var fila = itemArray[0];
  var columna = itemArray[1];
  //Chequea Verticalmente
  var eliminarAbajo=[];
  for(var i = fila ; i >= 1 ; i--){
    var imagen = $("#"+(i+columna)).attr("src");
    if(imgClick==imagen){
      eliminarAbajo.push((i+columna));
    }else {
      break;
    }
  }
  var eliminarArriba=[];
  for(var i = fila ; i < 8 ; i++){
    var imagen = $("#"+(i+columna)).attr("src");
    if(imgClick==imagen){
      eliminarArriba.push((i+columna));
    }else {
      break;
    }
  }
  //Elimina Horizontales
  var eliminarDerecha=[];
  for(var i = columna ; i < 8 ; i++){
    var imgen = $("#"+(fila+i)).attr("src");
    if(imgClick==imgen){
      eliminarDerecha.push((fila+i));
    }else {
      break;
    }
  }
  var eliminarIzquierda=[];
  for(var i = columna ; i >= 1 ; i--){
    var imgen = $("#"+(fila+i)).attr("src");
    if(imgClick==imgen){
      eliminarIzquierda.push((fila+i));
    }else {
      break;
    }
  }
  var eliminarVert=[];
  var eliminarHorz=[];
  eliminarHorz = arrayUnique(eliminarHorz.concat(eliminarIzquierda));
  eliminarHorz = arrayUnique(eliminarHorz.concat(eliminarDerecha));
  if(eliminarHorz.length<3){
    eliminarHorz=[];
  }
  eliminarVert = arrayUnique(eliminarVert.concat(eliminarArriba));
  eliminarVert = arrayUnique(eliminarVert.concat(eliminarAbajo));
  if(eliminarVert.length<3){
    eliminarVert=[];
  }
  var eliminar = arrayUnique(eliminarVert.concat(eliminarHorz));
  return eliminar;
  }
//Inicializa Juego
function initialize(){
  if(flag){
    $(".panel-tablero").fadeIn("slow");
    $(".time").fadeIn("slow");
    $(".panel-score").css({
      "width": "25%"
    });
  }
  $("div[class^='col-']").empty();
  estructura();
  cont=0;
  $("#movimientos-text").text("0");
  puntaje = 0 ;
  $("#score-text").text("0");
  $("#timer").text("0:00");
  $('#timer').timer({
   duration: '20s',
   format: '%M:%S',
   callback: function(){
      fin();
      $('#timer').timer('remove');
   }
  });
  flag=false;
}
//finaliza el Juego
function fin(){
  $(".panel-tablero").fadeOut("slow");
  $(".time").fadeOut("slow");
  $(".panel-score").css({
    "width": "100%"
  });
  flag= true;
}
//llAMA A FUNCIONES
$( document ).ready(function() {
  console.log( "document loaded" );
  flag = false;
  parpadear();
  $(".btn-reinicio").click(function(){
      initialize();
  });
});
