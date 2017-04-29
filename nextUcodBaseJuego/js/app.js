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
//FUNCION RANDOMICA
function imgRandomica(){
  var random = Math.floor(Math.random() * 4) + 1;
  return ("image/"+random+".png");
}

//Agrega Candy
function agregaCandy(fila,columna){
  var imagen = imgRandomica();

  $(".panel-tablero").find("div."+columna).prepend("<img src="+imagen+" id="+columna.replace("col-","")+"-"+fila+">");
  $("img").css({
    "margin": "auto",
    "width": "90%",
    "height": "90px"
  });
}
//inicializa el tablero
function tablero(){
  $( "div.panel-tablero" ).children().each(function() {
    var columna = $(this).attr('class');
    for (var i=1; i<8; i++){
        agregaCandy(i,columna);
      }
  });
}
//Arregla Indices columna
function arreglaIndices(){
  for(var i=1;i<8;i++){
    var j = 7;
    $("div.col-"+i).children().each(function(){
        this.id=("col-"+i).replace("col-","")+"-"+j;
        j--;
      });
    }
}
//Elimina Columnas y agrega nuevas
function eliminaCandy(eliminar){
    for (var i=0;i<eliminar.length;i++){
      var item = eliminar[i];
      var itemArray= item.split("");
      var fila =itemArray[2];
      var columna = itemArray[1];
      $("img#"+columna+"-"+fila).remove();
      agregaCandy(fila,"col-"+columna);
    }      
  arreglaIndices();
}

//Verifica y efecto 3 en linea vertucal
function chequear(item){

    var imgClick = $("#"+item).attr("src");
    var itemArray = item.split("-");
    var fila = itemArray[1];
    var columna = itemArray[0];
    //Chequea Verticalmente
    var eliminarAbajo=[];
    for(var i = fila ; i >= 1 ; i--){
      var imagen = $("#"+columna+"-"+i).attr("src");
      if(imgClick==imagen){
        eliminarAbajo.push(("#"+columna+i));
      }else {
        break;
      }
    }
    console.log("abajo"+eliminarAbajo);
    var eliminarArriba=[];
    for(var i = fila ; i < 8 ; i++){
      var imagen = $("#"+columna+"-"+i).attr("src");
      if(imgClick==imagen){
        eliminarArriba.push(("#"+columna+i));
      }else {
        break;
      }
    }
    console.log("arriba"+eliminarArriba);
    //Elimina Horizontales
    var eliminarDerecha=[];
    for(var i = columna ; i < 8 ; i++){
      var imgen = $("#"+i+"-"+fila).attr("src");
      if(imgClick==imgen){
        eliminarDerecha.push(("#"+i+fila));
      }else {
        break;
      }
    }
    console.log("derecha"+eliminarDerecha);
    var eliminarIzquierda=[];
    for(var i = columna ; i >= 1 ; i--){
      var imgen = $("#"+i+"-"+fila).attr("src");
      if(imgClick==imgen){
        eliminarIzquierda.push(("#"+i+fila));
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
    eliminaCandy(eliminar);
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
//Funcion verifica lineas 3X3
function ExisteLineas(){
  var flag = true;
  while(flag){
    for (var i =1; i<8; i++){
      $("div.col-"+i).children().each(function(){
          flag=chequear(this.id);
          console.log(flag);
        });
    }
  }
}

//llAMA A FUNCIONES
$( document ).ready(function() {
  console.log( "document loaded" );
  tablero();
  $(".panel-tablero").on("click", function(event) {
    var item = event.target.id;
    chequear (item);
  });

  parpadear();

});
