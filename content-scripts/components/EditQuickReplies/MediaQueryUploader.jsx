import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Upload from 'antd/es/upload';
import Form from 'antd/es/form';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { setNewQuickReplyMediaQuery } from '../../helpers';
import { addNewReplyMediaQuery } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    addNewReply: func,
    addNewReplyMediaQuery: func
};


function MediaQueryUploader({ addNewReplyMediaQuery }) {

    const [fileList, setFileList] = React.useState([]);
    const [uploadError, setUploadError] = React.useState('');

    const onRemoveUploadFile = () => {
        setFileList([]);
        setUploadError('');
    };

    const onBeforeUpload = () => {
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(fileList[0])) return null;
        const replyFormData = new FormData();
        replyFormData.append(`file`, fileList[0].originFileObj);

        const fileSize = fileList[0].originFileObj.size;
        if (fileSize >= 5000000) {
            setUploadError('The file size is too big. Shouldn\'t exceed 5 MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            setNewQuickReplyMediaQuery(reader.result, fileList[0].originFileObj.name);
            addNewReplyMediaQuery(reader.result, fileList[0].originFileObj.name)
        }
        reader.readAsDataURL(fileList[0].originFileObj);

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
                <p className={css.errorField}>{uploadError}</p>
            </Form.Item>
            <Form.Item>
                {!isEmpty(fileList) && <Button type='save' htmlType="submit">Save</Button>}
            </Form.Item>
        </Form>
    );
}



const mapDispatchToProps = (dispatch) => ({
    addNewReplyMediaQuery: bindActionCreators(addNewReplyMediaQuery, dispatch)
});


MediaQueryUploader.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(MediaQueryUploader);