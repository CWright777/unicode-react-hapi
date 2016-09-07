import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDelimiters, getPropertyRelationInfo } from '../actions/delimiters/index';
import {
  Heading,
  Section,
  Bricks,
  Tabs,
  Tab,
} from 'grommet';
import Select from 'react-select';
import { UnicodeBrick } from '../components/UnicodeBrick';
import 'react-select/dist/react-select.css';

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showRelationTabs: false,
    }

    this.onSelectProperty = this.onSelectProperty.bind(this);
    this.clickBrick = this.clickBrick.bind(this);

  }

  onSelectProperty(property){
    getPropertyRelationInfo(property)(this.props.dispatch)
  }
  clickBrick(){
    this.setState({
      ...this.state,
      showRelationTabs: true
    })
  }
  componentDidMount(property){
    getDelimiters(property)(this.props.dispatch)
  }
  render(){
    return (
      <Section align='center'>
        <Section align='center'>
          <Heading>
            'Delimiters'
          </Heading>
          <Heading tag='h4' align='start'>
            Select a delimiter property!
          </Heading>
          <Select
            value={this.props.property.value}
            options={this.props.properties}
            onChange={(option) => this.onSelectProperty(option)}
            matchPos='start'
            placeholder='Delimiter Property'
            backspaceRemoves={false}
            wrapperStyle={{width: 'auto',minWidth: '300px',alignText: 'center'}}
            inputProps={{className: 'selectFixCursor'}}
          />
        </Section>
        <Section pad='small' style={{width: '90%'}}>
          <Section>
            <Bricks>
            {
                this.props.propertyRelationInfo
                .map((property, i) => {
                  return (
                    <UnicodeBrick
                      onClick={this.clickBrick}
                      key={property}
                      value={property.value}
                      colorIndex="neutral-3"
                    />
                  )
                })
            }
            </Bricks>
          </Section>
          <Section>
            <Tabs justify="start">
              <Tab title='Languages'>
                
              </Tab>
              <Tab title='Locales'>
                <h1>ads</h1>
              </Tab>
              <Tab title='Scripts'>
              </Tab>
            </Tabs>
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
    property
  } = state.delimiter || {
    isFetching: true,
    delimiters: [],
    properties: [],
    propertyRelationInfo: [],
    property: {}
  }
  return {
    isFetching,
    delimiters,
    properties,
    property,
    propertyRelationInfo,
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
