

/*朋友列表分组标题*/
var FriendTitle = React.createClass({
    displayName: "FriendTitle",
    render:function(){
        return(
            React.createElement("div",{className:"friend-title w20"},
                React.createElement("span",{className:"icon-caret-right"}),
                this.props.friendTitle,
                "(",
                React.createElement("span",{className:"online"},this.props.onlineNumber),
                "/",
                React.createElement("span",{className:"total"},this.props.totalNumber),
                ")"
            )
        );
    }
});
/*朋友列表*/
var FriendList = React.createClass({
    displayName:"FriendList",
    render:function(){
        var row = [];
        for(var i=0; i<this.props.FriendDate.length; i++){
            if(this.props.FriendDate[i].online || this.props.FriendDate[i].MsgCount>0){
                row.unshift(
                    React.createElement(FriendItem,{
                        onlineTag:this.props.FriendDate[i].online,
                        imgUrl:this.props.FriendDate[i].imgUrl,
                        key:this.props.FriendDate[i].jid,
                        jid:this.props.FriendDate[i].jid,
                        name:this.props.FriendDate[i].username,
                        job:this.props.FriendDate[i].job,
                        UnreadMessageLength:this.props.FriendDate[i].MsgCount,
                        group:this.props.friendTitle
                    })
                )
            }else {
                row.push(
                    React.createElement(FriendItem,{
                        onlineTag:this.props.FriendDate[i].online,
                        imgUrl:this.props.FriendDate[i].imgUrl,
                        key:this.props.FriendDate[i].jid,
                        jid:this.props.FriendDate[i].jid,
                        name:this.props.FriendDate[i].username,
                        job:this.props.FriendDate[i].job,
                        UnreadMessageLength:this.props.FriendDate[i].MsgCount,
                        group:this.props.friendTitle
                    })
                )
            }
        }
        return(
            React.createElement("ul",{className:"friend-list"},row)
        )
    }
});
/*单个列表单元*/
var FriendItem = React.createClass({
    displayName:"FriendItem",
    getInitialState:function () {
        return{
            UnreadMessageLength:this.props.UnreadMessageLength
        }
    },
    render:function(){
        return(
            React.createElement("li",{className:this.props.onlineTag ? "online-item" :"",onDoubleClick:this.HandleDoubleClick},
                React.createElement("a",{
                    // href:"./chat-tab.html?"+this.props.jid+"&"+this.props.imgUrl+"&"+this.props.name+"&"+this.props.job,
                    target:"_black"
                },
                    React.createElement("div",{className:"img"},
                        React.createElement("img",{src:this.props.imgUrl,className:"db fl"}),
                        React.createElement("div",{className:"onlineTag"},"离线")
                    ),
                    React.createElement("div",{className:"info"},
                        React.createElement("div",{className:"name"},this.props.name),
                        React.createElement("div",{className:"job"},this.props.job)
                    ),
                    React.createElement("div",{className:"abs message"},this.state.UnreadMessageLength>0 ? this.state.UnreadMessageLength : "")
                )
            )
        );
    },
    HandleDoubleClick:function () {
        var flage = true;
        /*清空未读消息数目*/
        this.setState({
            UnreadMessageLength:""
        },function () {
            /*local storage存储历史纪录。*/
            var CurrentJid = localStorage.getItem("Jid");
            if(!localStorage.getItem("HistoryList")){
                var CurrentObj = {};
                CurrentObj[CurrentJid] = [];
                localStorage.setItem("HistoryList",JSON.stringify(CurrentObj));
            }
            var CurrentObjT = JSON.parse(localStorage.getItem("HistoryList"));
            for(var i=0; i<CurrentObjT[CurrentJid].length; i++){
                if(CurrentObjT[CurrentJid][i].jid == this.props.jid){
                    CurrentObjT[CurrentJid][i].onlineTag = this.props.onlineTag;
                    CurrentObjT[CurrentJid][i].imgUrl = this.props.imgUrl;
                    CurrentObjT[CurrentJid][i].jid = this.props.jid;
                    CurrentObjT[CurrentJid][i].name = this.props.name;
                    CurrentObjT[CurrentJid][i].job = this.props.job;
                    CurrentObjT[CurrentJid][i].UnreadMessageLength = this.state.UnreadMessageLength;
                    CurrentObjT[CurrentJid][i].group = this.props.group;
                    flage = false;
                    break;
                }
            }
            if(flage){
                CurrentObjT[CurrentJid].unshift({
                    onlineTag:this.props.onlineTag,
                    imgUrl:this.props.imgUrl,
                    jid:this.props.jid,
                    name:this.props.name,
                    job:this.props.job,
                    UnreadMessageLength:this.state.UnreadMessageLength,
                    group:this.props.group
                });
            }
            localStorage.setItem("HistoryList",JSON.stringify(CurrentObjT));
        });


        var TargetString = {
            jid: this.props.jid,
            online: this.props.onlineTag,
            nickname: this.props.name,
            imgurl: this.props.imgUrl,
            job: this.props.job,
            group: this.props.group,
        };
        /*打开聊天窗口*/
        window.external.API_OpenChatForm(JSON.stringify(TargetString));

    },
    componentWillReceiveProps:function (nextprops) {
        this.setState({
            UnreadMessageLength:nextprops.UnreadMessageLength
        })
    }
});
/*朋友列表分组单元*/
var FriendSection = React.createClass({
    displayName:"FriendSection",
    render:function(){
        var Row =[];
        for(var i=0; i<this.props.FriendDate.length; i++){
            var OnlineNumber = 0;
            for(var j=0; j<this.props.FriendDate[i].Users.length; j++){
                if(this.props.FriendDate[i].Users[j].online){
                    OnlineNumber++;
                }
            }
            Row.push(
                React.createElement(FriendTitle,{
                    friendTitle:this.props.FriendDate[i].GroupName,
                    onlineNumber:OnlineNumber,
                    totalNumber:this.props.FriendDate[i].Users.length
                })
            );
            Row.push(
                React.createElement(FriendList,{
                    friendTitle:this.props.FriendDate[i].GroupName,
                    FriendDate:this.props.FriendDate[i].Users
                })
            );
        }
        return(
            React.createElement("div",{},Row)
        );
    },
    componentDidUpdate:function () {
        $(".friend-title").off("click").on("click",function(){
            $(this).next(".friend-list").slideToggle();
            if($(this).find("span[class*=icon-]").attr("class")=="icon-caret-down"){
                $(this).find("span[class*=icon-]").removeClass("icon-caret-down").addClass("icon-caret-right");
            }else {
                $(this).find("span[class*=icon-]").removeClass("icon-caret-right").addClass("icon-caret-down");
            }
        })
    }

});
//获取数据。
function FriendsDate(){
    this.FriendList = [];
    this.getFriendList = function(data){
        this.FriendList = data.data;
        this.propertyChange();
    };
    this.isowned = true;
    this.AddFriendItem = function (data) {
        var data;
        data = JSON.parse(data);
        for(var i=0; i<this.FriendList.length; i++){
            if(data.group == this.FriendList[i].GroupName){
                for(var j=0; j<this.FriendList[i].Users.length; j++){
                    if(this.FriendList[i].Users[j].jid == data.jid){
                        this.FriendList[i].Users[j].jid = data.jid;
                        this.FriendList[i].Users[j].online = data.online;
                        this.FriendList[i].Users[j].username = data.nickname;
                        this.FriendList[i].Users[j].imgUrl = data.imgurl;
                        this.FriendList[i].Users[j].job = data.job;
                        this.FriendList[i].Users[j].MsgCount = data.msgcount;

                        this.FriendList[i].Users.splice(j,1);
                        // this.FriendList[i].Users.push({
                        //     jid: data.jid,
                        //     online: data.online,
                        //     username: data.nickname,
                        //     imgUrl: data.imgurl,
                        //     job: data.job,
                        //     MsgCount:data.msgcount
                        // });
                        // this.propertyChange();
                        // this.isowned = false;
                        break;
                    }else {
                        this.isowned = true;
                    }
                }
                if(this.isowned){
                    this.FriendList[i].Users.push({
                        jid: data.jid,
                        online: data.online,
                        username: data.nickname,
                        imgUrl: data.imgurl,
                        job: data.job,
                        MsgCount:data.msgcount
                    });
                    this.propertyChange();
                }
                return;
            }
        }
        this.FriendList.push({
            GroupName:data.group,
            Users:[{
                jid: data.jid,
                online: data.online,
                username: data.nickname,
                imgUrl: data.imgurl,
                job: data.job,
                MsgCount:data.msgcount
            }]
        });
        this.propertyChange();
    };
    this.propertyChange = function(){
        ReactDOM.render(
            React.createElement(FriendSection,{FriendDate:this.FriendList}),
            document.getElementById("friend-list")
        );
    }
}

