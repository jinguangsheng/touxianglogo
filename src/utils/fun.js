export function userDevice () {
  if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPad|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return 'mobile'
  } else {
    return 'pc'
  }
}
// 深度copy
export function deepCopy (o) {
  if (o instanceof Array) {
    const n = []
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else if (o instanceof Object) {
    const n = {}
    for (const i in o) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else {
    return o
  }
}
