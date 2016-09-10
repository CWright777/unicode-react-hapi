import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getDelimiters,
  getPropertyRelationInfo,
  getSingleDelimiterInfo
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
      addDelimiterForm: {
        name: "",
        value: ""
      }
    }

    this.onSelectProperty = this.onSelectProperty.bind(this);
    this.clickBrick = this.clickBrick.bind(this);
    this.toggleAddDelimiterModal = this.toggleAddDelimiterModal.bind(this);
    this.handleDelimiterFormTyping = this.handleDelimiterFormTyping.bind(this);
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
    
  }

  handleDelimiterFormTyping(newInputValue,inputName){
    const newState = {...this.state};
    newState.addDelimiterForm[inputName] = newInputValue;
    this.setState(newState);
  }

  componentDidMount(property){
    getDelimiters(property)(this.props.dispatch)
  }

  render(){
    return (
      <Section>
        <AddDelimiterModal
          hidden={this.state.isAddDelimiterModalHidden}
          onClose={this.toggleAddDelimiterModal}
          values={this.state.addDelimiterForm}
          onInputChange={(newInputValue,inputName) => this.handleDelimiterFormTyping(newInputValue,inputName)}
          ref={ref => this.hand = ref}
        />
        <Section align='end' pad={{horizontal: 'large'}}>
          <Button
            label='Add delimiter'
            onClick={this.toggleAddDelimiterModal}
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
    selectedDelimiter,
    languages
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
    territories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators({delimiterActions}, dispatch),
    dispatch
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Dashboard))

const styles= {
}
