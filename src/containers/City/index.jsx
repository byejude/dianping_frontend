import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import {CITYNAME} from "../../config/localStoreKey"
import localStore from '../../util/localStore'


class City extends React.Component{

    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changFn={this.changeCity.bind(this)}/>
            </div>
        )
    }

    changeCity(newCity){
        if(newCity == null){
            return;
        }

        // -------使用redux修改城市
        const userinfo = this.props.userinfo;
        userinfo.cityName = newCity;
        this.props.userInfoActions.update(userinfo);


        //修改本地存储即cookie
        localStore.setItem(CITYNAME);

        //跳转到主页面
        hashHistory.push('/')
    }
}


// --------------redux---------------

function mapStateToProps(state) {
    return{
        userinfo:state.userinfo
    }
}

function MapDispatchToProps(dispatch) {
    return{
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    MapDispatchToProps,
)(City)