// modal
$(document).ready(function () {
	// Функция Фокуса в модальном окне
	function trapFocus(boxModal) {
		boxModal.on('keydown', function (e) {
			var focusableElements = boxModal.find('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
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
			.removeAttr('role');

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
		$('.modal-backdrop').fadeIn(200);
		setTimeout(function () {
			modalId
				.css('padding-right', scrollWidth)
				.removeAttr('aria-hidden')
				.attr('aria-modal', 'true')
				.attr('role', 'dialog')
				.fadeIn(200)
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
		if (e.target == $('.modal')[0]) {
			functionClose();
		}
	});
});