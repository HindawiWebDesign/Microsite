 // accordion for FAQ
  
  (function(j) {
    // $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

    $('.accordion a').click(function(j) {
        var dropDown = $(this).closest('li').find('div.answer');

        $(this).closest('.accordion').find('div.answer').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $('.accordion a').focus(function(k) {
        var dropDown = $(this).closest('li').find('div.answer');

         $('html,body').animate({scrollTop: $(this).offset().top}, 800);
        
        // $('html,body').$(this).offset({ top: 0 });

        $(this).closest('.accordion').find('div.answer').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        //j.preventDefault();
    });

var activeDivAttr;

$('.accordion a').mousedown(function(e) {
    e.stopImmediatePropagation(); //stops event bubbling    
    
    
    if (activeDivAttr == $(this).find('div.accordion a')) {
        this.focus();
    } else {
        e.preventDefault();  //stops default browser action (focus)
    }
    
    activeDivAttr= $(this).find('div.accordion a');
}).focus(function() {
    activeDivAttr= $(this).find('div.accordion a');
}).blur(function() {
    activeDivAttr= '';
});

})(jQuery);
