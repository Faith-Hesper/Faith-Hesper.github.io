/*
 * @Author: Faith
 * @Date: 2022-03-16 10:02
 * @LastAuthor: Faith
 * @LastEditTime: 2022-09-29 16:50
 * @Description:
 */

const formData = document.querySelectorAll('.form-control')
const input_name = document.querySelector('[name="name"]')
const input_college = document.querySelector('[name="college"]')
const input_class = document.querySelector('[name="class"]')
const input_phone = document.querySelector('[name="phone"]')
const input_leave_reason = document.querySelector('[name="leave_reason"]')
const input_leave_to = document.querySelector('[name="leave_to"]')
const input_leave_day = document.querySelector('[name="leave_day"]')
const input_start_time = document.querySelector('[name="start_time"]')
const input_leave_time = document.querySelector('[name="leave_time"]')
const input_emergeName = document.querySelector('[name="emergeName"]')
const input_stu_id = document.querySelector('[name="stu_id"]')
const input_tutor = document.querySelector('[name="tutor"]')
const submit = document.querySelector('#submit')

let num
function randomNum() {
  if (localStorage.getItem('num')) {
    num = localStorage.getItem('num')
  } else {
    num = Math.floor(Math.random() * 60)
    alert('你的幸运数字为' + num)
    localStorage.setItem('num', num)
  }
}
randomNum()

function getStore(name) {
  return localStorage.getItem(name)
}

function setStore(name, value) {
  return localStorage.setItem(name, value)
}

function setFormCookie() {
  // let data = []
  // localStorage.clear()
  formData.forEach((dom) => {
    let name = dom.getAttribute('name')
    let value = dom.value
    setStore(name, value)
    // setCookie(name, value)
    // data.push({ name, value })
  })
  location.href = '../index.html'
  //   console.log(data)
}

// setFormCookie()

// submit.addEventListener('click', () => {
//   if (window.location.host) {
//     // location.href = ""
//   }
//   console.log('object')
//   location.href = '../index.html'
// })

function setDefaultData() {
  formData.forEach((dom) => {
    let name = dom.getAttribute('name')
    let value = getStore(name)
    console.log(value)
    if (value) {
      dom.value = value
    }
  })
}

input_name.addEventListener('blur', (e) => {
  try {
    input_name.parentElement.parentElement.classList.remove('has-warning')
    input_name.nextSibling.remove()
  } catch (error) {}
  if (!input_name.value) {
    input_name.parentElement.parentElement.classList.add('has-warning')
    let span = document.createElement('span')
    span.className = 'help-block'
    span.innerHTML = '请输入名字'
    input_name.after(span)
  }
})

input_college.addEventListener('blur', (e) => {
  try {
    input_college.parentElement.parentElement.classList.remove('has-warning')
    input_college.nextSibling.remove()
  } catch (error) {}
  if (!input_college.value) {
    input_college.parentElement.parentElement.classList.add('has-warning')
    let span = document.createElement('span')
    span.className = 'help-block'
    span.innerHTML = '请输入学院'
    input_name.after(span)
  }
})

input_class.addEventListener('blur', (e) => {
  try {
    input_class.parentElement.parentElement.classList.remove('has-warning')
    input_class.nextSibling.remove()
  } catch (error) {}
  if (!input_class.value) {
    input_class.parentElement.parentElement.classList.add('has-warning')
    let span = document.createElement('span')
    span.className = 'help-block'
    span.innerHTML = '请输入班级'
    input_class.after(span)
  }
})

function getTime() {
  let nowtime = new Date()
  let years = nowtime.getFullYear()
  let month = doubleNum(nowtime.getMonth() + 1)
  let day = doubleNum(nowtime.getDate())
  let hours = nowtime.getHours()
  let minutes = nowtime.getMinutes()
  let seconds = nowtime.getSeconds()
  const start_time = `${years}-${month}-${day} ${doubleNum(hours - 1)}:${doubleNum(
    Math.abs(minutes)
  )}:${doubleNum(Math.abs(seconds))}`
  // input_start_time.value =
  const reply_time = `${years}-${month}-${day} ${doubleNum(hours)}:${doubleNum(
    Math.abs(minutes - num + 1)
  )}`
  const leave_time = `${years}-${month}-${day} 22:${doubleNum(Math.abs(minutes - num))}:${doubleNum(
    Math.abs(seconds - num)
  )}`
  setStore('start_time', start_time)
  setStore('leave_time', leave_time)
  setStore('reply_time', reply_time)
  // console.log(input_start_time.value)
}

getTime()

function doubleNum(num) {
  if (num < 10) return '0' + num
  return num
}

setTimeout(() => {
  setDefaultData()
}, 500)
