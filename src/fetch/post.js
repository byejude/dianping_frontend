import 'whatwg-fetch'
import 'es6-promise'

export function  post(url,paramObj) {
    var result = fetch(url,{
        method: 'POST',
        credentials:'include',
        headers:{
            'Accept':'application/json,text/plain,*/*',
            'Content-Type':'apllication/x-www-form-urlencoded'
        },
        body:obj2params(paramObj)
    });

    return result;
}

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function  obj2params(obj) {
    var result = '';
    var item;
    for(item in obj){
        result += '&'+item+'='+encodeURIComponent(obj[item])
    }
    if(result){
        result = result.slice(1);
    }
    return result;
}