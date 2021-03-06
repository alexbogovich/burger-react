import React, { Fragment, Component } from 'react'

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
    || this.props.children !== nextProps.children
  }

  render() {
    return (
      <Fragment>
        <div className={classes.Modal}
             style={{
               transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
               opacity: this.props.show ? '1': '0'
             }}>
          {this.props.children}
        </div>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        />
      </Fragment>)
  }
}

export default Modal