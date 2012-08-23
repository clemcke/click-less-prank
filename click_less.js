$(document).ready(function(){
  $(document).mousemove(function(e){
    $('#x-loc .text').html(e.pageX);
    $('#y-loc .text').html(e.pageY);
  });

  $('a').mouseenter(function(e){
    var $this = $(this);
    replaceMe($this);
  });

});

function replaceMe(el){
  if($(".showme").length == 0){
    el.parent().append(el.clone().addClass("showme"));

    var $dup = $(".showme");

    $dup.hover(function(e){
      var $this = $(this);
      moveOuttaTheWay(e,$this);
    })

    $dup.css("left",el.position()["left"]);
    $dup.css("top",el.position()["top"]);
    $dup.css("cursor","default");
    $dup.click(function(){return false;});

    el.css("opacity",0);
    el.addClass("hideme");
    el.click(function(){return false;});
    el.css("cursor", 'default');
  }
}

function getBox(el){
  var box = {};
  box['left'] = el.position()['left'];
  box['top'] = el.position()['top'];
  box['right'] = el.position()['left'] + el.width(); // plus border
  box['bottom'] = el.position()['top'] + el.height(); // plus border
  box['center_x'] = (box['right'] + box['left'])/2.0;
  box['center_y'] = (box['top'] + box['bottom'])/2.0;
  box['width'] = box['right'] - box['left'];
  box['height'] = box['bottom'] - box['top'];
  return box;
}

function moveOuttaTheWay(e,el){
  var box = getBox(el),
      x = e.pageX,
      y = e.pageY;
  if(x >= box.center_x){
    if(x <= box.right)
      el.css("left",x - box.width - 5);
  }else{
    if(x >= box.left)
      el.css("left",x + 5);
  }
  if(y >= box.center_y){
    if(y <= box.bottom)
      el.css("top",y - box.height - 5);
  }else{
    if(y >= box.top)
      el.css("top",y + 5);
  }
}