// common --------------------------------------------------------------
$(".back").click(function () {
  history.back();
});

$(".home").click(function () {
  window.location.href = "main.html";
});

var star = $(".stars");
var star2 = $(".star2");
var inputCk = $('input[type="checkbox"]');

star.on("click", function (e) {
  var stAttr = star.is(":checked");

  if (stAttr) {
    inputCk.addClass("check");
    inputCk.attr({ checked: true });
  } else {
    inputCk.removeClass("check");
    inputCk.attr({ checked: false });
  }
});

$(".important").click(function () {
  $(this).toggleClass("active");
});

$(".wrap-content input[type=text]").on("change keyup paste", function () {
  if ($(this).val() !== "") {
    $(this).next().show();
  } else {
    $(this).next().hide();
  }
});

$(".text-box textarea").on("change keyup paste", function () {
  if ($(this).val() !== "") {
    $(this).next().show();
  } else {
    $(this).next().hide();
  }
});

$(".cancel").click(function () {
  $(this).prev().val("");
  $(this).hide();
});

$(document).ready(function () {
  var text = $("input[type=text]");
  var textList = [];
  for (var i = 0; i < text.length; i++) {
    if (text.eq(i).val() !== "") {
      textList.push(text.eq(i));
    }
  }

  for (var p = 0; p < textList.length; p++) {
    textList[p].next().show();
  }

  // textarea
  if ($("#memo").text() !== "") {
    $("#memo").next().show();
  }

  // img
  if ($("#editImg").attr("src") !== "") {
    $("#editImg").show();
  }

  var starArr = [];
  for (var i = 0; i < $(".list li").length; i++) {
    $(".list li")
      .eq(i)
      .find(".stars")
      .attr("id", "listStar" + i);
    $(".list li")
      .eq(i)
      .find(".star-label")
      .attr("for", "listStar" + i);
    starArr.push($("#listStar" + i));
  }

  for (var t = 0; t < $(".select-drop1 li").length; t++) {
    $(".select-drop1 li")
      .eq(t)
      .click(function () {
        $(".select-drop1 li").removeClass("active");
        $(this).addClass("active");
        $(".select-drop1").hide();
        $(".se1-drop-btn").removeClass("open");
        $(".search1-select").text($(this).text());
      });
  }

  for (var t = 0; t < $(".select-drop2 li").length; t++) {
    $(".select-drop2 li")
      .eq(t)
      .click(function () {
        $(".select-drop2 li").removeClass("active");
        $(this).addClass("active");
        $(".select-drop2").hide();
        $(".se2-drop-btn").removeClass("open");
        $(".search2-select").text($(this).text());
      });
  }

  $(".progress span").each(function () {
    var percent = $(this).attr("data-progress");
    $(this).css("width", percent + "%");
  });

});

$(".add").click(function () {
  window.location.href = "./add.html";
});

$(".list li").slice(0, 5).show();
$(".view-more").click(function (e) {
  e.preventDefault();

  $(".list li:hidden").slice(0, 5).show();
});

$(".list-name").click(function () {
  window.location.href = "./view.html";
});

$(".select01").click(function () {
  $(".select-drop1").toggle();
  $(".se1-drop-btn").toggleClass("open");
  if ($(".select-drop2").css("display") === "block") {
    $(".select-drop2").hide();
    $(".se2-drop-btn").removeClass("open");
  }
});

$(".select02").click(function () {
  $(".select-drop2").toggle();
  $(".se2-drop-btn").toggleClass("open");
  if ($(".select-drop1").css("display") === "block") {
    $(".select-drop1").hide();
    $(".se1-drop-btn").removeClass("open");
  }
});

$(".edit").click(function () {
  window.location.href = "./edit.html";
});

$(".customer-search").click(function () {
  $("#popSearch").val("");
  $("#csPop").show();
});

$("#searchCheck").click(function () {
  if ($("#popSearch").val() == "") {
    alert("고객사를 검색해주세요.");
  }
});

$(".dots").click(function () {
  $(".drop-box").toggle();
});

$(".add-cancel").click(function () {
  history.back();
});

var sl = $(".slide-list");
var slL = $(".slide-list li");
var slLen = $(".slide-list li").length;

var slW = slLen * (slL.width() + 40); // li 개수 + default width
slM = (slLen - 1) * 50; // li 개수 - 1 * default margin
sl.width(slW + slM + "px"); // ul width 지정

var slLW = $(".sl1").width() + 90;

var prev = $(".fee-prev");
var next = $(".fee-next");

let pages = 0;
let positionValue = 0;

function feeNext() {
  var windowWidth = $(window).width();

  if(windowWidth > 374){
    if (pages < slLen - 1) {
      prev.show();
      positionValue -= slLW;
      slL.css("transform", `translateX(${positionValue}px)`);
      pages += 1;
    }
  
    if (pages == slLen - 1) {
      next.addClass("hidden");
    }
  }else{
    if (pages < slLen - 1) {
      prev.show();
      var slsLw = 330;
      positionValue -= slsLw;
      slL.css("transform", `translateX(${positionValue}px)`);
      pages += 1;
    }
  
    if (pages == slLen - 1) {
      next.addClass("hidden");
    }
  }
}

