/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
import dayjs from "dayjs";
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

export function getWaterMark(dom, name) {
  if (document.getElementById("watermark_id")) {
    return;
  }

  const top = 36;
  const watermark = document.createElement("div");
  watermark.id = "watermark_id";
  watermark.style.position = "fixed";
  watermark.style.zIndex = 999;
  watermark.style.left = "0px";
  watermark.style.top = `-${100 + top}%`;
  watermark.style.fontSize = "15px";
  watermark.style.fontFamily = "微软雅黑";

  watermark.style.width = "100%";
  watermark.style.height = `-${100 + top}%`;
  watermark.style.overflow = "hidden";
  watermark.style.fontWeight = "400";
  watermark.style.color = "rgba(0,0,0,0.08)";
  watermark.style.pointerEvents = "none"; // 设置水印不遮挡页面的点击事件

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 30; i++) {
    const text = name + dayjs(new Date()).format("YYYYMMDD");
    const blank = "&nbsp;".repeat(12);

    const p = document.createElement("p");
    p.style.transform = "rotate(-25deg)";
    p.style.paddingTop = "50px";
    p.style.letterSpacing = "1px";
    p.style.whiteSpace = "nowrap";
    p.innerHTML = (text + blank).repeat(10);
    fragment.appendChild(p);
  }
  watermark.appendChild(fragment);
  return watermark;
}

export function fixPercent(list, key) {
  if (!key) return list;
  list = JSON.parse(JSON.stringify(list));
  const arr = list.map((item) => {
    return Number(Number(item[key]).toFixed(2));
  });
  const maxNumber = Math.max(...arr);
  const finalNumber = 100 - arr.reduce((total, cur) => total + cur*100, 0)/100 + maxNumber;

  // 有多个相同的最大值，只修改第一个
const maxNumIndex = list.findIndex((item) => Number(Number(item[key]).toFixed(2)) === maxNumber);
if(maxNumIndex !== -1){
  list[maxNumIndex][key] = list[maxNumIndex][key] > 0 ? finalNumber : 0.00;
}
return list;
}

export function clearFalseData(data) { // 清除所有子节点为false的数据
  if (!Array.isArray(data)) {
    return;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].selected === false) {
      data.splice(i, 1);
      i--; // 因为数组 splice 会改变数组长度，所以需要减 1
    } else {
      clearFalseData(data[i].columns);
    }
  }
}
