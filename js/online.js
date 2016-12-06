var UserInfo = React.createClass({displayName: "UserInfo",
    getInitialState:function(){
        return{
            LogName:"",
            Status:"icon-ok-sign"
        }
    },
    componentWillReceiveProps:function(res){
        this.setState({
            LogName:res.LogName
        });
        if(res.Status){
            this.setState({
                Status:"icon-ok-sign"
            });
        }else {
            this.setState({
                Status:"icon-remove-sign"
            })
        }
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
                            React.createElement("i",{className:this.state.Status})
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
                        React.createElement("input",{
                            type:"text",placeholder:"编辑个性签名",
                            value:this.state.LogName,
                            onChange:this.HandleLogNameChang
                        })
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
    this.UserName = "";//用户名
    this.HeadImg = "";//头像
    this.Status = "";//是否在线状态
    this.Post = "";//签名
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
    this.setPost = function (n) {
        this.Post = n;
        this.propertyChange();
    };
    this.propertyChange = function(){
        ReactDOM.render(
            React.createElement(UserInfo,{
                Name:this.UserName,
                ImgUrl:this.HeadImg,
                LogName:this.Post,
                Status:this.Status
            }),
            document.getElementById("userInfo")
        );
    }
}

/*nowDate可改。*/
var nowDate = new NewDate();



ReactDOM.render(
    React.createElement(UserInfo,{
        Name:nowDate.UserName,
        ImgUrl:nowDate.HeadImg,
        LogName:nowDate.Post,
        Status:nowDate.Status
    }),
    document.getElementById("userInfo")
);


