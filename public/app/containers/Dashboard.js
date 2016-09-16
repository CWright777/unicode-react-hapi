import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getDelimiters,
  getPropertyRelationInfo,
  getSingleDelimiterInfo,
  createNewDelimiter,
  deleteDelimiter
} from '../actions/delimiters/index';
import {
  Heading,
  Section,
  Bricks,
  Tabs,
  Tab,
  Button,
} from 'grommet';
import UnicodeBricks from '../components/UnicodeBricks';
import SelectorHeading from '../components/SelectorHeading';
import RelationTabs from '../components/RelationTabs';
import AddDelimiterModal from '../components/AddDelimiterModal'
import { SHOW_SELECTED_DELIMITER_INFO } from '../actions/delimiters/types';

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddDelimiterModalHidden: true,
      isDeleteDelimiterModalHidden: true,
      addDelimiterForm: {
        name: "",
        value: ""
      }
    }

    this.onSelectProperty = this.onSelectProperty.bind(this);
    this.clickBrick = this.clickBrick.bind(this);
    this.toggleAddDelimiterModal = this.toggleAddDelimiterModal.bind(this);
    this.handleDelimiterFormTyping = this.handleDelimiterFormTyping.bind(this);
    this.submitDelimiter = this.submitDelimiter.bind(this);
    this.deleteSelectedDelimiter = this.deleteSelectedDelimiter.bind(this);
  }

  toggleAddDelimiterModal(){
    this.setState({
      ...this.state,
      isAddDelimiterModalHidden: !this.state.isAddDelimiterModalHidden
    })
  }


  onSelectProperty(property){
    getPropertyRelationInfo(property)(this.props.dispatch)
  }

  clickBrick(selectedDelimiter){
    const delimiterId = selectedDelimiter.id
    getSingleDelimiterInfo(delimiterId)(this.props.dispatch)
  }

  submitDelimiter(){
    const { addDelimiterForm } = this.state;
    const patchedObj = {
      property: addDelimiterForm.name,
      value: addDelimiterForm.value,
    }
    createNewDelimiter(patchedObj)(this.props.dispatch);
    this.toggleAddDelimiterModal();
  }

  deleteSelectedDelimiter(){
    const property = this.props.property.value;
    property
    ? deleteDelimiter(property)(this.props.dispatch)
    : null
  }

  handleDelimiterFormTyping(newInputValue,inputName){
    const newState = {...this.state};
    newState.addDelimiterForm[inputName] = newInputValue;
    this.setState(newState);
  }

  componentDidMount(property){
    getDelimiters(property)(this.props.dispatch);
  }

  render(){
    return (
      <Section>
        <AddDelimiterModal
          hidden={this.state.isAddDelimiterModalHidden}
          onClose={this.toggleAddDelimiterModal}
          values={this.state.addDelimiterForm}
          onInputChange={(newInputValue,inputName) => this.handleDelimiterFormTyping(newInputValue,inputName)}
          submit={this.submitDelimiter}
        />
        <Section align='end' direction='column' pad={{horizontal: 'large', between: 'small'}}>
            <Button
              label='Add delimiter'
              onClick={this.toggleAddDelimiterModal}
              primary={true}
            />
            <Button
              label='Delete delimiter'
              onClick={this.deleteSelectedDelimiter}
              secondary={true}
            />
        </Section>
        <Section align='center'>
          <SelectorHeading
            onChange={this.onSelectProperty}
            options={this.props.properties}
            value={this.props.property.value}
          />
          <Section pad='medium' style={{width: '80%'}}>
            <UnicodeBricks
              onClick={this.clickBrick}
              value={this.props.propertyRelationInfo}
            />
            { this.props.isRelationalTabsHidden
              ? null
              :<RelationTabs
                languages={this.props.languages}
                territories={this.props.territories}
                scripts={this.props.scripts}
              />}
          </Section>
        </Section>
      </Section>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    delimiters,
    properties,
    propertyRelationInfo,
    property,
    languages,
    territories,
    scripts,
    isRelationalTabsHidden,
    selectedDelimiter,
  } = state.delimiter || {
    isFetching: true,
    delimiters: [],
    properties: [],
    propertyRelationInfo: [],
    property: {},
    isRelationalTabsHidden: true,
  }
  return {
    isFetching,
    delimiters,
    properties,
    property,
    propertyRelationInfo,
    isRelationalTabsHidden,
    selectedDelimiter,
    languages,
    scripts,
    territories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators({delimiterActions}, dispatch),
    dispatch
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)

const styles= {
}
