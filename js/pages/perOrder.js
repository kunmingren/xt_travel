/**
 * Created by cosmosev on 2017/2/12.
 */
$(document).ready(function () {


    $("#addPlayer").click(function () {
        $(this).parent().parent().before("<tr>" +
            "<td>游客姓名：<input type='text' class='head-input' /></td>" +
            "<td>身份证号：<input type='text' class='head-input' /></td>" +
            "<td>手机号：<input type='text' class='head-input' /></td>" +
            "</tr>");
    })
});