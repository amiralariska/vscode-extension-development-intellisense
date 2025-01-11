const markdownIt = require('markdown-it')();
const { getResponsiveStyles } = require('./docsWebviewContentResponsiveStyle');

function getWebviewContent(markdown) {
	const htmlContent = markdownIt.render(markdown);
	const cssResponsive = getResponsiveStyles();
	const cssContent = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Clear+Sans:wght@500&family=Nunito:wght@400&display=swap');
body {
	background: #6d8fa1;
	font-family: 'Nunito', sans-serif;
}
h1{
	font-family: 'Montserrat', sans-serif;
	font-size: 25px;
	font-weight: 700;
	color: blue;
	text-align: center;
}
h3{
	font-family: 'Clear Sans', sans-serif;
	font-size: 18px;
	font-weight: 500;
	color: cyan;
}
li{
	font-size: 16px;
	font-weight: 400;
	color: #80c0ff;
	margin-top: 5px;
}
code{
	font-family: Consolas, monospace;
	font-size: 14.5px;
	background: #050505;
	color: blue;
	padding: 1px 3px;
	border-radius: 5px;
}
ol, img{
	display: flex;
	flex-direction: column;
}
img {
	width: 911px;
	height: 485px;
}
.main-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 25px;
}
.vscode-extension-development-intellisense-logo{
	width: 250px;
	height: 250px;
}
${cssResponsive}`;
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>VSCODE Extension Development Intellisense Documentation</title>
	<style>
		${cssContent}
	</style>
</head>
<body>
	<div class="main-content">
		<img src="https://raw.githubusercontent.com/amiralariska/vscode-extension-development-intellisense/refs/heads/vscode-extension-development-intellisense/icon/vscode-extension-development-intellisense-logo.jpg" class="vscode-extension-development-intellisense-logo" alt="VSCODE Logo">
		<h1>VSCODE Extension Development Intellisense Documentation</h1>
	</div>
	${htmlContent}
</body>
</html>`;
}

module.exports = { getWebviewContent };