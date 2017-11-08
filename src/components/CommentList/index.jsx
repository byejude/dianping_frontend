import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

import Item from './Item'

class CommentList extends React.Component{

    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
        const data = this.props.data;
        return(
            <div className={'comment-list'}>
                {data.map((item,index)=>{
                    return <Item Kry={index} data={item}/>
                })}
            </div>
        )
    }
}

export default CommentList