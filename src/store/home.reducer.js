// 定义类型
const SETNAMEHOME = "SETNAMEHOME";
const SETARRHOME = "SETARRHOME";

// 定义初始化数据
const demoState = {
  name: 'home',
  list: ['home', 'app-home']
}

// 声明一个实际的操作函数，响应操作
const homeReducer = (state = demoState, action) => {
  switch (action.type) {
    case SETNAMEHOME:
      return { ...state, name: action.name }
    case SETARRHOME:
      return { ...state, list: action.list }
    default:
      return state
  }
}

const setHomeName = (name) => ({ type: SETNAMEHOME, name })
// const setArr = (list) => ({ type: SETARRHOME, list })

export { homeReducer, setHomeName }