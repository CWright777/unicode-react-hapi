import React, { Component } from 'react';
import {
  Tabs,
  Tab,
  Section,
  Columns,
} from 'grommet';
import CountryLanguage from 'country-language';

const RelationTabs = props => {
  const temp = props.languages.map((language, i) => {
    return (
      <span key={i}>{language}</span>
    )
  })
  return (
    <Section>
      <Tabs justify="start">
        <Tab title='Languages'>
          <Section>
            <Columns
              masonry={true}
              justify='center'
              size='medium'
            >
            {
              temp
            }
            </Columns>
          </Section>
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
