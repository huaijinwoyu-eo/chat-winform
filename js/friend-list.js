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
            if(this.props.FriendDate[i].Online || this.props.FriendDate[i].MsgCount>0){
                row.unshift(
                    React.createElement(FriendItem,{
                        onlineTag:this.props.FriendDate[i].Online,
                        imgUrl:this.props.FriendDate[i].ImgUrl,
                        key:this.props.FriendDate[i].Jid,
                        jid:this.props.FriendDate[i].Jid,
                        name:this.props.FriendDate[i].UserName,
                        job:this.props.FriendDate[i].Job,
                        UnreadMessageLength:this.props.FriendDate[i].MsgCount,
                        group:this.props.friendTitle
                    })
                )
            }else {
                row.push(
                    React.createElement(FriendItem,{
                        onlineTag:this.props.FriendDate[i].Online,
                        imgUrl:this.props.FriendDate[i].ImgUrl,
                        key:this.props.FriendDate[i].Jid,
                        jid:this.props.FriendDate[i].Jid,
                        name:this.props.FriendDate[i].UserName,
                        job:this.props.FriendDate[i].Job,
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
            if(CurrentJid){
                if(!localStorage.getItem("HistoryList")){
                    var CurrentObj = {};
                    CurrentObj[CurrentJid] = [];
                    localStorage.setItem("HistoryList",JSON.stringify(CurrentObj));
                }
                var CurrentObjT = JSON.parse(localStorage.getItem("HistoryList"));
                for(var i=0; i<CurrentObjT[CurrentJid].length; i++){
                    if(CurrentObjT[CurrentJid][i].jid == this.props.jid){
                        /*删除该项之后重新添加。*/
                        flage = true;
                        CurrentObjT[CurrentJid].splice(i,1);
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
            }
            /*重新渲染搜索组件*/
            ReactDOM.render(
                React.createElement(Search,null),
                document.getElementById("Search")
            );
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
                if(this.props.FriendDate[i].Users[j].Online){
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
            React.createElement("div",{className:"SFL"},
                React.createElement("div",{className:"listbar"},
                    React.createElement("div",{className:"list-left"}),
                    React.createElement("div",{className:"list-scrollbar"}),
                    React.createElement("div",{className:"list-right"})
                ),
                React.createElement("div",{className:"inner"},Row)
            )
        );
    },
    componentDidUpdate:function () {
        reset(".SFL",30);
        $(".friend-title").off("click").on("click",function(){
            $(this).next(".friend-list").slideToggle(function () {
                reset(".SFL",30);
            });
            if($(this).find("span[class*=icon-]").attr("class")=="icon-caret-down"){
                $(this).find("span[class*=icon-]").removeClass("icon-caret-down").addClass("icon-caret-right");
            }else {
                $(this).find("span[class*=icon-]").removeClass("icon-caret-right").addClass("icon-caret-down");
            }
        });
    },
    componentDidMount:function () {
        reset(".SFL",30);
        $(".tab_group a[name=tab_2]").off("click").on("click",function (event) {
            event.preventDefault();
            var active = $(this).attr("name");
            $(this).parents(".tab_group").find("a[name*=tab_]").removeClass("cur");
            $(this).addClass("cur");
            $(this).parents(".tab_group").find("[class*=tab_]").hide();
            $(this).parents(".tab_group").find("." + active).slideDown(function () {
                reset(".SFL",30);
            });
        });
    }

});
/////////////////////////////////////////////////////////////////////////////////////////
/*搜索部分*/
/*搜索组件（总）*/
var Search = React.createClass({
    displayName:"Search",
    getInitialState:function () {
        return{
            searchText:"",
            HistoryList:[],
            FriendList:[],
            display:[],
            TipIcon:"icon-search",
            TipText:"点击进行搜索"
        }
    },
    HandleChange:function (event) {
        this.setState({
            searchText:event.target.value
        });
        var Temp = [];
        if(event.target.value){
            if(this.state.FriendList){
                for(var i=0; i<this.state.FriendList.length; i++){
                    var String = this.state.FriendList[i].UserName;
                    if(String){
                        if(String.indexOf(event.target.value)!=-1){
                            Temp.push(this.state.FriendList[i]);
                        }
                    }
                }
                this.setState({
                    display:Temp
                });
            }
        }else {
            this.setState({
                display:this.state.HistoryList
            });
        }
    },
    HandleFocus:function () {
        $("#Search .ResultList").slideDown(function () {
            reset(".ResultList",30);
        });
        this.setState({
            TipIcon:"icon-remove-sign",
            TipText:"点击关闭搜索",
        })
    },
    HandleClick:function () {
        if(this.state.TipIcon == "icon-search"){
            this.setState({
                TipIcon:"icon-remove-sign",
                TipText:"点击关闭搜索"
            },function () {
                $("#Search .ResultList").slideDown(function () {
                    reset(".ResultList",30);
                });
            });
        }else {
            this.setState({
                TipIcon:"icon-search",
                TipText:"点击进行搜索"
            },function () {
                $("#Search .ResultList").slideUp(function () {
                    reset(".ResultList",30);
                });
            });
        }
    },
    render:function () {
        return(
            React.createElement("div",null,
                React.createElement("input",{
                    type:"text",
                    className:"fl",
                    placeholder:"搜索联系人、群",
                    value:this.state.searchText,
                    onChange:this.HandleChange,
                    onFocus:this.HandleFocus
                }),
                React.createElement("span",{
                    className:this.state.TipIcon,
                    title:this.state.TipText,
                    onClick:this.HandleClick
                }),
                React.createElement(ResultList,{DisplayData:this.state.display})
            )
        )
    },
    componentWillReceiveProps:function (nextporps) {
        var CurrentJid = localStorage.getItem("Jid");
        if(CurrentJid){
            if(!localStorage.getItem("HistoryList")){
                var CurrentObj = {};
                CurrentObj[CurrentJid] = [];
                localStorage.setItem("HistoryList",JSON.stringify(CurrentObj));
            }
            this.setState({
                HistoryList:JSON.parse(localStorage.getItem("HistoryList"))[CurrentJid],
                display:JSON.parse(localStorage.getItem("HistoryList"))[CurrentJid]
            });
        }
        /*获取搜索内容*/
        if(nextporps.SearchContent){
            var Temp = nextporps.SearchContent;
            var ArrayTemp = [];
            for(var i=0; i<Temp.length; i++){
                Array.prototype.push.apply(ArrayTemp,Temp[i].Users);
            }
            this.setState({
                FriendList:ArrayTemp
            });
        }
    },
    componentDidMount:function () {
        var CurrentJid = localStorage.getItem("Jid");
        if(CurrentJid){
            if(!localStorage.getItem("HistoryList")){
                var CurrentObj = {};
                CurrentObj[CurrentJid] = [];
                localStorage.setItem("HistoryList",JSON.stringify(CurrentObj));
            }
            this.setState({
                HistoryList:JSON.parse(localStorage.getItem("HistoryList"))[CurrentJid],
                display:JSON.parse(localStorage.getItem("HistoryList"))[CurrentJid]
            });
        }
        /*获取搜索内容*/
        var Temp = this.props.SearchContent;
        var ArrayTemp = [];
        for(var i=0; i<Temp.length; i++){
            Array.prototype.push.apply(ArrayTemp,Temp[i].Users);
        }
        this.setState({
            FriendList:ArrayTemp
        });
    }
});
/*搜索组件内容展示列表，输入框下边显示。*/
var ResultList = React.createClass({
    displayName:"ResultList",
    render:function () {
        var DisplayArray = [];

        for(var i=0 ; i<this.props.DisplayData.length; i++){
            DisplayArray.push(
                React.createElement(ListItem,{
                    onlineTag:this.props.DisplayData[i].onlineTag || this.props.DisplayData[i].Online,
                    imgUrl:this.props.DisplayData[i].imgUrl || this.props.DisplayData[i].ImgUrl,
                    jid:this.props.DisplayData[i].jid || this.props.DisplayData[i].Jid,
                    name:this.props.DisplayData[i].name || this.props.DisplayData[i].UserName,
                    job:this.props.DisplayData[i].job || this.props.DisplayData[i].Job,
                    group:this.props.DisplayData[i].group || ""
                })
            );
        }


        return(
            React.createElement("div",{className:"ResultList"},
                React.createElement("div",{className:"listbar"},
                    React.createElement("div",{className:"list-left"}),
                    React.createElement("div",{className:"list-scrollbar"}),
                    React.createElement("div",{className:"list-right"})
                ),
                React.createElement("div",{className:"inner"},DisplayArray)
            )
        )
    }
});
/*搜索列表单元*/
var ListItem = React.createClass(({
    displayName:"ListItem",
    render:function () {
        return(
            React.createElement("div",{
                    className:"ListItem clearfix",
                    onDoubleClick:this.HandleClick
            },
                React.createElement("div",{className:"img"},
                    React.createElement("img",{src:this.props.imgUrl})
                ),
                React.createElement("div",{className:"info"},
                    React.createElement("span",{className:"name"},this.props.name),
                    React.createElement("span",{className:"status"},this.props.job)
                )
            )
        )
    },
    HandleClick:function () {
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
    }
}));
/////////////////////////////////////////////////////////////////////////////////////////
//获取数据。
function FriendsDate(){
    this.FriendList = [];
    this.getFriendList = function(data){



        // var StringData = JSON.parse(data);
        // this.FriendList = StringData.Data;
        this.FriendList = data.Data;



        this.propertyChange();
    };
    this.Tag = true;
    this.AddFriendItem = function (data) {
        var data;
        data = JSON.parse(data);
        for(var i=0; i<this.FriendList.length; i++){
            if(data.group == this.FriendList[i].GroupName){
                for(var j=0; j<this.FriendList[i].Users.length; j++){
                    if(this.FriendList[i].Users[j].Jid == data.jid){
                        if(this.FriendList[i].Users[j].MsgCount == data.msgcount){
                            this.FriendList[i].Users[j].Jid = data.jid;
                            this.FriendList[i].Users[j].Online = data.online;
                            this.FriendList[i].Users[j].UserName = data.nickname;
                            this.FriendList[i].Users[j].ImgUrl = data.imgurl;
                            this.FriendList[i].Users[j].Job = data.job;
                            this.FriendList[i].Users[j].MsgCount = data.msgcount;
                            this.Tag = false;
                        }else {
                            this.Tag = true;
                            this.FriendList[i].Users.splice(j,1);
                        }
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
                    }
                }
                if(this.Tag){
                    this.FriendList[i].Users.unshift({
                        Jid: data.jid,
                        Online: data.online,
                        UserName: data.nickname,
                        ImgUrl: data.imgurl,
                        Job: data.job,
                        MsgCount:data.msgcount
                    });
                }
                this.propertyChange();
                return;
            }
        }
        this.FriendList.push({
            GroupName:data.group,
            Users:[{
                Jid: data.jid,
                Online: data.online,
                UserName: data.nickname,
                ImgUrl: data.imgurl,
                Job: data.job,
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
        ReactDOM.render(
            React.createElement(Search,{SearchContent:this.FriendList}),
            document.getElementById("Search")
        );
    }
}

var nowFriendsDate = new FriendsDate();



ReactDOM.render(
    React.createElement(FriendSection,{FriendDate:nowFriendsDate.FriendList}),
    document.getElementById("friend-list")
);
ReactDOM.render(
    React.createElement(Search,{SearchContent:nowFriendsDate.FriendList}),
    document.getElementById("Search")
);



