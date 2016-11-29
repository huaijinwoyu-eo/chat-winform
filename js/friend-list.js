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
        var OnlineNumber = 0;
        for(var i=0; i<this.props.FriendDate.length; i++){
            if(this.props.FriendDate[i].online){
                OnlineNumber++;
                row.unshift(
                    React.createElement(FriendItem,{
                        onlineTag:this.props.FriendDate[i].online,
                        imgUrl:this.props.FriendDate[i].imgUrl,
                        jid:this.props.FriendDate[i].jid,
                        name:this.props.FriendDate[i].username,
                        job:this.props.FriendDate[i].job
                    })
                )
            }else {
                row.push(
                    React.createElement(FriendItem,{
                        onlineTag:this.props.FriendDate[i].online,
                        imgUrl:this.props.FriendDate[i].imgUrl,
                        jid:this.props.FriendDate[i].jid,
                        name:this.props.FriendDate[i].username,
                        job:this.props.FriendDate[i].job
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
    render:function(){
        return(
            React.createElement("li",{className:this.props.onlineTag ? "online-item" :"",onDoubleClick:this.HandleDoubleClick},
                React.createElement("a",{
                    href:"./chat-tab.html?"+this.props.jid+"&"+this.props.imgUrl+"&"+this.props.name+"&"+this.props.job,
                    target:"_black"
                },
                    React.createElement("img",{src:this.props.imgUrl,className:"db fl"}),
                    React.createElement("div",{className:"info"},
                        React.createElement("div",{className:"name"},this.props.name),
                        React.createElement("div",{className:"job"},this.props.job)
                    )
                )
            )
        );
    },
    HandleDoubleClick:function () {

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
                    FriendDate:this.props.FriendDate[i].Users
                })
            );
        }
        return(
            React.createElement("div",{},Row)
        );
    }

});





/*聊天历史纪录列表*/
var FriendListOfHistory = React.createClass({
    displayName:"FriendListOfHistory",
    render:function () {
        return(
            React.createElement("ul",{className:"history-list"})
        )
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
            React.createElement("li",{className:this.state.UnreadMessageLength ? "has-message" :""},
                React.createElement("a",{className:"db"},
                    React.createElement("img",{className:"db fl",src:this.props.UserImg}),
                    React.createElement("div",{className:"info"},
                        React.createElement("div",{className:"name"},this.props.UserName),
                        React.createElement("div",{className:"job"},this.props.job)
                    ),
                    React.createElement("div",{className:"abs message"},this.state.UnreadMessageLength)
                )
            )
        )
    }
});







//获取数据。
function FriendsDate(){
    this.FriendList = [];
    this.getFriendList = function(data){
        this.FriendList = data.data;
        this.propertyChange();
    };
    this.propertyChange = function(){
        ReactDOM.render(
            React.createElement(FriendSection,{FriendDate:this.FriendList}),
            document.getElementById("friend-list")
        );
    }
}
var TestDate = {
    "data": [
        {
            "GroupID": 1,
            "GroupName": "小学同学",
            "Users": [
                {
                    "jid": "15010206358@10.185.1.95",
                    "online": true,
                    "username": "15010206358",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                },
                {
                    "jid": "刘亚东@10.185.1.95",
                    "online": true,
                    "username": "刘亚东",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                },
                {
                    "jid": "kjc\\40nefu.edu.cn@10.185.1.95",
                    "online": false,
                    "username": "范金凤",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                },
                {
                    "jid": "liu_77\\40163.com@10.185.1.95",
                    "online": false,
                    "username": "刘凤利",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                }
            ]
        },
        {
            "GroupID": 2,
            "GroupName": "中学同学",
            "Users": [
                {
                    "jid": "15010206358@10.185.1.95",
                    "online": false,
                    "username": "15010206358",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                },
                {
                    "jid": "刘亚东@10.185.1.95",
                    "online": true,
                    "username": "刘亚东",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                },
                {
                    "jid": "kjc\\40nefu.edu.cn@10.185.1.95",
                    "online": false,
                    "username": "范金凤",
                    "imgUrl": "images/user-img.png",
                    "job": "局长"
                }
            ]
        }
    ]
};



var nowFriendsDate = new FriendsDate();
nowFriendsDate.getFriendList(TestDate);
ReactDOM.render(
    React.createElement(FriendSection,{FriendDate:nowFriendsDate.FriendList}),
    document.getElementById("friend-list")
);

