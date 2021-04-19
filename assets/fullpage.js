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
		//The clicked button
		var $button = $(this);

		//The slide the button points to
		var $slide = $($button.attr("href"));

		//If the slide exists, we go to it
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
		//Normalize event wheel delta
		var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

		//If the user scrolled up, it goes to previous slide, otherwise - to next slide
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
		//If the slides are not changing and there's such a slide
		if(!isAnimating && $slide.length)
		{
			//setting animating flag to true
			isAnimating = true;
			$currentSlide = $slide;

			//Sliding to current slide
			TweenLite.to($slidesContainer, 1, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});

			//Animating menu items
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

		//This will give us the new height of the window
		var newPageHeight = $window.innerHeight();

		if(pageHeight !== newPageHeight)
		{
			pageHeight = newPageHeight;

			TweenLite.set([$slidesContainer, $slides], {height: pageHeight + "px"});

			TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
		}

	}