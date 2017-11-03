import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from "../../../fetch/home/home";
import './style.less'
import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
class List extends React.Component{

    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            hasMore:false, //判断是否有更多
            isLoadingMore:false, //判断是否加载更多
            page:0
        }
    }

    render(){
        return(
            <div>
                <h2 className={"home-list-title"}>猜你喜欢</h2>
                {
                    this.state.data.length
                        ? <ListCompoent data={this.state.data}/>
                        : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                        ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                        :''
                }

            </div>
        )
    }

    componentDidMount(){
        this.loadFirstPageData();
    }

    loadFirstPageData(){
        const cityName = this.props.cityName;
        const result = getListData(cityName,0);
        this.resultHandle(result);
    }

    loadMoreData(){
        const cityName = this.props.cityName;
        const page = this.state.page;
        //改变状态使加载DIV为正在加载
        this.setState({
            isLoadingMore:true,
            page: page + 1
        });


        const result = getListData(cityName,page);
        this.resultHandle(result);

        //把状态改为原值使加载DIV变为按钮或者取消
        this.setState({
            //page: page + 1,
            isLoadingMore:false
        })
    }

    resultHandle(result){
        result.then(res =>{
            return res.json()
        }).then(json =>{
            const hasMore = json.hasMore;
            const data = json.data;

            this.setState({
                hasMore:hasMore,
                data:this.state.data.concat(data)
            })
            }).catch(ex =>{
            if(__DEV__){
                Console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }


        })
    }
}
export default List