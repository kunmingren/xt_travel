/**
 * Created by 83471 on 2016/12/26.
 */
$(function () {
    //日期插件
    var start = {
        elem: '#hotel_st',
        format: 'YYYY-MM-DD',
        // min: laydate.now(), //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istime: false,
        istoday: false,
        choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas; //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#hotel_ed',
        format: 'YYYY-MM-DD',
        // min: laydate.now(),
        max: laydate.now(),
        istime: false,
        istoday: false,
        choose: function(datas){
            start.max = datas;
            start.start = datas; //将结束日的初始值设定为开始日
        }
    };
    laydate(start);
    laydate(end);

    $('.condition-input').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue',
        // increaseArea: '20%' // optional
    });
});