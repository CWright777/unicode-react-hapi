import React, { Component } from 'react';
import { AppHeader } from '../components/AppHeader';
import { withRouter } from 'react-router';
import {
  App,
  Box,
} from 'grommet';
import { connect } from 'react-redux';

export class Application extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <App centered={false}>
        <AppHeader/>
        <Box>
          {this.props.children}
        </Box>
      </App>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Application))
