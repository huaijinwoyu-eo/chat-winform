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
    }
}

var CurrentJid = new ReturnJid();
