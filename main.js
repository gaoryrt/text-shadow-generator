import "./main.css";
const $ = (selector) => document.querySelector(selector);

const Preview = $("#preview");
const Output = $("#output");

const StrokeWidth = $("#strokewidth");
const Color = $("#color");
const Directions = $("#directions");

const FontSize = $("#fontsize");
const Precision = $("#precision");

// 通用函数：去除不必要的尾数，保留x位小数
const cleanNumber = (num, precision = 2) => {
  const fixed = num.toFixed(precision);
  // 去除末尾的零和小数点
  return parseFloat(fixed).toString();
};

// 格式化CSS值：0px简化为0
const formatCSSValue = (value, unit = "px") => {
  const precision = parseInt(Precision.value) || 2;
  const cleaned = cleanNumber(value, precision);
  return cleaned === "0" ? "0" : `${cleaned}${unit}`;
};

const gen = () => {
  const width = StrokeWidth.value;
  const color = Color.value;
  const directions = Directions.value;
  let rtn = "";

  for (let i = 0; i <= directions; i += 1) {
    const deg = (360 / directions) * i * (Math.PI / 180);
    const a = formatCSSValue(Math.cos(deg) * width);
    const b = formatCSSValue(Math.sin(deg) * width);
    rtn += `${a} ${b} ${color},\n`;
  }

  Preview.style.textShadow = rtn.slice(0, -2);

  Output.innerText = rtn.slice(0, -2) + ";";
};

// 更新字体大小
const updateFontSize = () => {
  Preview.style.fontSize = FontSize.value + "px";
};

// 添加事件监听器
FontSize.addEventListener("input", updateFontSize);
StrokeWidth.addEventListener("input", gen);
Color.addEventListener("input", gen);
Directions.addEventListener("input", gen);
Precision.addEventListener("input", gen);

// 初始化
gen();
updateFontSize();