function feePrev() {
  var windowWidth = $(window).width();

  if(windowWidth > 374){
    if (pages <= slLen - 1) {
      next.removeClass("hidden");
      positionValue += slLW;
      slL.css("transform", `translateX(${positionValue}px)`);
      pages -= 1;
    }
  
    if (pages == 0) {
      prev.hide();
    }
  }else{
    if (pages <= slLen - 1) {
      next.removeClass("hidden");
      var slsLw = 330;
      positionValue += slsLw;
      slL.css("transform", `translateX(${positionValue}px)`);
      pages -= 1;
    }
  
    if (pages == 0) {
      prev.hide();
    }
  }

  
}

$(".popup1").click(function () {
  $("#updatePop").show();
});

$(".popup2").click(function () {
  $("#updatePop2").show();
});

$(".popup3").click(function () {
  $("#updatePop3").show();
});

$(".confirm").click(function () {
  $("#sigPop").show();
  $("body").css("overflow", "hidden");
  canvasResize();
});

$(".close").click(function () {
  $(".modal").hide();

  $("body").css("overflow", "auto");
});

var canvas;
var div;

var ctx;
var drawble = false;

// $(window).load(function () {
//   // [초기 전역 변수 객체 등록 실시]
//   canvas = $("#canvas");
//   div = $(".sign-box");

//   ctx = canvas[0].getContext("2d"); //캔버스 오브젝트 가져온다

//   init();

//   canvasResize();
// });

function init() {
  $(window).on("resize", canvasResize);

  canvas.on("mousedown", pcDraw);
  canvas.on("mousemove", pcDraw);
  canvas.on("mouseup", pcDraw);
  canvas.on("mouseout", pcDraw);

  canvas.on("touchstart", mobileDraw);
  canvas.on("touchend", mobileDraw);
  canvas.on("touchcancel", mobileDraw);
  canvas.on("touchmove", mobileDraw);
}

function canvasResize() {
  canvas[0].height = div.height();
  canvas[0].width = div.width();
}

function pcDraw(evt) {
  switch (evt.type) {
    case "mousedown":
      {
        drawble = true;
        ctx.beginPath();
        ctx.strokeStyle  = "#D1D1D1";
        ctx.lineWidth = 3;
        ctx.moveTo(getPcPosition(evt).X, getPcPosition(evt).Y);
      }
      break;

    case "mousemove":
      {
        if (drawble) {
          ctx.lineTo(getPcPosition(evt).X, getPcPosition(evt).Y);
          ctx.strokeStyle  = "#D1D1D1";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
      break;

    case "mouseup":
    case "mouseout":
      {
        drawble = false;
        ctx.closePath();
      }
      break;
  }
}

function getPcPosition(evt) {
  var x = evt.pageX - canvas.offset().left;
  var y = evt.pageY - canvas.offset().top;
  return { X: x, Y: y };
}

function mobileDraw(evt) {
  switch (evt.type) {
    case "touchstart":
      {
        drawble = true;
        ctx.beginPath();
        ctx.strokeStyle  = "#D1D1D1";
        ctx.lineWidth = 3;
        ctx.moveTo(getMobilePosition(evt).X, getMobilePosition(evt).Y);
      }
      break;

    case "touchmove":
      {
        if (drawble) {
          evt.preventDefault();
          ctx.strokeStyle  = "#D1D1D1";
          ctx.lineWidth = 3;
          ctx.lineTo(getMobilePosition(evt).X, getMobilePosition(evt).Y);
          ctx.stroke();
        }
      }
      break;

    case "touchend":
    case "touchcancel":
      {
        drawble = false;
        ctx.closePath();
      }
      break;
  }
}

function getMobilePosition(evt) {
  var x = evt.originalEvent.changedTouches[0].pageX - canvas.offset().left;
  var y = evt.originalEvent.changedTouches[0].pageY - canvas.offset().top;
  return { X: x, Y: y };
}

function savePicture() {
  var link = document.createElement("a");
  link.href = canvas[0].toDataURL("image/png");
  link.download = "image.png";

  $("#sigImg").attr("src", link.href);
  $("#sigPop").hide();
  $("body").css("overflow", "auto");

  $("#sigImg").show();
  sigText();
}


function sigText(){
  if($("#sigImg").attr('src') !== ""){
    $(".confirm").text("서명 다시하기")
  }
}

// width 320 ~ 375
var windowWidth = window.matchMedia("screen and (max-width: 374px)");

if (windowWidth.matches) {
  $("#wrap header .search-box input").css("width", "95%");

  $(".section-header h3").css("font-size", "18px");

  $(".co-in div").removeClass("col-4");
  $(".co-in div").removeClass("col-8");

  $(".co-in div").addClass("col-6");

  $(".phone-box .col-3 button").css("width", "30px");

  $(".mobS-co-width1").removeClass("col-9");
  $(".mobS-co-width2").removeClass("col-3");

  $(".mobS-co-width1").addClass("col-8");
  $(".mobS-co-width2").addClass("col-4");
  $(".mobS-ad-width1").removeClass("col-7");
  $(".mobS-ad-width2").removeClass("col-5");

  $(".mobS-ad-width1").addClass("col-6");
  $(".mobS-ad-width2").addClass("col-6");

  $("#updatePop .update-message").css("font-size", "14px");

  $(".manage-info dt").css("width", "40%");
  $(".manage-info dd").css("width", "60%");

  $(".fee-slide").css("width", "280px");
  $(".slide-list li").css("width", "280px");

  $(".dem-box dt").css("width", "40%");
  $(".dem-box dd").css("width", "60%");
  $(".dem-box").css("min-height", "240px");

  $(".sd-list li").css("min-height", "190px");
}
