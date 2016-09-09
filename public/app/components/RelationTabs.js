
import React, { Component } from 'react';
import {
  Tabs,
  Tab,
  Section
} from 'grommet';

const RelationTabs = props => {
  const temp = props.selectedDelimiter.locales.map((locale, i) => {
    return (
      <div key={i}>
        {locale.language.name}
      </div>
    )
  })
  return (
    <Section>
      <Tabs justify="start">
        <Tab title='Languages'>
          {
            temp
          }
        </Tab>
        <Tab title='Territories'>
        </Tab>
        <Tab title='Scripts'>
        </Tab>
      </Tabs>
    </Section>
  )
}

const RelationList = props => {
  conosle.log(props)
  return(
    {
    }
  )
};

export default  RelationTabs;
