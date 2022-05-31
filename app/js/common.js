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
	if ($(".any_types_of_ceiling").length) {
		if (window.innerWidth < 992) {
			const any_types_of_ceiling = new Swiper('.any_types_of_ceiling .wrapper .swiper.mobile', {
				loop: true,
				speed: 500,
				spaceBetween: 10,
				slidesPerView: "auto",
			});

		} else {
			var any_types_of_ceiling_thumb = [];
			var any_types_of_ceiling = [];
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

			// Переключение типов потолков на слайдере на главной
			$(".any_types_of_ceiling .desktop .types_tumbler p").click(function(){
				$(this).siblings("p").removeClass("active");
				$(this).addClass("active");
				$(".any_types_of_ceiling .desktop .item.active").removeClass("active");
				$(".any_types_of_ceiling .desktop .item").eq($(this).index()).addClass("active");
			});
		}
	}

	// Мобильный калькулятор
	var range_druggable = false;
	var circle = $(".calc form.mobile .area_by_slider .filling .circle");
	var filling = $(".calc form.mobile .area_by_slider .filling");
	var filling_width = parseInt(filling.css("width"));
	var current_value = $(".calc form.mobile .area_by_slider .filling .current_value");
	var green_filling = $(".calc form.mobile .area_by_slider .filling .green");
	var circle_pos = 0;
	var left_percentage = 0;
	var square_value = 20;
	var final_price = 0;

	recalculateWithoutMoving();

	circle.on("mousedown",function(){
		range_druggable = true;
	});
	$(document).on("mouseup",function(){
		range_druggable = false;
	});
	$(document).on("mousemove",function(e){
		if (range_druggable){
			circle_pos = e.pageX - filling.prop("offsetLeft");
			if (circle_pos < 0) circle_pos = 0;
			if (circle_pos > filling_width) circle_pos = filling_width;
			left_percentage = Math.floor(circle_pos / filling_width * 100);
			square_value = Math.round(left_percentage / 100 * 90);
			left_percentage += "%";
			final_price = parseInt($(".calc form.mobile .ceiling_type p.active").attr("data-price")) * square_value;
			circle.css("left", "calc(" + left_percentage + " - 25px/2)");
			current_value.css("left", "calc(" + left_percentage + " - 18px/2)");
			green_filling.css("width", left_percentage);
			current_value.html(square_value);
			$(".calc form.mobile .area_by_number input").val(square_value);
			$(".calc form.mobile .price .value").html(final_price);
			$(".calc input[name='summa']").val(final_price);
		}
	});
	$(document).on("touchmove",function(e){
		if (e.target == circle[0]){
			circle_pos = e.originalEvent.changedTouches[0].clientX - filling.prop("offsetLeft");
			if (circle_pos < 0) circle_pos = 0;
			if (circle_pos > filling_width) circle_pos = filling_width;
			left_percentage = Math.floor(circle_pos / filling_width * 100);
			square_value = Math.round(left_percentage / 100 * 90);
			left_percentage += "%";
			final_price = parseInt($(".calc form.mobile .ceiling_type p.active").attr("data-price")) * square_value;
			circle.css("left", "calc(" + left_percentage + " - 25px/2)");
			current_value.css("left", "calc(" + left_percentage + " - 18px/2)");
			green_filling.css("width", left_percentage);
			current_value.html(square_value);
			$(".calc form.mobile .area_by_number input").val(square_value);
			$(".calc form.mobile .price .value").html(final_price);
			$(".calc input[name='summa']").val(final_price);
		}
	});

	$(".calc form.mobile .ceiling_type p").click(function(){
		$(this).siblings("p.active").removeClass("active");
		$(this).addClass("active");
		recalculateWithoutMoving();
	});

	$(".calc form.mobile .area_by_number input[name='square']").on("change", recalculateWithMoving);

	$("form").keydown(function(e){
		if (e.keyCode == 13) {
			e.preventDefault();
			recalculateWithMoving();
		}
	});

	function recalculateWithoutMoving(){
		square_value = parseInt($(".calc form.mobile .area_by_number input[name='square']").val());
		final_price = parseInt($(".calc form.mobile .ceiling_type p.active").attr("data-price")) * square_value;
		$(".calc form.mobile .price .value").html(final_price);
		$(".calc input[name='summa']").val(final_price);
	}

	function recalculateWithMoving(){
		let square_input = $(".calc form.mobile .area_by_number input[name='square']");
		square_value = parseInt(square_input.val());

		if (square_value > 90) {
			square_value = 90;
			square_input.val(square_value);
		}
		if (square_value < 0) {
			square_value = 0;			
			square_input.val(square_value);
		}

		left_percentage = Math.floor(square_value / 90 * 100);
		left_percentage += "%";
		circle.css("left", "calc(" + left_percentage + " - 25px/2)");
		current_value.css("left", "calc(" + left_percentage + " - 18px/2)");
		green_filling.css("width", left_percentage);

		final_price = parseInt($(".calc form.mobile .ceiling_type p.active").attr("data-price")) * square_value;
		$(".calc form.mobile .price .value").html(final_price);
		$(".calc input[name='summa']").val(final_price);
	}
});