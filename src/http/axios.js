import axios from 'axios';
import url from '@/http/url.js'
import * as Constants from '../custom/constants'
import {
  Indicator,
  Toast
} from 'mint-ui';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from '@/custom/mixin';
class Request {
  constructor(){
    this.Domain = url.baseUrl;
  }
  require(options) {
    if (!options.api) throw new Error('api 不能为空');
    if (!options.param) { options.param = {} }
    if (!options.data) { options.data = {} }
    if (!options.methods) { options.methods = 'POST' }; //不传递方法默认为POST
    if (!options.loadingVisble) { options.loadingVisble = false }; // 不传递默认开启loading
    if (!options.loadingText) { options.loadingText = '加载中...' };
    if(options.loadingVisble){
      Indicator.open({
        text: options.loadingText,
        spinnerType: 'snake'
      })
    };
    return new Promise((resolve,reject) => {
        return axios({
            method: options.methods,
            url: options.api,
            baseURL: this.Domain,
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            params:options.param,
            data:options.data
        }).then(response => {
            Indicator.close();
            if(response.data.code === 0){ //请求成功
                return resolve(response.data)
            }else{
                if(response.data.code === 401){ //TOKEN失效
                  // removeLocalStorage(Constants.TOKEN)
                }
                Toast({
                    message: response.data.msg,
                    position: 'middle'
                });
                return reject(response.data)
            }
        },error => {
            Indicator.close();
            Toast({
                message: error,
                position: 'middle'
            });
            return reject()
        })
    })
  }
}

export default Request;
