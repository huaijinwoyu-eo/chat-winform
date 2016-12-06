/*搜索组件（总）*/
var Search = React.createClass({
    displayName:"Search",
    getInitialState:function () {
        return{
            searchText:"",
            HistoryList:[],
            FriendList:[],
            display:[]
        }
    },
    HandleChange:function (event) {
        this.setState({
            searchText:event.target.value
        });
        var Temp = [];
        if(event.target.value){
            // console.log(this.state.FriendList[0]);
            for(var i=0; i<this.state.FriendList[0].length; i++){
                var String = this.state.FriendList[0][i].UserName;
                if(String){
                    if(String.indexOf(event.target.value)!=-1){
                        Temp.push(this.state.FriendList[0][i]);
                    }
                }else {
                    continue;
                }
            }
            this.setState({
                display:Temp
            });
        }else {
            this.setState({
                display:this.state.HistoryList
            });
        }
    },
    HandleFocus:function () {
        $("#Search .ResultList").slideDown();
    },
    HandleBlur:function () {
        $("#Search .ResultList").slideUp();
    },
    render:function () {
        return(
            React.createElement("form",null,
                React.createElement("input",{
                    type:"text",
                    className:"fl",
                    placeholder:"搜索联系人、群",
                    value:this.state.searchText,
                    onChange:this.HandleChange,
                    onFocus:this.HandleFocus,
                    onBlur:this.HandleBlur
                }),
                React.createElement("input",{
                    type:"button",
                    className:"fr",
                    value:""
                }),
                React.createElement(ResultList,{DisplayData:this.state.display})
            )
        )
    },
    componentDidMount:function () {
        var CurrentJid = localStorage.getItem("Jid");
        if(CurrentJid){
            if(!localStorage.getItem("HistoryList")){
                var CurrentObj = {};
                CurrentObj[CurrentJid] = [];
                localStorage.setItem("HistoryList",JSON.stringify(CurrentObj));
            }
            if(!localStorage.getItem("FriendList")){
                var CurrentObjF = {};
                CurrentObjF[CurrentJid] = [];
                localStorage.setItem("FriendList",JSON.stringify(CurrentObjF));
            }
            this.setState({
                HistoryList:JSON.parse(localStorage.getItem("HistoryList"))[CurrentJid],
                display:JSON.parse(localStorage.getItem("HistoryList"))[CurrentJid]
            });
            /*获取当前用户好友的所有好友。*/
            var Temp = JSON.parse(localStorage.getItem("FriendList"))[CurrentJid];
            var ResutlTemp = [];
            for(var i=0; i<Temp.length; i++){
                ResutlTemp.push(Temp[i].Users);
            }
            this.setState({
                FriendList:ResutlTemp
            },function () {
                Temp = null;
                ResutlTemp = null;
            })
        }
    }
});
/*搜索组件内容展示列表，输入框下边显示。*/
var ResultList = React.createClass({
    displayName:"ResultList",
    render:function () {
        var DisplayArray = [];

        for(var i=0 ; i<this.props.DisplayData.length; i++){
            DisplayArray.push(
                React.createElement(ListItem,{
                    onlineTag:this.props.DisplayData[i].onlineTag || this.props.DisplayData[i].Online,
                    imgUrl:this.props.DisplayData[i].imgUrl || this.props.DisplayData[i].ImgUrl,
                    jid:this.props.DisplayData[i].jid || this.props.DisplayData[i].Jid,
                    name:this.props.DisplayData[i].name || this.props.DisplayData[i].UserName,
                    job:this.props.DisplayData[i].job || this.props.DisplayData[i].Job,
                    group:this.props.DisplayData[i].group || ""
                })
            );
        }


        return(
            React.createElement("div",{className:"ResultList"},
                DisplayArray
            )
        )
    }
});
/*搜索列表单元*/
var ListItem = React.createClass(({
    displayName:"ListItem",
    render:function () {
        return(
            React.createElement("div",{className:"ListItem clearfix"},
                React.createElement("div",{className:"img"},
                    React.createElement("img",{src:this.props.imgUrl})
                ),
                React.createElement("div",{className:"info"},
                    React.createElement("span",{className:"name"},this.props.name),
                    React.createElement("span",{className:"status"},this.props.job)
                )
            )
        )
    }
}));

ReactDOM.render(
    React.createElement(Search,null),
    document.getElementById("Search")
);


