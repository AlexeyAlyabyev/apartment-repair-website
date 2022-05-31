@@include('jquery.min.js')

// Новые скрипты от 05.2022
$(function(){

	// Переключения экранов в мобильной менюшке
	$(".mobile_menu .navigation .catalog_opener, .mobile_menu .catalog .body >.close").click(function(){		
		$("body").toggleClass("no_scroll");
		$(".mobile_menu .catalog").toggleClass("active");
	});

	$(".mobile_menu .catalog .body .switcher p").click(function(){
		$(".mobile_menu .catalog .body .switcher p.active").removeClass("active");
		$(this).addClass("active");
		$(".mobile_menu .catalog .body .item").removeClass("active");;
		$(".mobile_menu .catalog .body .item").eq($(this).index()).addClass("active");
	});

	$(".mobile_menu .catalog .body .item p.dropdown").click(function(){
		$(".mobile_menu .catalog").toggleClass("active");
		$(this).next().toggleClass("active");
	});

	$(".mobile_menu .catalog .body .item p.dropdown~.items .backlink").click(function(){
		$(".mobile_menu .catalog").toggleClass("active");
		$(this).parent().toggleClass("active");
	});

	$(".mobile_menu .catalog .body .item p.dropdown~.items .close").click(function(){
		$(this).parent().removeClass("active");
	});

	$(".mobile_menu .navigation .item.contact_us").click(function(){
		$(".mobile_menu .contact_us_choise").toggleClass("active");
	});

	// Плавный скролл по якорным ссылкам
	$("a[href^='#']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(_href).offset().top + "px"
		});
		return false;
	});

	// Триггер видео на главном экране по клику
	$(".main_screen .body .img_video, .main_screen .video_button .play").click(function(){
		$(".fazenda_video").toggleClass("active");
		$(".fazenda_video video").trigger("play");
	});

	$(document).click(function(e) {
		if ($(e.target).is(".fazenda_video.active") || $(e.target).is(".fazenda_video.active .cross")) {
			$(".fazenda_video").toggleClass("active");
			$(".fazenda_video video").trigger("pause");
		}
	});

	if ($(".main_screen_swiper").length) {
		const main_screen_swiper = new Swiper('.main_screen_swiper', {
			loop: true,
			speed: 500,
			enabled: false,
	
			breakpoints: {
				1230: {
				enabled: true,
				slidesPerView: 1,
				speed: 500,
				},
			},
	
			autoplay: {
				delay: 5000,
			},
		
			pagination: {
				el: '.main_screen_swiper .swiper-pagination',
				clickable: true,
			},
		});
	}

	// Слайдер типов потолков на главной
	var any_types_of_ceiling_thumb = [];
	var any_types_of_ceiling = [];
	if ($(".any_types_of_ceiling").length) {
		if (window.innerWidth < 992) {
			const any_types_of_ceiling = new Swiper('.any_types_of_ceiling .wrapper .swiper.mobile', {
				loop: true,
				speed: 500,
				spaceBetween: 10,
				slidesPerView: "auto",
			});
		} else {
			$(".desktop .swiper_thumb").each(function(index){
				any_types_of_ceiling_thumb[index] = new Swiper($(this)[0], {
					loop: true,
					spaceBetween: 20,
					slidesPerView: 5,
					loopedSlides: 6,
					touchRatio: 0.2,
					slideToClickedSlide: true,
				});
			});
			$(".desktop .main_swiper").each(function(index){
				any_types_of_ceiling[index] = new Swiper($(this)[0], {
					loop: true,
					spaceBetween: 10,
					loopedSlides: 6,
					navigation: {
						nextEl: $(this).find('.swiper-button-next')[0],
						prevEl: $(this).find('.swiper-button-prev')[0],
					},
					pagination: {
						el: $(this).find(".swiper-pagination")[0],
						type: "fraction",
					},
				});
				any_types_of_ceiling[index].controller.control = any_types_of_ceiling_thumb[index];
				any_types_of_ceiling_thumb[index].controller.control = any_types_of_ceiling[index];
			});
		}
	}
	
	$(".any_types_of_ceiling .desktop .types_tumbler p").click(function(){
		$(this).siblings("p").removeClass("active");
		$(this).addClass("active");
		$(".any_types_of_ceiling .desktop .item.active").removeClass("active");
		$(".any_types_of_ceiling .desktop .item").eq($(this).index()).addClass("active");
	});
});