console.log("Script Load");


(function($) {
/*  */

    /* main ani */
    $(document).ready(function(){
        //console.log('now ready');
        mainAni();
    });

    $(window).on('scroll', function () {
        var position = $(window).scrollTop() + $(window).height()/2;
        //console.log(position);

        if ($('.main').css("display") == "block" && $('.main-text').offset().top < position) {
            console.log('line ani start');
            
        }
    });


    let menu_li = $('.menu-list').children('li');

    /* ani */
    function menuAni(){
        $('.menu_area').addClass('animate__animated animate__fadeInDownBig');
        setTimeout(function(){
            menu_li.each(function () {
                $(this).addClass('animate__animated animate__fadeInLeft');
            });
            for (var i=0; i < menu_li.length; i++) {
                var str = i * 250 + "ms";
                menu_li[i].style['animation-delay'] = str;
            }
        },300);
    }
    function mainAni(){
        setTimeout(function(){
            $('.menu_title_list').children('li').addClass('animate__animated animate__fadeIn');
            $('.main-title').addClass('startAni');
            $('.main-title').css(' transition-delay','0.8s');
            $('.main-pic').addClass('startAni');
        },300);
    }

    function collraboAni(){
        $('.menu_title_list').children('li').addClass('animate__animated animate__fadeIn');
        $('.collabo-title').addClass('animate__animated animate__slideInUp');
        collabo_item.addClass('animate__animated animate__slideInUp');
        for (var i=0; i < collabo_item.length; i++) {
            var str = i * 550 + "ms";
            collabo_item[i].style['animation-delay'] = str;
        } 
    }

    function aboutAni(){
       /*  $('.about-title').css('transform','scaleX(1)');
        $('.about-title').children('img').css('transform','scaleX(1)'); */
        $('.about-img').addClass('animate__animated animate__zoomIn');
        setTimeout(function(){
            $('.about-title').addClass('startAni');
        },300);
    }

    function shopAni(){
        let product = $('.p-list');
        product.each(function () {
            $(this).addClass('animate__animated animate__fadeInUp');
            $(this).children('ul').addClass('animate__animated animate__fadeIn');
        });
        for (var i=0; i < product.length; i++) {
            var str = i * 250 + "ms";
            product[i].style['animation-delay'] = str;
        }
    }
    
    function aniReset() {
        $('.menu_title_list').children('li').removeClass('animate__animated animate__fadeIn');
        $('.main-title').removeClass('startAni');
        $('.main-pic').removeClass('startAni');
        $('.about-title').removeClass('startAni');
        $('.p-list').each(function () {
            $(this).removeClass('animate__animated animate__fadeInUp');
            $(this).children('ul').removeClass('animate__animated animate__fadeIn');
        });
        $('.menu_area').removeClass('animate__animated animate__fadeInDownBig');
        $('.collabo-title').removeClass('animate__animated animate__slideInUp');
        $('.about-img').removeClass('animate__animated animate__zoomIn');
        collabo_item.removeClass('animate__animated animate__slideInUp');
        cpic_box.removeClass('active');
    }


    /* menu */
    var $menu = $('.menu_btn');

    $menu.on('click', function (){
        $('.menu').css('top','0');
        $('.menu').css('display','block');
        $('html, body').addClass('hidden');
        aniReset();
        menuAni();
    });

    $('.logo, .home-b').click(function(){
        console.log('go main');
        $('body, html').animate({scrollTop:0},300);
        $('.main').css('display','block');
        $('.about, .shop, .collabo').css('display','none');
        $('nav').css('background-color','#fff');
        $('nav').css('color','#000');
        $('.logo').children('img').attr('src','./img/logo_b.png');
        $('.menu').css('top','-100%');
        mainAni();
    });

    $('.back_btn').on('click', function(){
        $('.menu').css('top','-100%');
        $('html, body').removeClass('hidden');
        if ($('.main').css("display") == "block"){
            mainAni();
        } else if ($('.about').css("display") == "block"){
            aboutAni();
        } else if ($('.shop').css("display") == "block"){
            shopAni();
        } else if ($('.collabo').css("display") == "block"){
            collraboAni();
        }
        $('.menu_area').removeClass('animate__animated animate__fadeInDownBig');
        menu_li.each(function () {
            $(this).removeClass('animate__animated animate__fadeInLeft');
        });
        
    });

    /* $('.menu-list').children('li').on('mouseover', function(){
        $(this).css('text-decoration-line','underline');
    }
    ('mouseleave', function(){
        $(this).css('text-decoration-line','none');
    }
    ); */

    $('.menu-list').children('li').on({
        mouseenter: function(){
            $(this).css('text-decoration-line','underline');
        },
        mouseleave: function(){
            $(this).css('text-decoration-line','none');
        },
        click: function(){
            $('body, html').animate({scrollTop:0},1);
            $('.menu').css('top','-100%');
            $('nav').css('background-color','#fff');
            $('nav').css('color','#000');
            $('.logo').children('img').attr('src','./img/logo_b.png');
            $('html, body').removeClass('hidden');
            //console.log($(this));
            if ($(this).hasClass('about-b')) {
                $('.about').css('display','block');
                $('.main, .shop, .collabo').css('display','none');
                aboutAni();
            } else if ($(this).hasClass('shop-b')) {
                $('.shop').css('display','block');
                $('.main, .about, .collabo').css('display','none');
                $('nav').css('background-color','#000');
                $('nav').css('color','#fff');
                $('.logo').children('img').attr('src','./img/logo_w.png');
                shopAni();
            } else if ($(this).hasClass('collabo-b')) {
                $('.main, .shop, .about').css('display','none');
                $('.collabo').css('display','block');
                collraboAni();
            } 
        }
    });

    /* shop */
    let $p_item = $('.p-item'),
        $p_back = $('.s-back-btn'),
        $detail = $('.shop-detail');
    
    $p_item.on('click', function(){
        $detail.css('left','0');
        var $number = $(this).attr("id");
        //console.log($number);
        detail_load($number);
        $detail.animate({scrollTop:0}, 500);
        $('.shop').css('overflow','hidden'); 
    });

    $p_back.on('click', function(){
        //detail_load('9');
        $detail.css('left','-100%');
        $('.shop').css('overflow','scroll');
    });



    const $title = $('.title');
    const $option = $('.option');
    const $price = $('.price');
    const $info = $('.info');
    const $p_info = $('.p_info');
    const $pic_box = $('.detail-pic-box');

    function detail_load($number) {
        
        var title_info = product[$number].title;
        $title.html(title_info);
        
        var option_info = product[$number].option;
        $option.html(option_info);

        var price_info = product[$number].price;
        $price.html(price_info);

        var info_info = product[$number].info;
        $info.html(info_info);

        var p_info_info = product[$number].p_info;
        $p_info.html(p_info_info);

        var pic_info = product[$number].pic;
        $pic_box.html(pic_info);
    }

   /* collabo */
    let collabo_item = $('.collabo-item'),
        cpic_box = $('.collabo-pic-box'),
        cPic = $('.collbo-pic');



    collabo_item.each(function(i){
        //console.log($(this));

        $(this).click(function(e){

            e.preventDefault();

            $(this).toggleClass('active');
            $(this).children('div').toggleClass('active');

        });

        /* collabo_item.children('span').on('click', function(){

            /* $(this).toggleClass('active');
            cPic.each(function () {
                $(this).toggleClass('active');
                $(this).toggleClass('animate__animated animate__slideInUp');
            });
            for (var i=0; i < cPic.length; i++) {
                var str = i * 250 + "ms";
                cPic[i].style['animation-delay'] = str;
            } 
        }); */
    });

    /* cPic.each().on('hover', function(){
        $(this).css('transform','scale(1.05)');
    }); */

    cPic.on({
        mouseenter: function(){
            $(this).css('transform','scale(1.05)');
        },
        mouseleave: function(){
            $(this).css('transform','scale(1)');
        },
    });


/*  */
}) (jQuery);
