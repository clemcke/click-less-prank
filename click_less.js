$(document).ready(function(){
  $(document).mousemove(function(e){
    $('#x-loc .text').html(e.pageX);
    $('#y-loc .text').html(e.pageY);
  });

  $('a').mouseenter(function(e){
    $(".collision").show();
    var $this = $(this);
    replaceMe($this);
  });

  $('a').mouseout(function(e){
    $(".collision").hide();
  })

  $('a.showme').mouseenter(function(e){
    var $this = $(this);
  });
});

function getBox(el){
  var box = {};
  box['left'] = el.position()['left'];
  box['top'] = el.position()['top'];
  box['right'] = el.position()['left'] + el.width(); // plus border
  box['bottom'] = el.position()['top'] + el.height(); // plus border
  return box;
}

function replaceMe(el){
  if($(".showme").length == 0){
    el.parent().append(el.clone().addClass("showme"));
    var $dup = $(".showme");
    $dup.css("left",el.position()["left"]);
    $dup.css("top",el.position()["top"]);
    el.css("opacity",0);
    el.addClass("hideme");
    el.click(function(){return false;});
    el.css("cursor", 'default');
  }
}