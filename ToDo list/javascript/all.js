
$('ul').on('click','li',function(){
    $(this).toggleClass('completed') //點擊後添加底線並變灰色，再次點擊則恢復
});
//刪除todo
$('ul').on('click','span',function(e){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    }); //找到父元素並刪除
    e.stopPropagation();//中止冒泡事件
});

$("input[type='text']").keypress(function(e){ //按下ENTER後添加新todo
    if(e.which ===13){ //ENTER為13
        var todoText = $(this).val();//input輸入的新todo值
        $(this).val('');
        $('ul').append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
    }
});

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle(500); //輸入框顯示或隱藏
})