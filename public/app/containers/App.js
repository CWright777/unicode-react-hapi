import React, { Component } from 'react';
import { AppHeader } from '../components/AppHeader';
import { withRouter } from 'react-router';
import {
  App,
  Box,
} from 'grommet';
import { connect } from 'react-redux';

const Application = props => {
    return (
      <App centered={false}>
        <AppHeader/>
        <Box>
          {props.children}
        </Box>
      </App>
    )
}

export default Application
