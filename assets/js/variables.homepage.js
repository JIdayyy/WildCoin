/**
 * Initialize the carousel's index
 * @type {number}
 */
let currentIndex = 0;

/**
 * The cooldown between each swap, in milliseconds
 * @default
 * @type {number}
 */
const cooldown = 1000;

/**
 * Last time carousel got updated
 * @default
 * @type {number}
 */
let lastSwap;

/**
 * Refresh the current index
 * @param {number} newIndex - Index to go to
 * @return {number} The updated index
 */
const updateIndex = newIndex => {
	currentIndex = newIndex;

	return newIndex;
};

/**
 * The list of articles found on the web
 * @type {[{image: string, title: string, link: string, date: string, desc: string, tags: string}]}
 */
const articlesList = [
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2020',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2021',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2021',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2021',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2022 (page2)',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2022',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2023',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2023',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2024 (page 3)',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2024',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2025',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2025',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2025 (page 4)',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2025',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	},
	{
		image: 'assets/img/articles/thumbnails/blockchain.webp',
		title: '2026',
		link: 'https://thisisyoutube.com',
		date: '01 / 01 / 2026',
		desc: 'Bitcoin is boomer',
		tags: [
			'bitcoin',
			'boom'
		]
	}
];
