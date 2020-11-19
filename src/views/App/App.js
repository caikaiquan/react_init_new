import React from 'react';
import { Button } from 'antd';
// import logo from './logo.svg';
import './App.css';
import BaseParam from '../../plugins/config'
import { connect } from 'react-redux'
import { handleLogin } from '../../store/demo.reducer.js'

console.log(BaseParam)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleLogin = this.handleLogin.bind(this)
  }

  UNSAFE_componentWillMount(){
    // console.log(111, this.props)
  }

  render() {
    return (
      <div className="App">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <br />
        <Button type='primary' onClick={this.handleLogin}>模拟登陆</Button>
      </div>
    )
  }


  handleLogin() {
    let userInfo = {
      user:"张三丰",
      id:'110'
    }
    this.props.handleLogin(userInfo)
  }
  // return (
  //   <div className="App">
  //     123
  //     {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}
  //   </div>
  // );
}

App = connect(state => ({ demoData: state.demoReducer }), {  handleLogin })(App)

export default App


