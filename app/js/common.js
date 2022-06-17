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
			const any_types_of_ceiling = new Swiper('.any_types_of_ceiling .swiper.mobile', {
				loop: true,
				speed: 500,
				spaceBetween: 15,
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

	// ПК Калькулятор
	$(".calc form.desktop .value button").click(function(e){
		let value_change_direction = ($(this).html() + "1");
		let input = $(this).siblings("input");
		input.val(+value_change_direction + +input.val());
		if (+input.val() < +input[0].min) input.val(+input[0].min);
		calculatePrice();
	});
	$(".calc form.desktop .value input").on("change keydown", function(){
		let self = $(this);
		setTimeout(function(){
			if (+self.val() < +self[0].min) self.val(+self[0].min);
			self.val(Math.round(self.val()));
			calculatePrice();
		},50)
	});

	$(".calc form.desktop .facture .body label").click(function(){
		let switchable_class = $(this).siblings("input").eq($(this).index("label")).attr("class");
		$(".calc form.desktop .manufacturer .body input:not(." + switchable_class + ")").addClass("hidden");
		$(".calc form.desktop .manufacturer .body input." + switchable_class).removeClass("hidden");
		if ($(".calc form.desktop .manufacturer .body input:checked").hasClass("hidden")) {
			$(".calc form.desktop .manufacturer .body input:not(.hidden)+label").eq(0).click();
		}
		calculatePrice();
	});

	$(".calc form.desktop .manufacturer .body input").change(calculatePrice);

	function calculatePrice(){
		let manufacturer_price = +$(".calc form.desktop .params .manufacturer .body input:checked").attr("data-price");
		let square = +$(".calc form.desktop .params .room .square input[name='square']").val();
		let angles = +$(".calc form.desktop .params .room .angles input[name='angles']").val();
		let fixtures = +$(".calc form.desktop .params .light .fixtures input[name='fixtures']").val();
		let chandeliers = +$(".calc form.desktop .params .light .chandeliers input[name='chandeliers']").val();
		let final_price = manufacturer_price * square + 
											(angles - 4) * 230 + 
											fixtures * 290 + 
											chandeliers * 450;

		$(".calc form.desktop .bottom .final_price strong span").html(final_price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "));
		$(".calc form.desktop .params .room .square input[name='final_price']").val(final_price);		
	}

	if ($(".material_choise").length && window.innerWidth < 1230) {
		const material_choise = new Swiper('.material_choise .body.swiper', {
			loop: true,
			speed: 500,
			spaceBetween: 15,
			slidesPerView: "auto",
		});
	}

	// Ютуб API подключение в документ
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// Фазенда - Ютуб API и запуск видео по нажатию на картинку
	if ($(".fazenda").length) {
		$(".fazenda .videos .item").click(function(){
			var player;
			player = new YT.Player($(this)[0], {
				height: 'auto',
				width: 'fit-content',
				videoId: $(this).attr("data-video"),
				events: {
					'onReady': play,
				}
			});		

			function play(){
				player.playVideo();
			}
		});
	}

	if ($(".look_at_your_ceiling").length) {
		const look_at_your_ceiling = new Swiper('.look_at_your_ceiling .body .swiper', {
			loop: true,
			speed: 500,
			spaceBetween: 15,
			slidesPerView: "auto",
			navigation: {
				nextEl: '.look_at_your_ceiling .swiper-button-next',
				prevEl: '.look_at_your_ceiling .swiper-button-prev',
			},
		});
		if (window.innerWidth >= 992) {
			const look_at_your_ceiling_thumb = new Swiper('.look_at_your_ceiling .thumb_swiper.swiper', {
				loop: true,
				spaceBetween: 20,
				slidesPerView: 5,
				loopedSlides: 8,
				touchRatio: 0.2,
				slideToClickedSlide: true,
			});
			look_at_your_ceiling.controller.control = look_at_your_ceiling_thumb;
			look_at_your_ceiling_thumb.controller.control = look_at_your_ceiling;
		}
	}

	if ($(".ceilings_install").length){
		const ceilings_install = new Swiper('.ceilings_install .body .swiper', {
			speed: 500,
			spaceBetween: 15,
			slidesPerView: "auto",
			navigation: {
				nextEl: '.ceilings_install .swiper-button-next',
				prevEl: '.ceilings_install .swiper-button-prev',
			},
			breakpoints: {
				992: {
					spaceBetween: 20,
				}
			}
		});
	}

	if ($(".happy_client").length && window.innerWidth < 992){
		const ceilings_install = new Swiper('.happy_client .body.swiper', {
			speed: 500,
			spaceBetween: 15,
			slidesPerView: "auto",
		});
	}

	// Счастливые клиенты - Ютуб API и запуск видео по нажатию на картинку
	if ($(".happy_client").length) {
		$(".happy_client .swiper .item .image").click(function(){
			var player;
			player = new YT.Player($(this)[0], {
				height: 'auto',
				width: 'fit-content',
				videoId: $(this).attr("data-video"),
				events: {
					'onReady': play,
				}
			});		

			function play(){
				player.playVideo();
			}
		});		
	}

	if ($(".projects_slider").length){
		const projects_slider = new Swiper('.projects_slider .swiper', {
			speed: 500,
			loop: true,
			spaceBetween: 15,
			slidesPerView: "auto",
			navigation: {
				nextEl: '.projects_slider .swiper-button-next',
				prevEl: '.projects_slider .swiper-button-prev',
			},
			breakpoints: {
				992: {
					centeredSlides: true,
				}
			},
		});
	}

	$(".zoom_in").click(function(){
		let parent_block = $(this).parents().eq($(this).parents().length - 3);
		let other_images = false;
		let zoomed_img = new Image();
		let zoomed_img_width, zoomed_img_height;

		
		if (parent_block.find(".swiper-slide .zoom_in").length) 
			other_images = parent_block.find(".swiper-slide:not(.swiper-slide-duplicate)").find("img");
		else if (parent_block.find(".swiper-slide.zoom_in").length) 
			other_images = parent_block.find(".zoom_in:not(.swiper-slide-duplicate)");
		else 
			other_images = parent_block.find(".zoom_in");

		zoomed_img.src = $(this).attr("src").replace('webp', 'jpg');
		zoomed_img.onload = function(){
			zoomed_img_height = zoomed_img.height;
			zoomed_img_width = zoomed_img.width;

			if (window.innerHeight/1.5 > zoomed_img_height && window.innerWidth/1.5 > zoomed_img_width) {
				$(".zoom .body img").addClass("scale");
			}
		};

		if (other_images) {
			$(".zoom").addClass("swiper");
			$(".zoom .body").addClass("swiper-wrapper");
			other_images.each(function(index, element){
				$(".zoom .body").append("<div class='swiper-slide'><img src=" + $(element).attr("src").replace('webp', 'jpg') + "></div>");
			});
			$(".zoom").append("<div class='swiper-button-prev'></div><div class='swiper-button-next'></div>");
			$(".zoom").append("<div class='swiper-pagination'></div>");
			var zoom = new Swiper('.zoom.swiper', {
				speed: 500,
				spaceBetween: 15,
				slidesPerView: "auto",
				navigation: {
					nextEl: '.zoom .swiper-button-next',
					prevEl: '.zoom .swiper-button-prev',
				},
				pagination: {
					el: '.zoom .swiper-pagination',
				},
			});
			zoom.slideTo(other_images.index($(this)), 500);
		} else {
			$(".zoom .body").append("<img src=" + $(this).attr("src").replace('webp', 'jpg') + ">");
		}

		$(".zoom").fadeIn(300);
		$('body').addClass('modal_active');
		$('html').addClass('no_scroll');
	});

	$(".zoom").click(function(e){
		if ($(e.target).hasClass("body") || $(e.target).hasClass("cross")) zoomOut();
	});

	function zoomOut() {
		$(".zoom").fadeOut(300, 'linear', function(){
			$('body').removeClass('modal_active');
			$('html').removeClass('no_scroll');
			$(".zoom .body").empty();
			$(".zoom *:not(.body):not(.cross)").remove();
		});
	};

	if ($(".catalog .body .swiper").length && window.innerWidth < 992) {
		var catalog_sliders = [];
		$(".catalog .body .swiper").each(function(index){
			catalog_sliders[index] = new Swiper($(this)[0], {
				spaceBetween: 15,
				slidesPerView: "auto",
				speed: 500,
			});
		});
	}	

	$(".catalog .filter .options p").click(function(){
		$(".catalog .filter .options p.active").removeClass("active");
		$(this).addClass("active");
		$(".catalog .body .item:not(." + $(this).attr("data-class") + ")").hide();
		$(".catalog .body .item." + $(this).attr("data-class")).show();
	});

	if ($(".completed_works").length){
		const projects_slider = new Swiper('.completed_works .swiper', {
			speed: 500,
			loop: true,
			spaceBetween: 15,
			slidesPerView: "auto",
			navigation: {
				nextEl: '.completed_works .swiper-button-next',
				prevEl: '.completed_works .swiper-button-prev',
			},
		});
	}

	if ($(".prices").length && window.innerWidth < 992){
		const prices_slider = new Swiper('.prices .swiper', {
			speed: 500,
			slidesPerView: "auto",
			navigation: {
				nextEl: '.prices .swiper-button-next',
				prevEl: '.prices .swiper-button-prev',
			},
		});
	}

	$(".prices .filter .options p").click(function(){
		$(".prices .filter .options p.active").removeClass("active");
		$(this).addClass("active");
		$(".prices .swiper-slide:not(." + $(this).attr("data-class") + ")").hide();
		$(".prices .swiper-slide." + $(this).attr("data-class")).show();

		if (!$(".prices .ceiling_types .tkan .swiper-slide." + $(this).attr("data-class")).length) 
			$(".prices .ceiling_types .tkan").hide();
		else
			$(".prices .ceiling_types .tkan").show();

		if (!$(".prices .ceiling_types .pvh .swiper-slide." + $(this).attr("data-class")).length) 
			$(".prices .ceiling_types .pvh").hide();
		else
			$(".prices .ceiling_types .pvh").show();
	});

	if ($(".product_card").length){
		const product_card_slider = new Swiper('.product_card .main_swiper.swiper', {
			speed: 500,
			slidesPerView: "auto",
			spaceBetween: 15,
			loop: true,
			navigation: {
				nextEl: '.product_card .swiper-button-next',
				prevEl: '.product_card .swiper-button-prev',
			},
			pagination: {
				el: ".product_card .swiper-pagination",
				type: "fraction",
			},
		});
		if (window.innerWidth >= 992) {
			const product_card_slider_thumb = new Swiper('.product_card .swiper_thumb.swiper', {
				loop: true,
				spaceBetween: 20,
				slidesPerView: 4,
				loopedSlides: 6,
				touchRatio: 0.2,
				slideToClickedSlide: true,
			});
			product_card_slider.controller.control = product_card_slider_thumb;
			product_card_slider_thumb.controller.control = product_card_slider;
		}
	}

	// Счастливые клиенты - Ютуб API и запуск видео по нажатию на картинку
	if ($(".technology_description").length) {
		$(".technology_description .body .bottom .tiles .youtube").click(function(){
			var player;
			player = new YT.Player($(this)[0], {
				height: 'auto',
				width: 'fit-content',
				videoId: $(this).attr("data-video"),
				events: {
					'onReady': play,
				}
			});		

			function play(){
				player.playVideo();
			}
		});		
	}

	// Модалка на вызов замерщика
	$(".specialist_modal .body .confirm label").click(function(){
		$(".specialist_modal .body button").toggleClass("disabled");
	});

	$(".zamer_modal").click(showZamerModal);

	$(".specialist_modal").click(function(e){
		if ($(e.target).hasClass("specialist_modal") || $(e.target).hasClass("cross")) closeZamerModal();
	})

	function showZamerModal(){
		$(".specialist_modal").fadeIn(300);
		$('body').addClass('modal_active');
		$('html').addClass('no_scroll');
	}

	function closeZamerModal(){
		$(".specialist_modal").fadeOut(300, 'linear', function(){
			$('body').removeClass('modal_active');
			$('html').removeClass('no_scroll');
		});
	}

});