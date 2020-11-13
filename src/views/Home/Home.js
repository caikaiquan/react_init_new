import React from 'react'

import RouterView from '../../router/index.js'
export default class Home extends React.Component{
  render(){
    return(
      <div className="Home">
        <h1>这里是Home页面</h1>
        <br/>
        {
          this.props.routes ? < RouterView routers={this.props.routes} /> : null
        }
      </div>
    )
  }
}