/**
 * Created by cosmosev on 2017/1/6.
 */

$(document).ready(function () {
    $(".spotDetails").css("display","block");
   $("#spotNav li").click(function () {
       var type=$(this).attr("id");
       $(this).addClass("active").siblings("li").removeClass("active");
       $("."+type).css("display","block").siblings(".box-body").css("display","none");
   }) 
});