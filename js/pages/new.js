/**
 * Created by cosmosev on 2016/12/26.
 */
//  新闻详情页 
$(function() {
    // “函数内全局的变量”
    // 
    var id = GetRequest("id");
    getNewInfo(id);
    //获取新闻线路详情数据
    function getNewInfo(id) {
        $.ajax({
            type: "GET",
            // todo 
            // 写死的参数
            url: geturl("backend/getNoticeDetail"),
            // url: 'https://www.aifavor.com/backend/getNoticeDetail',
            dataType: "json",
            data: {
                "notice_id": id
            },
            asnyc:true,
            success: function(data) {
                if (data.rescode == 200) {
                    console.log(data)
                    initNewStyle(data.info);

                }
            }
        });
    }

    // 初始化
    function initNewStyle(newInfo) {
        // todo  返回的段落部分的字段要改成这样的
        //[{text:'内容内容.....',pic:['url1',‘url2’]},{text:'内容内容.....',pic:['url1',‘url2’]}]
        var htmlHead = "",
            htmlBody = "";
        htmlHead += "<div class='row'>"+
                        "<div class='col-md-12 new-title'>" +
                           "<div class=''>" + newInfo.subject + "</div>"+
                        "</div>"+
                        "<div class='col-md-12'>" +
                           "<div class='new-info clearfix'>" + 
                                 // todo 差一个上传人
                                // "<div class='new-upperson pull-left'>"+newInfo.sendTime+"</div>"+
                                "<div class='new-sendTime pull-left'>"+newInfo.sendTime+"</div>"+
                                "<div class='new-readcounts pull-right'>"+newInfo.readCounts+"  浏览</div>"+
                        "</div>"+
                    "</div>";

        htmlBody += "<div class='row'>"+
                        "<div class='col-md-12'>" +
                           "<div class='descripe'>" + newInfo.descripe + "</div>"+
                           "<div class='img'><img src='" + newInfo.pic[0] + "'></div>"+
                        "</div>"+
                    "</div>";
        $(".newInfo .newInfo-head").html(htmlHead);
        $(".newInfo .newInfo-body").html(htmlBody);
    }


    

});
