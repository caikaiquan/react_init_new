import React from 'react'
import RouterView from '../../router/index.js'

export default class PageChild1 extends React.Component {
  render() {
    return (
      <div style={{ color: 'red' }}>
        这里是PageChild1页面
        <div>
          <br />
          <h3>这里插入3级子页面</h3>
          {
            this.props.routes ? < RouterView routers={this.props.routes} /> : null
          }
        </div>
      </div>
    )
  }
}