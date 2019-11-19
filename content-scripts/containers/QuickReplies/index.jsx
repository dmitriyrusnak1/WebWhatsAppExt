import React from "react";
import { array, object } from 'prop-types';
import Icon from 'antd/es/icon';
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import Checkbox from 'antd/es/checkbox';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { SendEmailWindow, EditQuickReplies } from '../../components';
import FilterItem from './FilterItem';
import { countFilteredUsers, filterContacts, convertStrToNode, sendConversationToEmail } from '../../helpers';
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

    this.myFilterRef = React.createRef();
    this.FRef = React.createRef();
  }

  state = {
    isQuickRepliesVisible: false,
    isModalMoreVisible: false,
    isModalEmailVisible: false,
    email: '',
    choosenReplies: '',
    choosenFilter: [],
    isFiltersVisible: false,
    isEmailValid: false,
    successSending: false,
  }


  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.choosenFilter !== prevState.choosenFilter) {
        filterContacts(document, this.state.choosenFilter);
    }
  }



  handleClickOutside = (e) => {
    if(
        !this.myRef.current.contains(e.target) &&
        !!this.state.isQuickRepliesVisible &&
        !this.QRRef.current.contains(e.target)
    ) {
        this.setState({ isQuickRepliesVisible: false });
    }

    if(
        !this.myFilterRef.current.contains(e.target) &&
        !!this.state.isFiltersVisible &&
        !this.FRef.current.contains(e.target)
    ) {
        this.setState({ isFiltersVisible: false });
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
      sendConversationToEmail(email);
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
    const { choosenFilter } = this.state;
    const filteredChoosenFilter = choosenFilter.filter(elem => elem.id === item.id)[0];

    if(filteredChoosenFilter) {
        const newData = choosenFilter.filter(elem => elem.id !== item.id);
        this.setState({
            choosenFilter: [...newData]
        });
    } else {
        const newItem = {...item};
        this.setState({
            choosenFilter: [...choosenFilter, newItem]
        });
    }
  }

  filteredData = () => {
    const rawData = this.props.quickReplies.filter(item => item.id === this.state.choosenReplies)[0];
    const data = this.props.quickReplies.filter(item => item.id === this.state.choosenReplies)[0].text;

    const filter = convertStrToNode(data, css.storagedImg, !!rawData.fileName ? rawData.fileName : '');

    return filter;
  }

  showChosenFilters = (id) => {
      const { choosenFilter } = this.state;

      const filteredData = choosenFilter.filter(item => item.id === id)[0];
      const choosen = isEmpty(filteredData) ? false : true;

      return choosen;
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
      successSending,
    } = this.state;

    const { quickReplies, colorFilters, usersConnectedLabels } = this.props;

    return <div className='quick-replies'>
      <div className={css.mainBottomAreaWrapper}>
          <div
            className={css.filtersField}
          >
              <div
                onClick={this.handleOpenFilters}
                ref={this.FRef}
              >
                {
                    isEmpty(choosenFilter) ?
                    <p className={css.chosenQuickReplies}>Filter</p> :
                    <div className={css.chosenQuickReplies}>
                        {choosenFilter.map(item => 
                            <div key={item.id} className={css.colorField}>
                                <div className={css.colorCircle} style={{background: `${item.color}`}} />
                                <p>{item.label}</p>
                                <p>({countFilteredUsers(item.label, usersConnectedLabels)})</p>,
                            </div>
                        )}
                    </div>
                }
                <p className={css.iconDown}><Icon type="down" /></p>
              </div>
              <div
                  className={classNames({
                      [css.filters]: true,
                      [css.disableFilters]: !isFiltersVisible,
                  })}
                  ref={this.myFilterRef}
              >
                  <div>
                      <p>Filter by:</p> 

                            {colorFilters.map((item) =>
                                <FilterItem
                                    key={item.id}
                                    onHandleClick={this.handleChooseFilters}
                                    item={item}
                                    usersConnectedLabels={usersConnectedLabels}
                                    showChosenFilters={this.showChosenFilters}
                                />
                            )}
                        
                  </div>
              </div>
          </div>
          <div className={css.quickRepliesField}>
              <div
                  onClick={this.handleOpenQuickReplies}
                  ref={this.QRRef}
              >
                  <div className={css.quickRepliesMainField}>
                    <p className={css.chosenQuickReplies}>{!choosenReplies ? 'Quick Replies' : this.filteredData()}</p>
                    <p className={css.iconDown}>
                        <Icon type="down" />
                    </p>
                  </div>
                  <div
                      className={classNames({
                          [css.quickReplies]: true,
                          [css.disableQuickReplies]: !isQuickRepliesVisible,
                      })}
                    ref={this.myRef}
                  >
                      <div>
                          {quickReplies.sort((a, b) => b.count - a.count).map((item) =>
                              <div
                                key={item.id}
                                className={classNames({
                                    [css.quickRepliesItem]: !item.fileName,
                                })}
                              >
                                    <p onClick={this.handleChooseReplies(item.id)}>
                                        {
                                            convertStrToNode(item.text, css.storagedImg, !!item.fileName ? item.fileName : '')
                                        }
                                    </p>

                                  <div className={css.divider} />
                              </div>)}
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
                    style={{background: isModalEmailVisible ? '#c8c8c8' : '#ebebeb'}}
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