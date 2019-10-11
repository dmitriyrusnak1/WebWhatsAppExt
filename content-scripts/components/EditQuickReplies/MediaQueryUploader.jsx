import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Upload from 'antd/es/upload';
import Form from 'antd/es/form';
import { bindActionCreators } from 'redux';
// import { addNewReply } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {

};


function MediaQueryUploader() {


    return (
        <Form className={css.uploaderFormWrapper}>
            {/* <Upload {...props}> */}
                <Button>
                    Upload New Media
                    <Icon type="plus" />
                </Button>
            {/* </Upload> */}
        </Form>
    );
}



const mapDispatchToProps = (dispatch) => ({
    // addNewReply: bindActionCreators(addNewReply, dispatch),
});


MediaQueryUploader.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(MediaQueryUploader);