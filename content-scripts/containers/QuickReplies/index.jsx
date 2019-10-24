import React from "react";
import { array, object } from 'prop-types';
import Icon from 'antd/es/icon';
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { SendEmailWindow, EditQuickReplies } from '../../components';
import { countFilteredUsers, filterContacts, convertStrToNode } from '../../helpers';
import { chooseCurrentQuickReply } from '../../utils';
import { EMAIL_PATTERN } from '../../constants';
import * as css from './style.css';



const propTypes = {
  quickReplies: array,
  colorFilters: array,
  usersConnectedLabels: object
};

class QuickReplies extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.QRRef = React.createRef();
  }

  state = {
    isQuickRepliesVisible: false,
    isModalMoreVisible: false,
    isModalEmailVisible: false,
    email: '',
    choosenReplies: '',
    choosenFilter: {},
    isFiltersVisible: false,
    isEmailValid: false,
    successSending: false
  }


  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (
        !this.myRef.current.contains(e.target) &&
        !!this.state.isQuickRepliesVisible &&
        !this.QRRef.current.contains(e.target)
    ) {
        this.setState({ isQuickRepliesVisible: false });
    }
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
    this.setState({
        isModalEmailVisible: !this.state.isModalEmailVisible,
        email: '',
        isEmailValid: false,
        successSending: false
    });
  }

  handleChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({email: value});

    if(!!value){
        const rule = EMAIL_PATTERN.test(value);
        if (!rule){
            this.setState({isEmailValid: false});
        } else {
            this.setState({isEmailValid: true});
        }
    }
  }

  handleSendEmail = (e) => {
    e.preventDefault();
    const { email, isEmailValid } = this.state;

    if(!email || !isEmailValid) {
        return null;
    } else {
        this.setState({ successSending: true });
    }
  }


  handleChooseReplies = (id) => () => {
    this.setState({
      choosenReplies: id,
      isQuickRepliesVisible: false
    });
    chooseCurrentQuickReply(id);
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
      choosenFilter,
      isEmailValid,
      successSending
    } = this.state;

    const { quickReplies, colorFilters, usersConnectedLabels } = this.props;

    return <div className='quick-replies'>
      <div className={css.mainBottomAreaWrapper}>
          <div
            className={css.filtersField}
            onClick={this.handleOpenFilters}
            style={{background: isFiltersVisible ? '#c8c8c8' : 'inherit'}}
          >
              {
                  isEmpty(choosenFilter) ?
                  <p className={css.chosenQuickReplies}>Filter</p> :
                  <div className={css.chosenQuickReplies}>
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
              <p><Icon type="down" /></p>
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
              <div
                  style={{background: isQuickRepliesVisible || isModalMoreVisible ? '#c8c8c8' : 'inherit'}}
                  onClick={this.handleOpenQuickReplies}
                  ref={this.QRRef}
              >
                  <p className={css.chosenQuickReplies}>{!choosenReplies ? 'Quick Replies' : this.filteredData()}</p>
                  <p>
                      <Icon type="down" />
                  </p>
                  <div
                      className={classNames({
                          [css.quickReplies]: true,
                          [css.disableQuickReplies]: !isQuickRepliesVisible,
                      })}
                    ref={this.myRef}
                  >
                      <div>
                          {quickReplies.sort((a, b) => b.count - a.count).map((item) =>
                              <React.Fragment key={item.id}>
                                    <p onClick={this.handleChooseReplies(item.id)}>
                                        {
                                            convertStrToNode(item.text, css.storagedImg, !!item.fileName ? item.fileName : '')
                                        }
                                    </p>

                                  <div className={css.divider} />
                              </React.Fragment>)}
                      </div>
                      <Tooltip overlayStyle={{zIndex: '1111111111111'}} title='Add new Quick Reply or new File'>
                            <Button onClick={this.handleOpenModalMore}>More<Icon type="double-right" /></Button>
                      </Tooltip>
                  </div>
              </div>
              <Tooltip title="Send Conversation to Email">
                <div
                    className={css.emailButton}
                    onClick={this.handleOpenModalEmail}
                    style={{background: isModalEmailVisible ? '#c8c8c8' : 'inherit'}}
                >
                    <Icon type="mail" />
                </div>
              </Tooltip>
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
              isEmailValid={isEmailValid}
              successSending={successSending}
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