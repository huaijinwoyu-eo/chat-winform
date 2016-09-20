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
    HandleLogNameSubmit:function(event){
        console.log(this.state);
        $.post("index.html",event.target.value,function(){});
    },
    //更换头像方法。
    HandleChangeImg:function(){
        console.log("更换图片");
        console.log(this)
    },
    render:function(){
        return(
            React.createElement("div",{},
                React.createElement("div",{className:"img"},
                    React.createElement("img",{src:this.props.ImgUrl,onClick:this.HandleChangeImg})
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
                        React.createElement("input",{type:"text",placeholder:"编辑个性签名",value:this.state.LogName,onChange:this.HandleLogNameChang,onBlur:this.HandleLogNameSubmit})
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
    this.name = "";
    this.imgUrl = "";
    this.logName = "";
    this.setName = function(n){
        this.name = n;
        this.propertyChange();
    };
    this.setImg = function(n){
        this.imgUrl = n;
        this.propertyChange();
    };
    this.setLogName = function(n){
        this.logName = n;
        this.propertyChange();
    };
    this.propertyChange = function(){
        ReactDOM.render(
            React.createElement(UserInfo,{Name:this.name,ImgUrl:this.imgUrl,LogName:this.logName}),
            document.getElementById("userInfo")
        );
    }
}


var nowDate = new NewDate();




ReactDOM.render(
    React.createElement(UserInfo,{Name:nowDate.name,ImgUrl:nowDate.imgUrl,LogName:nowDate.logName}),
    document.getElementById("userInfo")
);


