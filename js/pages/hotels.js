/**
 * Created by 83471 on 2016/12/26.
 */
$(function () {
    $("#datepicker").datepicker({
        inline: true,
        //设定可选日期范围
        minDate: 0,
        maxDate: "+1M +10D",
        //图标+input触发
        showOn: "both",
        buttonImage: "img/calendar.png",
        buttonImageOnly: true,
        showButtonPanel: true
    });
    $("#away-datepicker").datepicker({
        inline: true,
        //设定可选的日期范围
        minDate: 0,
        maxDate: "+1M +10D",
        //图标+input触发
        showOn: "both",
        buttonImage: "img/calendar.png",
        buttonImageOnly: true,
        showButtonPanel: true
    })
    //$("#datepicker").hide();

})