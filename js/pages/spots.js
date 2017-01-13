/**
 * Created by cosmosev on 2017/1/6.
 */

$(document).ready(function () {

    $("#viewDetails").click(function () {
        $("#spots").addClass("active").siblings("li").removeClass("active");
        location.href="?ctl=spot_details";
        $("#reload").load("tpl/spot_details.html");
    })
});