import React, { Component } from 'react';
import {
  Tabs,
  Tab,
  Section,
  Columns,
} from 'grommet';
import CountryLanguage from 'country-language';

const RelationTabs = props => {
  return (
    <Section>
      <Tabs justify="start">
        <Tab title='Languages'>
          <RelationList
            items={props.languages}
          />
        </Tab>
        <Tab title='Territories'>
          <RelationList
            items={props.territories}
          />
        </Tab>
        <Tab title='Scripts'>
          <RelationList
            items={props.scripts}
          />
        </Tab>
      </Tabs>
    </Section>
  )
}

const RelationList = props => {
  return(
    <Section>
      <Columns
        masonry={true}
        justify='center'
        size='large'
      >
      {
        props.items.map((item, i) => {
          return (
            <span key={i}>{item}</span>
          )
        })
      }
      </Columns>
    </Section>
  )
};

export default  RelationTabs;
