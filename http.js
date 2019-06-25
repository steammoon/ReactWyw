import axios from 'axios';
import qs from 'qs';

let http={
    post:"",
    get:""
}

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

export default http