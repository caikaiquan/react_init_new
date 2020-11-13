## React初始化相关配置

### npm run eject(配置文件)

### antd按需加载和自定义主题

1. 安装依赖
```
yarn add babel-plugin-import
yarn add antd
yarn add less less-loader
```

2. 修改 package.json：添加 antd 库的样式(提示:如果在 package.json 中没有看到上面的形式，则需要先 reject 项目。)
```
 "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "style": "css"
        }
      ]
    ]
  }
```

### react 暴露后自定义主题

1. 复制代码修改配置环境（webpack.config.js）定义全局变量

```
// style files regexes
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  //在这添加（新增两个变量）
+ const lessRegex = /\.less$/;
+ const lessModuleRegex = /\.module\.less$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;
```

2. 复制代码配置 less-loader

```
//@To-do 原来的内容
// Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
 {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
 },

//@To-do 添加如下内容

   {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'less-loader'),
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'less-loader'
            ),
 },
```

3. 复制代码定义全局样式

```
if (preProcessor) {
      let loader = require.resolve(preProcessor)
      if (preProcessor === "less-loader") {
        loader = {
          loader,
          options: {
            modifyVars: { //自定义主题
              'primary-color':'#07c160',
            },
            javascriptEnabled: true,
          }
        }
      }
      loaders.push({
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },loader);
    }     
```

4. 复制代码修改 package.json

```
 "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "style": true  //修改处
        }
      ]
    ]
  }
```

### 配置多个打包环境
```
"scripts": {
    "start": "node scripts/start.js",
    "beta": "node scripts/beta.js",
    "testing": "node scripts/testing.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },

script目录下添加 beta.js  testing.js
```

### react路由使用以及封装
1. 配置/router/config.js

```
import Page from '../views/Page/Page.js'
import PageChild1 from '../views/Page/PageChild1.js'
import PageChild2 from '../views/Page/PageChild2.js'
const routes = [
  {
    path: '/page',
    component: Page,
    children: [
      {
        path: '/page/child1',
        component: PageChild1,
      },
      {
        path: '/page/child2',
        component: PageChild2,
      },
    ]
  }
]
export default routes
```

2. RouterView组件 配置/router/index.js

```
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
```
3. 修改src/index.js

```
import config from './router/router.js'
import RouterView from './router/index.js'
  <HashRouter >
    <Switch>
      < RouterView routers={config} />
      {/* <Route path='/demo' component={Demo} />
          <Route path='/App' component={App} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/404' component={NoFind} />
          <Redirect to='/404' /> */}
      {/* <FrontendAuth config={routerConfig} /> */}
    </Switch>
  </HashRouter >,
```
4. 使用子路由(src/views/Page/Page.js)

```
import React from 'react'
import RouterView from '../../router/index.js'

export default class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        这里是Page页面
        <br/>
        这里是子页面
        {
          this.props.routes ? < RouterView routers={this.props.routes} /> : null
        }
      </div>
    )
  }
}
```
### Redux的基本使用
1. 安装redux

```
yarn add redux
```

### 封装React-Router组件