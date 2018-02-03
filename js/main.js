$(document).ready(function(){

  var banner = {
    padre: $('#banner'),
    numeroSlides: $('#banner').children('.slide').length,
    position: 1
  }
  var info = {
    padre: $('#info'),
    numeroSlides: $('#info').children('.slide').length,
    position: 1
  }

  banner.padre.children('.slide').first().css({
    'left':0
  });

  info.padre.children('.slide').first().css({
    'left':0
  });

  var altoBanner = function(){
    var alto = banner.padre.children('.slide').outerHeight();

    banner.padre.css({
      'height': alto + 'px'
    })
  }

  var altoInfo = function(){
    var alto = info.padre.children('.active').outerHeight();

    info.padre.animate({
      'height': alto + 'px'
    })
  }

  var altoContenedor = function(){
    var altoVentana = $(window).height();
    if( altoVentana <= $('.container').outerHeight() + 200){
      $('.container').css({
        'height':''
      })
    }else{
      $('.container').css({
        'height':altoVentana + 'px'
      })
    }
  }

  altoBanner();
  altoInfo();
  altoContenedor();

  $(window).resize(function(){
    altoBanner();
    altoInfo();
    altoContenedor();
  })

  $('#info').children('.slide').each(function(){
    $('.botones').append('<span>')
  })

  $('.botones').children('span').first().addClass('active')

  //boton siguiente:

  $('#banner-next').on('click' , function(e){
    e.preventDefault();

    if(banner.position < banner.numeroSlides){

      banner.padre.children().not('.active').css({
        'left':'100%'
      })

      $('#banner .active').removeClass('active').next().addClass('active').animate({
        'left':'0'
      })

      $('#banner .active').prev().animate({
        'left':'-100%'
      })

      banner.position = banner.position + 1;
    } else{
      $('#banner .active').animate({
        'left':'-100%'
      })

      banner.padre.children().not('.active').css({
        'left':'100%'
      })

      $('#banner .active').removeClass('active');
      banner.padre.children('.slide').first().addClass('active').animate({
        'left':0
      })

      banner.position = 1;
    }

  })


  //boton anterior:

  $('#banner-prev').on('click' , function(e){
    e.preventDefault();

    if(banner.position > 1){
      banner.padre.children().not('.active').css({
        'left':'-100%'
      })

      $('#banner .active').animate({
        'left':'100%'
      })

      $('#banner .active').removeClass('active').prev().addClass('active').animate({
        'left':0
      });

      banner.position = banner.position - 1;

    }else{

      banner.padre.children().not('.active').css({
        'left':'-100%'
      })

      $('#banner .active').animate({
        'left':'100%'
      })

      $('#banner .active').removeClass('active')
      banner.padre.children().last().addClass('active').animate({
        'left':0
      })

      banner.position = banner.numeroSlides;
    }


  })

  //boton siguiente parte del info:

  $('#info-next').on('click' , function(e){
    e.preventDefault();

    if(info.position < info.numeroSlides){

      info.padre.children().not('.active').css({
        'left':'100%'
      })

      $('#info .active').removeClass('active').next().addClass('active').animate({
        'left':'0'
      })

      $('#info .active').prev().animate({
        'left':'-100%'
      })

      $('.botones').children('.active').removeClass('active').next().addClass('active')

      info.position = info.position + 1;
    } else{
      $('#info .active').animate({
        'left':'-100%'
      })

      info.padre.children().not('.active').css({
        'left':'100%'
      })

      $('#info .active').removeClass('active');
      info.padre.children('.slide').first().addClass('active').animate({
        'left':0
      })

      $('.botones').children('.active').removeClass('active')
      $('.botones').children('span').first().addClass('active')

      info.position = 1;
    }
    altoInfo();

  })


  //boton anterior:

  $('#info-prev').on('click' , function(e){
    e.preventDefault();

    if(info.position > 1){
      info.padre.children().not('.active').css({
        'left':'-100%'
      })

      $('#info .active').animate({
        'left':'100%'
      })

      $('#info .active').removeClass('active').prev().addClass('active').animate({
        'left':0
      });

      $('.botones').children('.active').removeClass('active').prev().addClass('active')

      info.position = info.position - 1;

    }else{

      info.padre.children().not('.active').css({
        'left':'-100%'
      })

      $('#info .active').animate({
        'left':'100%'
      })

      $('#info .active').removeClass('active')
      info.padre.children().last().addClass('active').animate({
        'left':0
      })

      $('.botones').children('.active').removeClass('active')
      $('.botones').children('span').last().addClass('active')

      info.position = info.numeroSlides;


    }
    altoInfo();

  })

  $('#sendBtn').on('click' , function(){
    var name = $('#name').val()
    var msg = $('#msg').val()
    if(name != "" && msg != ""){
      firebase.database().ref('personalPage/').push({
        user: name,
        message: msg
      })
      $('#exampleModal').modal('hide')
    }
  })
})
