var UserInfo = React.createClass({displayName: "UserInfo",
    getInitialState:function(){
        return{
            LogName:""
        }
    },
    componentWillReceiveProps:function(res){
        this.setState({
            LogName:res.LogName
        })
    },
    HandleLogNameChang:function(event){
        this.setState({
            LogName:event.target.value
        })
    },
    HandleCLick:function () {
        alert(localStorage.getItem("Jid"));
    },
    render:function(){
        return(
            React.createElement("div",{},
                React.createElement("div",{className:"img"},
                    React.createElement("img",{src:this.props.ImgUrl,onClick:this.HandleCLick})
                ),
                React.createElement("div",{className:"info"},
                    React.createElement("div",{className:"state dib"},
                        React.createElement("div",{className:"display w20 ste"},
                            React.createElement("i",{className:"icon-ok-sign"})
                        ),
                        React.createElement("div",{className:"display dib w20"},
                            React.createElement("i",{className:"icon-caret-down"})
                        ),
                        React.createElement("ul",{className:"abs"},
                            React.createElement("li",{},
                                React.createElement("div",{className:"w20 dib"},
                                    React.createElement("i",{className:"icon-ok-sign"})
                                ),
                                React.createElement("p",{className:"dib"},"在线")
                            ),
                            React.createElement("li",{},
                                React.createElement("div",{className:"w20 dib"},
                                    React.createElement("i",{className:"icon-remove-sign"})
                                ),
                                React.createElement("p",{className:"dib"},"离开")

                            )
                        )
                    ),
                    React.createElement("p",{className:"name dib"},this.props.Name),
                    React.createElement("div",{className:"log-name mt5"},
                        React.createElement("input",{type:"text",placeholder:"编辑个性签名",value:this.state.LogName,onChange:this.HandleLogNameChang})
                    )
                )
            )
        )
    },
    componentDidMount:function(){
        $(".user-info .info .state").on("click",function(){
            $(this).find("ul.abs").slideToggle();
        });
        $(".user-info .info .state ul.abs li").on("click",function(){
            var inde = $(this).find("i").attr("class");
            $(this).parents(".state").find(".ste").find("i").attr("class",inde);
        });
    }
});
//获取数据。
function NewDate(){
    this.UserName = "";
    this.HeadImg = "";
    this.Status = "";
    this.setUserName = function(n){
        this.UserName = n;
        this.propertyChange();
    };
    this.setHeadImg = function(n){
        this.HeadImg = n;
        this.propertyChange();
    };
    this.setStatus = function(n){
        this.Status = n;
        this.propertyChange();
    };
    this.propertyChange = function(){
        ReactDOM.render(
            React.createElement(UserInfo,{Name:this.UserName,ImgUrl:this.HeadImg,LogName:this.Status}),
            document.getElementById("userInfo")
        );
    }
}

/*nowDate可改。*/
var nowDate = new NewDate();



ReactDOM.render(
    React.createElement(UserInfo,{Name:nowDate.UserName,ImgUrl:nowDate.HeadImg,LogName:nowDate.Status}),
    document.getElementById("userInfo")
);


