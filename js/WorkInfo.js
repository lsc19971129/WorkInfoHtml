var totaldata;
var dataCountry;
var dataWuhan;
var decision = 1;

function initial() {
    totaldata = dataGet();
}
//获取全部数据的ajax请求
function dataGet() {
    // Header = "Access-Control-Allow-Origin: * ";
    request_name = 'lsc';
    request_gender = '1202';
    var send_info = {
        'name': request_name,
        'gender': request_gender
    };
    var totaldata;
    $.ajax({
        type: "post",
        crossDomain: true,
        url: "http://127.0.0.1:8080/api/test",
        data: JSON.stringify(send_info),
        dataType: "json",
        async: false,
        // processData: false,
        // "content-type": "application/json",
        // jsonpCallback: "callback",
        success: function(data) {
            console.log("dataget yes!")
            totaldata = data;
            // console.log(data);

        },
        error: function(message) {
            console.log(message);
            console.log("error");
        }
    });
    return totaldata;
}

//当页面加载成功时启用这个函数，讲200条信息展示出来
function totalDataShowCountry() {
    dataCountry = totaldata["country"].message;
    dataWrite(dataCountry, 'dataInfo');
    var totalTime = [];
    for (var i = 0; i < dataCountry.length; i++) {
        totalTime[i] = String(dataCountry[i].upgrade_date);
    }
    updateSideLine(totalTime);
}
//当点击武汉界面的时候
function totalDataShowWuhan() {
    decision = 2;
    dataWuhan = totaldata["wuhan"].message;
    dataWrite(dataWuhan, 'dataInfo');
    var totalTime = [];
    for (var i = 0; i < dataWuhan.length; i++) {
        totalTime[i] = String(dataWuhan[i].upgrade_date);
    }
    updateSideLine(totalTime);
}

function changeDecision() {
    decision = 1;
}

function dataWrite(data, Id) {
    var country = document.getElementById(Id);
    //写入数据的同时更新时间的排序
    var oneInfo = '';
    // 输出全部信息
    var num = (200 > data.length ? data.length : 200);
    for (var i = 0; i < num; i++) {
        oneInfo += '<div class="infoDetial" id="'
        oneInfo += String(i)
        oneInfo += '"><a class="infoAddress" href="#">'
        oneInfo += String(data[i].base)
        oneInfo += '</a><a class="infoCompany" href="#">'
        oneInfo += String(data[i].company)
        oneInfo += '</a><a class="infoJob" href="#">'
        oneInfo += String(data[i].job)
        oneInfo += '</a><a class="infoHerf" href="'
        oneInfo += String(data[i].url)
        oneInfo += '" target="_blank">&emsp;&nbsp;详情请点击</a></div>'
    }
    country.innerHTML = oneInfo;
}

function updateSideLine(totalTime) {
    var TimeSide = removeDuplicates(totalTime);
    var timeside = document.getElementById('dateDetail');
    var oneTime = '';
    for (var i = 0; i < TimeSide.length; i++) {
        oneTime += '<a id="dateContent" href="#';
        oneTime += '" onclick="searchByTime(this.innerHTML);return false;">';
        oneTime += TimeSide[i];
        oneTime += '</a>';
    }
    timeside.innerHTML = oneTime;
}
//点击左边sideline的时间出发这个函数，按照时间来获取
function searchByTime(time) {
    // console.log(time);
    if (decision === 1) {
        var shixiByTime = [];
        var k = 0;
        for (var j = 0; j < dataCountry.length; j++) {
            if (dataCountry[j].upgrade_date === time) {
                shixiByTime[k] = dataCountry[j];
                k++;
            }
        }
    } else if (decision === 2) {
        var shixiByTime = [];
        var k = 0;
        for (var j = 0; j < dataWuhan.length; j++) {
            if (dataWuhan[j].upgrade_date === time) {
                shixiByTime[k] = dataWuhan[j];
                k++;
            }
        }
    }

    // console.log(shixiByTime);
    // console.log(dataCountry);
    dataWrite(shixiByTime, 'dataInfo');
}

function removeDuplicates(arr) {
    var temp = {},
        r = [];
    for (var i in arr)
        temp[arr[i]] = true;
    for (var k in temp)
        r.push(k);
    return r;
}

// function ajaxFunction() {
//     var ajaxRequest; //the variable that makes Ajax possile!
//     try {
//         //Opera 8.0+, firefox , safari
//         ajaxRequest = new XMLHttpRequest();
//     } catch (e) {
//         //Internet Explorer Browser
//         try {
//             ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
//         } catch (e) {

//             try {
//                 ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
//             } catch (e) {
//                 // Something went wrong
//                 alert("Your browser broke!");
//                 return false;
//             }
//         }
//     }

//     ajaxRequest.onreadystatechange = function() {
//         console.log(ajaxRequest.readyState)
//         if (ajaxRequest.readyState == 4) {
//             console.log("loading....")
//             if (ajaxRequest.status == 200) {
//                 var ajaxDisplay = document.getElementById('sqlreturn');
//                 ajaxDisplay.innerHTML = ajaxRequest.responseText;
//                 console.log(ajaxRequest.responseText)
//             } else {
//                 console.log(ajaxRequest.status)
//                 console.log("error")
//             }
//         }
//     }
//     ajaxRequest.open("GET", "http://localhost:8888/WorkInfoHtml/test.php", true);
//     ajaxRequest.send(null);
// }


// new Vue({
//     el: '#sqlreturn',
//     data() {
//         return {
//             info: null
//         }
//     },
//     mounted() {
//         axios
//             .get('http://localhost:8080/api/test')
//             .then(response => (this.info = response))
//             .catch(function(error) { // 请求失败处理
//                 console.log(error);
//             });
//     }
// })