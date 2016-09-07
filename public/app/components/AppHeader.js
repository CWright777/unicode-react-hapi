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
    <Header size="large" justify="between" colorIndex="neutral-1" pad='medium'>
      <Title>
        <Icon inverse={true} />
        CLDR - Unicode Viewer
      </Title>
      <Menu label="Menu" dropAlign={{"right": "right"}} dropColorIndex="neutral-1">
        <Anchor href="#" className="active">
          First
        </Anchor>
        <Anchor href="#">
          Second
        </Anchor>
        <Anchor href="#">
          Third
        </Anchor>
      </Menu>
    </Header>
  )
}