var nowFriendsDate = new FriendsDate();

// var test1 = [{"jid":"15010206358@10.185.1.95","online":true,"nickname": "15010206358","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"刘亚东@10.185.1.95","online":true,"nickname": "刘亚东","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"kjc@nefu.edu.cn@10.185.1.95","online":true,"nickname": "范金凤","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"liu_77@163.com@10.185.1.95","online":true,"nickname": "刘凤利","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13895900259@163.com@10.185.1.95","online":true,"nickname": "赵中南","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1094659991@qq.com@10.185.1.95","online":true,"nickname": "王子隆","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1140840597@qq.com@10.185.1.95","online":true,"nickname": "陈亚立","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lilingdi@10.185.1.95","online":true,"nickname": "李玲娣","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"15201245360@10.185.1.95","online":false,"nickname": "15201245360","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"caijinfeng1984@126.com@10.185.1.95","online":true,"nickname": "蔡金峰","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"45304324@qq.com@10.185.1.95","online":true,"nickname": "hanjia","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhb512120@163.com@10.185.1.95","online":true,"nickname": "张彪","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"381893612@qq.com@10.185.1.95","online":true,"nickname": "381893612@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"sichanlandag@163.com@10.185.1.95","online":true,"nickname": "sichanlandag@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yufeichen2002@sina.com@10.185.1.95","online":true,"nickname": "陈宇飞","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13801279378@10.185.1.95","online":true,"nickname": "秦向华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"scqnnd118@163.com@10.185.1.95","online":true,"nickname": "钟平华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"cqliuliang@163.com@10.185.1.95","online":true,"nickname": "刘亮","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"2858227869@qq.com@10.185.1.95","online":true,"nickname": "苏星熠","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1592558133@qq.com@10.185.1.95","online":true,"nickname": "蒋圳良","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zzy2slc@163.com@10.185.1.95","online":true,"nickname": "zzy2slc@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"panjin@10.185.1.95","online":true,"nickname": "panjin","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhaoxumao@yeah.net@10.185.1.95","online":true,"nickname": "赵序茅","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"2558353728@qq.com@10.185.1.95","online":true,"nickname": "2558353728@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"nieyanli@163.com@10.185.1.95","online":true,"nickname": "聂艳丽","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"18210456843@10.185.1.95","online":true,"nickname": "18210456843","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhaomengqingmike@126.com@10.185.1.95","online":true,"nickname": "赵梦清","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hebeirishang@163.com@10.185.1.95","online":true,"nickname": "范艳兵","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"辛兵@10.185.1.95","online":true,"nickname": "辛兵","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"尹传红@10.185.1.95","online":true,"nickname": "尹传红","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"李天送@10.185.1.95","online":true,"nickname": "李天送","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"279789188@qq.com@10.185.1.95","online":true,"nickname": "魏婕轩","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhaopf834@sina.com@10.185.1.95","online":true,"nickname": "赵鹏飞","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"epasoge-1845@yopmail.com@10.185.1.95","online":true,"nickname": "epasoge-1845@yopmail.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"963665252@qq.com@10.185.1.95","online":true,"nickname": "杨健","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"bianjing31@bjfu.edu.cn@10.185.1.95","online":true,"nickname": "bianjing31@bjfu.edu.cn","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1308212090@qq.com@10.185.1.95","online":true,"nickname": "张娜","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"mr.anderson@127.0.0.1","online":true,"nickname": "Mr.Anderson","imgurl":"images/user-img.png","job": "局长" ,"group":"","msgcount":"0"},{"jid":"15007901395@10.185.1.95","online":true,"nickname": "姚甲宝","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wum299@163.com@10.185.1.95","online":true,"nickname": "wum299@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"345988969@qq.com@10.185.1.95","online":true,"nickname": "张跃明","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"18631243721@10.185.1.95","online":true,"nickname": "李超ddasdf","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"rainy@10.185.1.95","online":true,"nickname": "linye","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"linyekepu@sohu.com@10.185.1.95","online":true,"nickname": "万志红","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"peinancai@aliyun.com@10.185.1.95","online":true,"nickname": "裴男才","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"孙哲@10.185.1.95","online":true,"nickname": "孙哲","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13752093826@10.185.1.95","online":true,"nickname": "13752093826","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"252351024@qq.com@10.185.1.95","online":true,"nickname": "252351024@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wypeasy@163.com@10.185.1.95","online":true,"nickname": "王亚萍","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"519106213@qq.com@10.185.1.95","online":true,"nickname": "519106213@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"xiaochen0213@sohu.com@10.185.1.95","online":true,"nickname": "陈乐成","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"84902686@qq.com@10.185.1.95","online":true,"nickname": "陈功健","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"asdf@xiaoxiaotong.org@10.185.1.95","online":true,"nickname": "asdf@xiaoxiaotong.org","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"bjfuwxx@163.com@10.185.1.95","online":true,"nickname": "王晓旭","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"tiancai21shizhu@sina.com@10.185.1.95","online":true,"nickname": "梅西","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"421490316@qq.com@10.185.1.95","online":true,"nickname": "421490316@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"30295854@qq.com@10.185.1.95","online":true,"nickname": "张锴","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"25433134@qq.com@10.185.1.95","online":true,"nickname": "25433134@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"tongfangping@sina.com@10.185.1.95","online":true,"nickname": "tongfangping@sina.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wanzhihong@sina.com@10.185.1.95","online":true,"nickname": "万志红","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"22010230@qq.com@10.185.1.95","online":true,"nickname": "韦维","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13463121352@163.com@10.185.1.95","online":true,"nickname": "13463121352@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hbuhan@10.185.1.95","online":true,"nickname": "hbuhan","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"nancai.pei@gmail.com@10.185.1.95","online":true,"nickname": "nancai.pei@gmail.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"kych.5578@aliyun.com@10.185.1.95","online":true,"nickname": "kych.5578@aliyun.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lichao@xiaoxiaotong.org@10.185.1.95","online":true,"nickname": "李超","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"qinxianghua@10.185.1.95","online":true,"nickname": "秦向华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"majianwei@10.185.1.95","online":true,"nickname": "马建维","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"342468753@qq.com@10.185.1.95","online":true,"nickname": "宋文","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"tslkywxy@163.com@10.185.1.95","online":true,"nickname": "王晓英","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"chenlj@10.185.1.95","online":true,"nickname": "chenlj","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"15010940105@qq.com@10.185.1.95","online":true,"nickname": "15010940105@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lypbox@126.com@10.185.1.95","online":true,"nickname": "lypbox@126.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13641344521@10.185.1.95","online":true,"nickname": "陈立军","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"houch@caf.ac.cn@10.185.1.95","online":true,"nickname": "侯春华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13466389651@163.com@10.185.1.95","online":true,"nickname": "张依雯","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"luckylu2001@sina.com@10.185.1.95","online":true,"nickname": "卢宇飏","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hanjing013@126.com@10.185.1.95","online":true,"nickname": "韩静华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"ynslytzn@163.com@10.185.1.95","online":true,"nickname": "赵南","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13693647470@163.com@10.185.1.95","online":true,"nickname": "13693647470@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hcz3736@sina.com@10.185.1.95","online":true,"nickname": "黄存忠","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wzyang2004@126.com@10.185.1.95","online":true,"nickname": "杨文忠","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"asdddf@xiaoxiaotong.org@10.185.1.95","online":true,"nickname": "asdddf@xiaoxiaotong.org","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"newsedit@10.185.1.95","online":true,"nickname": "新闻编辑","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zxy8448@126.com@10.185.1.95","online":true,"nickname": "张新宇","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"唐红英@10.185.1.95","online":true,"nickname": "唐红英","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"754574003@qq.com@10.185.1.95","online":true,"nickname": "敏","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"596005187@qq.com@10.185.1.95","online":true,"nickname": "596005187@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"issemmaweff-6162@yopmail.com@10.185.1.95","online":true,"nickname": "issemmaweff-6162@yopmail.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wetlands108@126.com@10.185.1.95","online":true,"nickname": "崔丽娟","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13513010178@qq.com@10.185.1.95","online":true,"nickname": "13513010178@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"qinxh9822@sina.com@10.185.1.95","online":true,"nickname": "qinxh9822@sina.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"cissyo@vip.qq.com@10.185.1.95","online":true,"nickname": "cissyo@vip.qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zjslxh2013@163.com@10.185.1.95","online":true,"nickname": "徐翠霞","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lichao1@10.185.1.95","online":true,"nickname": "李超1","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"xmkang@ucas.ac.cn@10.185.1.95","online":true,"nickname": "xmkang@ucas.ac.cn","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yitousuanwf@163.com@10.185.1.95","online":true,"nickname": "yitousuanwf@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"llxwhq@163.com@10.185.1.95","online":true,"nickname": "llxwhq@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"101985312@qq.com@10.185.1.95","online":true,"nickname": "李秀雷","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"skywalker2001@126.com@10.185.1.95","online":true,"nickname": "张宇轩","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lxixl@163.com@10.185.1.95","online":true,"nickname": "佟庆","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13641241396@10.185.1.95","online":true,"nickname": "13641241396","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yulisbz@163.com@10.185.1.95","online":true,"nickname": "吕玉里","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"mhhogress@163.com@10.185.1.95","online":true,"nickname": "李蕴峰","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"summercamp@10.185.1.95","online":true,"nickname": "夏令营管理员","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"280994028@qq.com@10.185.1.95","online":true,"nickname": "戴红光","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yubiao@10.185.1.95","online":true,"nickname": "于彪","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"15776892757@10.185.1.95","online":true,"nickname": "15776892757","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"xinjingdi@163.com@10.185.1.95","online":true,"nickname": "xinjingdi@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"fjdgc@163.com@10.185.1.95","online":true,"nickname": "丁国昌","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yabkpxj@163.com@10.185.1.95","online":true,"nickname": "陈远书","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1736477937@qq.com@10.185.1.95","online":true,"nickname": "张颖宜","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"2637367459@qq.com@10.185.1.95","online":true,"nickname": "2637367459@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"单长勇@10.185.1.95","online":true,"nickname": "单长勇","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"jxstzx@sina.com@10.185.1.95","online":true,"nickname": "刘飒","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1819553719@qq.com@10.185.1.95","online":true,"nickname": "1819553719@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"shaanxilxh@163.com@10.185.1.95","online":true,"nickname": "惠宁","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"162980@qq.com@10.185.1.95","online":true,"nickname": "李超","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"xzy1974@126.com@10.185.1.95","online":true,"nickname": "xzy1974@126.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"593251135@qq.com@10.185.1.95","online":true,"nickname": "新疆艾比湖湿地国家级自然保护区","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"rainy","online":true,"nickname": "","imgurl":"images/user-img.png","job": "局长" ,"group":"","msgcount":"0"},{"jid":"834365484@qq.com@10.185.1.95","online":true,"nickname": "张荣贵","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"slxh_693@163.com@10.185.1.95","online":true,"nickname": "slxh_693@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zouwentao1982@126.com@10.185.1.95","online":true,"nickname": "zouwentao1982@126.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"shihua19870327@126.com@10.185.1.95","online":true,"nickname": "石华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"kjgfri@163.com@10.185.1.95","online":true,"nickname": "潘文","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"liberisa@163.com@10.185.1.95","online":true,"nickname": "liberisa@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"929884177@qq.com@10.185.1.95","online":true,"nickname": "李玲","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"69787675@qq.com@10.185.1.95","online":true,"nickname": "陈艺","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"39600349@qq.com@10.185.1.95","online":true,"nickname": "武阿莉","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"18010028329@10.185.1.95","online":true,"nickname": "李平","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hadenglong@163.com@10.185.1.95","online":true,"nickname": "哈登龙","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"jxslxh1979@163.com@10.185.1.95","online":true,"nickname": "王锦华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"吕光辉@10.185.1.95","online":true,"nickname": "吕光辉","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"test33@10.185.1.95","online":true,"nickname": "123123","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13520002199@10.185.1.95","online":true,"nickname": "13520002199","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"eyxtsh@sohu.com@10.185.1.95","online":true,"nickname": "夏同胜","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1512589500@qq.com@10.185.1.95","online":true,"nickname": "1512589500@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"3088627516@qq.com@10.185.1.95","online":true,"nickname": "戴红光","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"342675091@qq.com@10.185.1.95","online":true,"nickname": "342675091@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"ztljkjk@163.com@10.185.1.95","online":true,"nickname": "ztljkjk@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"412203314@qq.com@10.185.1.95","online":true,"nickname": "王齐瑞","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"15270224272@qq.com@10.185.1.95","online":true,"nickname": "15270224272@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hhdingfeng@163.com@10.185.1.95","online":true,"nickname": "丁峰","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"liping_198910@163.com@10.185.1.95","online":true,"nickname": "李平","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13521087197@10.185.1.95","online":true,"nickname": "13521087197","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"3147893717@qq.com@10.185.1.95","online":true,"nickname": "王奕博","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"491875557@qq.com@10.185.1.95","online":true,"nickname": "491875557@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"dzcha@126.com@10.185.1.95","online":true,"nickname": "陈淮安","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"15233120729@10.185.1.95","online":true,"nickname": "张彪","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"15010940105@163.com@10.185.1.95","online":true,"nickname": "李梓琛","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"168848091@qq.com@10.185.1.95","online":true,"nickname": "张轩","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"2392089939@qq.com@10.185.1.95","online":true,"nickname": "李文显","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"厉建祝@10.185.1.95","online":true,"nickname": "厉建祝","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1409571132@qq.com@10.185.1.95","online":true,"nickname": "1409571132@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"ueslear@outlook.com@10.185.1.95","online":true,"nickname": "ueslear@outlook.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"316654532@qq.com@10.185.1.95","online":true,"nickname": "黎薇","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"ylzx101@163.com@10.185.1.95","online":true,"nickname": "ylzx101@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hbulichao@qq.com@10.185.1.95","online":true,"nickname": "李超","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13810752572@10.185.1.95","online":true,"nickname": "13810752572","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"luojianisi@126.com@10.185.1.95","online":true,"nickname": "雒静","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"184027594@qq.com@10.185.1.95","online":true,"nickname": "张华林","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zpzhidong@163.com@10.185.1.95","online":true,"nickname": "蒋志东","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"an-f@163.com@10.185.1.95","online":true,"nickname": "an-f@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"test1@10.185.1.95","online":true,"nickname": "test","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"cwy_forest@163.com@10.185.1.95","online":true,"nickname": "cwy_forest@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"uslear@outlook.com@10.185.1.95","online":true,"nickname": "秋若水","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"fjdgc@fafu.edu.cn@10.185.1.95","online":true,"nickname": "fjdgc@fafu.edu.cn","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lnslxh@126.com@10.185.1.95","online":true,"nickname": "吴杨","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhangbiao@10.185.1.95","online":true,"nickname": "张彪","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"test2@10.185.1.95","online":true,"nickname": "sad","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"a84238861@126.com@10.185.1.95","online":true,"nickname": "梦梦","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"test3@10.185.1.95","online":true,"nickname": "123123","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"52897562@qq.com@10.185.1.95","online":true,"nickname": "李超Test","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"kaolakaola1987@163.com@10.185.1.95","online":true,"nickname": "崔丽娟","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yongbowu@njfu.com.cn@10.185.1.95","online":true,"nickname": "吴永波","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1656533774@qq.com@10.185.1.95","online":true,"nickname": "1656533774@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lzf142857@126.com@10.185.1.95","online":true,"nickname": "刘子枫","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1759125411@qq.com@10.185.1.95","online":true,"nickname": "李坤译","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"gzritf@126.com@10.185.1.95","online":true,"nickname": "宋湘豫","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"沈贵@10.185.1.95","online":true,"nickname": "沈贵","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1365057099@qq.com@10.185.1.95","online":true,"nickname": "韦荣华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lhlxh7078@163.com@10.185.1.95","online":true,"nickname": "漯河市林学会","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"chenlijun@xiaoxiaotong.org@10.185.1.95","online":true,"nickname": "chenlijun@xiaoxiaotong.org","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"coco227@163.com@10.185.1.95","online":true,"nickname": "肖景晨","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lidongsheng0827@sina.com@10.185.1.95","online":true,"nickname": "lidongsheng0827@sina.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"18910736768@10.185.1.95","online":true,"nickname": "18910736768","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"sichanlandag@gmail.com@10.185.1.95","online":true,"nickname": "sichanlandag@gmail.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"28110073362@qq.com@10.185.1.95","online":true,"nickname": "28110073362@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"877566062@qq.com@10.185.1.95","online":true,"nickname": "877566062@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"kjc@nufu.edu.cn@10.185.1.95","online":true,"nickname": "kjc@nufu.edu.cn","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1196267546@qq.com@10.185.1.95","online":true,"nickname": "豆祥贺","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"56285088@qq.com@10.185.1.95","online":true,"nickname": "张彩霞","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"gxlxhui@163.com@10.185.1.95","online":true,"nickname": "周卫玲","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"kejichuluoht@126.com@10.185.1.95","online":true,"nickname": "罗洪涛","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"2395994049@qq.com@10.185.1.95","online":true,"nickname": "王申","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"553952856@qq.com@10.185.1.95","online":true,"nickname": "方执熙","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"412622549@qq.com@10.185.1.95","online":true,"nickname": "陈红岩","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"newsedit2@10.185.1.95","online":true,"nickname": "新闻编辑","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"ye0033@163.com@10.185.1.95","online":true,"nickname": "叶胜忠","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"chenlijun@cyscc.org@10.185.1.95","online":true,"nickname": "陈立军","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"icenwong@126.com@10.185.1.95","online":true,"nickname": "王怡径然","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"853488156@qq.com@10.185.1.95","online":true,"nickname": "853488156@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"452633725@qq.com@10.185.1.95","online":true,"nickname": "452633725@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"bjfs@bjfs.org.cn@10.185.1.95","online":true,"nickname": "邵丹","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"mark_niu2005@126.com@10.185.1.95","online":true,"nickname": "牛晓霆","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1512589500@163.com@10.185.1.95","online":true,"nickname": "1512589500@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhangkai360973@163.com@10.185.1.95","online":true,"nickname": "张凯","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1848858870@qq.com@10.185.1.95","online":true,"nickname": "1848858870@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wushichu2000@163.com@10.185.1.95","online":true,"nickname": "吴世初","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13868141030@139.com@10.185.1.95","online":true,"nickname": "谢锦忠","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"573469309@qq.com@10.185.1.95","online":true,"nickname": "舒宏敏","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"王直华@10.185.1.95","online":true,"nickname": "王直华","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"abhkyxj@sina.cn@10.185.1.95","online":true,"nickname": "新疆艾比湖湿地国家级自然保护区","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"gjsdhr@163.com@10.185.1.95","online":true,"nickname": "gjsdhr@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"fjslxh@126.com@10.185.1.95","online":true,"nickname": "林庆源","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1824646513@qq.com@10.185.1.95","online":true,"nickname": "邱梓峰","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1527022427@qq.com@10.185.1.95","online":true,"nickname": "1527022427@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"805401583@qq.com@10.185.1.95","online":true,"nickname": "谷阳","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"hjian@caf.ac.cn@10.185.1.95","online":true,"nickname": "hjian@caf.ac.cn","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"lichao2@10.185.1.95","online":true,"nickname": "李超2","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wangkang@beijingbg.com@10.185.1.95","online":true,"nickname": "王康","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"281974544@qq.com@10.185.1.95","online":true,"nickname": "281974544@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"13653260464@qq.com@10.185.1.95","online":true,"nickname": "13653260464@qq.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"1403565844@qq.com@10.185.1.95","online":true,"nickname": "郭昊","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"sunkai_bj@qq.com@10.185.1.95","online":true,"nickname": "孙锴","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wangmin@xiaoxiaotong.org@10.185.1.95","online":true,"nickname": "王敏","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"642275303@qq.com@10.185.1.95","online":true,"nickname": "仲浩","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"gyt87914402@163.com@10.185.1.95","online":true,"nickname": "甘桂芳","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"cvbfgs@qq.com@10.185.1.95","online":true,"nickname": "范一安","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"bjlydxzh@163.com@10.185.1.95","online":true,"nickname": "张骅","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"mengqingwu500@126.com@10.185.1.95","online":true,"nickname": "孟庆武","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"yeqiaolincom@163.com@10.185.1.95","online":true,"nickname": "业巧林","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"csf999@sina.com@10.185.1.95","online":true,"nickname": "郭建斌","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"wangrui102@163.com@10.185.1.95","online":true,"nickname": "王瑞","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"zhangangang2013@163.com@10.185.1.95","online":true,"nickname": "张岗岗","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"18510700201@10.185.1.95","online":true,"nickname": "连晓鹏","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"},{"jid":"cbmawangjunjie@163.com@10.185.1.95","online":true,"nickname": "cbmawangjunjie@163.com","imgurl":"images/user-img.png","job": "局长" ,"group":"中国林学会","msgcount":"0"}];
// console.log(test1.length);
// for(var i=0; i<test1.length; i++){
//     nowFriendsDate.AddFriendItem(test1[i]);
// }


ReactDOM.render(
    React.createElement(FriendSection,{FriendDate:nowFriendsDate.FriendList}),
    document.getElementById("friend-list")
);