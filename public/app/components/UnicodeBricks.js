import React, { Component } from 'react';
import {
  Bricks,
  Brick,
  Heading,
  Value,
  Section
} from 'grommet';

export const UnicodeBrick = props => {
  const getCharCode = (char) => {
    return `U+${char.charCodeAt()}`;
  };

  const unicodeCharCode = getCharCode(props.value);

  return(
    <Brick
      onClick={()=>props.onClick()}
      colorIndex={"neutral-3"}
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
export const UnicodeBricks = props => {
  return(
    <Section>
      <Bricks>
      {
          props.value
          .map((property, i) => {
            return (
              <UnicodeBrick
                onClick={(key)=>props.onClick(property)}
                key={i}
                value={property.value}
              />
            )
          })
      }
      </Bricks>
    </Section>
  )
}

export default UnicodeBricks
