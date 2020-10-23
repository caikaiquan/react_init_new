import React from 'react';
import { Route } from 'react-router-dom'

const RouterView = (props) => {
  return props.routers.map((item, index) => {
    return <Route key={index} path={item.path} render={
      (routeProps) => {
        if (item.children) {
          return <item.component {...routeProps} routes={item.children}/>
        } else {
          return <item.component {...routeProps} />
        }
      }
    } />
  })
}

export default RouterView