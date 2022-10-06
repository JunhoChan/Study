const path = require('path')
const http = require('http')
const fs = require('fs')


const temDir = path.join(__dirname, '/resource/') // 父级文件夹

// 合并切片
const mergeFileChunk =async (chunkDir,totalDir,fileName) => {
  //指定合成的文件名及位置
  const totalPaths=totalDir+'/'+'合成-'+ 'test.mp4'

  //生成合成的空文件
  // fs.writeFileSync(totalPaths,'')
  const chunkPaths = fs.readdirSync(temDir)
  console.log(chunkPaths)
  chunkPaths.forEach(chunkPath => {
    const chunkFilePath=`${temDir}/${chunkPath}`
    const data = fs.readFileSync(chunkFilePath)

    fs.appendFileSync(totalPaths, data);

    //删除文件
    // fs.unlinkSync(chunkFilePath);
  });

  //删除切片的目录
  // fs.rmdirSync(chunkDir);

}

function videoAsyncDownload(url, param) {
  const postData = JSON.stringify(param)
  const options = {
    host: 'xxx',
    port: 8005,
    method: 'POST',
    path: url,
    headers: {
      'Content-Type': 'application/json;'
    }
  }
  let length = 0;
  // 测试
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
        res.on('data', (chunk) => {
          length += chunk.length;
          resolve(chunk)
          let fileWrite = fs.createWriteStream(temDir + param.chunk, {
            flags: "a"
          });
          fileWrite.write(chunk, async function() {
            // console.log('开始写入: ')
          })
        });
        res.on('end', () => {
          resolve('成功!')
          console.log(length / 1024 / 1024)
        });
      });
      
      req.on('error', (e) => {
        reject(e)
      });
      req.write(postData);
      req.end();
    })

}

videoAsyncDownload('/download', {
  chunk: 1,
  fileId: '722044494433882112'
})

videoAsyncDownload('/download', {
  chunk: 2,
  fileId: '722044494433882112'
})

// mergeFileChunk('', temDir, 'test.mp4')

// Promise.all([]).then(res => {
//   process.nextTick(() => {
//   })
// })
