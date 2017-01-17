$("document").ready(function () {
    // //通用tab
    // $(".tab_group a[name*=tab]").click(function (event) {
    //     event.preventDefault();
    //     var active = $(this).attr("name");
    //     $(this).parents(".tab_group").find("a[name*=tab_]").removeClass("cur");
    //     $(this).addClass("cur");
    //     $(this).parents(".tab_group").find("[class*=tab_]").hide();
    //     $(this).parents(".tab_group").find("." + active).show();
    // });
    // $(".tab_group_hover [name*=tab]").hover(function () {
    //     var active = $(this).attr("name");
    //     $(this).parents(".tab_group_hover").find("[name*=tab_]").removeClass("cur");
    //     $(this).addClass("cur");
    //     $(this).parents(".tab_group_hover").find("[class*=tab_]").hide();
    //     $(this).parents(".tab_group_hover").find("." + active).show();
    // });
});
/*侧边滚动条函数（初始化）*/
function reset(target,speed,TH){
    var BarB = $(target).find('.listbar'),
        BarC = $(target).find('.list-scrollbar'),
        BarP = $(target).find('.list-left'),
        BarCMove=false,
        bm=0,
        BarCX;
    BarC.mousedown(function(e){
        e.stopPropagation();
        BarCMove=true;
        var BarBX = parseInt(BarC.css("top"));
        BarCX=e.pageY-BarBX;
    });
    //获取页面单个学校图片的宽度。
    //var Owidth = $('.xiaohui .dis-mis').find('li').width()+6;
    //获得总长度
    var allwidth = $(target).find('.inner').height();
    //获取展示窗口的宽度。
    var Owindow = $(target).height();
    //获取隐藏部分的长度
    var Oywidth = allwidth-Owindow;
    /*如果有隐藏的部分则显示滚动条，否则隐藏滚动条。*/
    if(Oywidth > 0){
        $(target).find(".listbar").show();
    }else {
        $(target).find(".listbar").hide();
        $(target).find(".inner").css('top',0);
        $(target).find(".list-scrollbar").css("top",0);
    }
    BarC.css('height',(Owindow/allwidth)*BarB.height());
    var BarBW = BarB.height()-BarC.height();
    if (Oywidth>0) {
        BarB.off("click").on('click',function(e){
            BarCX=BarC.height();
            var PageY = e.pageY - TH;
            var CX=PageY-BarCX;
            if(CX<=0){
                CX=0;
            }else if(CX>=BarBW){
                CX = BarBW;
            }else{
                CX = PageY - BarCX;
            }
            BarC.css({"top":CX});
            BarP.css({"height":parseInt(CX)+"px"});
            $(target).find('.inner').css('top',-((BarP.height())/BarBW*Oywidth));
            bm = (BarP.height())/BarBW*Oywidth;
        });
        $(document).mousemove(function(e){
            e.stopPropagation();
            if(BarCMove){
                var PageY = e.pageY;
                var CX=PageY-BarCX;
                if(CX<=0){
                    CX=0;
                }else if(CX>=BarBW){
                    CX = BarBW;
                }else{
                    CX = PageY - BarCX;
                }
                BarC.css({"top":CX});
                BarP.css({"height":parseInt(CX)+"px"});
                bm = (BarP.height())/BarBW*Oywidth;
                $(target).find('.inner').css('top',-((BarP.height())/BarBW*Oywidth));
            }
        }).mouseup(function(e){
            e.stopPropagation();
            BarCMove=false;
        });
        $(target).find(".inner").on('mousewheel',function(event){
            if(event.deltaY>0){
                if(bm<=0){
                    bm=0;
                }else{
                    bm -= speed;
                }
            }else{
                if(bm>=Oywidth){
                    bm=Oywidth;
                }else{
                    bm += speed;
                }
            }
            $(this).css('top',-bm);
            BarC.css({"top":(bm/Oywidth)*BarBW});
            BarP.css({"height":BarC.css('top')+"px"});
        });
    }else{
        BarC.css('height',BarB.height()+"px");
    }
}
/********************************************************************/