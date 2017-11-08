import * as actionTypes from '../constants/store'

const initialStore = [];

export default function store(state=initialStore,action){
    switch (action.type){
        case actionTypes.STORE_ADD:
            state.unshift(action.data);
            return state;
        case actionTypes.STORE_RM:
            return state.filter(item => {
                if (item.id !== action.data.id) {
                    return item
    }
});
        default:
            return state
    }
}