import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import QuickRepliesField from './QuickRepliesField';
import AddNewReplyField from './AddNewReplyField';
import MediaQueryUploader from './MediaQueryUploader';
import * as css from './style.css';


const propTypes = {
    quickReplies: array
};


function EditQuickReplies({
    quickReplies,
}) {

    return (
        <div className={css.editQuickRepliesWrapper}>
            <h1>text quick reply</h1>
            {quickReplies.map(item => <QuickRepliesField key={item.id} reply={item} />)}
            <AddNewReplyField />
            <section className={css.mediaQueryField}>
                <h1>media quick reply</h1>
                <MediaQueryUploader />
            </section>
        </div>
    );
}



const mapStateToProps = (state) =>({
    quickReplies: state.app.quickReplies
});

EditQuickReplies.propTypes = propTypes;


export default connect(mapStateToProps)(EditQuickReplies);