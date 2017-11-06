import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import{getOrderListData,postComment} from "../../../fetch/user/orderlist"

import OrderListComponent from '../../../components/OrderList'

import './style.less'

class OrderList extends React.Component{

    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[]
        }

    }

    render(){
        return(
            <div className={'order-list-container'}>
                <h2>您的订单</h2>
                {
                    this.state.data.length
                    ?<OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                            :<div>{/* loading */}</div>
                }
            </div>
        )
    }

    componentDidMount(){
        //get order username
        const username = this.props.username;

        //get order token
        const token = this.props.token;
        console.log("order token is"+token);

        //if username avild load orderlist
        if(username){
            this.loadOrderList(username);
        }
       }

    loadOrderList(username){
        const result = getOrderListData(username);
        result.then(res=>{
            return res.json();
        }).then(json=>{
            this.setState({
                data:json
            })
        }).catch(ex=>{
                if(__DEV__){
                    console.error('用户主页“订单列表”获取数据报错, ', ex.message)
                }
            })

    }

    submitComment(id,value,star,callback){
        const token = this.props.token;
        console.log("submit token is"+token);
        const username = this.props.username;
        console.log("submit username is"+username);
        const result = postComment(id,value,star,token,username);
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if(json.errno===0){
                //aready commit,just run callback
                callback()
            }else{
                alert(json.msg)
            }
        })
    }
}

export default OrderList
