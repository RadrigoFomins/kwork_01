// Плавный скроллинг к якорю
$(document).ready(function () {
	$("a.scroll").click(function () {
		elementClick = $(this).attr("href")
		destination = $(elementClick).offset().top - 60;
		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 600);
		return false;
	});
});
