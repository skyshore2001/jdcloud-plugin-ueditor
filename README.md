# 富文本编辑器

集成百度ueditor: http://ueditor.baidu.com/doc/

## 用法

安装：

	./tool/jdcloud-plugin.sh add ../jdcloud-plugin-ueditor

示例设计：

	@Item: id, ... detail

	- detail: 商品详情，支持富文本。

在逻辑页对话框中使用：page/dlgItem.html

		<tr>
			<td>产品详情</td>
			<td>
				<textarea class="jdcloud-plugin-ueditor" name="detail" style="width: 600px"></textarea>
			</td>
		</tr>

后端默认会对html标签自动转码，使用dbExpr禁用：

	class AC2_Item extends AccessControl
	{
		protected function onValidate()
		{
			...
			$_POST['detail'] = dbExpr(Q($_POST['detail']));
		}
	}

注意：上传视频或上传多图等功能会打开新的对话框，因为z-index问题会显示在详情对话框的后面。此问题在store.js中已经做了修正。

	WUI.m_enhanceFn[".jdcloud-plugin-ueditor"] = enhanceUeditor;

