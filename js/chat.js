//聊天窗口对象信息组件。
var ChatObjInfo = React.createClass({
    render:function(){
        return(
            React.createElement("div",{className:"user-info clearfix",style:{marginTop:"-10px"}},
                React.createElement("div",{className:"img"},
                    React.createElement("img",{src:this.props.imgUrl})
                ),
                React.createElement("div",{className:"info"},
                    React.createElement("p",{className:"name dib"},this.props.name),
                    React.createElement("p",{className:"status"},
                        "("+this.props.job+")"
                    )
                )
            )
        )
    }
});
//聊天信息组件
var ChatMessage = React.createElement({
    render:function(){
        return(
            React.createElement("div",{className:"chat-item clearfix"},
                React.createElement("div",{className:this.props.type},
                    this.props.message
                )
            )
        )
    }
});
var href = window.location.search.slice(1).split("&");
ReactDOM.render(
    React.createElement(ChatObjInfo,{imgUrl:href[1],name:decodeURI(href[2]),job:decodeURI(href[3])}),
    document.getElementById("chat-object")
);