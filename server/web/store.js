$.fn.window.defaults.zIndex=800; // for ueditor
WUI.m_enhanceFn[".jdcloud-plugin-ueditor"] = enhanceUeditor;
function enhanceUeditor(jp)
{
	var jdlg = jp.closest(".wui-dialog");
	if (jdlg.size() == 0)
		return;

	var defOpt = {
		sep: ','
	};
	// var opt = WUI.getOptions(jp, defOpt);
	var dfd = $.Deferred();

	var editor = new UE.ui.Editor();
	editor.render(jp[0]);
	editor.addListener('ready',function(){
		dfd.resolve();
	})

	jdlg.on("show", onShow)
		.on("validate", onValidate);

	function onShow(ev) {
		dfd.then(function () {
			editor.setContent(jp.val());
		});
	}

	function onValidate(ev, mode, oriData, newData) {
	}
}
