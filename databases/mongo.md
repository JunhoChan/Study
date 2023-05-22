## mongo



## mongo服务操作流程
```shell
# docker volume create --name=mongodata
$: docker run -itd --name mongo -p 127.0.0.1:27017:27017 -v mongodata:/data/db mongo --auth --restart=on-failure:10
$: docker exec -it mongo mongo admin
# $: docker exec -it mongo mongo admin bash
$: db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
$: db.auth('admin', '123456')

$: show dbs
$: db
```

## mongo操作
```shell
# writeRead
db.createUser({user:"admin",pwd:"123456",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})
db.createUser({user:"junho",pwd:"junho",roles:[{role:"dbOwner",db:"mermaid"}]})
db.dropUser('junho')
db.updateUser("junho",{pwd:"111111",roles:[{role:"read",db:"test"}]})
db.grantRolesToUser("junho",[{role:"userAdminAnyDatabase",db:"mermaid"}])

use mermaid
db.createCollection("user_mermaid")
show collections
db.collection.drop()

db.user_mermaid.insert({userId: "7878823133212312", content: 'http://www.runoob.com', create_time: '2000-01-01 00:00:00', update_time: '2000-01-01 00:00:00'})
db.user_mermaid.find().pretty()

# dbOwner 
db.user_mermaid.update({'_id': ObjectId("64422d651833ca3d0c7084ad")},{$set:{'content':'555555', 'update_time': '2000-02-02 00:00:00'}})

db.user_mermaid.find({'_id': ObjectId("644120e2a37d792c1603b724")}).pretty()


```