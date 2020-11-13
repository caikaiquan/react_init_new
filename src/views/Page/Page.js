import React from 'react'
import RouterView from '../../router/index.js'
// import store from '../../store/demo.store.js'
// import store from '../../store/store.demo.js'
import { connect } from 'react-redux'
import { demoReducer, setName, setArr } from '../../store/demo.reducer.js'
import { homeReducer, setHomeName } from '../../store/home.reducer.js'
class Page extends React.Component {
  constructor (props) {
    super(props)
    // const storeState = store.getState()
    this.state = {
      // name: store.getState().name
    }
  }
  componentWillMount() {
    // console.log(this.state)
    // console.log(this.props)
    // console.log(store.getState())
  }
  render() {
    return (
      <div>
        <h1>这里是Page页面</h1>
        <div>
          <h3>这里是子页面</h3>
          {
            this.props.routes ? < RouterView routers={this.props.routes} /> : null
          }
        </div>
        {/* <br />
        这里是子页面
        {
          this.props.routes ? < RouterView routers={this.props.routes} /> : null
        }
        <br />
        <p>这里是使用store</p>
        <p>name:{this.props.demoData.name}</p>
        <button onClick={() => {
          this.props.setName('张三丰')
        }}>change store demoReducer name</button>
        <br />
        <p>name: {this.props.homeData.name}</p>
        <button onClick={() => {
          this.props.setHomeName('homeNew')
        }}>change store homeReducer name</button> */}
        {/* <button onClick={() => { this.handlePageChange() }}> 页面跳转 </button> */}
      </div>
    )
  }

  handlePageChange() {
    console.log(this.props.history)
    this.props.history.push('/demo')
  }
}

Page = connect(
  state => ({ demoData: state.demoReducer, homeData: state.homeReducer }),
  { demoReducer, setName, setArr, homeReducer, setHomeName }
)(Page)

export default Page