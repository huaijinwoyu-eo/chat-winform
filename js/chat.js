//聊天窗口对象信息组件（聊天对象）。
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
//////////////////////////////////////////////////////////////////////////
/*获取当前时间*/
function getNowDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var string = year+"-"+month+"-"+day+" "+hours+":"+minutes;
    return string;
}
//////////////////////////////////////////////////////////////////////////
//聊天信息组件（消息列表以及消息发送组件）
var ChatFormAndMessage = React.createClass({
    getInitialState:function(){
        return{
            data:this.props.data
        }
    },
    HandleSubmit:function(item){
        var addItem = {};
        addItem.issend = true;
        addItem.content = item;
        addItem.date = getNowDate();
        var MessageData = this.state.data;
        MessageData.push(addItem);
        this.setState({
            data:MessageData
        },function () {
            addItem = null;
            MessageData = null;
        });
    },
    render:function(){
        return(
            React.createElement("div",{},
                React.createElement(ChatBox,{data:this.state.data}),
                React.createElement(ChatInput,{SubmitMethod:this.HandleSubmit})
            )
        )
    }
});
/*消息列表*/
var ChatBox = React.createClass({
    componentDidUpdate:function(){
        $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight);
    },
    render:function(){
        var newDate =[];
        for(var i =0; i<this.props.data.length; i++){
            newDate.push(
                React.createElement(ChatMessage,{key:this.props.data[i].key,message:this.props.data[i]})
            )
        }
        return(
            React.createElement("div",{className:"chat-content"},newDate)
        )
    }
});
/*消息列表单元*/
var ChatMessage = React.createClass({
    render:function(){
        if(this.props.message.issend){
            return(
                React.createElement("div",{className:"chat-item clearfix"},
                    React.createElement("div",{className:"chat-my"},
                        React.createElement("div",{className:"message-author"},
                            React.createElement("span",{className:"yourself"},"我"),
                            React.createElement("span",{className:"time"},this.props.message.date)
                        ),
                        React.createElement("div",null,this.props.message.content)
                    )
                )
            )
        }else {
            return(
                React.createElement("div",{className:"chat-item clearfix"},
                    React.createElement("div",{className:"chat-other"},
                        React.createElement("div",{className:"message-author"},
                            React.createElement("span",{className:"time"},this.props.message.date),
                            React.createElement("span",{className:"yourself"},this.props.message.nickname)

                        ),
                        React.createElement("div",null,this.props.message.content)
                    )
                )
            )
        }
    }
});
/*聊天输入框部分组件*/
var ChatInput = React.createClass({
    render:function(){
        return(
            React.createElement("div",{className:"chat-input"},
                React.createElement(ChatFunctionItem),
                React.createElement(ChatSubmit,{SubmitMethod:this.props.SubmitMethod})
            )
        )
    }
});
/*聊天辅助功能，包括字体，表情等。*/
var ChatFunctionItem = React.createClass({
    render:function(){
        return(
            React.createElement("div",{className:"clearfix"},
                React.createElement("ul",{className:"fl"},
                    React.createElement("li",{className:"function-item w20"},
                        React.createElement("span",{className:"icon-font"})
                    ),
                    React.createElement("li",{className:"function-item w20"},
                        React.createElement("span",{className:"icon-face"})
                    ),
                    React.createElement("li",{className:"function-item w20"},
                        React.createElement("span",{className:"icon-picture"})
                    )
                ),
                React.createElement("div",{className:"fr message-log w20"},
                    React.createElement("span",{className:"icon-time"}),
                    React.createElement("a",{href:"#"},"消息记录"),
                    React.createElement("span",{className:"icon-caret-down"})
                )
            )
        )
    }
});
/*输入框以及发送按钮。*/
var ChatSubmit = React.createClass({
    getInitialState:function(){
        return{
            text:""
        }
    },
    HandleSubmit:function(event){
        event.preventDefault();
        if(this.state.text){
            this.props.SubmitMethod(this.state.text);
            /*消息发送*/
            window.external.API_SendMsg(this.state.text);
            this.setState({
                text:""
            });
        }

    },
    HandleChange:function(event){
        this.setState({
            text:event.target.value
        })
    },
    render:function(){
        return(
            React.createElement("form",{className:"submit-content rel",onSubmit:this.HandleSubmit},
                React.createElement("textarea",{className:"submit-input",value:this.state.text,onChange:this.HandleChange}),
                React.createElement("button",{type:"submit",className:"submit-button abs"},"发送")
            )
        )
    }
});

/*聊天对象信息设置*/
function SetUserInfo() {
    this.name = "";
    this.imgurl = "";
    this.job = "";
    this.setUserInfo = function (data) {
        var ObjectData = JSON.parse(data);
        this.name = ObjectData.user.nickname;
        this.imgurl = ObjectData.user.imgurl;
        this.job = ObjectData.user.job;
        this.propertyChange();
    };
    this.propertyChange = function () {
        ReactDOM.render(
            React.createElement(ChatObjInfo,{
                imgUrl:this.imgurl,
                name:this.name,
                job:this.job
            }),
            document.getElementById("chat-object")
        );
    }
}
var ChatObject = new SetUserInfo();
ReactDOM.render(
    React.createElement(ChatObjInfo,{
        imgUrl:ChatObject.imgurl,
        name:ChatObject.name,
        job:ChatObject.job
    }),
    document.getElementById("chat-object")
);

/*聊天消息添加*/
function AddMsg() {
    this.msg = [];
    this.AddMsg = function (data) {
        var ObjectData = JSON.parse(data);
        ObjectData.msg.key = Math.random(new Date())*1000;
        this.msg.push(ObjectData.msg);
        this.propertyChange();
    };
    this.propertyChange = function () {
        ReactDOM.render(
            React.createElement(ChatFormAndMessage,{data:this.msg}),
            document.getElementById("chat-content")
        )
    }
}
var AddMessage = new AddMsg();
ReactDOM.render(
    React.createElement(ChatFormAndMessage,{data:AddMessage.msg}),
    document.getElementById("chat-content")
);