export const getTime_msg = () => {
  let message = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
export const getTime = () => {
  let D = new Date()
  let time = `${D.getHours()}` + ':' + `${D.getMinutes()}`
  return time
}
