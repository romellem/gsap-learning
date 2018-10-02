const glob = require('glob');
const fs = require('fs');
const path = require('path');

glob('./docs/!(index).html', function (err, files) {
    let list = files.map(file => {
        let name = file.split('/').pop();
        return `<li><a href="${name}">${name}</a></li>\n`;
    }).join('');

    let html = `
    <style>html{ font-family:sans-serif }</style>
    <h1>Table of Contents</h1>
    <ul>\n${list}\n</ul>
    `;

    let filename = path.resolve(__dirname, '../docs/index.html');
    fs.writeFileSync(filename, html);
    console.log(`Updated file docs/index.html with:\n  ${files.join('\n  ')}`);
})