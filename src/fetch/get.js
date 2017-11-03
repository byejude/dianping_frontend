import 'whatwg-fetch'
import 'es6-promise'

export function get(url) {
    var result = fetch(url, {
        credentials: 'include', //允许跨域访问
        headers: {
            'Accept': 'application/json,text/plain,*/*'
        }
    });
    return result;
    
}