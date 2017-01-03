/**
 * Created by xiaoxiaotong on 2016/11/30.
 */
function ReturnJid(){
    this.ReturnJid = function (data) {
        if(data){
            if(!localStorage.getItem("Jid")){
                localStorage.setItem("Jid",data);
            }
        }
    };
    this.SaveUserInfo = function (data) {
        var data = JSON.parse(data);
        var Temp = [];
        if(!localStorage.getItem("LoginInfo")){
            Temp.push(data);
        }else{
            Temp = JSON.parse(localStorage.getItem("LoginInfo"));
            Temp.push(data);
        }
        localStorage.setItem("LoginInfo",JSON.stringify(Temp));
    };
    this.SaveUserImg = function (data) {

    }
}

var CurrentJid = new ReturnJid();
