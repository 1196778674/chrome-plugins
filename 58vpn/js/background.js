const config = {
    mode: "fixed_servers",
    rules: {
        proxyForHttp: {
            scheme: "socks5",
            host: "161.129.43.205",
            port: 16899
        },
        proxyForHttps: {
            scheme: "socks5",
            host: "161.129.43.205",
            port: 16899
        },
        bypassList: ["baidu.com"]
    }
};
// $.ajax({
// 	type: "POST",
// 	url: "https://api.58ex.com/tools/dict/product/list",
// 	data: {},
// 	dataType: "json",
// 	success: function (res) {
// 		alert(JSON.stringify(res))
// 	}
// });
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
			chrome.proxy.settings.get(
				{},
				function(config) {
					chrome.notifications.create(null, {
						type: 'basic',
						iconUrl: 'icon.png',
						title: '切换线路成功',
						message: '切换线路成功'
					});
				}
			);
		}
	);
}