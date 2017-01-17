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
            data:this.props.data,
            FontStyle:"Microsoft YaHei",
            FontSize:"14px"
        }
    },
    /*自己发送的消息，实时显示在当前窗口的方法*/
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
    /*更换字体，更换字号的方法*/
    HandleChangeText:function (text,event) {
        if(text == "style"){
            switch (event.target.value){
                case "默认字体（微软雅黑）":this.setState({
                    FontStyle:"Microsoft YaHei"
                });
                    break;
                case "宋体":this.setState({
                    FontStyle:"SimSun"
                });
                    break;
                case "黑体":this.setState({
                    FontStyle:"SimHei"
                });
                    break;
                case "楷体":this.setState({
                    FontStyle:"KaiTi"
                });
                    break;
                default:this.setState({
                    FontStyle:"Microsoft YaHei"
                });
                    break;
            }
        }else {
            switch (event.target.value){
                case "默认大小":this.setState({
                    FontSize:"14px"
                });
                    break;
                case "12":this.setState({
                    FontSize:"12px"
                });
                    break;
                case "13":this.setState({
                    FontSize:"13px"
                });
                    break;
                case "14":this.setState({
                    FontSize:"14px"
                });
                    break;
                case "15":this.setState({
                    FontSize:"15px"
                });
                    break;
                case "16":this.setState({
                    FontSize:"16px"
                });
                    break;
                case "17":this.setState({
                    FontSize:"17px"
                });
                    break;
                default:this.setState({
                    FontSize:"14px"
                });
                    break;
            }
        }
    },
    render:function(){
        return(
            React.createElement("div",{},
                React.createElement(ChatBox,{
                    data:this.state.data,
                    FontSS:{
                        "font-family":this.state.FontStyle,
                        "font-size":this.state.FontSize
                    }
                }),
                React.createElement(ChatInput,{
                    SubmitMethod:this.HandleSubmit,
                    ChangeText:this.HandleChangeText,
                    FontSS:{
                        "font-family":this.state.FontStyle,
                        "font-size":this.state.FontSize
                    }
                })
            )
        )
    }
});
/*消息列表*/
var ChatBox = React.createClass({
    componentDidUpdate:function(){
        reset("#ChatBoxInner",30,80);
        // $("#ChatBoxInner .inner").scrollTop($("#ChatBoxInner .inner")[0].scrollHeight);
        // console.log($("#ChatBoxInner .inner")[0].scrollHeight);
        if($("#ChatBoxInner .inner").height() > $("#ChatBoxInner").height()){
            $("#ChatBoxInner .inner").css("top",$("#ChatBoxInner").height()-$("#ChatBoxInner .inner").height());
            $("#ChatBoxInner .list-scrollbar").css("top",$("#ChatBoxInner").height()-$("#ChatBoxInner .list-scrollbar").height())
        }else {

        }

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
                    React.createElement(ChatMessage,{
                        key:this.props.data[i].key,
                        message:this.props.data[i],
                        FontSS:this.props.FontSS
                    })
                )
            }
        }
        return(
            React.createElement("div",{className:"chat-content"},
                React.createElement("div",{id:"ChatBoxInner"},
                    React.createElement("div",{className:"listbar"},
                        React.createElement("div",{className:"list-left"}),
                        React.createElement("div",{className:"list-scrollbar"}),
                        React.createElement("div",{className:"list-right"})
                    ),
                    React.createElement("div",{className:"inner"},newDate)
                )
            )
            // React.createElement("div",{className:"chat-content"},newDate)
        )
    }
});
/*消息列表单元*/
var ChatMessage = React.createClass({
    render:function(){
        var TempArray;
        if(typeof this.props.message.content == "string"){
            TempArray = this.props.message.content.split(",");
        }else {
            TempArray = Array.prototype.slice.call(this.props.message.content);//将内容转化成数组。
        }
        var DisplayThing = [];//新建展示数组，
        if(this.props.message.issend){
            TempArray.forEach(function (item) {
                if(item.length>1){
                    DisplayThing.push(
                        React.createElement("img",{
                            className:"Icon",
                            src:item
                        })
                    )
                }else {
                    DisplayThing.push(item)
                }
            });
            return(
                React.createElement("div",{className:"chat-item clearfix"},
                    React.createElement("div",{className:"chat-my"},
                        React.createElement("div",{className:"message-author"},
                            React.createElement("span",{className:"yourself"},"我"),
                            React.createElement("span",{className:"time"},this.props.message.date)
                        ),
                        // React.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.message.content}})
                        React.createElement("div",{
                            style:this.props.FontSS
                        },DisplayThing)
                    )
                )
            )
        }else {
            TempArray.forEach(function (item) {
                if(item.length>1){
                    DisplayThing.push(
                        React.createElement("img",{
                            className:"Icon",
                            src:item
                        })
                    )
                }else {
                    DisplayThing.push(item)
                }
            });
            return(
                React.createElement("div",{className:"chat-item clearfix"},
                    React.createElement("div",{className:"chat-other"},
                        React.createElement("div",{className:"message-author"},
                            React.createElement("span",{className:"time"},this.props.message.date),
                            React.createElement("span",{className:"yourself"},this.props.message.nickname)

                        ),
                        React.createElement("div",{
                            style:this.props.FontSS
                        },DisplayThing)
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
/****************************************************************************/
/*聊天输入框部分组件*/
var ChatInput = React.createClass({
    getInitialState:function () {
        return{
            IconSrc:""
        }
    },
    render:function(){
        return(
            React.createElement("div",{className:"chat-input"},
                React.createElement(ChatFunctionItem,{
                    ChangeText:this.props.ChangeText,
                    AppendIcon:this.HandleAppendIcon
                }),
                React.createElement(ChatSubmit,{
                    SubmitMethod:this.props.SubmitMethod,
                    FontSS:this.props.FontSS,
                    ICONSRC:this.state.IconSrc
                })
            )
        )
    },
    /*点击表情，将表情添加到输入框中。*/
    HandleAppendIcon:function (src) {
        this.setState({
            IconSrc:src
        },function () {
            this.setState({
                IconSrc:""
            })
        }.bind(this));
    }
});
/*聊天辅助功能，包括字体，表情等。*/
var ChatFunctionItem = React.createClass({
    render:function(){
        return(
            React.createElement("div",{className:"clearfix"},
                /*引入更换字体，变化文字大小组件*/
                React.createElement(ChangeText,{
                    ChangeText:this.props.ChangeText
                }),
                /**************************************/
                /*引入表情组件*/
                React.createElement(IconComponent,{
                    AppendIcon:this.props.AppendIcon
                }),
                /*************************************/
                React.createElement("ul",{className:"fl"},
                    React.createElement("li",{
                        className:"function-item w20",
                        onClick:this.HandleOpenPanel.bind(this,"text")
                    },
                        React.createElement("span",{className:"icon-font"})
                    ),
                    React.createElement("li",{
                        className:"function-item w20",
                        onClick:this.HandleOpenPanel.bind(this,"Icon")
                    },
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
    /*打开相关窗口*/
    HandleOpenPanel:function (target,event) {
        if(target == "text"){/*打开更换字体，更换字号窗口的方法*/
            $(".ChangeText").slideToggle();
            $('.IconComponent').slideUp();
        }else if(target == "Icon") {/*打开，关闭表情组件*/
            $(".ChangeText").slideUp();
            $(".IconComponent").slideToggle(function () {
                reset(".IconComponent",40,171);
            });
        }
    },
    /*上传文件的方法*/
    HandleOpenFile:function () {
        window.external.API_ChooseFile();
    }
});
/*更换字体、文字大小变化组件*/
var ChangeText = React.createClass({
    getInitialState:function () {
        return{
            displayTextStyle:"微软雅黑",
            displayTextSize:"14",
            FontStyle:"Microsoft YaHei",
            FontSize:"14px"
        }
    },
    render:function () {
        return(
            React.createElement("div",{className:"ChangeText"},
                React.createElement("div",{
                    className:"demo-display",
                    style:{
                        "font-family":this.state.FontStyle,
                        "font-size":this.state.FontSize
                    }
                },"效果展示："+this.state.displayTextStyle+this.state.displayTextSize),
                React.createElement("select",{
                        // onChange:this.props.ChangeText.bind(this,"style"),
                        onChange:this.HandleDisplayChange.bind(this,"style")
                    },
                    React.createElement("option",null,"字体"),
                    React.createElement("option",null,"默认字体（微软雅黑）"),
                    React.createElement("option",null,"宋体"),
                    React.createElement("option",null,"黑体"),
                    React.createElement("option",null,"楷体")
                ),
                React.createElement("select",{
                        // onChange:this.props.ChangeText.bind(this,"size"),
                        onChange:this.HandleDisplayChange.bind(this,"size")
                    },
                    React.createElement("option",null,"字号"),
                    React.createElement("option",null,"默认大小"),
                    React.createElement("option",null,"12"),
                    React.createElement("option",null,"13"),
                    React.createElement("option",null,"14"),
                    React.createElement("option",null,"15"),
                    React.createElement("option",null,"16"),
                    React.createElement("option",null,"17")
                )
            )
        )
    },
    /*鼠标划过效果预览*/
    HandleDisplayChange:function (text,event) {
        this.props.ChangeText(text,event);
        if(text == "style"){
            switch (event.target.value){
                case "默认字体（微软雅黑）":this.setState({
                    displayTextStyle:"微软雅黑",
                    FontStyle:"Microsoft YaHei"
                });
                    break;
                case "宋体":this.setState({
                    displayTextStyle:"宋体",
                    FontStyle:"SimSun",
                });
                    break;
                case "黑体":this.setState({
                    displayTextStyle:"黑体",
                    FontStyle:"SimHei",
                });
                    break;
                case "楷体":this.setState({
                    displayTextStyle:"楷体",
                    FontStyle:"KaiTi",
                });
                    break;
                default:this.setState({
                    displayTextStyle:"微软雅黑",
                    FontStyle:"Microsoft YaHei",
                });
                    break;
            }
        }else {
            switch (event.target.value){
                case "默认大小":this.setState({
                    displayTextSize:"14",
                    FontSize:"14px"
                });
                    break;
                case "12":this.setState({
                    displayTextSize:"12",
                    FontSize:"12px"
                });
                    break;
                case "13":this.setState({
                    displayTextSize:"13",
                    FontSize:"13px"
                });
                    break;
                case "14":this.setState({
                    displayTextSize:"14",
                    FontSize:"14px"
                });
                    break;
                case "15":this.setState({
                    displayTextSize:"15",
                    FontSize:"15px"
                });
                    break;
                case "16":this.setState({
                    displayTextSize:"16",
                    FontSize:"16px"
                });
                    break;
                case "17":this.setState({
                    displayTextSize:"17",
                    FontSize:"17px"
                });
                    break;
                default:this.setState({
                    displayTextSize:"14",
                    FontSize:"14px"
                });
                    break;
            }
        }
    }
});
/*表情组件*/
var IconComponent = React.createClass({
    getInitialState:function () {
        return{
            prev:[],
            AllDisplay:[],
            Display:[]
        }
    },
    render:function () {
        return(
            React.createElement("div",{className:"IconComponent"},
                React.createElement("div",{className:"listbar"},
                    React.createElement("div",{className:"list-left"}),
                    React.createElement("div",{className:"list-scrollbar"}),
                    React.createElement("div",{className:"list-right"})
                ),
                React.createElement("div",{className:"inner"},
                    this.state.Display,
                    React.createElement("div",{
                        className:"more",
                        onClick:this.HandleToggle
                    },"更多表情")
                )
            )
        )
    },
    /*点击方法（收起展开功能）*/
    HandleToggle:function (event) {
        if(event.target.innerHTML == "更多表情"){
            event.target.innerHTML = "收起";
            this.HandleLoadMore();
        }else {
            event.target.innerHTML = "更多表情";
            this.HandleReturn();
        }
    },
    /*添加更多*/
    HandleLoadMore:function () {
        var temp = this.state.AllDisplay;
        this.setState({
            Display:temp
        },function () {
            setTimeout(function () {
                reset(".IconComponent",40,171);
            },2000);
            temp = null;
        });
    },
    /*显示初始化表情列表*/
    HandleReturn:function () {
        var temp = this.state.prev;
        this.setState({
            Display:temp
        },function () {
            reset(".IconComponent",40,171);
            temp = null;
        });
    },
    componentDidMount:function () {
        var IconArray = {
            "prev":[
                "/images/FExpression/50.png",
                "/images/FExpression/701.png",
                "/images/FExpression/702.png",
                "/images/FExpression/703.png",
                "/images/FExpression/704.png",
                "/images/FExpression/705.png",
                "/images/FExpression/706.png",
                "/images/FExpression/707.png",
                "/images/FExpression/708.png",
                "/images/FExpression/709.png",
                "/images/FExpression/710.png",
                "/images/FExpression/711.png",
                "/images/FExpression/712.png",
                "/images/FExpression/713.png",
                "/images/FExpression/714.png",
                "/images/FExpression/715.png",
                "/images/FExpression/716.png",
                "/images/FExpression/717.png",
                "/images/FExpression/718.png",
                "/images/FExpression/719.png",
                "/images/FExpression/720.png",
                "/images/FExpression/721.png",
                "/images/FExpression/722.png",
                "/images/FExpression/723.png",
                "/images/FExpression/724.png",
                "/images/FExpression/725.png",
                "/images/FExpression/726.png",
                "/images/FExpression/727.png",
                "/images/FExpression/728.png",
                "/images/FExpression/729.png",
                "/images/FExpression/730.png",
                "/images/FExpression/731.png",
                "/images/FExpression/732.png",
                "/images/FExpression/733.png",
                "/images/FExpression/734.png",
                "/images/FExpression/735.png",
                "/images/FExpression/736.png",
                "/images/FExpression/737.png",
                "/images/FExpression/738.png",
                "/images/FExpression/739.png",
                "/images/FExpression/740.png",
                "/images/FExpression/741.png",
                "/images/FExpression/742.png",
                "/images/FExpression/743.png",
                "/images/FExpression/744.png",
                "/images/FExpression/745.png",
                "/images/FExpression/746.png",
                "/images/FExpression/747.png",
                "/images/FExpression/748.png",
                "/images/FExpression/749.png",
                "/images/FExpression/750.png",
                "/images/FExpression/751.png",
                "/images/FExpression/752.png",
                "/images/FExpression/753.png",
                "/images/FExpression/754.png",
                "/images/FExpression/755.png",
                "/images/FExpression/756.png",
                "/images/FExpression/757.png",
                "/images/FExpression/758.png",
                "/images/FExpression/759.png",
                "/images/FExpression/760.png",
                "/images/FExpression/761.png",
                "/images/FExpression/762.png",
                "/images/FExpression/763.png",
                "/images/FExpression/764.png",
                "/images/FExpression/765.png"
            ],
            "next":[
                "/images/FExpression/1.png",
                "/images/FExpression/2.png",
                "/images/FExpression/3.png",
                "/images/FExpression/4.png",
                "/images/FExpression/5.png",
                "/images/FExpression/6.png",
                "/images/FExpression/7.png",
                "/images/FExpression/8.png",
                "/images/FExpression/9.png",
                "/images/FExpression/10.png",
                "/images/FExpression/11.png",
                "/images/FExpression/12.png",
                "/images/FExpression/13.png",
                "/images/FExpression/14.png",
                "/images/FExpression/15.png",
                "/images/FExpression/16.png",
                "/images/FExpression/17.png",
                "/images/FExpression/18.png",
                "/images/FExpression/19.png",
                "/images/FExpression/20.png",
                "/images/FExpression/21.png",
                "/images/FExpression/22.png",
                "/images/FExpression/23.png",
                "/images/FExpression/24.png",
                "/images/FExpression/25.png",
                "/images/FExpression/26.png",
                "/images/FExpression/27.png",
                "/images/FExpression/28.png",
                "/images/FExpression/29.png",
                "/images/FExpression/30.png",
                "/images/FExpression/31.png",
                "/images/FExpression/32.png",
                "/images/FExpression/33.png",
                "/images/FExpression/34.png",
                "/images/FExpression/35.png",
                "/images/FExpression/36.png",
                "/images/FExpression/37.png",
                "/images/FExpression/38.png",
                "/images/FExpression/39.png",
                "/images/FExpression/40.png",
                "/images/FExpression/41.png",
                "/images/FExpression/42.png",
                "/images/FExpression/43.png",
                "/images/FExpression/44.png",
                "/images/FExpression/45.png",
                "/images/FExpression/46.png",
                "/images/FExpression/47.png",
                "/images/FExpression/48.png",
                "/images/FExpression/49.png",
                "/images/FExpression/51.png",
                "/images/FExpression/52.png",
                "/images/FExpression/53.png",
                "/images/FExpression/54.png",
                "/images/FExpression/55.png",
                "/images/FExpression/56.png",
                "/images/FExpression/57.png",
                "/images/FExpression/58.png",
                "/images/FExpression/59.png",
                "/images/FExpression/60.png",
                "/images/FExpression/61.png",
                "/images/FExpression/62.png",
                "/images/FExpression/63.png",
                "/images/FExpression/64.png",
                "/images/FExpression/65.png",
                "/images/FExpression/66.png",
                "/images/FExpression/67.png",
                "/images/FExpression/68.png",
                "/images/FExpression/69.png",
                "/images/FExpression/70.png",
                "/images/FExpression/71.png",
                "/images/FExpression/72.png",
                "/images/FExpression/73.png",
                "/images/FExpression/74.png",
                "/images/FExpression/75.png",
                "/images/FExpression/76.png",
                "/images/FExpression/77.png",
                "/images/FExpression/78.png",
                "/images/FExpression/79.png",
                "/images/FExpression/80.png",
                "/images/FExpression/81.png",
                "/images/FExpression/82.png",
                "/images/FExpression/83.png",
                "/images/FExpression/84.png",
                "/images/FExpression/85.png",
                "/images/FExpression/86.png",
                "/images/FExpression/87.png",
                "/images/FExpression/88.png",
                "/images/FExpression/89.png",
                "/images/FExpression/90.png",
                "/images/FExpression/91.png",
                "/images/FExpression/92.png",
                "/images/FExpression/93.png",
                "/images/FExpression/94.png",
                "/images/FExpression/95.png",
                "/images/FExpression/96.png",
                "/images/FExpression/97.png",
                "/images/FExpression/98.png",
                "/images/FExpression/99.png",
                "/images/FExpression/100.png",
                "/images/FExpression/101.png",
                "/images/FExpression/102.png",
                "/images/FExpression/103.png",
                "/images/FExpression/104.png",
                "/images/FExpression/105.png",
                "/images/FExpression/106.png",
                "/images/FExpression/107.png",
                "/images/FExpression/108.png",
                "/images/FExpression/109.png",
                "/images/FExpression/110.png",
                "/images/FExpression/111.png",
                "/images/FExpression/112.png",
                "/images/FExpression/113.png",
                "/images/FExpression/114.png",
                "/images/FExpression/115.png",
                "/images/FExpression/116.png",
                "/images/FExpression/117.png",
                "/images/FExpression/118.png",
                "/images/FExpression/119.png",
                "/images/FExpression/120.png",
                "/images/FExpression/121.png",
                "/images/FExpression/122.png",
                "/images/FExpression/123.png",
                "/images/FExpression/124.png",
                "/images/FExpression/125.png",
                "/images/FExpression/126.png",
                "/images/FExpression/127.png",
                "/images/FExpression/128.png",
                "/images/FExpression/129.png",
                "/images/FExpression/130.png",
                "/images/FExpression/131.png",
                "/images/FExpression/132.png",
                "/images/FExpression/133.png",
                "/images/FExpression/134.png",
                "/images/FExpression/135.png",
                "/images/FExpression/136.png",
                "/images/FExpression/137.png",
                "/images/FExpression/138.png",
                "/images/FExpression/139.png",
                "/images/FExpression/140.png",
                "/images/FExpression/141.png",
                "/images/FExpression/142.png",
                "/images/FExpression/143.png",
                "/images/FExpression/144.png",
                "/images/FExpression/145.png",
                "/images/FExpression/146.png",
                "/images/FExpression/147.png",
                "/images/FExpression/148.png",
                "/images/FExpression/149.png",
                "/images/FExpression/150.png",
                "/images/FExpression/151.png",
                "/images/FExpression/152.png",
                "/images/FExpression/153.png",
                "/images/FExpression/154.png",
                "/images/FExpression/155.png",
                "/images/FExpression/156.png",
                "/images/FExpression/157.png",
                "/images/FExpression/158.png",
                "/images/FExpression/159.png",
                "/images/FExpression/160.png",
                "/images/FExpression/161.png",
                "/images/FExpression/162.png",
                "/images/FExpression/163.png",
                "/images/FExpression/164.png",
                "/images/FExpression/165.png",
                "/images/FExpression/167.png",
                "/images/FExpression/168.png",
                "/images/FExpression/169.png",
                "/images/FExpression/170.png",
                "/images/FExpression/171.png",
                "/images/FExpression/172.png",
                "/images/FExpression/173.png",
                "/images/FExpression/174.png",
                "/images/FExpression/175.png",
                "/images/FExpression/176.png",
                "/images/FExpression/177.png",
                "/images/FExpression/178.png",
                "/images/FExpression/179.png",
                "/images/FExpression/180.png",
                "/images/FExpression/181.png",
                "/images/FExpression/182.png",
                "/images/FExpression/183.png",
                "/images/FExpression/184.png",
                "/images/FExpression/185.png",
                "/images/FExpression/186.png",
                "/images/FExpression/187.png",
                "/images/FExpression/188.png",
                "/images/FExpression/189.png",
                "/images/FExpression/190.png",
                "/images/FExpression/191.png",
                "/images/FExpression/192.png",
                "/images/FExpression/193.png",
                "/images/FExpression/194.png",
                "/images/FExpression/195.png",
                "/images/FExpression/196.png",
                "/images/FExpression/197.png",
                "/images/FExpression/198.png",
                "/images/FExpression/199.png",
                "/images/FExpression/200.png",
                "/images/FExpression/201.png",
                "/images/FExpression/202.png",
                "/images/FExpression/203.png",
                "/images/FExpression/204.png",
                "/images/FExpression/205.png",
                "/images/FExpression/206.png",
                "/images/FExpression/207.png",
                "/images/FExpression/208.png",
                "/images/FExpression/209.png",
                "/images/FExpression/210.png",
                "/images/FExpression/211.png",
                "/images/FExpression/212.png",
                "/images/FExpression/213.png",
                "/images/FExpression/214.png",
                "/images/FExpression/215.png",
                "/images/FExpression/216.png",
                "/images/FExpression/217.png",
                "/images/FExpression/218.png",
                "/images/FExpression/219.png",
                "/images/FExpression/220.png",
                "/images/FExpression/221.png",
                "/images/FExpression/222.png",
                "/images/FExpression/223.png",
                "/images/FExpression/224.png",
                "/images/FExpression/225.png",
                "/images/FExpression/226.png",
                "/images/FExpression/227.png",
                "/images/FExpression/228.png",
                "/images/FExpression/229.png",
                "/images/FExpression/230.png",
                "/images/FExpression/231.png",
                "/images/FExpression/232.png",
                "/images/FExpression/233.png",
                "/images/FExpression/234.png",
                "/images/FExpression/235.png",
                "/images/FExpression/236.png",
                "/images/FExpression/237.png",
                "/images/FExpression/238.png",
                "/images/FExpression/239.png",
                "/images/FExpression/240.png",
                "/images/FExpression/241.png",
                "/images/FExpression/242.png",
                "/images/FExpression/243.png",
                "/images/FExpression/244.png",
                "/images/FExpression/245.png",
                "/images/FExpression/246.png",
                "/images/FExpression/247.png",
                "/images/FExpression/248.png",
                "/images/FExpression/249.png",
                "/images/FExpression/250.png",
                "/images/FExpression/251.png",
                "/images/FExpression/252.png",
                "/images/FExpression/253.png",
                "/images/FExpression/254.png",
                "/images/FExpression/255.png",
                "/images/FExpression/256.png",
                "/images/FExpression/257.png",
                "/images/FExpression/258.png",
                "/images/FExpression/259.png",
                "/images/FExpression/260.png",
                "/images/FExpression/261.png",
                "/images/FExpression/262.png",
                "/images/FExpression/263.png",
                "/images/FExpression/264.png",
                "/images/FExpression/265.png",
                "/images/FExpression/267.png",
                "/images/FExpression/268.png",
                "/images/FExpression/269.png",
                "/images/FExpression/270.png",
                "/images/FExpression/271.png",
                "/images/FExpression/272.png",
                "/images/FExpression/273.png",
                "/images/FExpression/274.png",
                "/images/FExpression/275.png",
                "/images/FExpression/276.png",
                "/images/FExpression/277.png",
                "/images/FExpression/278.png",
                "/images/FExpression/279.png",
                "/images/FExpression/280.png",
                "/images/FExpression/281.png",
                "/images/FExpression/282.png",
                "/images/FExpression/283.png",
                "/images/FExpression/284.png",
                "/images/FExpression/285.png",
                "/images/FExpression/286.png",
                "/images/FExpression/287.png",
                "/images/FExpression/288.png",
                "/images/FExpression/289.png",
                "/images/FExpression/290.png",
                "/images/FExpression/291.png",
                "/images/FExpression/292.png",
                "/images/FExpression/293.png",
                "/images/FExpression/294.png",
                "/images/FExpression/295.png",
                "/images/FExpression/296.png",
                "/images/FExpression/297.png",
                "/images/FExpression/298.png",
                "/images/FExpression/299.png",
                "/images/FExpression/300.png",
                "/images/FExpression/301.png",
                "/images/FExpression/302.png",
                "/images/FExpression/303.png",
                "/images/FExpression/304.png",
                "/images/FExpression/305.png",
                "/images/FExpression/306.png",
                "/images/FExpression/307.png",
                "/images/FExpression/308.png",
                "/images/FExpression/309.png",
                "/images/FExpression/310.png",
                "/images/FExpression/311.png",
                "/images/FExpression/312.png",
                "/images/FExpression/313.png",
                "/images/FExpression/314.png",
                "/images/FExpression/315.png",
                "/images/FExpression/316.png",
                "/images/FExpression/317.png",
                "/images/FExpression/318.png",
                "/images/FExpression/319.png",
                "/images/FExpression/320.png",
                "/images/FExpression/321.png",
                "/images/FExpression/322.png",
                "/images/FExpression/323.png",
                "/images/FExpression/324.png",
                "/images/FExpression/325.png",
                "/images/FExpression/326.png",
                "/images/FExpression/327.png",
                "/images/FExpression/328.png",
                "/images/FExpression/329.png",
                "/images/FExpression/330.png",
                "/images/FExpression/331.png",
                "/images/FExpression/332.png",
                "/images/FExpression/333.png",
                "/images/FExpression/334.png",
                "/images/FExpression/335.png",
                "/images/FExpression/336.png",
                "/images/FExpression/337.png",
                "/images/FExpression/338.png",
                "/images/FExpression/339.png",
                "/images/FExpression/340.png",
                "/images/FExpression/341.png",
                "/images/FExpression/342.png",
                "/images/FExpression/343.png",
                "/images/FExpression/344.png",
                "/images/FExpression/345.png",
                "/images/FExpression/346.png",
                "/images/FExpression/347.png",
                "/images/FExpression/348.png",
                "/images/FExpression/349.png",
                "/images/FExpression/350.png",
                "/images/FExpression/351.png",
                "/images/FExpression/352.png",
                "/images/FExpression/353.png",
                "/images/FExpression/354.png",
                "/images/FExpression/355.png",
                "/images/FExpression/356.png",
                "/images/FExpression/357.png",
                "/images/FExpression/358.png",
                "/images/FExpression/359.png",
                "/images/FExpression/360.png",
                "/images/FExpression/361.png",
                "/images/FExpression/362.png",
                "/images/FExpression/363.png",
                "/images/FExpression/364.png",
                "/images/FExpression/365.png",
                "/images/FExpression/367.png",
                "/images/FExpression/368.png",
                "/images/FExpression/369.png",
                "/images/FExpression/370.png",
                "/images/FExpression/371.png",
                "/images/FExpression/372.png",
                "/images/FExpression/373.png",
                "/images/FExpression/374.png",
                "/images/FExpression/375.png",
                "/images/FExpression/376.png",
                "/images/FExpression/377.png",
                "/images/FExpression/378.png",
                "/images/FExpression/379.png",
                "/images/FExpression/380.png",
                "/images/FExpression/381.png",
                "/images/FExpression/382.png",
                "/images/FExpression/383.png",
                "/images/FExpression/384.png",
                "/images/FExpression/385.png",
                "/images/FExpression/386.png",
                "/images/FExpression/387.png",
                "/images/FExpression/388.png",
                "/images/FExpression/389.png",
                "/images/FExpression/390.png",
                "/images/FExpression/391.png",
                "/images/FExpression/392.png",
                "/images/FExpression/393.png",
                "/images/FExpression/394.png",
                "/images/FExpression/395.png",
                "/images/FExpression/396.png",
                "/images/FExpression/397.png",
                "/images/FExpression/398.png",
                "/images/FExpression/399.png",
                "/images/FExpression/400.png",
                "/images/FExpression/401.png",
                "/images/FExpression/402.png",
                "/images/FExpression/403.png",
                "/images/FExpression/404.png",
                "/images/FExpression/405.png",
                "/images/FExpression/406.png",
                "/images/FExpression/407.png",
                "/images/FExpression/408.png",
                "/images/FExpression/409.png",
                "/images/FExpression/410.png",
                "/images/FExpression/411.png",
                "/images/FExpression/412.png",
                "/images/FExpression/413.png",
                "/images/FExpression/414.png",
                "/images/FExpression/415.png",
                "/images/FExpression/416.png",
                "/images/FExpression/417.png",
                "/images/FExpression/418.png",
                "/images/FExpression/419.png",
                "/images/FExpression/420.png",
                "/images/FExpression/421.png",
                "/images/FExpression/422.png",
                "/images/FExpression/423.png",
                "/images/FExpression/424.png",
                "/images/FExpression/425.png",
                "/images/FExpression/426.png",
                "/images/FExpression/427.png",
                "/images/FExpression/428.png",
                "/images/FExpression/429.png",
                "/images/FExpression/430.png",
                "/images/FExpression/431.png",
                "/images/FExpression/432.png",
                "/images/FExpression/433.png",
                "/images/FExpression/434.png",
                "/images/FExpression/435.png",
                "/images/FExpression/436.png",
                "/images/FExpression/437.png",
                "/images/FExpression/438.png",
                "/images/FExpression/439.png",
                "/images/FExpression/440.png",
                "/images/FExpression/441.png",
                "/images/FExpression/442.png",
                "/images/FExpression/443.png",
                "/images/FExpression/444.png",
                "/images/FExpression/445.png",
                "/images/FExpression/446.png",
                "/images/FExpression/447.png",
                "/images/FExpression/448.png",
                "/images/FExpression/449.png",
                "/images/FExpression/450.png",
                "/images/FExpression/451.png",
                "/images/FExpression/452.png",
                "/images/FExpression/453.png",
                "/images/FExpression/454.png",
                "/images/FExpression/455.png",
                "/images/FExpression/456.png",
                "/images/FExpression/457.png",
                "/images/FExpression/458.png",
                "/images/FExpression/459.png",
                "/images/FExpression/460.png",
                "/images/FExpression/461.png",
                "/images/FExpression/462.png",
                "/images/FExpression/463.png",
                "/images/FExpression/464.png",
                "/images/FExpression/465.png",
                "/images/FExpression/467.png",
                "/images/FExpression/468.png",
                "/images/FExpression/469.png",
                "/images/FExpression/470.png",
                "/images/FExpression/471.png",
                "/images/FExpression/472.png",
                "/images/FExpression/473.png",
                "/images/FExpression/474.png",
                "/images/FExpression/475.png",
                "/images/FExpression/476.png",
                "/images/FExpression/477.png",
                "/images/FExpression/478.png",
                "/images/FExpression/479.png",
                "/images/FExpression/480.png",
                "/images/FExpression/481.png",
                "/images/FExpression/482.png",
                "/images/FExpression/483.png",
                "/images/FExpression/484.png",
                "/images/FExpression/485.png",
                "/images/FExpression/486.png",
                "/images/FExpression/487.png",
                "/images/FExpression/488.png",
                "/images/FExpression/489.png",
                "/images/FExpression/490.png",
                "/images/FExpression/491.png",
                "/images/FExpression/492.png",
                "/images/FExpression/493.png",
                "/images/FExpression/494.png",
                "/images/FExpression/495.png",
                "/images/FExpression/496.png",
                "/images/FExpression/497.png",
                "/images/FExpression/498.png",
                "/images/FExpression/499.png",
                "/images/FExpression/500.png",
                "/images/FExpression/501.png",
                "/images/FExpression/502.png",
                "/images/FExpression/503.png",
                "/images/FExpression/504.png",
                "/images/FExpression/505.png",
                "/images/FExpression/506.png",
                "/images/FExpression/507.png",
                "/images/FExpression/508.png",
                "/images/FExpression/509.png",
                "/images/FExpression/510.png",
                "/images/FExpression/511.png",
                "/images/FExpression/512.png",
                "/images/FExpression/513.png",
                "/images/FExpression/514.png",
                "/images/FExpression/515.png",
                "/images/FExpression/516.png",
                "/images/FExpression/517.png",
                "/images/FExpression/518.png",
                "/images/FExpression/519.png",
                "/images/FExpression/520.png",
                "/images/FExpression/521.png",
                "/images/FExpression/522.png",
                "/images/FExpression/523.png",
                "/images/FExpression/524.png",
                "/images/FExpression/525.png",
                "/images/FExpression/526.png",
                "/images/FExpression/527.png",
                "/images/FExpression/528.png",
                "/images/FExpression/529.png",
                "/images/FExpression/530.png",
                "/images/FExpression/531.png",
                "/images/FExpression/532.png",
                "/images/FExpression/533.png",
                "/images/FExpression/534.png",
                "/images/FExpression/535.png",
                "/images/FExpression/536.png",
                "/images/FExpression/537.png",
                "/images/FExpression/538.png",
                "/images/FExpression/539.png",
                "/images/FExpression/540.png",
                "/images/FExpression/541.png",
                "/images/FExpression/542.png",
                "/images/FExpression/543.png",
                "/images/FExpression/544.png",
                "/images/FExpression/545.png",
                "/images/FExpression/546.png",
                "/images/FExpression/547.png",
                "/images/FExpression/548.png",
                "/images/FExpression/549.png",
                "/images/FExpression/550.png",
                "/images/FExpression/551.png",
                "/images/FExpression/552.png",
                "/images/FExpression/553.png",
                "/images/FExpression/554.png",
                "/images/FExpression/555.png",
                "/images/FExpression/556.png",
                "/images/FExpression/557.png",
                "/images/FExpression/558.png",
                "/images/FExpression/559.png",
                "/images/FExpression/560.png",
                "/images/FExpression/561.png",
                "/images/FExpression/562.png",
                "/images/FExpression/563.png",
                "/images/FExpression/564.png",
                "/images/FExpression/565.png",
                "/images/FExpression/567.png",
                "/images/FExpression/568.png",
                "/images/FExpression/569.png",
                "/images/FExpression/570.png",
                "/images/FExpression/571.png",
                "/images/FExpression/572.png",
                "/images/FExpression/573.png",
                "/images/FExpression/574.png",
                "/images/FExpression/575.png",
                "/images/FExpression/576.png",
                "/images/FExpression/577.png",
                "/images/FExpression/578.png",
                "/images/FExpression/579.png",
                "/images/FExpression/580.png",
                "/images/FExpression/581.png",
                "/images/FExpression/582.png",
                "/images/FExpression/583.png",
                "/images/FExpression/584.png",
                "/images/FExpression/585.png",
                "/images/FExpression/586.png",
                "/images/FExpression/587.png",
                "/images/FExpression/588.png",
                "/images/FExpression/589.png",
                "/images/FExpression/590.png",
                "/images/FExpression/591.png",
                "/images/FExpression/592.png",
                "/images/FExpression/593.png",
                "/images/FExpression/594.png",
                "/images/FExpression/595.png",
                "/images/FExpression/596.png",
                "/images/FExpression/597.png",
                "/images/FExpression/598.png",
                "/images/FExpression/599.png",
                "/images/FExpression/600.png",
                "/images/FExpression/601.png",
                "/images/FExpression/602.png",
                "/images/FExpression/603.png",
                "/images/FExpression/604.png",
                "/images/FExpression/605.png",
                "/images/FExpression/606.png",
                "/images/FExpression/607.png",
                "/images/FExpression/608.png",
                "/images/FExpression/609.png",
                "/images/FExpression/610.png",
                "/images/FExpression/611.png",
                "/images/FExpression/612.png",
                "/images/FExpression/613.png",
                "/images/FExpression/614.png",
                "/images/FExpression/615.png",
                "/images/FExpression/616.png",
                "/images/FExpression/617.png",
                "/images/FExpression/618.png",
                "/images/FExpression/619.png",
                "/images/FExpression/620.png",
                "/images/FExpression/621.png",
                "/images/FExpression/622.png",
                "/images/FExpression/623.png",
                "/images/FExpression/624.png",
                "/images/FExpression/625.png",
                "/images/FExpression/626.png",
                "/images/FExpression/627.png",
                "/images/FExpression/628.png",
                "/images/FExpression/629.png",
                "/images/FExpression/630.png",
                "/images/FExpression/631.png",
                "/images/FExpression/632.png",
                "/images/FExpression/633.png",
                "/images/FExpression/634.png",
                "/images/FExpression/635.png",
                "/images/FExpression/636.png",
                "/images/FExpression/637.png",
                "/images/FExpression/638.png",
                "/images/FExpression/639.png",
                "/images/FExpression/640.png",
                "/images/FExpression/641.png",
                "/images/FExpression/642.png",
                "/images/FExpression/643.png",
                "/images/FExpression/644.png",
                "/images/FExpression/645.png",
                "/images/FExpression/646.png",
                "/images/FExpression/647.png",
                "/images/FExpression/648.png",
                "/images/FExpression/649.png",
                "/images/FExpression/650.png",
                "/images/FExpression/651.png",
                "/images/FExpression/652.png",
                "/images/FExpression/653.png",
                "/images/FExpression/654.png",
                "/images/FExpression/655.png",
                "/images/FExpression/656.png",
                "/images/FExpression/657.png",
                "/images/FExpression/658.png",
                "/images/FExpression/659.png",
                "/images/FExpression/660.png",
                "/images/FExpression/661.png",
                "/images/FExpression/662.png",
                "/images/FExpression/663.png",
                "/images/FExpression/664.png",
                "/images/FExpression/665.png",
                "/images/FExpression/667.png",
                "/images/FExpression/668.png",
                "/images/FExpression/669.png",
                "/images/FExpression/670.png",
                "/images/FExpression/671.png",
                "/images/FExpression/672.png",
                "/images/FExpression/673.png",
                "/images/FExpression/674.png",
                "/images/FExpression/675.png",
                "/images/FExpression/676.png",
                "/images/FExpression/677.png",
                "/images/FExpression/678.png",
                "/images/FExpression/679.png",
                "/images/FExpression/680.png",
                "/images/FExpression/681.png",
                "/images/FExpression/682.png",
                "/images/FExpression/683.png",
                "/images/FExpression/684.png",
                "/images/FExpression/685.png",
                "/images/FExpression/686.png",
                "/images/FExpression/687.png",
                "/images/FExpression/688.png",
                "/images/FExpression/689.png",
                "/images/FExpression/690.png",
                "/images/FExpression/691.png",
                "/images/FExpression/692.png",
                "/images/FExpression/693.png",
                "/images/FExpression/694.png",
                "/images/FExpression/695.png",
                "/images/FExpression/696.png",
                "/images/FExpression/697.png",
                "/images/FExpression/698.png",
                "/images/FExpression/699.png",
                "/images/FExpression/700.png"
            ]
        };
        var AllDisplay = [];
        var PrevDisplay = [];
        IconArray.prev.forEach(function (item) {
            AllDisplay.push(
                React.createElement(IconItem,{
                    SRC:item,
                    key:item,
                    AppendIcon:this.props.AppendIcon
                })
            );
            PrevDisplay.push(
                React.createElement(IconItem,{
                    SRC:item,
                    key:item,
                    AppendIcon:this.props.AppendIcon
                })
            )
        }.bind(this));
        IconArray.next.forEach(function (item) {
            AllDisplay.push(
                React.createElement(IconItem,{
                    SRC:item,
                    key:item,
                    AppendIcon:this.props.AppendIcon
                })
            )
        }.bind(this));
        this.setState({
            AllDisplay:AllDisplay,
            prev:PrevDisplay,
            Display:PrevDisplay
        },function () {
            PrevDisplay = null;
            AllDisplay = null;
        });
    },
    componentDidUpdate:function () {
        // console.log("start");
        // reset(".IconComponent",40,171);
        // setTimeout(function () {
        //     reset(".IconComponent",40,171);
        // },2000);
    }
});
/*表情单元*/
var IconItem = React.createClass({
    render:function () {
        return(
            React.createElement("div",{className:"IconItem"},
                React.createElement("img",{
                    src:this.props.SRC,
                    onClick:this.HandleClick
                })
            )
        )
    },
    /*点击表情，将其添加到输入框中*/
    HandleClick:function (event) {
        event.preventDefault();
        this.props.AppendIcon(this.props.SRC);
    }
});
/*输入框以及发送按钮。*/
var ChatSubmit = React.createClass({
    getInitialState:function(){
        return{
            text:[]
        }
    },
    /*数据提交*/
    HandleSubmit:function(event){
        event.preventDefault();
        if(this.state.text.length>0){
            this.props.SubmitMethod(this.state.text);
            /*消息发送*/
            window.external.API_SendMsg(this.state.text.toString());
            this.setState({
                text:[]
            });
        }else {
            alert("对不起，不能发送空消息。")
        }

    },
    /*获取输入框输入或者删除之后的结果方法*/
    HandleGetInputValueOfArray:function (array,fn) {
        this.setState({
            text:array
        },function () {
            fn();
        });
    },
    /*获取光标*/
    HandleFocus:function () {
        $(".submit-input input[type=text]").focus();
    },
    render:function(){
        return(
            React.createElement("form",{className:"submit-content rel",onSubmit:this.HandleSubmit},
                React.createElement("div",{
                    className:"submit-input",
                    style:this.props.FontSS,
                    onClick:this.HandleFocus
                },
                    React.createElement("span",null,
                        React.createElement(TextIconComponent,{Data:this.state.text})
                    ),
                    React.createElement(TextInputComponent,{
                        Data:this.state.text,
                        // KeyDown:this.HandleKeyDown,
                        // Change:this.HandleChange
                        GetValueArray:this.HandleGetInputValueOfArray
                    })
                ),
                React.createElement("button",{type:"submit",className:"submit-button abs"},"发送")
            )
        )
    },
    componentDidMount:function () {
        $(".submit-input input[type=text]").focus();
    },
    componentWillReceiveProps:function (nextpros) {
        if(nextpros.ICONSRC){
            var temp = Array.prototype.slice.call(this.state.text);
            temp.push(nextpros.ICONSRC);
            this.setState({
                text:temp
            })
        }else {

        }
    }
});
/*输入框文字显示，表情显示组件*/
var TextIconComponent= React.createClass({
    render:function () {
        var TextDisplay = [];
        // console.log(typeof this.props.Data);
        // console.log(this.props.Data);
        // console.log(Array.prototype.slice.call(this.props.Data));
        // this.props.Data.forEach(function (item) {
        //     // console.log(item)
        // });
        for(var i =0; i<this.props.Data.length; i++){
            if(Array.prototype.slice.call(this.props.Data[i]).length > 1){
                // TextDisplay.push("<img class='icon-img' src="+this.props.Data[i]+"> </img>");
                TextDisplay.push(
                    React.createElement("img",{
                        className:"icon-img",
                        src:this.props.Data[i]
                    })
                )
            }else {
                TextDisplay.push(this.props.Data[i]);
            }
        }
        return(
            React.createElement("span",null,
                TextDisplay
            )
        )
    }
});
/*输入框的input输入组件*/
var TextInputComponent = React.createClass({
    getInitialState:function () {
        return{
            value:""
        }
    },
    render:function () {
        return(
            React.createElement("input",{
                id:"ONLY_INPUT",
                type:"text",
                // value:this.props.Data.join(""),
                value:this.state.value,
                onKeyDown:this.HandleKeyDown,
                onInput:this.HandleChange
            })
        )
    },
    /*键盘删除事件（backspace）*/
    HandleKeyDown:function (event) {
        if(event.keyCode == 8){
            var temp = this.props.Data;
            temp.pop();
            this.props.GetValueArray(temp,function () {
                console.log("delete")
            });
        }else {
            this.HandleChange(event);
        }
    },
    /*change事件*/
    HandleChange:function (event) {
        var cpLock = false;
        $("#ONLY_INPUT").on("compositionstart",function () {
            cpLock = true;
        });
        $("#ONLY_INPUT").on("compositionend",function () {
            cpLock = false;
        });
        $("#ONLY_INPUT").on("input",function (event) {
            if(!cpLock){
                this.setState({
                    value:event.target.value
                },function () {
                    var temp = Array.prototype.slice.call(this.state.value);
                    var Result = this.props.Data.concat(temp);
                    this.props.GetValueArray(Result,function () {
                        temp = null;
                        Result = null;
                        this.setState({
                            value:""
                        });
                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));

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
/*********************************************************/



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
/**********************************************************/
