import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'

import ListComponent from '../../../components/List'

import {getSearchData} from "../../../fetch/search/search";
import LoadMore from "../../../components/LoadMore/index";

const initalState = {
    data:[],
    hasMore:false,
    isLoadingMore:false,
    page:0
};

class SearchList extends React.Component{

    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initalState;
    }

    render(){
        return(
            <div>
                {
                    this.state.data.length
                    ?<ListComponent data={this.state.data}/>
                        :<div>{/* 加载中... */}</div>
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
         console.log("@@@@@@@@@@@@@@@222");
        const cityName=this.props.userinfo.cityName;
        const keyWord=this.props.keyword||'';
        const category=this.props.category;
        const result = getSearchData(0,cityName,category,keyWord);
        console.log("@@@@@@@@@@@@@@@111111"+result);
        this.resultHandle(result);
    }

    loadMoreData(){
        const page = this.state.page;
        this.setState({
            isLoadingMore:true,
            page: page + 1
        });

        console.log("loadMoreData##############"+this.state.page);
        const cityName=this.props.userinfo.cityName;
        const keyWord=this.props.keyword||'';
        const category=this.props.category;
        const page1 = this.state.page;
        const result=getSearchData(page1,cityName,category,keyWord);
        this.resultHandle(result);

        this.setState({
            isLoadingMore: false
        });
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

                console.error('search error ', ex.message)



        })
    }

    componentDidUpdate(prevProps,preState){
        const keyword = this.props.keyword;
        const category = this.props.category;

        if (keyword === prevProps.keyword && category === prevProps.category) {
            return;
        }

        //reset state
        this.setState(initialState);

        //reload data
        this.loadFirstPageData();

    }


}

// -------------------redux--------------------------

function mapStateToProps(state) {
    return {
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
)(SearchList)