import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {};

  }
  render(){
    return (
      <div >
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
  } = state.posts || {
  }
  return {
  }
}

//function mapDispatchToProps(dispatch) {
  //return {
    //actions: bindActionCreators(postActions, dispatch),
    //dispatch
  //}
//};

export default connect(mapStateToProps)(withRouter(Dashboard))
