import $ from 'jquery';
import TweenMax from 'gsap';

$(function() {
    let box = $('#box');

    TweenMax.to(box, 2, { x: 50 });
    console.log('hello world!')
});
