
$('#invoke_background_js').click(e => {
	let bg = chrome.extension.getBackgroundPage()
	bg.CHANGE_IP()
});