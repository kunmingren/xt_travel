/**
 * Created by cosmosev on 2016/11/23.
 */
var time1,time2;
$(document).ready(function () {
    
    //登陆切换
    //短信登陆
    $(".sms").click(function () {
        $(".log-common").css("display","none");
        $(".log-mobile").css("display","block");
        $(".log-forget").css("display","none");
        $(".msg1").css("display","none");
        $(".msg2").css("display","none");
        $(".msg3").css("display","none");
        $("input").not(".sendcode").val("")
    });
    //普通登陆
    $(".common").click(function () {
        $(".log-common").css("display","block");
        $(".log-mobile").css("display","none");
        $(".log-forget").css("display","none");
        $(".msg1").css("display","none");
        $(".msg2").css("display","none");
        $(".msg3").css("display","none");
        $("input").not(".sendcode").val("")
    });
    //忘记密码
    $(".forget").click(function () {
        $(".log-common").css("display","none");
        $(".log-mobile").css("display","none");
        $(".log-forget").css("display","block");
        $(".msg1").css("display","none");
        $(".msg2").css("display","none");
        $(".msg3").css("display","none");
        $("input").not(".sendcode").val("")
    });

    //短信登陆用户名验证
    $("#user2").keyup(function () {
        var phoneNum=$(this).val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg2").css("display","none");
        }else {
            $(".msg2").html("请输入正确的手机号码！").css("display","block");
        }
    });

    //短信登陆验证码
    $("#code1").click(function () {
        if($("#code1").attr("class")=="sendcode_d"){

        }else {
            var phoneNum=$("#user2").val();
            if(verifyPhoneNum(phoneNum)){
                var data={
                    "phoneID":phoneNum
                };
                getcode(data);
                $("#code1").val("重新发送("+60+"s)").removeClass("sendcode").addClass("sendcode_d");
                var t=60;
                time1=setInterval(function () {
                    if(t>0){
                        t--;
                        $("#code1").val("重新发送("+t+"s)").removeClass("sendcode").addClass("sendcode_d");
                    }else {
                        clearInterval(time1);
                        $("#code1").val("发送验证码").removeClass("sendcode_d").addClass("sendcode");
                    }
                },1000);
            }else {
                $(".msg2").html("请输入正确的手机号码！").css("display","block");
            }
        }
    });

    //短信登陆按钮
    $("#log2").click(function () {
        var phoneNum=$("#user2").val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg2").css("display","none");
            // var passcode=localStorage.getItem("passcode");
            var pass=$("#pass2").val();
            var data={"phone":phoneNum,"code":pass};
            verifycode(data,function () {
                $(".msg2").css("display","none");
                messageLogin(getPhoneInitData(),function(){
                    layer.msg('登陆成功！', {
                        time: 1500
                    }, function(){
                        window.location.href="../xitang/index.html";
                    });
                })
            });
        }else {
            $(".msg2").html("请输入正确的手机号码！").css("display","block");
        }
    });

    //普通登陆验证
    $("#user1").keyup(function () {
        var phoneNum=$(this).val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg1").css("display","none");
        }else {
            $(".msg1").html("请输入正确的手机号码！").css("display","block");
        }
    });

    //普通登陆按钮
    $("#log1").click(function () {
        var phoneNum=$("#user1").val();
        if(verifyPhoneNum(phoneNum)){
            var pass=$("#pass2").val();
            //后台验证密码
            businessLogin(getInitData(),function(){
                $(".msg1").css("display","none");
                layer.msg('登陆成功！', {
                    time: 1500
                }, function(){
                    window.location.href="../xitang/index.html";
                });
            },function () {
                $(".msg1").html("密码不正确！").css("display","block");
            });
        }else {
            $(".msg1").html("请输入正确的手机号码！").css("display","block");
        }
    });

    //忘记密码手机号码验证
    $("#user3").keyup(function () {
        var phoneNum=$(this).val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg3").css("display","none");
        }else {
            $(".msg3").html("请输入正确的手机号码！").css("display","block");
        }
    });
    //忘记密码验证码
    $("#code2").click(function () {
        if($("#code2").attr("class")=="sendcode_d"){
        }else {
            var phoneNum=$("#user3").val();
            if(verifyPhoneNum(phoneNum)){
                var data={
                    "phoneID":phoneNum
                };
                getcode(data);
                $("#code2").val("重新发送("+60+"s)").removeClass("sendcode").addClass("sendcode_d");
                var t=60;
                time2=setInterval(function () {
                    if(t>0){
                        t--;
                        $("#code2").val("重新发送("+t+"s)").removeClass("sendcode").addClass("sendcode_d");
                    }else {
                        clearInterval(time2);
                        $("#code2").val("发送验证码").removeClass("sendcode_d").addClass("sendcode");
                    }
                },1000);
            }else {
                $(".msg3").html("请输入正确的手机号码！").css("display","block");
            }
        }
    });

    $("#log3").click(function () {
        var phoneNum=$("#user3").val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg3").css("display","none");
            var pass=$("#pass3").val();
            var data={"phone":phoneNum,"code":pass};
            verifycode(data,function () {
                $(".msg3").css("display","none");
                var passw=$("#pwd3").val();
                if(passw.length<6){
                    $(".msg3").html("请设置6位及以上密码！").css("display","block");
                }else if(passw.length>18){
                    $(".msg3").html("密码不能大于18位！").css("display","block");
                }else {
                    var loginInfo={
                        "uname":$("#user3").val(),
                        "newPwd":$("#pwd3").val()
                    };
                    updatePwd(loginInfo,function(){
                        layer.confirm('修改成功！', {
                            btn: '确定' //按钮
                        }, function(){
                            window.location.href="../xitang/login.html";
                        });
                    })
                }

            });
        }else {
            $(".msg3").html("请输入正确的手机号码！").css("display","block");
        }
    });

});

//验证手机号码
function verifyPhoneNum(num) {
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(num))){
        if(num=="root"){
            return true;
        }
        return false;
    }else {
        return true
    }
}



//获取短信验证码
function getcode(data) {
    $.ajax({
        type: "POST",
        url: geturl("backend/fff"),
        dataType: "json",
        data: data,
        success: function (data) {
            if (data.error_code == 0) {
                localStorage.setItem("passcode",data.code)
            }
            if(data.error_code < 0){
                layer.msg(data.info, {
                    time: 1500
                });
            }
        }
    });
}


function verifycode(data,fn1) {
    $.ajax({
        type: "POST",
        url: geturl("backend/ggg"),
        dataType: "json",
        data: data,
        success: function (data) {
            if (data.error_code == 0) {
                localStorage.setItem("passcode",data.code);
                fn1()
            }else {
                layer.msg(data.error_info, {
                    time: 1500
                });
            }
        }
    });
}

function getInitData(){
    var loginInfo={
        "uname":$("#user1").val(),
        "pwd":$("#pass1").val()
    };
    return loginInfo;
}

function  businessLogin(loginInfo,fn1){
    if (!loginInfo) {
        layer.msg("参数错误！",{
            time: 1500
        });
        return;
    }
    if (!fn1) {
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/businessLogin"),
        data:JSON.stringify(loginInfo),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                var info=data.Info;
                fn1();
                setCookie("user",info.phone,1);
                setCookie("userId",info.id,1);
                localStorage.setItem("role",info.role);
                localStorage.setItem("businessType",info.businessType);
                localStorage.setItem("useableTicket",info.useableTicket);
            }else {
                layer.msg(data.Info, {
                    time: 1500
                });
            }
        }
    });
}


function getPhoneInitData(){
    var loginInfo={
        "uname":$("#user2").val()
    };
    return loginInfo;
}

function  messageLogin(loginInfo,fn1){
    if (!loginInfo) {
        layer.msg("参数错误！",{
            time:1500
        });
        return;
    }
    if (!fn1) {
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/messageLogin"),
        data:JSON.stringify(loginInfo),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                var info=data.Info;
                fn1();
                setCookie("user",info.phone,1);
                setCookie("userId",info.id,1);
                localStorage.setItem("role",info.role);
                localStorage.setItem("businessType",info.businessType);
                localStorage.setItem("useableTicket",info.useableTicket);
            }else {
                layer.msg(data.resInfo, {
                    time: 1500 //按钮
                });
            }
        }
    });
}



function  updatePwd(loginInfo,fn1){
    if (!loginInfo) {
        layer.msg("参数错误！",{
            time:1500
        });
        return;
    }
    if (!fn1) {
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/updatePassword"),
        data:JSON.stringify(loginInfo),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                fn1();
            }else {
                layer.msg(data.resInfo, {
                    time: 1500 //按钮
                });
            }
        }
    });
}

