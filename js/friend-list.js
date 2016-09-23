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
var FriendList = React.createClass({
    displayName:"FriendList",
    render:function(){
        var row = [];
        for(var i = 0; i<this.props.FriendDate.length;i++){
            if(this.props.FriendDate[i].online){
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
var FriendItem = React.createClass({
    displayName:"FriendItem",
    render:function(){
        return(
            React.createElement("li",{className:this.props.onlineTag ? "online-item" :""},
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
    }
});

var FriendSection = React.createClass({
    displayName:"FriendSection",
    render:function(){
        return(
            React.createElement("div",{},
                React.createElement("FriendTitle",{friendTitle:""})
            )
        );
    }

});
//获取数据。
function FriendsDate(){
    this.getFriendList = function(url){
        console.log("kaishi");
        this.date = "";
        $.ajax({
            url:url,
            async:false,
            type:"GET",
            dataType:"json",
            cache:false,
            success:function(data){
                this.date = data;
                ReactDOM.render(
                    React.createElement(FriendList,{FriendDate:data}),
                    document.getElementById("friend-list")
                );
            }.bind(this),
            error:function(error){
                console.log(error);
                alert("网络通讯阻塞，请稍后重试……")
            }
        });
        return this.date;
    };
}

var nowFriendsDate = new FriendsDate();
//console.log(nowFriendsDate.getFriendList("test.json"));
ReactDOM.render(
    React.createElement(FriendList,{FriendDate:nowFriendsDate.getFriendList("test.json")}),
    document.getElementById("friend-list")
);

