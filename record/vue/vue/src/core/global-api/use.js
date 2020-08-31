/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // 插件绑定
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 如果当前插件存在 直接返回
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 将第二个参数转换为真实的数组方便后续调用
    const args = toArray(arguments, 1)

    args.unshift(this) // this 代表vue0
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this // 返回当前vue实例
  }
}
