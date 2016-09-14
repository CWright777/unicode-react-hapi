import React, { Component } from 'react';
import { AppHeader } from '../components/AppHeader';
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
