import $ from 'jquery';
import TweenMax from 'gsap';

$(function() {
    var tl = new TimelineMax({ repeat: -1 });
    tl.add(TweenMax.to($('.icon'), 5, { rotation: 360, ease: Power0.easeNone }));

    // Expose globally
    window.tl = tl;
});
