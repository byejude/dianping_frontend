import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {postBuy} from "../../../fetch/user/buy"
import BuyAndStore from '../../../components/BuyAndStore'
import * as storeActionsFromFile from '../../../actions/store'

class Buy extends React.Component{

    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore:false
        }
    }

    render(){
        return(
            <div>
            <BuyAndStore isStore={this.state.isStore} buyClickHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
                )
    }

    componentDidMount(){
        this.checkStoreState();
    }

    //check store or not
    checkStoreState(){
        const id = this.props.id;
        const store = this.props.store;

        store.forEach(item=>{
            if(item.id === id){
                // stored
                this.setState({
                    isStore:true
                });
                return false;
            }
        })
    }

    loginCheck(){
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if(!userinfo.username){
            //go to login page with'/detail/+id' so can back
            hashHistory.push('/Login/'+encodeURIComponent('/detail/'+id));
            return false;
        }
        return true;
    }

    randomNum(n,m){
        var c= m-n+1;
        return Math.floor(Math.random()*c+n);

    }

    // mock buying
    buyHandle(){
        //check login
        const loginFlag = this.loginCheck();
        if(!loginFlag){
            return
        }


        const id = this.props.id;
        const userinfo = this.props.userinfo;

        console.log("userinfo"+userinfo);
        console.log("id"+id);

        var num = 1;
        var price = this.randomNum(50,200);

        var result = postBuy(userinfo.username,id,num,price,userinfo.token);
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if(json.errno ===0){
                hashHistory.push("/User");
            }else {
                alert(json.msg);
                alert(json.msg);

            }
        })
    }

    storeHandle(){
        //login check
        const loginFlag = this.loginCheck();
        if(!loginFlag){
            return
        }

        const id = this.props.id;
        const storeActions = this.props.storeActions;
        if(this.state.isStore){
            //store already,rm it
            storeActions.rm({id:id})
        }
        else {
            //not store,add it
            storeActions.add({id:id})
        }

        this.setState({
            isStore:!this.state.isStore
        })
    }


}

//----------redux---------
function mapStateToProps(state){
    return{
        userinfo:state.userinfo,
        store:state.store
    }
}

function mapDispatchToProps(dispatch) {
    return{
        storeActions:bindActionCreators(storeActionsFromFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)