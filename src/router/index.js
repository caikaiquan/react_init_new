import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

class RouterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  UNSAFE_componentWillMount() {
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
                  return item.children ? <item.component {...routerProps} routes={item.children}/> : <item.component {...routerProps} />
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

export default RouterView