import React, { Component } from 'react';
import {
  Section,
  Heading,
} from 'grommet';

import 'react-select/dist/react-select.css';
import Select from 'react-select';

export const SelectorHeading = props => {
  return(
    <Section align='center'>
      <Heading>
        'Delimiters'
      </Heading>
      <Heading tag='h4' align='start'>
        Select a delimiter property!
      </Heading>
      <Select
        value={props.value}
        options={props.options}
        onChange={(option) => props.onChange(option)}
        matchPos='start'
        placeholder='Delimiter Property'
        backspaceRemoves={false}
        wrapperStyle={{width: 'auto',minWidth: '300px',alignText: 'center'}}
        inputProps={{className: 'selectFixCursor'}}
      />
    </Section>
  )
}

export default SelectorHeading;
