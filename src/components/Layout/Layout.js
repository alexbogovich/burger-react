import React, { Fragment } from 'react'

import LayoutCss from './Layout.module.css'

const layout = (props) => (
  <Fragment>
    <div>Tooltip. SideDrawer, Backdrop</div>
    <main className={LayoutCss.Content}>
      {props.children}
    </main>
  </Fragment>
)

export default layout