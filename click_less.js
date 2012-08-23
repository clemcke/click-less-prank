$(document).ready(function(){
  showme_count = 0;

  $(document).mousemove(function(e){
    $('#x-loc .text').html(e.pageX);
    $('#y-loc .text').html(e.pageY);

    detectCollision(e);
  });

  $('a').mouseenter(function(e){
    var $this = $(this);
    replaceMe($this);
  });
  $('a').hover(function(e){
    var $this = $(this);
    replaceMe($this);
  });


});

function replaceMe(el){
  if(el.hasClass("hideme") == false){
//  if($(".showme").length == 0){
    showme_count += 1;
    el.parent().append(el.clone().addClass("showme").addClass("showme_id_" + showme_count));
    el.addClass("showme_id_" + showme_count);

    var $dup = $(".showme.showme_id_" + showme_count);

    $dup.css("left",el.position()["left"]);
    $dup.css("top",el.position()["top"]);
    $dup.css("cursor","default");
    $dup.css("z-index",2000);
    $dup.click(function(){return false;});
    $dup.mouseenter(function(e){moveOuttaTheWay(e,$(this))});

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
      el.css("left",x - box.width - 2);
      //move left
  }else{
    if(x >= box.left)
      el.css("left",x + 2);
      //move right
  }
  if(y >= box.center_y){
    if(y <= box.bottom)
      el.css("top",y - box.height - 2);
      //move up
  }else{
    if(y >= box.top)
      el.css("top",y + 2);
      //move down
  }
}

function detectCollision(e){
  var x = e.pageX,
      y = e.pageY;
  $(".showme").each(function(index,value){
    var el = $(value),
        box = getBox(el);
    if(x < box.right && x > box.left && y < box.bottom && y > box.top)
      moveOuttaTheWay(e,el);
  })
}