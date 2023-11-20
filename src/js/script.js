import reviews from "./rewievs.js";



const mainSwiper = new Swiper('.slider__container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	}
});

const portfolioSwiper = new Swiper('.portfolio-swiper', {
	loop: true,
	pagination: {
		el: '.swiper-pagination',
	}
})
//console.log();

//плавный выезд мобильного меню и закрытие
const headerRow = document.querySelector('.header-row');
const header = document.getElementById('header')


//const hamburger = document.querySelector('.hamburger')
document.querySelector(".hamburger__menu__container").addEventListener('click', () => {
	document.querySelectorAll('.hamburger-line').forEach((el) => { el.classList.add('hamburger-line-cross') });
	document.querySelector('.body').classList.add('no-scroll')
	headerRow.classList.add('header-row-active')
	header.classList.remove('overflow')
})

document.querySelector('.navigation__content').addEventListener('click', () => {
	document.querySelectorAll('.hamburger-line').forEach((el) => { el.classList.remove('hamburger-line-cross') });
	document.querySelector('.body').classList.remove('no-scroll')
	headerRow.classList.remove('header-row-active')
	header.classList.add('overflow')
})

//стрелка вверх
const arrowUp = document.querySelector('.arrow-up__container')

window.onscroll = () => {
	if (window.pageYOffset > 1000) {
		arrowUp.classList.remove("hidden");
	} else {
		arrowUp.classList.add("hidden")
	}
}

function createElement(element, className) {
	const el = document.createElement(element);
	el.classList.add(className);
	return el;
}

const symbolCount = (width) => {
	let count = 117;
	if (width > 416) {
		count = 150;
	}
	if (width > 523) {
		count = 200
	}
	if (width > 523) {
		count = 250
	}
	return count;
}

const createReview = ({ userName, longReview }) => {
	const reviewSliderSlide = createElement('div', 'review-swiper-slide');
	reviewSliderSlide.classList.add('swiper-slide');

	const mainReviewContainer = createElement('div', 'review__main__container');
	const userReviewContainer_first = createElement('div', 'user-review__container');
	const userReviewItem = createElement('div', 'user-review-item');
	const userLetter = createElement('span', 'user-letter');
	userLetter.innerText = userName[0];
	const userBlock = createElement('span', 'user-block');
	const userNameEl = createElement('div', 'user-name');
	userNameEl.innerText = userName;
	userBlock.append(userNameEl);
	userReviewItem.append(userLetter);
	userReviewItem.append(userBlock);
	userReviewContainer_first.append(userReviewItem);
	mainReviewContainer.append(userReviewContainer_first);

	const count = symbolCount(window.screen.width);

	const userReviewContainer_second = createElement('div', 'user-review__container');
	const shortReview = createElement('p', 'short-review');
	shortReview.innerText = `${longReview.substring(0, count)} ...`
	//console.log(shortReview.innerText)
	const readThen = createElement('span', 'read-then');
	readThen.innerText = "Читать далее";
	const longReviewEl = createElement('p', 'long-review');
	longReviewEl.classList.add('hidden')
	longReviewEl.innerText = longReview;
	const minimise = createElement('span', 'minimise');
	minimise.innerText = "Свернуть";
	minimise.classList.add('hidden');
	userReviewContainer_second.append(shortReview);
	userReviewContainer_second.append(readThen);
	userReviewContainer_second.append(longReviewEl);
	userReviewContainer_second.append(minimise);
	mainReviewContainer.append(userReviewContainer_second)

	reviewSliderSlide.append(mainReviewContainer);
	return reviewSliderSlide;
}

const reviewSwiperWrapper = document.querySelector('.review-swiper-wrapper')

reviews.forEach((el) => {
	reviewSwiperWrapper.append(createReview(el))
})

function initReviewSlider() {
	if (window.screen.width) { };
}




const reviewSwiper = new Swiper('.review-swiper', {
	slidesPerView: 2,
	spaceBetween: 30,

	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	loop: true,
});


//показ полного отзыва и сокращенного отзыва
function showLongReview(el) {
	el.nextElementSibling.classList.toggle('hidden')
	el.previousElementSibling.classList.toggle('hidden')
	el.classList.toggle('hidden')
	el.nextElementSibling.nextElementSibling.classList.toggle('hidden')
}

function showShortReview(el) {
	el.previousElementSibling.classList.toggle('hidden')
	el.classList.toggle('hidden')
	el.previousElementSibling.previousElementSibling.classList.toggle('hidden')
	el.previousElementSibling.previousElementSibling.previousElementSibling.classList.toggle('hidden')
}

const readThen = document.querySelectorAll('.read-then')
readThen.forEach((el) => { el.addEventListener('click', (event) => { showLongReview(event.target) }) })

const minimise = document.querySelectorAll('.minimise')
minimise.forEach((el) => { el.addEventListener('click', (event) => { showShortReview(event.target) }) })
//показ полного отзыва и сокращенного отзыва



//Анимированный текст
const sliderText = document.querySelectorAll('.slider__text__container')

mainSwiper.on('afterInit', setTimeout(() => { sliderText.forEach((el) => { el.classList.add('move') }) }, 500))
mainSwiper.on('slideChangeTransitionStart', () => {
	sliderText.forEach((el) => { el.classList.remove('move') });
	setTimeout(() => { sliderText.forEach((el) => { el.classList.add('move') }) }, 500)
});


//Отправка форм
const callbackButton = document.getElementById('header-row__button');
callbackButton.addEventListener('click', showModal);

function showModal() {
	const callbackForm = document.querySelector('.callback-form-section');
	callbackForm.classList.remove('hidden');
	document.querySelector('.body').classList.add('no-scroll')
	const modalButton = document.querySelector('.modal__button');
	modalButton.addEventListener('click', () => {
		callbackForm.classList.add('hidden');
		document.querySelector('.body').classList.remove('no-scroll')
		document.getElementById('callback').reset();
	})
	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('click', () => {
		document.getElementById('callback').reset();
		callbackForm.classList.add('hidden');
		document.querySelector('.body').classList.remove('no-scroll');
	})
}

