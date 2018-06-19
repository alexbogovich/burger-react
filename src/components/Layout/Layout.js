import React, {Fragment, Component} from 'react'

import LayoutCss from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  };

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  };

  render() {
    return (
      <Fragment>
        <Toolbar drowToggleClicked={this.sideDrawerOpenHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={LayoutCss.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }

}

export default Layout