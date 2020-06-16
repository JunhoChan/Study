const syncHook = require('tapable').SyncHook

function junhoPlugin(options) {
  this.options = options
}

junhoPlugin.prototype.apply = function(complier) {
  console.log('参数' + this.options)
  // 具有 `apply` 方法……
  if (complier.hooks.myCustomHook) throw new Error('Already in use');
  complier.hooks.myCustomHook = new syncHook(['a', 'b', 'c'])

  // 测试执行顺序
  complier.hooks.emit.tap('junhoPlugin', function() {
    console.log('准备抛出文件')
  })

  complier.hooks.beforeRun.tap('junhoPlugin', function() {
    console.log('测试')
  })
  
  complier.hooks.beforeRun.tap('junhoPlugin', function() {
    console.log('测试运行')
  })
  
  complier.hooks.emit.tapAsync('junhoPlugin', function(compilation, callback)  {
    let fileList = '## in this build:\n\n'

    // console.log(compilation.assets)
    const assets = compilation.assets
    for (let key in assets) {
      console.log(key)
      fileList += `${key}\n`
    }

    compilation.assets['fileList.md'] = {
      source:()=>{return fileList},
      size:() => {return fileList.length}
    }

    callback();
  })

  complier.hooks.beforeRun.tap('junhoPlugin', function() {
    console.log('测试运行')
  })
}

module.exports = junhoPlugin;
