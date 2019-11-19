
$('#invoke_background_js').click(e => {
	let bg = chrome.extension.getBackgroundPage()
	bg.CHANGE_IP()
});

$('.container a').on('click', (e) => {
	let type = $(e.target).data('type')
	switch (type) {
		case 'www':
			chrome.tabs.create({url: 'https://www.58ex.com'});
			break;
		case 'usdt':
			chrome.tabs.create({url: 'https://usdt.58ex.com'});
			break;
		case 'swap':
			chrome.tabs.create({url: 'https://swap.58ex.com'});
			break;
		case 'spot':
			chrome.tabs.create({url: 'https://spot.58ex.com'});
			break;
		case 'regular':
			chrome.tabs.create({url: 'https://regularfuture.58ex.com'});
			break;
		case 'c2c':
			chrome.tabs.create({url: 'https://c2c.58ex.com'});
			break;
		default:
			chrome.tabs.create({url: 'https://www.58ex.com'});
			break;
	}
})