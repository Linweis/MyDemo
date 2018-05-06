var Pdata = JSON.parse(localStorage.getItem('person'))||[];
var myBmi = document.querySelector('.record');
var sendData = document.querySelector('.send');
var back = document.querySelector('.back');
var backFin = document.getElementById('back-bo');
var clearAll = document.getElementById('clear');



//監聽事件 點擊後觸發 
sendData.addEventListener('click', addData);
backFin.addEventListener('click', backData);
back.addEventListener('click', backremove);
myBmi.addEventListener('click',done)
clearAll.addEventListener('click',doneAll)
upData(Pdata);

//儲存使用者資訊
function addData() {
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var ans = height / 100;
    var square = ans * ans;
    var bns = weight / square;
    var bmi = bns.toFixed(2);
    var body = {
        hei: height,
        wei: weight,
        bmi: bmi,
    }
    if (height == '' || weight == ''||body.bmi<1 ||body.bmi >= 100 ){
        alert('請輸入正確數字')
    }else if (isNaN(height)==true||isNaN(weight)==true){
        alert('您輸入非數字資料')
    }else{Pdata.push(body);}
    localStorage.setItem('person', JSON.stringify(Pdata));



    //改變按鈕
    function color() {
        if (body.bmi>=1 &&body.bmi < 18.5) {
            sendData.setAttribute('class', 'thin');
            sendData.setAttribute('value', body.bmi);
            sendData.setAttribute('disabled', 'disabled');
        }
        if (body.bmi >= 18.5 && body.bmi <= 24.9) {
            sendData.setAttribute('class', 'good');
            sendData.setAttribute('value', body.bmi);
            sendData.setAttribute('disabled', 'disabled');
        }
        if (body.bmi > 24.9 && body.bmi <= 29.9) {
            sendData.setAttribute('class', 'fat');
            sendData.setAttribute('value', body.bmi);
            sendData.setAttribute('disabled', 'disabled');
        }
        if (body.bmi > 29.9 && body.bmi <= 35) {
            sendData.setAttribute('class', 'toofat');
            sendData.setAttribute('value', body.bmi);
            sendData.setAttribute('disabled', 'disabled');
        }
        if  (body.bmi >35.1&& body.bmi <= 100) {
            alert('當心罹患心血管疾病！')
            sendData.setAttribute('class', 'toofat');
            sendData.setAttribute('value', body.bmi);
            sendData.setAttribute('disabled', 'disabled');
        }

    }
    //返回鍵背景顏色
    function backColor() {
        var backbot = back.setAttribute('class', 'back-fin');
        if (body.bmi < 18.5) {

            backFin.style.backgroundColor = '#31BAF9';
            backFin.style.border = '3px solid #424242';
            
        }
        if (body.bmi >= 18.5 && body.bmi <= 24.9) {

            backFin.style.backgroundColor = '#86D73F';
            backFin.style.border = '3px solid #424242';
           
        }
        if (body.bmi > 24.9 && body.bmi <= 29.9) {

            backFin.style.backgroundColor = '#FF982D';
            backFin.style.border = '3px solid #424242';
           
        }
        if (body.bmi > 29.9 && body.bmi <= 35) {

            backFin.style.backgroundColor = '#FF1200';
           backFin.style.border = '3px solid #424242';
        }
        if (body.bmi >35.1&& body.bmi <= 100) {

            backFin.style.backgroundColor = '#FF1200';
           backFin.style.border = '3px solid #424242';
        }
        if (height == '' || weight == ''||body.bmi<1 ||body.bmi >= 100) {
            backremove();

        }
        if (isNaN(height)==true||isNaN(weight)==true) {
            backremove();
        }

    }
    
    color();
    backColor();
    borderColor(Pdata);
    upData(Pdata);
}


//返回
function backData() {
    sendData.setAttribute('class', 'send');
    sendData.setAttribute('value', '看結果');
    sendData.removeAttribute('disabled');
    
}
//返回鍵消失
function backremove() {
    backFin.setAttribute('class', 'back');
}

//邊框顏色與BMI是否標準
function borderColor(Pdata) {
    if (Pdata.bmi < 18.5) {
        return {color:'thin-color',result:'過輕'};
    }
    if (Pdata.bmi >= 18.5 && Pdata.bmi <= 24.9) {
        return {color:'good-color',result:'標準'};
    }
    if (Pdata.bmi > 24.9 && Pdata.bmi <= 29.9) {
        return {color:'fat-color',result:'稍重'};
    }
    if (Pdata.bmi > 29.9 && Pdata.bmi <= 35) {
        return {color:'toofat-color',result:'過重'};
    }
    if(Pdata.bmi>35.1&&Pdata.bmi<=100) {
        return {color:'toofat-color',result:'危險'};
    }
}
//刪除
  function done(e){
    e.preventDefault();//阻止預設事件
    if(e.target.nodeName !== 'A'){return};//不是A連結則return
    var index = e.target.dataset.index; //撈出data-index裡的第某個
    Pdata.splice(index, 1);//與Pdata匹配被撈的data-index，在滑鼠點擊後刪除
    localStorage.setItem('person', JSON.stringify(Pdata));
    upData(Pdata);
}  
//刪除全部
function doneAll(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return};
    var index = e.target.dataset.index;
    Pdata.splice(index, Pdata.length);
    localStorage.setItem('person', JSON.stringify(Pdata));
    upData(Pdata);
    backData()
    backremove()
}  


//更新網頁內容
function upData(items) {
    str = '';
    for (var i = 0; i < items.length; i++) {
        str += '<li class=' +borderColor(Pdata[i]).color+'>'+'&ensp;&nbsp;&ensp;&ensp;' +borderColor(Pdata[i]).result+ '&ensp;&ensp;&nbsp&ensp;&ensp;&nbsp&ensp;&ensp;&nbsp&ensp;&ensp;&nbsp&ensp;&ensp;&nbsp&ensp;&ensp;&nbsp' +'<span>'+  'BMI' +'</span>'+  '&nbsp' + items[i].bmi + '&ensp;&ensp;&nbsp' +'<span>'+  'height' +'</span>'+ '&nbsp' + items[i].hei +  '&ensp;&ensp;&nbsp' +'<span>'+ 'weight' +'</span>'+ '&nbsp' + items[i].wei + '<a href="#" data-index= ' + i + ' />❌</a>'+'<li>'
    } //data-index為自定義屬性，與done()匹配
    myBmi.innerHTML = str;
}



