/**
 * 请求限流器
 */

const addTask = (taskName, time, cb) => {
  setTimeout(() => {
    console.log('this is ' + taskName)
    cb && cb()
  }, time)
};

class LimitRunCount {
  constructor (limitNum = 0, taskQueue = []) {
    this.limitNum = limitNum; // 限制数
    this.exeQueue = taskQueue.slice(0, limitNum); // 等待队列
    this.waitQueue = taskQueue.splice(limitNum); // 正在执行的队列
    console.log(this.exeQueue, this.waitQueue)
  }
  /**
   * @description 正在进行的任务
   * @param {Number} index
   */
  executeAndRemoveTask(index) {
    if (!this.waitQueue.length) this.exeQueue[index] = null
    else {
      this.exeQueue[index] = this.waitQueue[0]
      this.waitQueue = this.waitQueue.splice(1)
      if (!this.waitQueue.length) {
        this.exeQueue[index]()
      } else {
        this.exeQueue[index](this.executeAndRemoveTask(index))
      }
    }
  }
  run() {
    this.exeQueue.forEach((work, index) => {
      work(() => this.executeAndRemoveTask(index))
      // work()
    })
  }
}
new LimitRunCount(2, [1, 2, 3, 4, 5])
const limit = new LimitRunCount(2,
  [ 
    (cb) => addTask('a', 2000, cb),
    (cb) => addTask('b', 1000, cb),
    (cb) => addTask('c', 500, cb),
    (cb) => addTask('d', 1000, cb),
    (cb) => addTask('e', 3000, cb),
  ]);
limit.run()