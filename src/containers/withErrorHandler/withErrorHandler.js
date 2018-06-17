import React, {Fragment, Component} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    };

    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(r => {
        this.setState({error: null});
        return r
      });
      this.resInterceptor = axios.interceptors.response.use(r => r, e => {
        this.setState({error: e})
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConformedHandler = () => {
      this.setState({error: null})
    };

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error}
                 modalClosed={this.errorConformedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Fragment>
      )
    }
  }
};

export default withErrorHandler