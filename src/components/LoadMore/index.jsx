import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className={"load-more"} ref={"wapper"}>
                {
                    this.props.isLoadingMore
                        ? <span>加载中...</span>
                        : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }

            </div>
        )

    }

    loadMoreHandle(){
        this.props.loadMoreFn();
    }

    componentDidMount(){
        const loadMoreFn = this.props.loadMoreFn;
        //操作虚拟DOM元素
        const wrapper = this.refs.wapper;
        let timeoutId;
        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            console.log("top is "+top+"&&&windowHeight"+windowHeight);
            if(top &&top<windowHeight){
                loadMoreFn()
            }
        }

        window.addEventListener("scroll",function () {
            if(this.props.isLoadingMore){
                //正在加载的时候滚动加载无效
                return;
            }
            //实现延时加载
            if(timeoutId){
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(callback,50);
        }.bind(this),false)
    }
}
export default LoadMore
