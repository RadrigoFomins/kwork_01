// modal
$(document).ready(function () {
	// Функция Фокуса в модальном окне
	function trapFocus(boxModal) {
		boxModal.on('keydown', function (e) {
			var focusableElements = boxModal.find('a[href], button, textarea, input, select');
			var firstElement = focusableElements.first();
			var lastElement = focusableElements.last();
			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === firstElement[0]) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					if (document.activeElement === lastElement[0]) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			} else if (e.key === 'Escape') {
				functionClose();
			}
		});
	}
	// Функция закрытия модального окна
	function functionClose() {
		// Получаем кнопку, которая открыла модальное окно
		var lastFocusedBtn = $('.modal').data('lastFocusedBtn');
		$('.modal')
			.fadeOut(200)
			.attr('aria-hidden', 'true')
			.removeAttr('aria-modal')
			.removeAttr('role')
			.removeClass('show');

		setTimeout(function () {
			$('.modal-backdrop').fadeOut(200);
		}, 150);
		setTimeout(function () {
			$('.modal-backdrop').remove();
			$('.modal').css('padding-right', '');
			$('body')
				.css('padding-right', '')
				.removeClass('modal-open');
		}, 350);

		if (lastFocusedBtn) {
			lastFocusedBtn.focus();
		}
	}

	$('[data-toggle="modal"]').click(function () {
		var scrollWidth = window.innerWidth - document.documentElement.clientWidth;
		var target = $(this).data('target');
		var modalId = $('#' + target);
		$('body')
			.css('padding-right', scrollWidth)
			.addClass('modal-open')
			.append('<div class="modal-backdrop"></div>');
			modalId
				.css('padding-right', scrollWidth)
				.fadeIn(200);
		$('.modal-backdrop').fadeIn(200);
		setTimeout(function () {
			modalId
				.removeAttr('aria-hidden')
				.attr('aria-modal', 'true')
				.attr('role', 'dialog')
				.addClass('show')
				.focus();
			trapFocus(modalId);
		}, 150);
		// Сохраняем кнопку, чтобы вернуть на неё фокус после закрытия
		var lastFocusedBtn = $(this);
		$('.modal').data('lastFocusedBtn', lastFocusedBtn);
	});

	$('.close').click(function () {
		functionClose();
	});
	$(window).click(function (e) {
		if ($('.modal').is(e.target)) { // Проверяем, является ли цель события элементом с классом modal
		  functionClose();
		}
	 });
	
});

// tab
$(document).ready(function () {
	$('[data-toggle="tab"]').click(function () {
		$('.tab-pane')
			.removeClass('show')
			.css('display', '');
		$('[data-toggle="tab"]').attr('aria-selected', 'false');

		$(this).attr('aria-selected', 'true');
		var tabId = $(this).attr('aria-controls');
		$('#' + tabId).fadeIn(300);
		setTimeout(function () {
			$('#' + tabId).addClass('show');
		}, 150);
	});
});

// Фокус в меню
$(document).ready(function () {
	document.addEventListener('keydown', function (e) {
		let isTabPressed = (e.key == 'Tab' || e.keyCode == 9);
		if (!isTabPressed) {
			return;
		}
		if (e.shiftKey) {
			$('.sub > a').blur(
				function () {
					$(this).parents('.sub').removeClass('focus-menu');
				}
			);
			$('.sub .sub-link a.last').blur(
				function () {
					$(this).parents('.sub').addClass('focus-menu');
				}
			);
		} else {
			$('.sub > a').focus(
				function () {
					$(this).parents('.sub').addClass('focus-menu');
				}
			);
			$('.sub > a').blur(
				function () {
					$(this).parents('.sub').addClass('focus-menu');
				}
			);
			$('.sub-link a.last').blur(
				function () {
					$(this).parents('.sub').removeClass('focus-menu');
				}
			);
		}
	});
	$(document).click(
		function (e) {
			if (!$('.sub .sub-link a').is(e.target)) {
				$('.sub').removeClass('focus-menu');
			};
		}
	);
});

// Поиск
$(document).ready(function () {
	$('[data-toggle="fade"]').on('click', function () {
		var $toggleButton = $(this);
		var $toggleContent = $('#' + $toggleButton.attr('aria-controls'));

		$toggleContent.toggleClass('show');

		if ($toggleContent.hasClass('show')) {
			$toggleButton.attr('aria-expanded', 'true');
			$toggleContent.fadeIn(200);
			$toggleContent.find('input[type="search"]').focus();
		} else {
			$toggleButton.attr('aria-expanded', 'false');
			$toggleContent.fadeOut(200);
		}
	});
});
