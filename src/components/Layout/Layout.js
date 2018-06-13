import React, { Fragment } from 'react'

import LayoutCss from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => (
  <Fragment>
    <Toolbar/>
    <main className={LayoutCss.Content}>
      {props.children}
    </main>
  </Fragment>
)

export default layout