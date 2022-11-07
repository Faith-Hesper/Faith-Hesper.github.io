function setCookie(name, value, { expires, path, domain, secure } = {}) {
  let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value)
  if (expires) {
    cookieStr += ';expires=' + afterofDate(expires)
  }
  if (path) {
    cookieStr += ';path=' + path
  }
  if (domain) {
    cookieStr += ';domain=' + domain
  }
  if (secure) {
    cookieStr += ';secure=' + secure
  }
  document.cookie = cookieStr
}

function getCookie(name) {
  // 解码
  let cookieStr = decodeURIComponent(document.cookie)
  let start = cookieStr.indexOf(name + '=')
  if (start == -1) {
    return
  } else {
    let end = cookieStr.indexOf(';', start)
    if (end == -1) {
      end = cookieStr.length
    }
    let str = cookieStr.substring(start, end)
    let arr = str.split('=')
    // console.log(arr[1]);
    return arr[1]
  }
}

function removeCookie(name) {
  document.cookie = encodeURIComponent(name) + '=;expires=' + new Date(0)
}

function afterofDate(expires) {
  var d = new Date()
  var date = d.getDate()
  d.setDate(expires + d)
  return d
}

function $Cookie(name) {
  switch (arguments.length) {
    case 1:
      return getCookie(name)
      break
    case 2:
      if (arguments[1] == null) {
        removeCookie(name)
      } else {
        setCookie(name, arguments[1], {})
      }
      break
    case 3:
      setCookie(name, arguments[1], arguments[2])
      break
    default:
      break
  }
}
