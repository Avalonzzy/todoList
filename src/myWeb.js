//dom 结构绘制完毕后就执行
//$(function(){})相当于简写的$(document).ready(function(){})
//$(document).ready() 是 dom 结构绘制完毕后就执行，不必等到加载完毕。

//如果js文件存在对于某个dom元素的操作事件，并且这个js文件是在这个dom元素之前被解析
//如果不加$(window).load(function(){})，此时网页会因为找不到dom元素报错，而使用后可以避免

$(function () {
  /* 早上：6-8点、
上午：8-11点。
中午的时间段一般分为：中午：11-13点。
下午的时间段一般分为：下午：14-17点。
晚上的时间段一般分为：晚上：18-22点、
傍晚：17-18点、
黄昏：16-17点、午夜：23-1点、
夜间：19-5点。 */
  function getHello() {
    var hello = "";
    var date = new Date();
    let hour = date.getHours();
    if (hour > 6 && hour <= 8) {
      hello = "早上好!";
      return hello;
    } else if (hour > 8 && hour <= 11) {
      hello = "上午好!";
      return hello;
    } else if (hour > 11 && hour <= 14) {
      hello = "中午好!";
      return hello;
    } else if (hour > 14 && hour <= 17) {
      hello = "下午好!";
      return hello;
    } else if (hour > 17 && hour <= 18) {
      hello = "傍晚好!";
      return hello;
    } else {
      hello = "晚上好!";
      return hello;
    }
  }

  //顶部打招呼事件
  var hello = document.querySelector("h2");
  hello.innerText = getHello();

  //获取当前准确时间函数
  function getPresentTime() {
    var date = new Date();
    //获取年份
    let year = date.getFullYear();
    //月份返回值是索引值，需要加一得到真实月份
    let month = date.getMonth() + 1;
    //获取某月中的一天，通常为1-31
    let day = date.getDate();
    //获取星期索引
    let week = date.getDay();
    //星期索引中的0代表周日
    var weekArr = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    var weekDay = weekArr[week];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    var now =
      "现在是" +
      year +
      "年" +
      month +
      "月" +
      day +
      "日" +
      weekDay +
      "[" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      "]";
    return now;
  }
  var presentTime = document.getElementById("presentTime");
  presentTime.innerText = getPresentTime();
  var body = document.body;
  var BGImg = document.querySelectorAll(".backGroundImg");
  for (let i = 0; i < BGImg.length; i++) {
    BGImg[i].onclick = function () {
      console.log(this.src);
      //为body设置背景图片
      body.style.backgroundImage = "url(" + this.src + ")";
    };
  }
  var $list3 = $(".child");
  $list3.click(function () {
    //这里this单指当前被点击的元素
    $(this).css("backgroundColor", "blue");
    $(this).siblings("li").css("backgroundColor", "aqua");
  });
  var $list4 = $("#table4>li");
  console.log($list4);
  //将css作为对象，可以不加引号、批量修饰
  $list4.css({
    height: "30px",
    width: "50px",
    backgroundColor: "wheat",
  });
  $list4.mouseover(function () {
    //获取当前li的索引值
    let index = $(this).index();
    $(this).css("backgroundColor", "orange");
    // //图片路径随着当前li元素改变
    // $('#show div').eq(index).show();
    // //隐藏其他图片
    // $('#show div').eq(index).siblings('div').hide();
    //链式编程
    $("#show div").eq(index).show().siblings("div").hide();
  });
  $list4.mouseout(function () {
    $(this).css("backgroundColor", "wheat");
  });
  //默认显示
  $(".showBox").eq(0).show();
  $(".box li").click(function () {
    let index = $(this).index();
    $(this).addClass("li-click").siblings().removeClass("li-click");
    $(".showBox").eq(index).show().siblings().hide();
  });
  /* var todoList=[
      {
        title:"今天要吃包子",
        done:false
      },{
        title:"今天要吃饺子",
        done:false
      }
    ];
    //只能保存字符串到本地，转换为json文件可以保留结构
    localStorage.setItem("todoList",JSON.stringify(todoList));
     */
  var todoList = {};
  function getData() {
    var data = localStorage.getItem("todoList");
    if (data != null) {
      return JSON.parse(data);
    } else {
      //返回空数组
      return [];
    }
  }
  function saveData(data) {
    localStorage.setItem("todoList", JSON.stringify(data));
  }
  function load() {
    let data = getData();
    $("#doing").empty();
    $("#fin").empty();
    $.each(data, function (i, n) {
      if (n.done) {
        $("#fin").prepend(
          "<li><input type='checkbox' class='check' checked='checked'><p>" +
            n.title +
            "</p><a id='" +
            i +
            "'></a></li>"
        );
      } else {
        $("#doing").prepend(
          "<li><input type='checkbox' class='check'><p>" +
            n.title +
            "</p><a id='" +
            i +
            "'></a></li>"
        );
      }
    });
    $(".count")[0].innerText = $("#doing li").length;
    $(".count")[1].innerText = $("#fin li").length;
  }

  load();
  $("#listText").on("keydown", function (event) {
    if (event.keyCode == 13 && $(this).val() != "") {
      /* var todoList=getData();
        console.log(todoList); */
      var local = getData();
      var str = $(this).val();
      $(this).prop("value", "");
      console.log(typeof str);
      local.push({
        title: str,
        done: false,
      });
      saveData(local);
      load();
    }
  });
  $("#doing,#fin").on("click", "a", function () {
    var data = getData();
    var index = $(this).attr("id");
    console.log(index);
    data.splice(index, 1);
    saveData(data);
    load();
  });
  $("#doing,#fin").on("click", "input", function () {
    var data = getData();
    var index = $(this).siblings("a").attr("id");
    console.log(index);
    data[index].done = $(this).prop("checked");
    saveData(data);
    load();
  });
  $(".helper button").on("click", function () {
    $(".helper").hide();
  });
});
