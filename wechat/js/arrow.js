/*
 * @Author: Faith
 * @Date: 2022-09-27 22:21
 * @LastAuthor: Faith
 * @LastEditTime: 2022-09-27 23:24
 * @Description:
 */

const arrow = document.getElementsByClassName('arrow-wrap')
const van = document.querySelector('.arrow-wrap .van-icon')
const desc = document.querySelector('.desc-wrap')
arrow[0].addEventListener('click', (e) => {
  if (van.className === 'van-icon van-icon-arrow-up') {
    van.className = 'van-icon van-icon-arrow-down'
    desc.className = 'desc-wrap desc-wrap-folded'
  } else {
    van.className = 'van-icon van-icon-arrow-up'
    desc.className = 'desc-wrap'
  }
})
