/**
 * Created by xiaoxiaotong on 2016/12/8.
 */
/*下来选框单元*/
var SelectItem = React.createClass({
    render:function () {
        return(
            React.createElement("div",{
                    className:"HistoryItem clearfix",
                    onClick:this.HandleClick
                },
                React.createElement("div",{className:"img fl"},
                    React.createElement("img",{src:this.props.imgurl})
                ),
                React.createElement("div",{className:"username"},this.props.username),
                React.createElement("span",{
                    className:"icon-remove",
                    title:"点击删除该信息",
                    onClick:this.HandleDelet
                })
            )
        )
    },
    HandleClick:function () {
        /*点击上传相关信息*/
        if(this.props.isRemember){
            this.props.PushData({
                username:this.props.username,
                password:this.props.password,
                imgurl:this.props.imgurl
            });
        }else{
            this.props.PushData({
                username:this.props.username,
                password:"",
                imgurl:this.props.imgurl
            })
        }
        $(".Down-select").slideUp();
        $(".form-input span").eq(0).attr("class","icon-caret-down");
    },
    HandleDelet:function (event) {
        event.preventDefault();
        event.stopPropagation();
        var Temp = JSON.parse(localStorage.getItem("LoginInfo"));
        for(var i=0; i<Temp.length; i++){
            if(Temp[i].username == this.props.username){
                Temp.splice(i,1);
                break;
            }
        }
        localStorage.setItem("LoginInfo",JSON.stringify(Temp));
        this.props.DeletData(this.props.username);
    }
});
/*登陆主窗口*/
var LoginForm = React.createClass({
    getInitialState:function () {
        return{
            UserName:"",
            PassWord:"",
            ImgUrl:"images/user-img.png",
            isRemember:false,
            HistoryList:[]
        }
    },
    HandleChange:function (value,event) {
        if(value == "UserName"){
            this.setState({
                UserName:event.target.value
            });
        }else if(value == "PassWord") {
            this.setState({
                PassWord:event.target.value
            });
        }else {
            this.setState({
                isRemember:event.target.checked
            });
        }
    },
    HandlePush:function (data) {
        this.setState({
            UserName:data.username,
            PassWord:data.password,
            ImgUrl:data.imgurl
        });
    },
    /*登录*/
    HandleSubmit:function (event) {
        event.preventDefault();
        if(this.state.UserName && this.state.PassWord){
            var Temp = [];
            var flage = true;
            if(!localStorage.getItem("LoginInfo")){
                localStorage.setItem("LoginInfo",JSON.stringify(Temp));
            }
            Temp = JSON.parse(localStorage.getItem("LoginInfo"));
            for(var i=0; i<Temp.length; i++){
                if(Temp[i].username == this.state.UserName){
                    Temp[i].username = this.state.UserName;
                    Temp[i].password = this.state.PassWord;
                    Temp[i].imgurl = this.state.ImgUrl;
                    Temp[i].isRemember = this.state.isRemember;
                    flage = false;
                    break;
                }else {
                    flage = true;
                }
            }
            if(flage){
                Temp.push({
                    username:this.state.UserName,
                    password:this.state.PassWord,
                    imgurl:this.state.ImgUrl,
                    isRemember:this.state.isRemember
                });
            }
            localStorage.setItem("LoginInfo",JSON.stringify(Temp));
            window.external.API_UserLogin(this.state.UserName,this.state.PassWord,"CSF_IM");
        }else {
            alert("用户名或密码不能为空。")
        }
    },
    /*删除*/
    HandleDelet:function (data) {
        var Temp = this.state.HistoryList;
        for(var i=0; i<Temp.length; i++){
            if(Temp[i].username == data){
                Temp.splice(i,1);
                break;
            }
        }
        this.setState({
            HistoryList:Temp
        },function () {
            Temp = null;
            if(this.state.HistoryList.length == 0){
                $(".Down-select").slideUp();
                $(".form-input span").eq(0).attr("class","icon-caret-down");
            }
        });
    },
    render:function () {
        var Temp = [];
        for(var i=0; i<this.state.HistoryList.length; i++){
            Temp.push(
                React.createElement(SelectItem,{
                    username:this.state.HistoryList[i].username,
                    imgurl:this.state.HistoryList[i].imgurl,
                    password:this.state.HistoryList[i].password,
                    isRemember:this.state.HistoryList[i].isRemember,
                    PushData:this.HandlePush,
                    DeletData:this.HandleDelet
                })
            )
        }
        return(
            React.createElement("form",{
                    onSubmit:this.HandleSubmit
                },
                React.createElement("div",{className:"user-img fl"},
                    React.createElement("img",{src:this.state.ImgUrl})
                ),
                React.createElement("div",{className:"form-input fl"},
                    /*下拉框按钮*/
                    React.createElement("span",{className:"icon-caret-down"}),
                    /*下拉选框*/
                    React.createElement("div",{className:"Down-select"},Temp),
                    React.createElement("input",{
                        type:"text",
                        className:"number",
                        placeholder:"请输入账号",
                        value:this.state.UserName,
                        onChange:this.HandleChange.bind(this,"UserName")
                    }),
                    React.createElement("input",{
                        type:"password",
                        className:"password",
                        placeholder:"请输入密码",
                        value:this.state.PassWord,
                        onChange:this.HandleChange.bind(this,"PassWord")
                    }),
                    React.createElement("input",{
                        type:"checkbox",
                        style:{
                            marginRight:5
                        },
                        id:"save",
                        checked:this.state.isRemember,
                        onChange:this.HandleChange.bind(this,"isRemember")
                    }),
                    React.createElement("label",{
                        htmlFor:"save"
                    },"记住密码"),
                    React.createElement("input",{
                        type:"submit",
                        value:"登录",
                    })
                ),
                React.createElement("div",{className:"fl"},
                    React.createElement("a",{
                        className:"help",
                        href:"#"
                    },"注册密码"),
                    React.createElement("a",{
                        className:"help",
                        href:"#"
                    },"忘记密码")
                )
            )
        )
    },
    componentDidMount:function () {
        /*点击右下角下拉*/
        $(".form-input span").eq(0).on("click",function () {
            if($(this).attr("class") == "icon-caret-down"){
                $(this).attr("class","icon-caret-up");
                $(".form-input .Down-select").slideDown();
            }else {
                $(this).attr("class","icon-caret-down");
                $(".form-input .Down-select").slideUp();
            }
        });
    },
    componentWillMount:function () {
        var Temp = [];
        if(!localStorage.getItem("LoginInfo")){
            localStorage.setItem("LoginInfo",JSON.stringify(Temp));
        }
        Temp = JSON.parse(localStorage.getItem("LoginInfo"));
        this.setState({
            HistoryList:Temp
        });
    }
});

ReactDOM.render(
    React.createElement(LoginForm),
    document.getElementById("login-form")
);