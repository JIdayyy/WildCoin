for (const article of articlesList) {
	const wrapper = document.createElement('div');
	wrapper.classList.add('swiper-slide', 'grid');

	const flex = document.createElement('div');
	flex.classList.add('column', 'flex', 'ml-5');

	const img = document.createElement('img');
	img.classList.add('article__thumbnail');
	img.src = article.image;

	const h2 = document.createElement('h3');
	h2.textContent = article.title;

	const date = document.createElement('p');
	date.classList.add('article__desc');
	date.textContent = article.desc;

	const description = document.createElement('p');
	description.textContent = article.desc;

	const tags = document.createElement('p');
	tags.classList.add('bold');
	tags.textContent = article.tags.map(tag => `#${tag}`).join(' ');

	flex.appendChild(h2);
	flex.appendChild(date);
	flex.appendChild(description);
	flex.appendChild(tags);

	wrapper.appendChild(img);
	wrapper.appendChild(flex);

	document.querySelector('.swiper-wrapper').appendChild(wrapper);
}

const swiper = new Swiper('.swiper-container', {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		}
	},
	keyboard: true,
	mousewheel: true,
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next'
	}
});
