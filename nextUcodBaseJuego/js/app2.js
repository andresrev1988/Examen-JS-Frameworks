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
  function chequear(item){
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
      console.log("abajo"+eliminarAbajo);
      var eliminarArriba=[];
      for(var i = fila ; i < 8 ; i++){
        var imagen = $("#"+(i+columna)).attr("src");
        if(imgClick==imagen){
          eliminarArriba.push((i+columna));
        }else {
          break;
        }
      }
      console.log("arriba"+eliminarArriba);
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
      console.log("derecha"+eliminarDerecha);
      var eliminarIzquierda=[];
      for(var i = columna ; i >= 1 ; i--){
        var imgen = $("#"+(fila+i)).attr("src");
        if(imgClick==imgen){
          eliminarIzquierda.push((fila+i));
        }else {
          break;
        }
      }
      console.log("izq"+eliminarIzquierda);
      var eliminarVert=[];
      var eliminarHorz=[];
      eliminarHorz = arrayUnique(eliminarHorz.concat(eliminarIzquierda));
      eliminarHorz = arrayUnique(eliminarHorz.concat(eliminarDerecha));
      console.log(eliminarHorz);
      if(eliminarHorz.length<3){
        eliminarHorz=[];
      }
      eliminarVert = arrayUnique(eliminarVert.concat(eliminarArriba));
      eliminarVert = arrayUnique(eliminarVert.concat(eliminarAbajo));
      console.log(eliminarVert);
      if(eliminarVert.length<3){
        eliminarVert=[];
      }
      var eliminar = arrayUnique(eliminarVert.concat(eliminarHorz));
      console.log(eliminar);
      setTimeout(function() {
          parpadearCandy(eliminar);
      }, 500);
      parpadearCandyStop(eliminar);
      eliminaCandy(eliminar);
      agregaCandy(eliminar);
  }
  //Elimina Columnas y agrega nuevas
  function eliminaCandy(items){
    setTimeout(function() {
        for (var i=0;i<items.length;i++){
          $("#item"+items[i]).remove();
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
          chequear ($(imagenUno).attr("id"));
          chequear ($(imagenDos).attr("id"));
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
    for(var i =1; i<8; i++){
      for(var j=1;j<8;j++){
        chequear (i+""+j);
      }
    }
}

//llAMA A FUNCIONES
$( document ).ready(function() {
  console.log( "document loaded" );
  estructura();
  parpadear();
});