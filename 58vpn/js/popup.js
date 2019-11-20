const bg = chrome.extension.getBackgroundPage()

function LOADING () {
	return new Promise((resolve, reject) => {
		chrome.proxy.settings.get({}, function (e) {
			if (!!e.value.pacScript) {
				$('#checkbox').prop('checked', true)
			} else {
				$('#checkbox').prop('checked', false)
			}
			setTimeout(() => {
				resolve()
			}, 1000);
		})
	})
}

LOADING().then(res => {
	$('#loading').hide()
	$('.bodys').show()
})

$('#switch').on('click', (e) => {
	if (!$('#checkbox').prop('checked')) {
		bg.CHANGE_IP()
	} else {
		bg.CLEAR_PROXY()
	}
})

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
setInterval(() => {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		let color = Number(request) > 100 ? '#0ab480' : '#f14b4f'
		$('#fbs').css({'color': color}).text(request + 'KB/s')
	});
}, 2000);