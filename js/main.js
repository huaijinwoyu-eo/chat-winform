/**
 * Created by zhongke hj on 2015/11/30.
 */

//公告栏开始
$(function () {
    var $this = $(".c-notice");
    var scrollTimer;
    $this.hover(function () {
        clearInterval(scrollTimer);
    }, function () {
        scrollTimer = setInterval(function () {
            scrollNews($this);
        }, 4000);
    }).trigger("mouseleave");
});
function scrollNews(obj) {
    var $self = obj.find("ul:first");
    var lineWidth = $self.find("li:first").width(); //获取宽度
    $self.animate({"marginLeft": -lineWidth + "px"}, 700, function () {
        $self.css({marginLeft: 0}).find("li:first").appendTo($self); //appendTo能直接移动元素
    })
}
//公告栏结束

$("document").ready(function () {
    //顶部菜单
    $(".date_now").text(getDate());
    //        通用tab
    $(".tab_group a[name*=tab]").click(function (event) {

        event.preventDefault();
        var active = $(this).attr("name");
        $(this).parents(".tab_group").find("a[name*=tab_]").removeClass("cur");
        $(this).addClass("cur");
        $(this).parents(".tab_group").find("[class*=tab_]").hide();
        $(this).parents(".tab_group").find("." + active).show();
    });
    $(".tab_group_hover [name*=tab]").hover(function () {
        var active = $(this).attr("name");
        $(this).parents(".tab_group_hover").find("[name*=tab_]").removeClass("cur");
        $(this).addClass("cur");
        $(this).parents(".tab_group_hover").find("[class*=tab_]").hide();
        $(this).parents(".tab_group_hover").find("." + active).show();
    });
    //$(".tab_group a.cur").trigger('click');
    //$('.tab_group_hover a.cur').trigger('');

//        通用pic-hover
    $(".pic-hover a").hover(function () {
        $(this).find(".shadow_title_back").stop(true, true).animate({bottom: "-40px"});
        $(this).find(".shadow_detail_back").stop(true, true).animate({bottom: "0"});
    }, function () {
        $(this).find(".shadow_title_back").stop(true, true).animate({bottom: "0"});
        $(this).find(".shadow_detail_back").stop(true, true).animate({bottom: "-100%"});
    });


    if ($(".icon-comments")[0]){
        $(".icon-comments").click(function(e){
            e.preventDefault();
            if($(".news_comment .comment-box textarea")[0]){
                var y = $(".news_comment .comment-box textarea").offset().top;
                $("html").animate({scrollTop:y+"px"});
                $(".news_comment .comment-box textarea").focus();
            }

        });
    }

    //导航二级菜单
    $(".top_menu > li ").hover(function () {
            $(this).children("ul.ul_child").fadeIn(200)
        }, function () {
            $(this).children("ul.ul_child").fadeOut(200)
        }
    );
    $(".top_menu_new > li ").hover(function () {
            $(this).children("ul.ul_child").fadeIn(200)
        }, function () {
            $(this).children("ul.ul_child").fadeOut(200)
        }
    );

    function redis(){
        $(".title_banner .picture div").eq(0).css("display","block");
        $(".title_banner .picture div").eq(1).css("display","block");
        $(".title_banner .picture div").eq(2).css("display","block");
        $(".title_banner .picture div").eq(3).css("display","block");
        $(".title_banner .picture div").eq(4).css("display","block");
        $(".title_banner .picture div").eq(5).css("display","block");
        $(".title_banner .picture div").eq(6).css("display","block");
        $(".title_banner .picture div").eq(0).animate({opacity:'1'},"500","linear");
        $(".title_banner .picture div").eq(1).delay(200).animate({opacity:'1'},"500","linear");
        $(".title_banner .picture div").eq(2).delay(400).animate({opacity:'1'},"500","linear");
        $(".title_banner .picture div").eq(3).delay(600).animate({opacity:'1'},"500","linear");
        $(".title_banner .picture div").eq(4).delay(800).animate({opacity:'1'},"500","linear");
        $(".title_banner .picture div").eq(5).delay(1000).animate({opacity:'1'},"500","linear");
        $(".title_banner .picture div").eq(6).delay(1200).animate({opacity:'1'},"500","linear");
    };
    redis();
    setInterval(function(){
        $(".title_banner .picture div").css({
            'display':'none',
            'opacity':'0'
        });
        $('.title_banner .text ul').animate({top:"-=100px"},function(){
            if($(".title_banner .text ul").css('top')=='-200px'){
                $('.title_banner .text ul').css({top:"0px"});
            }
        });
        redis();
    },5000);



    $(".slider_more a.item,.video-list ul.row li.col-4 a").hover(function () {
            $(this).children(".shadow_title_back").stop(true, true).animate({bottom: "-40px"}, "fast");
            $(this).children(".shadow_detail_back").stop(true, true).animate({bottom: "0"}, "fast");
        },
        function () {
            $(this).children(".shadow_title_back").stop(true, true).animate({bottom: 0}, "fast");
            $(this).children(".shadow_detail_back").stop(true, true).animate({bottom: "-100%"}, "fast");
        });

    //顶部搜索
    $("ul.top_link li.search").bind("click", function (e) {
        e.preventDefault();
        $(".search-box").show(500);
    });
    //顶部二维码
    $("li.mob").hover(function () {
        var tLeft = $(this).offset().left;
        var tTop = $(this).offset().top;
        $("body").append("<div id='qr-top'><i></i><b></b></div>" +
            "<div id='qr-top1'><i></i><b></b></div>" +
            "<div id='qr-top2'><i></i><b></b></div>");
        $("#qr-top").css({top: tTop + 26, left: tLeft - 50});
        $("#qr-top1").css({top: tTop + 26, left: tLeft - 210});
        $("#qr-top2").css({top: tTop + 26, left: tLeft -370});
    }, function () {
        $("#qr-top").remove();
        $("#qr-top1").remove();
        $("#qr-top2").remove();
    });

    if ($("#zhuti")[0]) {
        var container = $("#zhuti");
        var rightlist = container.children(".right");
        var container_height = container.height();
        var rightlist_height = rightlist.height();
        var container_pos_y = container.position().top;
        var rightlist_pos_y = rightlist.offset().top;

        $(window).scroll(stops);
    }

    function stops() {

        var stop_point1 = $(window).scrollTop() - container_pos_y - rightlist_height + $(window).height();
        var stop_point2 = $(window).scrollTop() - container_pos_y - container_height + $(window).height();
        if (stop_point2 - 20 > 0) {
            return false
        } else if (stop_point1 > 0) {

            var a = $(window).scrollTop() - rightlist_height + $(window).height();
            rightlist.offset({top: a})
        } else if (stop_point1 < 0) {

            rightlist.offset({top: rightlist_pos_y})
        }
    }


});
function getWeek() {
    var myDate = new Date();
    var n = myDate.getDay();
    switch (n) {
        case 0:
            return '星期日';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六'
    }
}

