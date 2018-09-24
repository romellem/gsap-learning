const glob = require('glob');
const path = require('path');

let files = glob.sync('./src/scripts/!(template).js');

module.exports = files.map(file => {
    let file_name = file.split('/').pop();
    return {
        input: file,
        external: ['gsap', 'jquery'],
        output: {
            file: `./docs/scripts/${file_name}`,
            format: 'iife',
            globals: {
                jquery: '$',
                gsap: 'TweenMax',
            },
        },
    };
});
