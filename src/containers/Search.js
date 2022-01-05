import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { fetch_search } from '../actions';

const styles = theme => ({
  root: {
  }
});

const mapStateToProps = state => {
  return {
    playlist: state.playlist
  }
}

const mapDispatchToProps = dispatch => ({  
  fetch_search: (params) => dispatch(fetch_search(params)),
})

class Search extends React.Component {

  state = {
    value: 0,
    tabs: [
      { text: '单曲', value: 0 },
      { text: '歌手', value: 1 },
      { text: '专辑', value: 2 },
      { text: '视频', value: 3 },
      { text: '歌单', value: 4 },
      { text: '歌词', value: 5 },
      { text: '主播电台', value: 6 },
      { text: '用户', value: 7 },
    ]
  };

  componentDidMount() {
    
  }

  componentDidUpdate (prevProps) {
   
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  render() {
    const { classes } = this.props;   
    return (
      <div className={classes.root}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          { this.state.tabs.map( (tab) => <Tab label={tab.text} />) }         
        </Tabs>
        { this.state.tabs.map( (tab) => this.state.value === tab.value && <div>{tab.text}</div>) }         
      </div>
    );
  }
}
const StyledSearch = withStyles(styles)(Search);
export default connect(mapStateToProps, mapDispatchToProps)(StyledSearch)