$( document ).ready(function() {
  console.log( "document loaded" );
  parpadear();
});
var parpadear = function() {
    $('.main-titulo').animate({
      color: 'white',
    },100 , function(){
        $(this).animate({
            color: 'yellow'
        }, 100, parpadear);
    });
}
