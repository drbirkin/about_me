
	var $window = $(window);
	var $document = $(document);
	var $navButtons = $("nav a").filter("[href^=#]");
	var $navGoPrev = $(".go-prev");
	var $navGoNext = $(".go-next");
	var $slidesContainer = $(".slides-container");
	var $slides = $(".slide");
	var $currentSlide = $slides.first();
	var isAnimating = false;
	var pageHeight = $window.innerHeight();
	var keyCodes = {
		UP  : 38,
		DOWN: 40
	}

	goToSlide($currentSlide);

	$window.on("resize", onResize).resize();
	$window.on("mousewheel DOMMouseScroll", onMouseWheel);
	$document.on("keydown", onKeyDown);
	$navButtons.on("click", onNavButtonClick);
	$navGoPrev.on("click", goToPrevSlide);
	$navGoNext.on("click", goToNextSlide);

	function onNavButtonClick(event)
	{
		var $button = $(this);
		var $slide = $($button.attr("href"));

		if($slide.length)
		{
			goToSlide($slide);
			event.preventDefault();
		}
	}

	function onKeyDown(event)
	{

		var PRESSED_KEY = event.keyCode;

		if(PRESSED_KEY == keyCodes.UP)
		{
			goToPrevSlide();
			event.preventDefault();
		}
		else if(PRESSED_KEY == keyCodes.DOWN)
		{
			goToNextSlide();
			event.preventDefault();
		}

	}

	function onMouseWheel(event)
	{
		var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

		if(delta < -1)
		{
			goToNextSlide();
		}
		else if(delta > 1)
		{
			goToPrevSlide();
		}

		event.preventDefault();
	}

	function goToPrevSlide()
	{
		if($currentSlide.prev().length)
		{
			goToSlide($currentSlide.prev());
		}
	}

	function goToNextSlide()
	{
		if($currentSlide.next().length)
		{
			goToSlide($currentSlide.next());
		}
	}

	function goToSlide($slide)
	{
		if(!isAnimating && $slide.length)
		{
			isAnimating = true;
			$currentSlide = $slide;
			TweenLite.to($slidesContainer, 1, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});
			TweenLite.to($navButtons.filter(".active"), 0.5, {className: "-=active"});
			TweenLite.to($navButtons.filter("[href=#" + $currentSlide.attr("id") + "]"), 0.5, {className: "+=active"});

		}
	}

	function onSlideChangeEnd()
	{
		isAnimating = false;
	}

	function onResize(event)
	{
		var newPageHeight = $window.innerHeight();

		if(pageHeight !== newPageHeight)
		{
			pageHeight = newPageHeight;

			TweenLite.set([$slidesContainer, $slides], {height: pageHeight + "px"});
			TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
		}

	}