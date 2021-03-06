# 富文本编辑器

集成百度ueditor: http://ueditor.baidu.com/doc/

## 用法

安装：

	./tool/jdcloud-plugin.sh add ../jdcloud-plugin-ueditor

配置：

	server/plugin/ueditor/php/config.json

在该文件中，默认了若干xxxPathFormat(比如imagePathFormat)，建议只使用默认，不要修改，如：

    "imagePathFormat": "/ueditor/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */

此处无论是否以"/"开头，都是相对于网站根目录的路径。在部署时在网站根目录下创建 ueditor 目录即可（注意设置apache用户可写）。

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

