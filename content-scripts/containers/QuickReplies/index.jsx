import React from "react";
import Icon from 'antd/es/icon';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { addCount } from '../../../src/reducers/app/actions';
import * as css from './style.css';



class QuickReplies extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isQuickRepliesVisible: false
  }


  handleAddCount = () => {
    // this.props.addCount();
  }

  handleOpenQuickReplies = () => {
    this.setState({isQuickRepliesVisible: !this.state.isQuickRepliesVisible});
  }
  
  // menu = () => (
  //   <Menu>
  //     <Menu.Item key="0">
  //       <div>1st menu item</div>
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key="1">
  //       <div>2nd menu item</div>
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key="3">
  //       <div onClick={this.handleCancelModal}>3rd menu item</div>
  //     </Menu.Item>
  //   </Menu>
  // );

  render() {
    const { isQuickRepliesVisible } = this.state;

    return <div className='quick-replies'>
      <div className={css.mainBottomAreaWrapper}>
        <div>
          <p>Filter</p>
          <p><Icon type="down" /></p>
        </div>
        <div>
          <p>Quick Replies</p>
          <p>{}
            <Icon onClick={this.handleOpenQuickReplies} type="down" />
          </p>
          <div
            className={classNames({
                [css.quickReplies]: true,
                [css.disableQuickReplies]: !isQuickRepliesVisible,
            })}
          >
            <div>
              <p>Hi!</p>
              <div className={css.divider} />
              <p>Buy!</p>
              <div className={css.divider} />
              <p>Weel!</p>
              <div className={css.divider} />
              <p>Good!</p>
              <div className={css.divider} />
              <p>Very Good!</p>
            </div>
            <Button>More<Icon type="double-right" /></Button>
          </div>
        </div>
      </div>
      {/* <Button type="primary" onClick={this.handleAddCount}>Click me</Button> */}
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