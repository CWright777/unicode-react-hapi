import React, { Component } from 'react';
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
} from 'grommet';
import UnicodeBricks from '../components/UnicodeBricks';
import SelectorHeading from '../components/SelectorHeading';
import RelationTabs from '../components/RelationTabs';
import { SHOW_SELECTED_DELIMITER_INFO } from '../actions/delimiters/types';

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.onSelectProperty = this.onSelectProperty.bind(this);
    this.clickBrick = this.clickBrick.bind(this);

  }

  onSelectProperty(property){
    getPropertyRelationInfo(property)(this.props.dispatch)
  }

  clickBrick(selectedDelimiter){
    const delimiterId = selectedDelimiter.id
    getSingleDelimiterInfo(delimiterId)(this.props.dispatch)
  }

  componentDidMount(property){
    getDelimiters(property)(this.props.dispatch)
  }

  render(){
    return (
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
              selectedDelimiter={this.props.selectedDelimiter}
              languages={this.props.languages}
            />}
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
    languages
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
