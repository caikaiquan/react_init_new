import App from '../views/App/App'
import Page from '../views/Page/Page.js'
import PageChild1 from '../views/Page/PageChild1.js'
import PageChild2 from '../views/Page/PageChild2.js'
import PageChild1Child1 from '../views/Page/child1.js'
import PageChild1Child2 from '../views/Page/child2.js'
import Home from '../views/Home/Home'
import HomeChild1 from '../views/Home/HomeChild1'
import HomeChild2 from '../views/Home/HomeChild2'

const routes = [
  {
    path: '/',
    component: App
  },
  {
    path: '/page',
    component: Page,
    children: [
      {
        path: '/page/child1',
        component: PageChild1,
        children: [
          {
            path: '/page/child1/child1',
            component: PageChild1Child1,
          },
          {
            path: '/page/child2/child2',
            component: PageChild1Child2,
          },
          {
            redirect: '/page/child1/child1'
          }
        ]
      },
      {
        path: '/page/child2',
        component: PageChild2,
      },
      {
        redirect:'/page/child1'
      }
    ],
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/child1',
        component: HomeChild1 
      },
      {
        path: '/home/child2',
        component: HomeChild2
      }
    ]
  },
  {
    redirect: '/'
  }
]

export default routes