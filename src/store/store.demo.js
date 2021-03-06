import {createStore} from 'redux'

// 定义类型
const SETNAME = "SETNAME";
const SETARR = "SETARR";

// 定义初始化数据
const demoState = {
    name: 'demo',
    list: ['demo','app']
}

// 声明一个实际的操作函数，响应操作
const cartReducer = (state = demoState, action) => {
    switch (action.type) {
        case SETNAME:
            return {...state, name: action.name}
        case SETARR:
            return {...state, list: action.list}
        default:
            return state
    }
}

// 创建 store 实例并导出
const store = createStore(cartReducer)
export default store