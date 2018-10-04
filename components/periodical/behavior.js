// 仅适用于 文件夹 periodical 内的文件
// 类似于一些编程语言中的 "mixins"
let behavior = Behavior({
  properties: {
    img: {
      type: String
    },
    content: {
      type: String
    }
  }
})

export { behavior }
