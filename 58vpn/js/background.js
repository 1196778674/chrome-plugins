const config = {
	mode: "pac_script",
	pacScript: {
		data: "function FindProxyForURL(url, host) {\n" +
					"if (url.indexOf('58ex.com') > -1) {\n" + 
						"console.log(url) \n" +
						"return 'PROXY 222.20.74.89:8800; SOCKS 222.20.74.89:8899; https 222.20.74.89:8800; DIRECT;'; \n" +
					"}" + 	
					"return 'DIRECT'; \n" +
				"}"
	}
};

chrome.contextMenus.create({
	title: "切换线路",
	onclick: function(){
		PROXY_IP()
	}
});

function CHANGE_IP() {
    PROXY_IP()
}

function PROXY_IP() {
	chrome.proxy.settings.set(
		{value: config},
		function() {
			chrome.notifications.create(null, {
				type: 'basic',
				iconUrl: 'icon.png',
				title: '58COIN加速器',
				message: '切换线路成功'
			});
		}
	);
}

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	suggest([
		{content: 'usdt', description: 'USDT合约'},
		{content: 'swap', description: '币本位合约'},
		{content: 'regular', description: '季度合约'},
		{content: 'c2c', description: '法币交易'},
		{content: 'spot', description: '币币交易'}
	]);
});
chrome.omnibox.onInputEntered.addListener((text) => {
	var href = '';
	switch (text) {
		case 'c2c':
			href = 'https://c2c.58ex.com/'
			break;
		case 'usdt':
			href = 'https://usdt.58ex.com'
			break;
		case 'swap':
			href = 'https://swap.58ex.com/'
			break;
		case 'spot':
			href = 'https://spot.58ex.com/'
			break;
		case 'regular':
			href = 'https://regularfuture.58ex.com/'
			break;
		default:
			href = 'https://www.58ex.com'
			break;
	};
	openUrlCurrentTab(href);
});


function getCurrentTabId(callback){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function openUrlCurrentTab(url){
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, {url: url});
	})
}