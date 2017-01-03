var TipsWindow = React.createClass({
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
        return(
            React.createElement("div",null,
                React.createElement("div",{className:"title clearfix"},
                    React.createElement("div",{className:"img fl"},
                        React.createElement("img",{src:this.props.UserInfo.imgurl})
                    ),
                    React.createElement("div",{className:"target-info"},
                        React.createElement("span",{className:"name"},this.props.UserInfo.nickname),
                        React.createElement("span",{className:"job"},this.props.UserInfo.job)
                    ),
                    React.createElement("span",{className:"icon-remove"})
                ),
                React.createElement("div",{className:"for"},"向您发送文件"),
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
                Btn3:"重试"
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
                Btn3:"打开文件"
            });
                this.HandelClick_2 = this.HandleOpenFile;
                this.HandelClick_3 = this.HandleOpenFolder;
                break;
            case 3 :this.setState({
                isSuccess:false,
                isProgress:false,
                Btn1:"",
                Btn2:"",
                Btn3:"重试"
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
});

function GetTargetInfo(){
    this.FileInfo = {};
    this.UserInfo = {};
    this.getInfo = function (data) {
        var data = JSON.parse(data);
        this.FileInfo = data.file;
        this.UserInfo = data.user;
        this.propertyChange();
    };
    this.propertyChange = function () {
        ReactDOM.render(
            React.createElement(TipsWindow,{
                FileInfo:this.FileInfo,
                UserInfo:this.UserInfo
            }),
            document.getElementById("window")
        )
    }
}
var TipsInfo = new GetTargetInfo();

ReactDOM.render(
    React.createElement(TipsWindow,{
        FileInfo:TipsInfo.FileInfo,
        UserInfo:TipsInfo.UserInfo
    }),
    document.getElementById("window")
);


























