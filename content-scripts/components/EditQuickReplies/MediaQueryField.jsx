import React, { useState } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from 'antd/es/table';
import moment from 'moment';
import { convertStrToNode } from '../../helpers';
import { deleteReply } from '../../../src/reducers/app/actions';
import { deleteQuickReply } from '../../utils';
import * as css from './style.css';


const propTypes = {
    mediaQuickReplies: array,
    deleteReply: func
};


function MediaQueryField({
    mediaQuickReplies,
    deleteReply
}) {

    const [sortedInfo, setSortedInfo] = useState(null);

    const sorted = sortedInfo || {};


    const handleDeleteReply = (id) => () => {
        deleteQuickReply(id);
        deleteReply(id);
    };

    const columns = [
        {
            title: <p>Filter by:&nbsp;&nbsp;&nbsp;&nbsp;Name</p>,
            dataIndex: 'fileName',
            key: 'fileName',
            sorter: (a, b) => a.fileName.length - b.fileName.length,
            sortOrder: sorted.columnKey === 'fileName' && sorted.order,
            ellipsis: true,
            render: (text, record) => <p>{convertStrToNode(record.text, text, css.storagedImg)}</p>
        },
        {
            title: <p>Date Modified</p>,
            dataIndex: 'fileLastModified',
            key: 'fileLastModified',
            sorter: (a, b) => a.fileLastModified - b.fileLastModified,
            sortOrder: sorted.columnKey === 'fileLastModified' && sorted.order,
            ellipsis: true,
            render: text => <p>{moment((text)).format('DD/MM/YYYY HH:mm')}</p>
        },
        {
            title: <p>Type</p>,
            dataIndex: 'fileType',
            key: 'fileType',
            sorter: (a, b) => a.fileType.length - b.fileType.length,
            sortOrder: sorted.columnKey === 'fileType' && sorted.order,
            ellipsis: true,
        },
        {
            title: <p>Size</p>,
            dataIndex: 'fileSize',
            key: 'fileSize',
            sorter: (a, b) => a.fileSize - b.fileSize,
            sortOrder: sorted.columnKey === 'fileSize' && sorted.order,
            ellipsis: true,
        },
        {
            title: <p>Actions</p>,
            dataIndex: 'actions',
            key: 'actions',
            width: '100px',
            render: (text, record) =>
                <p
                    className={css.deleteTableButton}
                    onClick={handleDeleteReply(record.id)}
                >
                    Delete
                </p>
        }
    ];


    const handleSortedChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    }


    return (
        <div className={css.mediaQueryTable}>
            <Table
                columns={columns}
                dataSource={mediaQuickReplies}
                onChange={handleSortedChange}
                size="small"
                scroll={{ y: 200 }}
                pagination={false}
                rowKey='fileName'
            />
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    deleteReply: bindActionCreators(deleteReply, dispatch),
});

MediaQueryField.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(MediaQueryField);