(function ($,TweenMax) {
    'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    TweenMax = TweenMax && TweenMax.hasOwnProperty('default') ? TweenMax['default'] : TweenMax;

    $(function() {
        let box = $('#box');

        TweenMax.to(box, 2, { x: 50 });
        console.log('hello world!');
    });

}($,TweenMax));
