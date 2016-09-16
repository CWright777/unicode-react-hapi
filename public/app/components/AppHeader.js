import React, { Component } from 'react';
import {
  Header,
  Title,
  Menu,
  Anchor,
} from 'grommet';
import Icon from 'grommet/components/icons/base/3d'

export const AppHeader = props => {
  return(
    <Header size="medium" justify="between" colorIndex="neutral-1" pad='medium'>
      <Title>
        <Icon inverse={true} />
        CLDR - Unicode Viewer
      </Title>
    </Header>
  )
}
