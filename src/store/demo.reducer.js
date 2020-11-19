// 定义类型
const SETNAME = "SETNAME";
const SETARR = "SETARR";
const DOLOGIN = "DOLOGIN";

// 定义初始化数据
const demoState = {
  name: 'demo',
  list: ['demo', 'app'],
  userInfo: {}
}

// 声明一个实际的操作函数，响应操作
const demoReducer = (state = demoState, action) => {
  switch (action.type) {
    case SETNAME:
      return { ...state, name: action.name }
    case SETARR:
      return { ...state, list: action.list }
    case DOLOGIN:
      return { ...state, userInfo: action.userInfo}  
    default:
      return state
  }
}

// 修改state数据的方法
const setName = (name) => ({ type: SETNAME, name })
const setArr = (list) => ({ type: SETARR, list })
const handleLogin = (userInfo) => ( {type: DOLOGIN, userInfo})

export { demoReducer, setName, setArr, handleLogin }