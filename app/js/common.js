@@include('jquery.min.js')

$(".mainpage-img-video").click(function () {
	$(".mainpage-video").addClass("mainpage-video-active");
	$(".mainpage-video video").trigger('play');
});
$(".main-pg-video").click(function () {
	$(".mainpage-video").addClass("mainpage-video-active");
	$(".mainpage-video video").trigger('play');
});
$(document).click(function (e) {
	if ($(e.target).hasClass("mainpage-video-active")) {
		$(".mainpage-video").removeClass("mainpage-video-active");
		$(".mainpage-video video").trigger('pause');
	}
});
$(".mainpage-video .cross").click(function () {
	$(".mainpage-video").removeClass("mainpage-video-active");
	$(".mainpage-video video").trigger('pause');
});

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
		$(".main_screen .body .video").toggleClass("active");
		$(".main_screen .body .video video").trigger("play");
	});

	$(document).click(function(e) {
		if ($(e.target).is(".main_screen .body .video.active") || $(e.target).is(".main_screen .body .video.active .cross")) {
			$(".main_screen .body .video").toggleClass("active");
			$(".main_screen .body .video video").trigger("pause");
		}
	});

});