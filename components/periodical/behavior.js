// 仅适用于 文件夹 periodical 内的文件
// 类似于一些编程语言中的 "mixins"
const behavior = Behavior({
  properties: {
    img: {
      type: String
    },
    content: {
      type: String
    },
    hidden: {
      type: String
    }
  }
})

export {
  behavior
}
