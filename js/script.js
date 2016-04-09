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
    Color = ["rgb(27, 105, 244)", "rgb(82, 210, 199)", "rgb(98, 199, 98)", "rgb(136, 101, 203)", "rgb(226, 70, 163)", "rgb(230, 55, 73)", "rgb(148, 190, 40)", "rgb(229, 59, 108)", "rgb(240, 150, 103)", "rgb(150, 68, 62)", "rgb(70, 172, 130)", "rgb(40, 133, 231)"];
    calElements = [];
/*
  闰月大小信息表
  每个数据对应一年，每个数据20bit，前四位在这一年是闰年时候才有意义，代表这一年闰月的大小，1润大约，0润小月
  中间十二位每一位代表一个月，1为大月，0为小月
  最后四位代表闰月月份，为0则不润，与首四位搭配使用
*/
var lunarMsg = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
                0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
                0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
                0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
                0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
                0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
                0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
                0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
                0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
                0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
                0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
                0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
                0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
                0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
                0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
                0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
                0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
                0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
                0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
                0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
                0x0d520];//2100
//返回该年农历的总天数
function getLunarDays(year){
  var i, sum = 348;
  for(i = 0x8000; i > 0x8; i >>= 1){
    sum +=  (lunarMsg[year - 1900] & i) ? 1: 0;
  }
  return sum;
}
//返回闰月的月份，若无润月，则返回0
function getLeapMonth(year){
  return (lunarMsg[year - 1900] & 0xf);
}
//返回闰月天数
function getLeapDays(year){
  if(getLeapMonth(year)){
    return ((lunarMsg[y - 1900] & 0x10000) ? 30 : 29);
  }else{
    return 0;
  }
}
//返回农历月份天数
function getMonthDays(year, month){
  if((month < 1) || (month > 12)){
    return -1;
  }else{
    return (lunarMsg[year - 1900] & (0x10000 >> month)) ? 30 : 29;
  }
}
//阳历转换阴历函数
function Lunar(objDate) {
	var i, leap=0, temp=0;
	var baseDate = new Date(1900,0,31);
  objDate = new Date(objDate.year, objDate.month, objDate.date);
	var offset   = (objDate - baseDate)/86400000;
	this.dayCyl = offset + 40;
	this.monCyl = 14;
	for(i=1900; i<2100 && offset>0; i++) {
  	temp = getLunarDays(i);
  	offset -= temp;
  	this.monCyl += 12;
	}
	if(offset<0) {
  	offset += temp;
  	i--;
  	this.monCyl -= 12;
	}
	this.year = i;
	this.yearCyl = i-1864;
	leap = getLeapMonth(i); //闰哪个月
	this.isLeap = false;
	for(i=1; i<13 && offset>0; i++) {
  	//闰月
  	if(leap>0 && i === (leap+1) && this.isLeap===false){
      --i;
      this.isLeap = true;
      temp = getLeapDays(this.year);
    }else{
      temp = getMonthDays(this.year, i);
    }
  	//解除闰月
  	if(this.isLeap===true && i===(leap+1)) this.isLeap = false;
  	offset -= temp;
  	if(this.isLeap ===false) this.monCyl ++;
	}
	if(offset===0 && leap>0 && i==leap+1)
  	if(this.isLeap){
      this.isLeap = false;
    }else{
      this.isLeap = true;
      --i;
      --this.monCyl;
    }
	if(offset<0){ offset += temp; --i; --this.monCyl; }
	this.month = i;
	this.day = offset + 1;
}
var obj = getToday();
console.log(obj);
var lunar = new Lunar(obj);
console.log(lunar.month);

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
  //1.在一味数字前面加上一个0
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
  cal.innerHTML = "";
  var firstDay = new Date(year, month, 1).getDay(),
      Month;
  if(isLeapYear(year)){
    Month = LMonth;
  }else {
    Month = NLMonth;
  }
  var items = "";
  items += "<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr>";
  for(var i = 0 ; i < 5 ; i++){
    items += "<tr>";
    for(var j = 0 ; j < 7 ; j++){
      var number = i * 7 + j - firstDay + 1;
      if((number <= 0) || (number > Month[month])){
        items += "<td></td>";
      }else{
        calElements[number] = new calElement(year, month, number, i);
        items += "<td class='havaDate' id='date"+ number +"'><p>" + calElements[number].date+ "</p><span class='lunar'>初一" +"</span></td>";
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
function renderChoose(ele){
  choose.innerHTML = "";
  var zodiac,
      gan,
      zhi,
      year = ele.year,
      month = ele.month + 1,
      date = ele.date,
      day = ele.day;
  gan = Gan[(year - 3) % 10];
  zhi = Zhi[(year - 3) % 12];
  zodiac = Zodiac[(year - 1901) % 12];
  var items = "<p id='tit1'>" + year+ "年" + month + "月" + date + "日</p>";
  items += "<h1 id='theDay'>"+ date +"</h1>";
  items += "<p id='tit2'>星期" + convert(day) + "</p>";
  items += "<p id='tit3'>农历" + gan + zhi + "年 " + zodiac +"年</p>";
  choose.innerHTML += items;
}
//将星期的数字转换成汉字
function convert(day){
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
      renderChoose(clickMsg);
    }
  };
}
//生成钟表
startTime();
setInterval(startTime, 1000);
//当年月份发生变化时，调用渲染表格函数
renderCal(getToday().year, getToday().month);
renderChoose(getToday());
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
  renderChoose(getToday());
  renderCal(getToday().year, getToday().month);
  renderMonth(getToday().month);
};
delClickDate();
