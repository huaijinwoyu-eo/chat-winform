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
    var day = date.getDate();
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
            /*判断是否是文件格式的消息。*/
            if(this.props.data[i].guid){
                newDate.push(
                    React.createElement(FileItem,{
                        key:this.props.data[i].guid,
                        FileInfo:this.props.data[i]
                    })
                )
            }else {
                newDate.push(
                    React.createElement(ChatMessage,{key:this.props.data[i].key,message:this.props.data[i]})
                )
            }
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
                        // React.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.message.content}})
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
/*文件列表*/
var FileItem = React.createClass({
    getInitialState:function () {
        return{
            fileType:"",
            isSuccess:false,//通过判断状态来确定是否有成功标识。
            isProgress:true,//是否展示进度条。
            Btn1:"",
            Btn2:"",
            Btn3:""
        }
    },
    render:function () {
        if(this.props.FileInfo.issend){
            return(
                React.createElement("div",{className:"chat-item clearfix"},
                    React.createElement("div",{className:"chat-my"},
                        React.createElement("div",{className:"message-author"},
                            React.createElement("span",{className:"yourself"},"我"),
                            React.createElement("span",{className:"time"},this.props.FileInfo.date)
                        ),
                        React.createElement("div",{className:"fileContent clearfix"},
                            React.createElement("div",{className:"img"},
                                React.createElement("img",{
                                    className:"TypeTip",
                                    src:this.state.fileType
                                }),
                                this.state.isSuccess ? React.createElement("img",{className:"successTip",src:"images/icon/success.png"}) : ""
                            ),
                            React.createElement("div",{className:"fileInfo"},
                                React.createElement("p",{className:"name"},this.props.FileInfo.name),
                                React.createElement("p",{className:"size"},this.props.FileInfo.size)
                            )
                        ),
                        this.state.isProgress ? React.createElement("progress",{id:"fileProgress", value:this.props.FileInfo.percent}) : "",
                        React.createElement("div",{className:"fnBtn"},
                            React.createElement("div",{className:"fl"},
                                React.createElement("span",{className:"msgtips"},this.props.FileInfo.msg)
                            ),
                            React.createElement("div",{className:"fr"},
                                React.createElement("a",{
                                    className:"fnItem",
                                    onClick:this.HandelClick_1
                                },this.state.Btn1),
                                React.createElement("a",{
                                    className:"fnItem",
                                    onClick:this.HandelClick_2
                                },this.state.Btn2),
                                React.createElement("a",{
                                    className:"fnItem",
                                    onClick:this.HandelClick_3
                                },this.state.Btn3)
                            )
                        )
                    )
                )
            )
        }else {
            return(
                React.createElement("div",{className:"chat-item clearfix"},
                    React.createElement("div",{className:"chat-other"},
                        React.createElement("div",{className:"message-author"},
                            React.createElement("span",{className:"time"},this.props.FileInfo.date),
                            React.createElement("span",{className:"yourself"},this.props.FileInfo.nickname)
                        ),
                        React.createElement("div",{className:"fileContent clearfix"},
                            React.createElement("div",{className:"img"},
                                React.createElement("img",{
                                    className:"TypeTip",
                                    src:this.state.fileType
                                }),
                                this.state.isSuccess ? React.createElement("img",{className:"successTip",src:"images/icon/success.png"}) : ""
                            ),
                            React.createElement("div",{className:"fileInfo"},
                                React.createElement("p",{className:"name"},this.props.FileInfo.name),
                                React.createElement("p",{className:"size"},this.props.FileInfo.size)
                            )
                        ),
                        this.state.isProgress ? React.createElement("progress",{id:"fileProgress", value:this.props.FileInfo.percent}) : "",
                        React.createElement("div",{className:"fnBtn"},
                            React.createElement("div",{className:"fl"},
                                React.createElement("span",{className:"msgtips"},this.props.FileInfo.msg)
                            ),
                            React.createElement("div",{className:"fr"},
                                React.createElement("a",{
                                    className:"fnItem",
                                    onClick:this.HandelClick_1
                                },this.state.Btn1),
                                React.createElement("a",{
                                    className:"fnItem",
                                    onClick:this.HandelClick_2
                                },this.state.Btn2),
                                React.createElement("a",{
                                    className:"fnItem",
                                    onClick:this.HandelClick_3
                                },this.state.Btn3)
                            )
                        )
                    )
                )
            )
        }
    },
    HandelClick_1:function () {},
    HandelClick_2:function () {},
    HandelClick_3:function () {},
    /*确认接收文件函数*/
    HandleAccept:function () {
        window.external.API_Accept(this.props.FileInfo.guid);
    },
    /*取消接收文件*/
    HandleDenyAcceptFile:function () {
        window.external.API_Cancel(this.props.FileInfo.guid);
    },
    /*打开文件*/
    HandleOpenFile:function () {
        window.external.API_OpenFile(this.props.FileInfo.guid);
    },
    /*打开文件夹*/
    HandleOpenFolder:function () {
        window.external.API_OpenFolder(this.props.FileInfo.guid);
    },
    /*另存为*/
    HandleSave:function () {
        window.external.API_Save(this.props.FileInfo.guid);
    },
    componentDidMount:function () {
        /*判断文件类型，以展示正确的图标信息。*/
        switch (this.props.FileInfo.type){
            case 1 :this.setState({
                fileType:"images/icon/pdf.png"
            });
                break;
            case 2 :this.setState({
                fileType:"images/icon/doc.png"
            });
                break;
            case 3 :this.setState({
                fileType:"images/icon/ECEL.png"
            });
                break;
            case 4 :this.setState({
                fileType:"images/icon/pic.png"
            });
                break;
            case 5 :this.setState({
                fileType:"images/icon/PPT.png"
            });
                break;
            case 6 :this.setState({
                fileType:"images/icon/zip.png"
            });
                break;
            case 7 :this.setState({
                fileType:"images/icon/wenjian.png"
            });
                break;
            default:this.setState({
                fileType:"images/icon/wenjian.png"
            });
                break;
        }
        /*判断状态，确定是否展示成功图片*/
        if(this.props.FileInfo.issend){
            switch (this.props.FileInfo.state){
                case 1 : this.setState({
                    isSuccess:false,
                    isProgress:true,
                    Btn1:"",
                    Btn2:"传离线发送",
                    Btn3:"取消"
                });
                    break;
                case 2 : this.setState({
                    isSuccess:true,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"打开",
                    Btn3:"打开文件夹"
                });
                    this.HandelClick_2 = this.HandleOpenFile;
                    this.HandelClick_3 = this.HandleOpenFolder;
                    break;
                case 3 : this.setState({
                    isSuccess:false,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"",
                    Btn3:"重试"
                });
                    break;
            }
        }else {
            switch (this.props.FileInfo.state){
                case 1 :this.setState({
                    isSuccess:false,
                    isProgress:false,
                    Btn1:"接收",
                    Btn2:"另存为",
                    Btn3:"取消"
                });
                    this.HandelClick_1 = this.HandleAccept;
                    this.HandelClick_2 = this.HandleSave;
                    this.HandelClick_3 = this.HandleDenyAcceptFile;
                    break;
                case 2 :this.setState({
                    isSuccess:true,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"打开",
                    Btn3:"打开文件夹"
                });
                    this.HandelClick_2 = this.HandleOpenFile;
                    this.HandelClick_3 = this.HandleOpenFolder;
                    break;
                case 3 :this.setState({
                    isSuccess:false,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"",
                    Btn3:""
                });
                    break;
                case 4 :this.setState({
                    isSuccess:false,
                    isProgress:true,
                    Btn1:"",
                    Btn2:"",
                    Btn3:"取消"
                });
                    break;
            }
        }
    },
    componentWillReceiveProps:function (nextprops) {
        /*判断文件类型，以展示正确的图标信息。*/
        switch (nextprops.FileInfo.type){
            case 1 :this.setState({
                fileType:"images/icon/pdf.png"
            });
                break;
            case 2 :this.setState({
                fileType:"images/icon/doc.png"
            });
                break;
            case 3 :this.setState({
                fileType:"images/icon/ECEL.png"
            });
                break;
            case 4 :this.setState({
                fileType:"images/icon/pic.png"
            });
                break;
            case 5 :this.setState({
                fileType:"images/icon/PPT.png"
            });
                break;
            case 6 :this.setState({
                fileType:"images/icon/zip.png"
            });
                break;
            case 7 :this.setState({
                fileType:"images/icon/wenjian.png"
            });
                break;
            default:this.setState({
                fileType:"images/icon/wenjian.png"
            });
                break;
        }
        /*判断状态，确定是否展示成功图片*/
        if(nextprops.FileInfo.issend){
            switch (nextprops.FileInfo.state){
                case 1 : this.setState({
                    isSuccess:false,
                    isProgress:true,
                    Btn1:"",
                    Btn2:"传离线发送",
                    Btn3:"取消"
                });
                    break;
                case 2 : this.setState({
                    isSuccess:true,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"打开",
                    Btn3:"打开文件夹"
                });
                    this.HandelClick_2 = this.HandleOpenFile;
                    this.HandelClick_3 = this.HandleOpenFolder;
                    break;
                case 3 : this.setState({
                    isSuccess:false,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"",
                    Btn3:"重试"
                });
                    break;
            }
        }else {
            switch (nextprops.FileInfo.state){
                case 1 :this.setState({
                    isSuccess:false,
                    isProgress:false,
                    Btn1:"接收",
                    Btn2:"另存为",
                    Btn3:"取消"
                });
                    this.HandelClick_1 = this.HandleAccept;
                    this.HandelClick_2 = this.HandleSave;
                    this.HandelClick_3 = this.HandleDenyAcceptFile;
                    break;
                case 2 :this.setState({
                    isSuccess:true,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"打开",
                    Btn3:"打开文件夹"
                });
                    this.HandelClick_2 = this.HandleOpenFile;
                    this.HandelClick_3 = this.HandleOpenFolder;
                    break;
                case 3 :this.setState({
                    isSuccess:false,
                    isProgress:false,
                    Btn1:"",
                    Btn2:"",
                    Btn3:""
                });
                    break;
                case 4 :this.setState({
                    isSuccess:false,
                    isProgress:true,
                    Btn1:"",
                    Btn2:"",
                    Btn3:"取消"
                });
                    break;
            }
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
                    ),
                    React.createElement("li",{
                        className:"function-item w20",
                        onClick:this.HandleOpenFile
                    },
                        React.createElement("span",{className:"icon-folder-open",title:"点击上传文件"})
                    )
                ),
                React.createElement("div",{className:"fr message-log w20"},
                    React.createElement("span",{className:"icon-time"}),
                    React.createElement("a",{href:"#"},"消息记录"),
                    React.createElement("span",{className:"icon-caret-down"})
                )
            )
        )
    },
    HandleOpenFile:function () {
        window.external.API_ChooseFile();
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
    this.AddFile = function (data) {
        var ObjectData = JSON.parse(data);
        for(var i=0; i<this.msg.length; i++){
            if(this.msg[i].guid){
                if(this.msg[i].guid == ObjectData.file.guid){
                    /*更新内容。*/
                    this.msg[i].issend = ObjectData.file.issend;
                    this.msg[i].nickname = ObjectData.file.nickname;
                    this.msg[i].guid = ObjectData.file.guid;
                    this.msg[i].name = ObjectData.file.name;
                    this.msg[i].type = ObjectData.file.type;
                    this.msg[i].date = ObjectData.file.date;
                    this.msg[i].msg = ObjectData.file.msg;//提示信息，可以是成功的提示信息，也可以是失败的原因。
                    this.msg[i].state = ObjectData.file.state;
                    this.msg[i].percent = ObjectData.file.percent;
                    this.propertyChange();
                    return;
                }
            }
        }
        this.msg.push(ObjectData.file);
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
