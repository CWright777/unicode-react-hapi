import React, { Component } from 'react';
import {
  Layer,
  Form,
  FormField,
  Header,
  Button,
  Section
} from 'grommet';
import Joi from 'joi';

export const AddDelimiterModal = props => {
  const {name, value} = props.values

  //TODO: Currently doesn't support pasting into the textbox and likely more
  const isValid = (key, inputName) => {
    const currentInputValue = props.values[inputName];
    const currentInputLength = currentInputValue.length;
    const pressedKey = key.nativeEvent.key;

    const validation = Joi.validate(name, Joi.string().min(3).required());

    if(pressedKey.length === 1 || pressedKey === 'Backspace'){

      const newInputValue = pressedKey !== 'Backspace'
        ? `${currentInputValue}${key.nativeEvent.key}`
        : currentInputValue.slice(0,currentInputLength - 1)

        props.onInputChange(newInputValue,inputName)
    }
  }
  
  return(
    <Layer
      closer={true}
      onClose={props.onClose}
      hidden={props.hidden}
    >
      <Form>
        <Header>
          <h2>
            Add a new Delimiter
          </h2>
        </Header>
        <FormField label='Property Name'>
          <input
            type='text'
            value={name}
            onKeyDown={ (key) => isValid(key,'name')}
          />
        </FormField>
        <FormField label='Delimiter Character Value'>
          <input
            type='text'
            value={value}
            onKeyDown={ (key) => isValid(key,'value')}
          />
        </FormField>
        <Section align='end'>
          <Button
            label='Add Delimiter'
            onClick={props.submit}
          />
        </Section>
      </Form>
    </Layer>
  )
}

export default AddDelimiterModal
