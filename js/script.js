var theYear =  document.getElementById('year'),
    theMonth = document.getElementById('month'),
    cal = document.getElementById('cal'),
    choose = document.getElementsByClassName('choose')[0],
    btnToday = document.getElementsByClassName('btn')[0],
    bjTime = document.getElementsByClassName('time')[0],
    monthImg = document.getElementsByClassName('monthImg')[0],
    tableTh = document.getElementsByTagName('th'),
    LMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    NLMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Zodiac = ["牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪", "鼠"],
    Gan = ["癸","甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬"],
    Zhi = ["亥","子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌"],
    Color = ["rgb(27, 105, 244)", "rgb(82, 210, 199)", "rgb(98, 199, 98)", "rgb(136, 101, 203)", "rgb(226, 70, 163)", "rgb(230, 55, 73)", "rgb(250, 186, 39)", "rgb(229, 59, 108)", "rgb(240, 150, 103)", "rgb(150, 68, 62)", "rgb(70, 172, 130)", "rgb(40, 133, 231)"],
    calElements = [],
    lunarDates = [];

//生成日期对象
function calElement(year, month, date, day){
    this.year = year;
    this.month = month;
    this.date = date;
    this.day = day;
}
//获取今天的时间信息
function getToday(){
  var today = new Date(),
      date = today.getDate(),
      month = today.getMonth(),
      year = today.getFullYear(),
      day = today.getDay();
  var element  = new calElement(year, month, date, day);
  return element;
}
//生成钟表
function startTime(){
  var today = new Date();
  var hour = today.getHours(),
      minutes = today.getMinutes(),
      second = today.getSeconds();
  //1.在一位数字前面加上一个0
  function check(data){
    if(data < 10){
      data = "0" + data;
    }
    return data;
  }
  hour = check(hour);
  minutes = check(minutes);
  second = check(second);
  //2.渲染时间
  bjTime.innerHTML = "北京时间:" + hour + ":" + minutes + ":" + second;
}
//获取选择的年份和月份
function getTheYear(){
  var selectYear = theYear.value;
  return selectYear;
}
function getTheMonth(){
  var selectMonth = theMonth.value;
  return selectMonth;
}
//判断是否是闰年
function isLeapYear(year){
  if(((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)){
    return true;
  }else{
    return false;
  }
}
//渲染月份图片函数
function renderMonth(month){
  month = parseInt(month) + 1;
  monthImg.style.backgroundImage = "url(./images/month"+ month +".png)";
}
//渲染日历函数
function renderCal(year, month){
  year = parseInt(year);
  month = parseInt(month);
  cal.innerHTML = "";
  var firstDay = new Date(year, month, 1).getDay(),
      Month;
  if(isLeapYear(year)){
    Month = LMonth;
  }else {
    Month = NLMonth;
  }
  var items = "";
  var convert = new LunarSolarConverter();
  items += "<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr>";
  for(var i = 0 ; i < 5 ; i++){
    items += "<tr>";
    for(var j = 0 ; j < 7 ; j++){
      var number = i * 7 + j - firstDay + 1;
      if((number <= 0) || (number > Month[month])){
        items += "<td></td>";
      }else{
        solar = new Solar();
        calElements[number] = new calElement(year, month, number, i);
        lunarDates[number] = convert.solarToLunar({solarYear:year, solarMonth:month+1, solarDay:number});
        items += "<td class='havaDate' id='date"+ number +"'><p>" + calElements[number].date+ "</p><span class='lunar'>"+lunarDates[number].lunarDay+"</span></td>";
      }
    }
    items += "</tr>";
  }
  cal.innerHTML = items;
  console.log(122,tableTh);
  for(var k = 0; k < tableTh.length; k++){
    tableTh[k].style.color = Color[month];
  }
}
function renderChoose(ele, element){
  choose.innerHTML = "";
  var zodiac,
      gan,
      zhi,
      year = ele.year,
      month = ele.month + 1,
      date = ele.date,
      day = ele.day,
      thelunarMonth = element.lunarMonth,
      thelunarDay = element.lunarDay;
  gan = Gan[(year - 3) % 10];
  zhi = Zhi[(year - 3) % 12];
  zodiac = Zodiac[(year - 1901) % 12];
  var items = "<p id='tit1'>" + year+ "年" + month + "月" + date + "日</p>";
  items += "<h1 id='theDay'>"+ date +"</h1>";
  items += "<p id='tit2'>星期" + toConvert(day) + "</p>";
  items += "<p>" + toConvert(thelunarMonth) + "月" + thelunarDay + "</p>";
  items += "<p id='tit3'>农历" + gan + zhi + "年 " + zodiac +"年</p>";
  choose.innerHTML += items;
}
//将星期的数字转换成汉字
function toConvert(day){
  switch (day) {
    case 0:
      return '日';
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    default:
      return '六';
  }
}
//利用事件委托实现点击日期查看详细情况
function delClickDate(){
  cal.onclick = function(evnt){
    evnt = evnt || window.evnt;
    target = evnt.target || evnt.srcElement;
    if(((target.tagName.toLowerCase() === "td") && (target.id !== "")) || (target.parentNode.tagName.toLowerCase() === "td")){
      if((target.tagName.toLowerCase() === "td") && (target.id !== "")){
        clickNum = target.id;
      }else{
        clickNum = target.parentNode.id;
      }
      var clickNum = clickNum.replace(/[^0-9]/ig,"");
      var clickMsg = calElements[clickNum];
      var clickMsg1 = lunarDates[clickNum];
      renderChoose(clickMsg, clickMsg1);
    }
  };
}

var convert = new LunarSolarConverter();
solar = new Solar();
lunarDateToday = convert.solarToLunar({solarYear:getToday().year, solarMonth:getToday().month+1, solarDay:getToday().date});


//生成钟表
startTime();
setInterval(startTime, 1000);
//当年月份发生变化时，调用渲染表格函数
renderCal(getToday().year, getToday().month);
renderChoose(getToday(), lunarDateToday);
renderMonth(getToday().month);
theYear.onchange = function(){
  renderCal(getTheYear(), getTheMonth());
};
theMonth.onchange = function(){
  var year = getTheYear();
  var month = getTheMonth();
  renderCal(year, month);
  renderMonth(month);
};
btnToday.onclick = function(){
  renderChoose(getToday(), lunarDateToday);
  renderCal(getToday().year, getToday().month);
  renderMonth(getToday().month);
};
delClickDate();
