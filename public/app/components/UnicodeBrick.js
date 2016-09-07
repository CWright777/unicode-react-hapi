import React, { Component } from 'react';
import {
  Brick,
  Heading,
  Value,
} from 'grommet';

export const UnicodeBrick = props => {
  console.log(props)
  const getCharCode = (char) => {
    return `U+${char.charCodeAt()}`;
  };

  const unicodeCharCode = getCharCode(props.value);

  return(
    <Brick
      onClick={props.clickBrick}
      key={props.key}
      colorIndex={props.colorIndex}
      direction='row'
      align='center'
      label={unicodeCharCode}
    >
      <Heading 
        direction='column'
        align='center'
        style={{margin: 'auto 0',textAlign:'center'}}
      >
        <Value
          size='large'
          value={props.value}
          align='center'
        />
      </Heading>
    </Brick>
  )
}
