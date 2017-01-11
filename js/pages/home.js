/**
 * Created by cosmosev on 2016/12/26.
 */

$(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: 5000,

        // 分页器
        pagination: '.swiper-pagination',

        // 前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    })
});