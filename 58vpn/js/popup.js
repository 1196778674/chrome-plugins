
$('#invoke_background_js').click(e => {
	var bg = chrome.extension.getBackgroundPage()
	bg.CHANGE_IP()
});