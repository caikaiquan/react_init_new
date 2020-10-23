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