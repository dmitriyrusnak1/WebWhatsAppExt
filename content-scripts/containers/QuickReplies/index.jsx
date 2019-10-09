import React from "react";
import {Button} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCount } from '../../../src/reducers/app/actions';


class QuickReplies extends React.Component {
  constructor(props) {
    super(props);
  }


  handleAddCount = () => {
    this.props.addCount();
  }

  render() {
    return <div className='quick-replies'>
      <Button type="primary" onClick={this.handleAddCount}>Click me</Button>
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCount: bindActionCreators(addCount, dispatch)
});


const mapStateToProps = (state) =>({
  count: state.app,
  state: state
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickReplies);