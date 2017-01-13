/**
 * Created by cosmosev on 2016/11/23.
 */
var time2, flag_r=false;
$(document).ready(function () {
    $('#protocol').iCheck({
        checkboxClass: 'icheckbox_flat-blue'
    }).on('ifChecked', function(){
        flag_r=true;
    }).on('ifUnchecked', function(){
        flag_r=false;
    });

    $("#protocols").click(function () {
        layer.confirm('一切解释权归本公司所有', {
            title: '协议',
            btn: '确定' //按钮
        }, function(index){
            layer.close(index)
        });
    });

    //注册手机号码验证
    $("#r_phonenum").keyup(function () {
        var phoneNum=$(this).val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg").css("display","none");
        }else {
            $(".msg").html("请输入正确的手机号码！").css("display","block");
        }
    });

    //确认密码验证
    $("#r_password_reg").keyup(function () {
        var r_password=$("#r_password").val();
        var r_password_reg=$(this).val();
        if(r_password==r_password_reg){
            $(".msg").css("display","none");
        }else {
            $(".msg").html("两次密码输入不相同！").css("display","block");
        }
    });

    //注册验证码
    $("#r_code_s").click(function () {
        if($("#r_code_s").attr("class")=="sendcode_d"){

        }else {
            var phoneNum=$("#r_phonenum").val();
            if(verifyPhoneNum(phoneNum)){
                var data={
                    "phoneID":phoneNum
                };
                getcode(data);
                $("#r_code_s").val("重新发送("+60+"s)").removeClass("sendcode2").addClass("sendcode_d");
                var t=60;
                time2=setInterval(function () {
                    if(t>0){
                        t--;
                        $("#r_code_s").val("重新发送("+t+"s)").removeClass("sendcode2").addClass("sendcode_d");
                    }else {
                        clearInterval(time2);
                        $("#r_code_s").val("发送验证码").removeClass("sendcode_d").addClass("sendcode2");
                    }
                },1000);
            }else {
                $(".msg").html("请输入正确的手机号码！").css("display","block");
            }
        }
    });

    $("#register").click(function(){
        var phoneNum=$("#r_phonenum").val();
        if(verifyPhoneNum(phoneNum)){
            $(".msg").css("display","none");
            var pass=$("#r_passcode").val();
            var data={"phone":phoneNum,"code":pass};
            verifycode(data,function () {
                $(".msg").css("display","none");
                var psd=$("#r_password").val();
                if(psd.length<6){
                    $(".msg").html("请设置6位及以上密码！").css("display","block");
                }else if(psd.length>18){
                    $(".msg").html("密码不能大于18位！").css("display","block");
                }else {
                    $(".msg").css("display","none");
                    var r_password=$("#r_password").val();
                    var r_password_reg=$("#r_password_reg").val();
                    if(r_password==r_password_reg){
                        $(".msg").css("display","none");
                        var registerCode=$("#registerCode").val();
                        if(registerCode==""){
                            $(".msg").html("请填写邀请码！").css("display","block");
                        }else {
                            $(".msg").css("display","none");
                            if(flag_r){
                                $(".msg").css("display","none");
                                //注册信息传后台
                                register(getInitParam(),function(){
                                    layer.confirm('恭喜您注册成功！', {
                                        btn: '确定' //按钮
                                    }, function(){
                                        window.location.href="../xitang/login.html";
                                    });
                                })
                            }else {
                                $(".msg").html("请阅读并接受《智慧西塘商家协议》！").css("display","block");
                            }
                        }
                    }else {
                        $(".msg").html("两次密码输入不相同！").css("display","block");
                    }
                }
            });
        }else {
            $(".msg").html("请输入正确的手机号码！").css("display","block");
        }


        }
    );

    //注册验证
    
});


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
                    time: 2000
                });
            }
        }
    });
}

//验证手机号码
function verifyPhoneNum(num) {
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(num))){
        return false;
    }else {
        return true
    }
}

function getInitParam(){

    var businessInfo={
        "phone":$("#r_phonenum").val(),
        "pwd":$("#r_password").val(),
        "businessType":$("#r_type").val(),
        "registerCode":$("#registerCode").val()
    };
    return businessInfo;
}


//ajax修改旅游攻略信息列表
function register(businessInfo,fn){
    if (!businessInfo) {
        layer.msg("参数错误！",{
            time:1500
        });
        return;
    }
    if (!fn) {
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/businessRegister"),
        data:JSON.stringify(businessInfo),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                fn();
            }
            if(data.rescode == 404){
                layer.msg(data.errorInfo,{
                    time:1500
                });
            }
        }
    });
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
                    time: 4000
                });
            }
        }
    });
}
