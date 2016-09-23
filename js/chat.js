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
var ChatFormAndMessage = React.createClass({
    getInitialState:function(){
        return{
            data:""
        }
    },
    HandleSubmit:function(item){
        var addItem = {};
        addItem.id = this.state.data.length+2;
        addItem.type="chat-my";
        addItem.message=item;
        var MessageData = this.state.data;
        MessageData.push(addItem);
        this.setState({
            data:MessageData
        })
    },
    render:function(){
        return(
            React.createElement("div",{},
                React.createElement(ChatBox,{data:this.state.data}),
                React.createElement(ChatInput,{SubmitMethod:this.HandleSubmit})
            )
        )
    },
    componentWillMount:function(){
        $.ajax({
            url:"message.json",
            type:"GET",
            dataType:"json",
            success:function(data){
                this.setState({
                    data:data
                })
            }.bind(this),
            error:function(error){
                console.log(error)
            }
        })
    }
});
var ChatBox = React.createClass({
    componentDidUpdate:function(){
        $(".chat-content").scrollTop($(".chat-content")[0].clientHeight)
    },
    render:function(){
        var newDate =[];
        for(var i in this.props.data){
            newDate.push(
                React.createElement(ChatMessage,{key:this.props.data[i].id,type:this.props.data[i].type,message:this.props.data[i].message})
            )
        }
        return(
            React.createElement("div",{className:"chat-content"},newDate)
        )
    }
});
var ChatMessage = React.createClass({
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
var ChatSubmit = React.createClass({
    getInitialState:function(){
        return{
            text:""
        }
    },
    HandleSubmit:function(event){
        event.preventDefault();
        this.props.SubmitMethod(this.state.text);
        this.setState({
            text:""
        });
        $.ajax({
            url:"./messages.json",
            type:"POST",
            dataType:"json",
            data:this.state.text
        })
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
var href = window.location.search.slice(1).split("&");
ReactDOM.render(
    React.createElement(ChatObjInfo,{imgUrl:href[1],name:decodeURI(href[2]),job:decodeURI(href[3])}),
    document.getElementById("chat-object")
);
ReactDOM.render(
    React.createElement(ChatFormAndMessage,null),
    document.getElementById("chat-content")
);