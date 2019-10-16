import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Upload from 'antd/es/upload';
import Form from 'antd/es/form';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
// import { saveUploadedFile } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    // saveUploadedFile: func
};


function MediaQueryUploader() {

    const [fileList, setFileList] = React.useState([]);

    const onRemoveUploadFile = () => {
        setFileList([]);
    };

    const onBeforeUpload = () => {
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(fileList[0])) return null;
        const replyFormData = new FormData();
        replyFormData.append(`file`, fileList[0].originFileObj);console.log('///------//////', replyFormData)
        // saveUploadedFile(replyFormData);
        setFileList([]);
    }

    const propsUploader = {
        name: 'file',
        listType: 'picture',
        className: 'upload-list-inline',
        onChange(info) {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
        },
    };

    return (
        <Form
            encType="multipart/form-data"
            className={css.uploaderFormWrapper}
            onSubmit={handleSubmit}
        >
            <Form.Item>
                <Upload
                    {...propsUploader}
                    onRemove={onRemoveUploadFile}
                    beforeUpload={onBeforeUpload}
                    fileList={fileList}
                >
                    <Button disabled={isEmpty(fileList) ? false : true}>
                        Upload New Media
                        <Icon type="plus" />
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                {!isEmpty(fileList) && <Button type='save' htmlType="submit">Save</Button>}
            </Form.Item>
        </Form>
    );
}



const mapDispatchToProps = (dispatch) => ({
    // saveUploadedFile: bindActionCreators(saveUploadedFile, dispatch),
});


MediaQueryUploader.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(MediaQueryUploader);