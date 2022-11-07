// 名字Cookie
let usrname = $.cookie('姓名')
let stu_id = $.cookie('学号')
let tutor = $.cookie('导员')
let phone = $.cookie('phone')
const startTime = document.getElementById('startTime') // 发起人+发起于+发起时间
const start_times = document.getElementById('start_times')
const emergeName = document.getElementById('emergeName') // 紧急联系人
const start_time = document.querySelectorAll('#start_time')
const leave_time = document.querySelectorAll('#leave_time')
const date_time = document.querySelector('#date_time')
const reply_time = document.querySelectorAll('#reply_time')
const Usrname = document.querySelectorAll('#name')
const tutor_a = document.querySelectorAll('#tutor') // 导员
const stu_ids = document.getElementById('stu_id') // 学号
const phone_p = document.getElementById('phone') // 手机号
const college = document.getElementById('college') // 学院
const clases = document.getElementById('class') // 班级
const leave_reason = document.getElementById('leave_reason')
const leave_to = document.getElementById('leave_to')
const leave_day = document.getElementById('leave_day')

function showTime(params) {
  let nowtime = new Date()
  let years = nowtime.getFullYear()
  let month = nowtime.getMonth() + 1
  month = doubleNum(month)
  let day = nowtime.getDate()
  day = doubleNum(day)
  let hours = nowtime.getHours()
  hours = doubleNum(hours)
  let minutes = nowtime.getMinutes()
  minutes = doubleNum(minutes)
  let seconds = nowtime.getSeconds()
  seconds = doubleNum(seconds)
  let start_hours = doubleNum(hours - 1)
  let start_minutes = doubleNum(Math.abs(minutes - Math.floor(Math.random() * 60)))
  let start_seconds = doubleNum(Math.abs(seconds - Math.floor(Math.random() * 60)))
  // alert(`${years}-${month}-${day} ${hours}:${minutes}`)
  if ($.cookie('name')) {
    nameSet()
  }

  stu_ids.textContent = stu_id

  // 开始时间
  start_time.forEach((start_time) => {
    // start_time.setAttribute(
    //     "value",
    //     `${years}-${month}-${day} ${start_hours}:${start_minutes}:${start_seconds}`
    // );
    start_time.textContent = `${years}-${month}-${day} ${hours}:${start_minutes}:${start_seconds}`
  })

  // 结束时间
  leave_time.forEach((leave_time) => {
    // leave_time.setAttribute("value", `${years}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    leave_time.textContent = `${years}-${month}-${day} ${hours}:${minutes}:${seconds}`
  })

  try {
    if (startTime != null) {
      // startTime.setAttribute(
      //     "value",
      //     `${usrname} 发起于 ${years}-${month}-${day} ${start_hours}:${start_minutes}`
      // );
      startTime.textContent = `${usrname} 发起于 ${years}-${month}-${day} ${start_hours}:${start_minutes}`
    } else {
      start_times.textContent = `${years}-${month}-${day} ${start_hours}:${start_minutes}`
      // 详情页导员名字
      tutor_a.forEach((tutor_a) => {
        tutor_a.textContent = tutor
      })
    }
  } catch (error) {}
}

function doubleNum(num) {
  if (num < 10) return '0' + num
  return num
}

function nameSet(params) {
  Usrname.forEach((Usrname) => {
    // Usrname.setAttribute("value", `${usrname}`);    // 设置标签属性
    Usrname.textContent = usrname // 设置标签间内容
  })
  // emergeName.setAttribute("value", `${usrname} 18133875274`);
  // emergeName.textContent = usrname + ' ' + phone
  phone_p.textContent = phone
}

function getStore(name) {
  return localStorage.getItem(name)
}

function localData() {
  Usrname.forEach((Usrname) => {
    Usrname.textContent = getStore('name') // 设置标签间内容
  })
  emergeName.textContent = getStore('emergeName')
  stu_ids.textContent = getStore('stu_id')
  college.textContent = getStore('college')
  clases.textContent = getStore('class')
  phone_p.textContent = getStore('phone')
  leave_reason.textContent = getStore('leave_reason')
  leave_to.textContent = getStore('leave_to')
  leave_day.textContent = getStore('leave_day')
  start_time.forEach((start_time) => {
    start_time.textContent = getStore('start_time')
  })
  leave_time.forEach((leave_time) => {
    leave_time.textContent = getStore('leave_time')
  })
  reply_time.forEach((reply_time) => {
    reply_time.textContent = getStore('reply_time')
  })

  try {
    var time = getStore('start_time')
    time = time.substring(0, time.length - 3)
    const date = time.substring(0, time.length - 6)
    date_time.textContent = date
    // console.log(date)
    if (startTime != null) {
      //console.log(time)
      startTime.textContent = `${getStore('name')} 发起于 ${time}`
    } else {
      start_times.textContent = `${time}`
      // 详情页导员名字
      tutor_a.forEach((tutor_a) => {
        tutor_a.textContent = getStore('tutor')
      })
    }
  } catch (error) {}
}

function set_form(argument) {
  if ($.cookie('name') == null) {
    localData()
    return
  }
  console.log($.cookie('stu_id'))
  Usrname.forEach((Usrname) => {
    Usrname.textContent = $.cookie('name') // 设置标签间内容
  })
  emergeName.textContent = $.cookie('name') + ' ' + $.cookie('phone')
  stu_ids.textContent = $.cookie('stu_id')
  college.textContent = $.cookie('college')
  clases.textContent = $.cookie('class')
  phone_p.textContent = $.cookie('phone')
  leave_reason.textContent = $.cookie('leave_reason')
  leave_to.textContent = $.cookie('leave_to')
  leave_day.textContent = $.cookie('leave_day')
  start_time.forEach((start_time) => {
    start_time.textContent = $.cookie('start_time')
  })
  leave_time.forEach((leave_time) => {
    leave_time.textContent = $.cookie('leave_time')
  })
  try {
    var time = $.cookie('start_time')
    time = time.substring(0, time.length - 3)
    if (startTime != null) {
      //console.log(time)
      startTime.textContent = `${$.cookie('name')} 发起于 ${time}`
    } else {
      start_times.textContent = `${time}`
      // 详情页导员名字
      tutor_a.forEach((tutor_a) => {
        tutor_a.textContent = $.cookie('tutor')
      })
    }
  } catch (error) {}
}

function main(argument) {
  if (getStore('name')) {
    localData()
  }
  // if ($.cookie('name')) {
  //   set_form()
  // } else {
  //   showTime()
  // }
}

window.onload = main
