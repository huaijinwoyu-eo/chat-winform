/*聊天历史纪录列表*/
var FriendListOfHistory = React.createClass({
    displayName:"FriendListOfHistory",
    render:function () {
        /*临时数据*/
        var Temp = [];
        var CurrentJid = localStorage.getItem("Jid");
        if(localStorage.getItem("HistoryList")){
            var HistoryList = JSON.parse(localStorage.getItem("HistoryList"));
            if(!HistoryList[CurrentJid]){
                HistoryList[CurrentJid] = [];
            }
            for(var i=0; i<HistoryList[CurrentJid].length; i++){
                if(HistoryList[CurrentJid][i].NewOne){
                    Temp.unshift(
                        React.createElement(FriendListOfHistoryItem,{
                            onlineTag:HistoryList[CurrentJid][i].onlineTag,
                            imgUrl:HistoryList[CurrentJid][i].imgUrl,
                            key:HistoryList[CurrentJid][i].jid,
                            jid:HistoryList[CurrentJid][i].jid,
                            name:HistoryList[CurrentJid][i].name,
                            job:HistoryList[CurrentJid][i].job,
                            UnreadMessageLength:HistoryList[CurrentJid][i].UnreadMessageLength,
                            group:HistoryList[CurrentJid][i].group
                        })
                    );
                }
                Temp.push(
                    React.createElement(FriendListOfHistoryItem,{
                        onlineTag:HistoryList[CurrentJid][i].onlineTag,
                        imgUrl:HistoryList[CurrentJid][i].imgUrl,
                        key:HistoryList[CurrentJid][i].jid,
                        jid:HistoryList[CurrentJid][i].jid,
                        name:HistoryList[CurrentJid][i].name,
                        job:HistoryList[CurrentJid][i].job,
                        UnreadMessageLength:HistoryList[CurrentJid][i].UnreadMessageLength,
                        group:HistoryList[CurrentJid][i].group
                    })
                );
            }
        }
        return(
            React.createElement("ul",{className:"history-list"},
                React.createElement("div",{className:"listbar"},
                    React.createElement("div",{className:"list-left"}),
                    React.createElement("div",{className:"list-scrollbar"}),
                    React.createElement("div",{className:"list-right"})
                ),
                React.createElement("div",{className:"inner"},Temp)
            )
        )
    },
    componentDidMount:function () {
        $(".tab_group").css("height", window.innerHeight - 177);
        $(".tab_group .list.tab_1").css("height", window.innerHeight - 177 - 35);
        $(window).resize(function () {
            $(".tab_group").css("height", window.innerHeight - 177);
            $(".tab_group .list.tab_1").css("height", window.innerHeight - 177 - 35);
        });
        reset(".history-list",30);
    },
    componentDidUpdate:function () {
        reset(".history-list",30);
    }
});
/*聊天历史纪录列表单元*/
var FriendListOfHistoryItem = React.createClass({
    displayName:"FriendListOfHistoryItem",
    getInitialState:function () {
        return{
            UnreadMessageLength:this.props.UnreadMessageLength
        }
    },
    render:function () {
        return(
            React.createElement("li",{className:this.state.UnreadMessageLength ? "has-message" :"",onDoubleClick:this.HandleDoubleClick},
                React.createElement("a",{className:"db"},
                    React.createElement("img",{className:"db fl",src:this.props.imgUrl}),
                    React.createElement("div",{className:"info"},
                        React.createElement("div",{className:"name"},this.props.name),
                        React.createElement("div",{className:"job"},this.props.job)
                    ),
                    React.createElement("div",{className:"abs message"},this.state.UnreadMessageLength>0 ? this.state.UnreadMessageLength :"")
                )
            )
        )
    },
    HandleDoubleClick:function () {
        /*打开聊天窗口*/
        window.external.API_OpenChatForm(JSON.stringify({
            "jid": this.props.jid,
            "online": this.props.onlineTag,
            "nickname": this.props.name,
            "imgurl": this.props.imgUrl,
            "job": this.props.job,
            "group": this.props.group,
        }));
        this.setState({
            UnreadMessageLength:""
        })
    }
});

$(".tab_group a[name=tab_1]").off("click").on("click",function (event) {
    event.preventDefault();
    var active = $(this).attr("name");
    $(this).parents(".tab_group").find("a[name*=tab_]").removeClass("cur");
    $(this).addClass("cur");
    $(this).parents(".tab_group").find("[class*=tab_]").hide();
    $(this).parents(".tab_group").find("." + active).slideDown(function () {
        ReactDOM.render(
            React.createElement(FriendListOfHistory),
            document.getElementById("FriendListOfHistory")
        );
        reset(".history-list",30);
    });
});

/*渲染*/
ReactDOM.render(
    React.createElement(FriendListOfHistory),
    document.getElementById("FriendListOfHistory")
);