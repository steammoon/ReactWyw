import axios from 'axios';
import qs from 'qs';
//封装axios
//axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
//axios.defaults.timeout = 100000
//axios.defaults.withCredentials = true

let http={
    post:"",
    get:"",
    delete:"",
    put:"",
    grobal:"http://localhost:3000/"
}
//新增数据
http.post = function (api,data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.post(api,params)
        .then((res) =>{
            resolve(res);
            console.log(res);
        })
        .catch((error) =>{
            reject(error);
            console.log(error);
            alert("请求失败");
        })
    })
}
//查询数据
http.get = function (api,data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.get(api,params)
        .then((res) =>{
            resolve(res);
            console.log(res);
        }).catch((error) =>{
            reject(error);
            console.log(error);
            alert("请求失败");
        })
    })
}
//删除数据
http.delete = function (api,data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.delete(api,params)
        .then((res) =>{
            resolve(res);
            console.log(res);
        }).catch((error) =>{
            reject(error);
            console.log(error);
            alert("请求失败");
        })
    })
}
//修改数据
http.put = function (api,data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.put(api,params)
        .then((res) =>{
            resolve(res);
            console.log(res);
        }).catch((error) =>{
            reject(error);
            console.log(error);
            alert("请求失败");
        })
    })
}

export default http