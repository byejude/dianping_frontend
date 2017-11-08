import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader'
import Ad from "./subpage/Ad";
import Category from '../../components/Category'
import List from "./subpage/List"
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height: '15px'}}>{/* 分割线 */}</div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>

            </div>
        )
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

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

