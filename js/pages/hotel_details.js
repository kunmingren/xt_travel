/**
 * Created by cosmosev on 2017/2/11.
 */
$(document).ready(function () {
    $(".hotel").css("display","block");
    $("#hotelNav li").click(function () {
        var type=$(this).attr("id");
        $(this).addClass("active").siblings("li").removeClass("active");
        $("."+type).css("display","block").siblings(".box-body").css("display","none");
    });
});