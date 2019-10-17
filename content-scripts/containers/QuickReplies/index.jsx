import React from "react";
import { array, object } from 'prop-types';
import Icon from 'antd/es/icon';
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isObjectLike from 'lodash/isObjectLike';
import { SendEmailWindow, EditQuickReplies } from '../../components';
import { countFilteredUsers, filterContacts, convertStrToNode } from '../../helpers';
import * as css from './style.css';



const propTypes = {
  quickReplies: array,
  colorFilters: array,
  usersConnectedLabels: object
};

class QuickReplies extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isQuickRepliesVisible: false,
    isModalMoreVisible: false,
    isModalEmailVisible: false,
    email: '',
    choosenReplies: '',
    choosenFilter: {},
    isFiltersVisible: false
  }

  handleOpenQuickReplies = () => {
    this.setState({isQuickRepliesVisible: !this.state.isQuickRepliesVisible});
  }

  handleCancelModalMore = () => {
    this.setState({isModalMoreVisible: !this.state.isModalMoreVisible});
  }

  handleOpenModalMore = () => {
    this.setState({isModalMoreVisible: !this.state.isModalMoreVisible});
    this.setState({isQuickRepliesVisible: false});
  }

  handleOpenModalEmail = () => {
    this.setState({isModalEmailVisible: !this.state.isModalEmailVisible});
  }

  handleCloseModalEmail = () => {
    this.setState({isModalEmailVisible: !this.state.isModalEmailVisible});
    this.setState({email: ''});
  }

  handleChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({email: value});
  }

  handleSendEmail = (e) => {
    e.preventDefault();
    this.setState({isModalEmailVisible: !this.state.isModalEmailVisible});
  }

  handleChooseReplies = (id) => () => {
    this.setState({
      choosenReplies: id,
      isQuickRepliesVisible: false
    });
  }

  handleOpenFilters = () => {
    this.setState({isFiltersVisible: !this.state.isFiltersVisible});
  }

  handleChooseFilters = (item) => () => {
    this.setState({
      choosenFilter: {...item},
      isFiltersVisible: false
    });
    filterContacts(document, item);
  }

  filteredData = () => {
    const rawData = this.props.quickReplies.filter(item => item.id === this.state.choosenReplies)[0];
    const data = this.props.quickReplies.filter(item => item.id === this.state.choosenReplies)[0].text;
    // const filter = isObjectLike(data) ? 'OBJECT' : data;

    // const filter = data.split(';')[0].includes('data:') ? <img className={css.storagedImg} src={data} /> : data;
    const filter = convertStrToNode(data, css.storagedImg, !!rawData.fileName ? rawData.fileName : '');

    return filter;
  }


  render() {
    const {
      isQuickRepliesVisible,
      isModalMoreVisible,
      isModalEmailVisible,
      email,
      choosenReplies,
      isFiltersVisible,
      choosenFilter
    } = this.state;

    const { quickReplies, colorFilters, usersConnectedLabels } = this.props;

    return <div className='quick-replies'>
      <div className={css.mainBottomAreaWrapper}>
          <div className={css.filtersField}>
              {
                  isEmpty(choosenFilter) ?
                  <p>Filter</p> :
                  <div>
                      {colorFilters.map(item => 
                          item.id === choosenFilter.id ?
                          <div key={item.id} className={css.colorField}>
                              <div className={css.colorCircle} style={{background: `${item.color}`}} />
                              <p>{item.label}</p>
                              <p>({countFilteredUsers(item.label, usersConnectedLabels)})</p>
                          </div> : null
                      )}
                  </div>
              }
              <p><Icon onClick={this.handleOpenFilters} type="down" /></p>
              <div
                  className={classNames({
                      [css.filters]: true,
                      [css.disableFilters]: !isFiltersVisible,
                  })}
              >
                  <div>
                      <p>Filter by:</p>
                      {colorFilters.map((item) =>
                          <div onClick={this.handleChooseFilters(item)} key={item.id}>
                              <div className={css.colorField}>
                                  <div className={css.colorCircle} style={{background: `${item.color}`}} />
                                  <p>{item.label}</p>
                                  <p>({countFilteredUsers(item.label, usersConnectedLabels)})</p>
                              </div>
                              <div className={css.divider} />
                          </div>)}
                  </div>
              </div>
          </div>
          <div className={css.quickRepliesField}>
              <div>
                  {/* <p>{!choosenReplies ? 'Quick Replies' : quickReplies.filter(item => item.id === choosenReplies)[0].text}</p> */}
                  <p>{!choosenReplies ? 'Quick Replies' : this.filteredData()}</p>
                  <p>
                      <Icon onClick={this.handleOpenQuickReplies} type="down" />
                  </p>
                  <div
                      className={classNames({
                          [css.quickReplies]: true,
                          [css.disableQuickReplies]: !isQuickRepliesVisible,
                      })}
                  >
                      <div>
                          {quickReplies.map((item) =>
                              <React.Fragment key={item.id}>
                                  {/* <p onClick={this.handleChooseReplies(item.id)}>{!isObjectLike(item.text) ? item.text : 'OBJECT'}</p> */}

                                    <p onClick={this.handleChooseReplies(item.id)}>
                                        {
                                            // item.text.split(';')[0].includes('data:') ?
                                            //     <img className={css.storagedImg} src={item.text} /> :
                                            //     item.text
                                            convertStrToNode(item.text, css.storagedImg, !!item.fileName ? item.fileName : '')
                                        }
                                    </p>

                                  <div className={css.divider} />
                              </React.Fragment>)}
                      </div>
                      <Button onClick={this.handleOpenModalMore}>More<Icon type="double-right" /></Button>
                  </div>
              </div>
              <div className={css.emailButton}>
                  <Icon type="mail" onClick={this.handleOpenModalEmail} />
              </div>
          </div>
      </div>
      <Modal
          visible={isModalMoreVisible}
          footer={null}
          onCancel={this.handleCancelModalMore}
          width={900}
      >
          <EditQuickReplies />
      </Modal>
      <Modal
          visible={isModalEmailVisible}
          footer={null}
          onCancel={this.handleCloseModalEmail}
      >
          <SendEmailWindow
              handleChangeEmail={this.handleChangeEmail}
              handleSendEmail={this.handleSendEmail}
              email={email}
          />
      </Modal>
    </div>;
  }
}



const mapStateToProps = (state) =>({
  quickReplies: state.app.quickReplies,
  colorFilters: state.app.colorFilters,
  usersConnectedLabels: state.app.usersConnectedLabels
});

QuickReplies.propTypes = propTypes;

export default connect(mapStateToProps)(QuickReplies);