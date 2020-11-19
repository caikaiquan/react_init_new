import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

class RouterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  UNSAFE_componentWillMount() {
    // console.log('UNSAFE_componentWillMount')
  }

  render() {
    return (
      <Switch>
        {
          this.props.routers.map((item, index) => {
            /** 
             * item.path 正常设置的路由
             * item.children 存在子路由
             * **/
            if (item.path) {
              return < Route key={index} path={item.path} exact={item.path === '/'} render={
                (routerProps) => {
                  let pathName = routerProps.location.pathname;
                  // 模拟用户没有登录的情况
                  if(pathName !== '/' && JSON.stringify(this.props.userInfo) === '{}'){
                    return <Redirect key={index} to='/' />
                  } else if(item.children){ // 存在子路由的情况
                    return <item.component {...routerProps} routes={item.children} />
                  } else { // 不存在子路由的
                    return <item.component {...routerProps} />
                  }
                  // return pathName !== '/' && JSON.stringify(this.props.userInfo) === '{}' ? <Redirect key={index} to='/' /> : item.children ? <item.component {...routerProps} routes={item.children} /> : <item.component {...routerProps} />
                }} />
            } else {
              // 路由重定向
              return <Redirect key={index} to={item.redirect || item.path} />
            }
          })
        }
      </Switch>
    )
  }
}

RouterView = connect(state => ({ userInfo: state.demoReducer.userInfo }))(RouterView)

export default RouterView