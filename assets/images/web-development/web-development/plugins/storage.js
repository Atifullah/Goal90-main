let storage = {
     
    /*
    * set 存储方法
    * @ param {String}     key 键
    * @ param {String}     value 值，
    * @ param {String}     expired 过期时间，以毫秒为单位，非必须
    */
    set(key, val, expired) {

        let obj = {

            data: val,
            time: Date.now(),
            expired
        }
        window.localStorage.setItem(key, JSON.stringify(obj));

    },

    /*
    * set 獲取方法
    * @ param {String}     key 键
    */
    get(key) {

        let val = window.localStorage.getItem(key);
        if (!val) {

            return val;
        }
        val = JSON.parse(val);
        if (Date.now() - val.time > val.expired) {

            window.localStorage.removeItem(key);
            return null
        }

        return val.data;
    },
   /*
    * remove 刪除方法
    * @ param {String}     key 键
    */
    remove(key) {

        window.localStorage.removeItem(key);
    },

}
export default storage;
/*
this.$storage.set("userId",'tom',1000000)//创建 OR修改,并在创建时给一个过期时间限制
this.$storage.get("userId")//获取时,内部会进行判断,当前获取的内容是否过期
this.$storage.remove("userId")//删除

OR
import Storage from "文件路径"//引入
Storage.set("userId",'jack',1000)//创建 OR修改
Storage.get("userId",)//获取
Storage.remove("userId")//删除
*/