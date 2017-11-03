import  React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {hashHistory} from 'react-router'
import RouteMap from './router/routeMap'
import configureStore from './store/configureStore'

import './static/css/common.less'
import './static/css/font.css'

const store = configureStore()
render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)