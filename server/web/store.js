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

	var editor = null;
	jdlg.on("show", onShow)
		.on("validate", onValidate);

	function onShow(ev) {
		// bugfix: ueditor内添加表格,在表格内鼠标*有时*无法进行点击和选择，会自动回到开头位置。(ueditor.all.min.js)
		// 注意：必须在onShow中做render, 否则iframe.src中的代码很可能会被执行两次, 导致`N.addListener("mouseup", w)` 会执行两次导致鼠标选择异常
		if (editor == null) {
			editor = new UE.ui.Editor();
			editor.render(jp[0]);
			editor.addListener('ready',function(){
				dfd.resolve();
			})
		}
		dfd.then(function () {
			editor.setContent(jp.val());
		});
	}

	function onValidate(ev, mode, oriData, newData) {
	}
}
