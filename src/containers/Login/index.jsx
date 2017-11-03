import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { postPhone } from '../../fetch/user/login.js'
import { postLogin } from '../../fetch/user/login.js'
import { md5} from '../../util/md5.js'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

import Header from '../../components/Header'
import LoginComponent from '../../components/Login'

class Login extends React.Component{
    constructor(props,context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }

    render(){
        return(
            <div>
            <Header title={"登录"}/>
                {
                    //等待验证后再显示登录信息
                    this.state.checking
                        ?<div>{/*等待中*/}</div>
                        :<LoginComponent
                        sendSmsHandle={this.sendSmsHandle.bind(this)}
                        loginHandle={this.loginHandle.bind(this)}
                        />
                }
            </div>
        )
    }

    componentDidMount(){
        this.doCheck()
    }

    doCheck(){
        const userinfo = this.props.userinfo;
        if(userinfo.username){
            this.goUserPage();
        }else {
            this.setState({
                checking:false
            })
        }
    }

    saveSmsInfo(phone,code){
        const actions = this.props.userInfoActions;
        let userinfo = this.props.userinfo;
        userinfo.code = code;
        userinfo.username = phone;
        actions.update(userinfo)
    }

    saveUserInfo(username,token){
        const actions = this.props.userInfoActions;
        let userinfo = this.props.userinfo;

        if(userinfo.username === username){

            userinfo.username = username;
            userinfo.code = null;
            userinfo.token = token;
            actions.update(userinfo);

            const router = this.props.params.router;
            if(router){
                hashHistory.push(router);
            }else {
                this.goUserPage();
            }
        }else {
            alert("not right")
        }
    }

    sendSmsHandle(phone){
         const result = postPhone(phone);
         result.then(res =>{
             return res.json()
         }).then(json=>{
             const data = json;
             console.log("sms msg:" + data.msg);
             console.log("sms errno:" + data.errno);
             console.log("sms code" + data.code);

             if(data.errno ===0){
                 this.saveSmsInfo(phone,data.code);
             }else {
                 //未收到验证码
                 alert("未收到验证码"+data.errno);
             }
             }
         ).catch(ex =>{
             if(__DEV__){
                 console.error('数据出错, ', ex.message);
             }
         })
    }

    loginHandle(username,code) {

        const result = postLogin(username, md5(code));

        result.then(res => {
            return res.json();
        }).then(json => {
            const data = json;
            console.log("login r:" + data.msg);
            console.log("login r:" + data.errno);
            if(data.errno === 0)
            {
                //登录成功
                console.log(data.token);
                this.saveUserInfo(username,data.token);
            }
            else
            {
                //登录失败
                alert(data.msg)
            }

        }).catch(ex => {
            if (__DEV__) {
                console.error('数据出错, ', ex.message)
            }
        })
    }

    goUserPage() {
        hashHistory.push('/User')
    }
}



//------------------redux--------------

function mapStateToProps(state) {
    return{
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)