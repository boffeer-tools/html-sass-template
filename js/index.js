$(document).ready(function(){

	AOS.init();



	/**
	 * Sticky Header
	 */
	let isWindowScrolled = ($(this).scrollTop() > 100);
	let isStickyHeaderAllowed = (window.innerWidth >= 768);
	function stickyHeader() {
		if (($(this).scrollTop() > 100) && (window.innerWidth >= 768)) {
			$('.header-menu').addClass('header-menu--scrolled');
		} else {
			$('.header-menu').removeClass('header-menu--scrolled');
		}
	}
	$(window).on('scroll', function() {
		stickyHeader()
	});
	stickyHeader();



	// MASK
	$('input[name=tel').inputmask('+7 (999) 999-99-99');



	/**
	 * DROPDOWN
	 */
	$('.faq-list-card-top').each(function () {
		$(this).on('click', function () {
			$(this).toggleClass('faq-list-card-top--opened');
			$(this).parent().find('.faq-list-card-bottom').slideToggle();
		});
	});



	/**
	 * TABS
	 */
	$('.cases-showcase-tabbar__button').each(function() {
		$(this).on('click', function() {
			$('.cases-showcase-tabbar__button').removeClass('cases-showcase-tabbar__button--current');
			$(this).addClass('cases-showcase-tabbar__button--current');
			var target = $(this).attr('data-target');

			$('.cases-showcase-tabs-tab').hide();
			$('.cases-showcase-tabs-tab[data-target="' + target + '"]').show();


			$("html, body").animate({scrollTop: $('.cases').offset().top -40}, 800)
		});
	});



	/**
	 * POPUPS
	 */
	modality({
		pop: '.form--header-menu-callback',
		clickTrigger: '.header-menu__callback',
		popCloserType: 'inner',
	})
	modality({
		pop: '.pop-thanks',
		clickTrigger: '.pop-thanks',
		popCloserType: 'inner',
	})



	/**
	 * AJAX SEND
	 */
	$('.form').each(function(){
		$(this).on('submit', function(event) {
			event.preventDefault();
			let userName = $(this).find('input[name="user-name"]');
			let userTel = $(this).find('input[name="user-tel"]');
			// console.log('аякс пошел', userName.val(), userTel.val(), $(this));
			$.ajax({
				url: 'send.php',
				type: 'POST',
				dataType: 'json',
				data: {
					"user_name": userName.val(),
					"user_tel": userTel.val(),
				},
				success: function(data) {
				},
			});
			$(this)[0].reset();
			// console.log('отправляем')
			ym(82308838,'reachGoal','form-submit');
			closePop(document.querySelector('.form--header-menu-callback-wrapper'), document.querySelector('.form--header-menu-callback'));
			showPop(document.querySelector('.pop-thanks-wrapper'), document.querySelector('.pop-thanks'));
			setTimeout(function(){
				closePop(document.querySelector('.pop-thanks-wrapper'), document.querySelector('.pop-thanks'));
			}, 5000)
			return false;
		});
	});



});