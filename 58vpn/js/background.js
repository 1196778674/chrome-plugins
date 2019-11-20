let ip_index = 1
chrome.contextMenus.create({
	title: "58COIN官网",
	onclick: function(){
		chrome.tabs.create({url: 'https://www.58ex.com'});
	}
});

chrome.contextMenus.create({
	title: "58COIN加速",
	onclick: function(){
		PROXY_IP()
	}
});

function CHANGE_IP() {
    PROXY_IP()
}

function PROXY_IP() {
	let ips = ['23.102.75.168:8080']
	let ip = ips[ip_index]
	let config = {
		mode: "pac_script",
		pacScript: {
			data: `function FindProxyForURL(url, host) {\n` +
						`if (url.indexOf('58ex.com') > -1) {\n` + 
							`return 'PROXY ${ip}; SOCKS ${ip}; https ${ip}; DIRECT;'; \n` +
						`}` + 	
						`return 'DIRECT'; \n` +
					`}`
		}
	};
	chrome.proxy.settings.set(
		{value: config},
		function() {
			chrome.notifications.create(null, {
				type: 'basic',
				iconUrl: 'icon.png',
				title: '58COIN加速器',
				message: `站点加速成功啦~~`
			});
			if (ips.length === ip_index) {
				ip_index = 1
			} else {
				ip_index++
			}
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
			href = 'https://usdt.58ex.com/'
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
			href = 'https://www.58ex.com/'
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

function measureBW(fn,time) {
    time = time || 1;
    var startTime, endTime, fileSize;
    var count = time ;
    var _this = this;
    function measureBWSimple () {
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if(!fileSize){
                    fileSize = xhr.responseText.length;
                }
                count --;
                if(count<=0){
                    endTime = Date.now();
                    var speed = fileSize * time  / ((endTime - startTime)/1000) / 1024;
                    fn && fn(Math.floor(speed));
                }
            }
        }
        xhr.open("GET", "https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png", true);
        xhr.send();
    }
    startTime = Date.now();
    for(var x = time;x>0;x--){
        measureBWSimple()
    }
}

setInterval(() => {
	measureBW((speed)=>{
		let val = speed + " KB/s"
		chrome.runtime.sendMessage(val)
	},10)
}, 2000);