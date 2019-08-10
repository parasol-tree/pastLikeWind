// periodical 期刊
import {
  HTTP
} from '../utils/ajax.js'
import {
  config
} from '../config.js'

class PeriodicalModules extends HTTP {
  // 获取最新一期
  getLatest (callback) {
    return this.request({
      url: '/classic/latest'
    })
  }
  // 获取期刊数据
  getPeriodical (periodicalID, nextOrPrevious) {
    // 获取期刊 nextOrPrevious === 'previous' 时 获取的是 当前期刊的前一期,
    // 获取期刊 nextOrPrevious === 'next' 是当前期刊的下一期
    return this.request({
      url: `/classic/${periodicalID}/${nextOrPrevious}`
    })
  }
}

export {
  PeriodicalModules
}
