export const setLocalStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.localStorage.setItem(key, val);
}

export const getLocalStorage = (key) => {
  if (!key) return '';
  return window.localStorage.getItem(key);
}

export const removeLocalStorage = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
}

export const search = (key) => {
  if (!key) return;
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
  var r = url.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function deepCopy(obj){
  if(typeof obj != 'object'){
    return obj;
  }
  var newobj = {};
  for ( var attr in obj) {
    newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}
export function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  var cProps
  if (aProps.length < bProps.length) {
    cProps = aProps
  }else{
    cProps = bProps
  }
  for (var i = 0; i < cProps.length; i++) {
    var propName = cProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

export function equalParamReplace(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  var cProps
  if (aProps.length < bProps.length) {
    cProps = aProps
  }else{
    cProps = bProps
  }
  for (var i = 0; i < cProps.length; i++) {
    var propName = cProps[i];
    a[propName] = b[propName];
  }
  return a;
}

export function isEmptyObject(obj) {
  for(var key in obj){
    if(obj[key] != ''){
      return false;
    }
  }
  return true;
}

export function objectAllEmpty(obj) {
  for(var key in obj){
    obj[key] = ''
  }
  return obj;
}

export function GMTToStr(time){
  let date = new Date(time)
  let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate() + ' ' +
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
  return Str
}

export function GMTToDateStr(time){
  let date = new Date(time)
  let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate()
  return Str
}

export function checkBankCardLuhn(bankno) {
  var num = /^\d*$/; //全数字
  if (!num.exec(bankno)) {
    //top.layer.msg("银行卡号必须全为数字");
    return "银行卡号必须全为数字";
  }
  if (bankno.length < 16 || bankno.length > 19) {
    //top.layer.msg("银行卡号长度必须在16到19之间");
    return "银行卡号长度必须在16到19之间";
  }
  //开头6位
  var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
    //top.layer.msg("银行卡号开头2位不符合规范");
    return "银行卡号开头2位不符合规范";
  }
  var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
  var newArr = new Array();
  for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = new Array(); //奇数位*2的积 <9
  var arrJiShu2 = new Array(); //奇数位*2的积 >9

  var arrOuShu = new Array(); //偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {//奇数位
      if (parseInt(newArr[j]) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j]) * 2);
      } else {
        arrJiShu2.push(parseInt(newArr[j]) * 2);
      }
    } else {//偶数位
      arrOuShu.push(newArr[j]);
    }

  }

  var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu)
    + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

  //计算Luhm值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhm = 10 - k;

  if (lastNum == luhm) {
    return true;
  } else {
    //top.layer.msg("银行卡号错误，请仔细检查");
    return "银行卡号错误，请仔细检查";
  }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop | document.documentElement.scrollTop;
        moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop | document.documentElement.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop | document.documentElement.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop | document.documentElement.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}
