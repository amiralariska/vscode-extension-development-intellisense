const markdownIt = require('markdown-it')();

function getWebviewChangelogContent(markdown) {
    const htmlChangelogContent = markdownIt.render(markdown);
    const cssChangelogContent = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Clear+Sans:wght@500&family=Nunito:wght@400&display=swap');
body {
	background: #50a5ff;
	font-family: 'Nunito', sans-serif;
}
h1{
	font-family: 'Montserrat', sans-serif;
	font-size: 25px;
	font-weight: 700;
	color: blue;
	text-align: center;
}
p{
	font-family: 'Montserrat', sans-serif;
	font-size: 18px;
	font-weight: 400;
	color: cyan;
	text-align: center;
}
h2{
	font-family: 'Montserrat', sans-serif;
	font-size: 20px;
	font-weight: 500;
	color: #0080ff;
}
h3{
	font-family: 'Montserrat', sans-serif;
	font-size: 18px;
	font-weight: 400;
	color: #2580ff;
}
li{
	font-size: 16px;
	font-weight: 400;
	color: #0050ff;
	margin-top: 5px;
}
.main-changelog-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.vscode-extension-development-intellisense-logo{
	width: 250px;
	height: 250px;
	margin-top: 25px;
}`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VSCODE Extension Development Intellisense Changelog</title>
    <style>
        ${cssChangelogContent}
    </style>
</head>
<body>
    <div class="main-changelog-content">
		<img src="https://raw.githubusercontent.com/amiralariska/vscode-extension-development-intellisense/refs/heads/vscode-extension-development-intellisense/icon/vscode-extension-development-intellisense-logo.jpg" class="vscode-extension-development-intellisense-logo" alt="VSCODE Logo">
		<h1>VSCODE Extension Development Intellisense Version For VSCODE</h1>
		<p>The History Of VSCODE Extension Development Intellisense Version</p>
	</div>
	${htmlChangelogContent}
</body>
</html>`;
}

module.exports = { getWebviewChangelogContent };