function getDate() {
    var myDate = new Date();
    myDate.getFullYear();
    myDate.getMonth();
    myDate.getDate();
    myDate.getDay();
    return myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日 " + getWeek();
}

$(function () {
    var $piclist_item = $(".piclist-item");

    //图片列表鼠标经过效果
    if ($piclist_item[0]) {
        piclistHover();
        addmask();
    }

    function piclistHover() {

        $piclist_item.hover(function () {
            var $this = $(this);
            var title = $this.find(".title");
            var item_mask = $this.find(".item-mask");
            var title_height = title.height();
            title.stop().animate({
                bottom: -title_height + "px"
            }, 300, "swing")
            item_mask.stop().animate({
                top: 0
            }, 300, "swing")
        }, function () {
            var $this = $(this);
            $this.find(".title").stop().animate({
                bottom: "0"
            }, 300, "swing")
            $this.find(".item-mask").stop().animate({
                top: "100%"
            }, 300, "swing")

        })
    }

    //图片列表标记视频，图片的添加

    function addmask() {
        var pic_mask = "<i class='pic-mask'></i>";
        var video_mask = "<i class='video-mask'></i>";
        var title = $piclist_item.find(".title");
        //alert(title.attr("media"))
        title.each(function () {
            if ($(this).attr("media") == "pic") {
                $(this).append(pic_mask);
            } else if ($(this).attr("media") == "video") {
                $(this).append(video_mask);
            }
        })


    }


});

//<!--添加首页和收藏js-->
//<!--添加首页和收藏js-->
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加!");
        }
    }
}


//设为首页
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
        }
    }
}