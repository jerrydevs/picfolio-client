import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import { getViewProfile } from '../../actions/view'
import { PhotosDisplayPublic } from './PhotosDisplay';
import { ProfileInfoPublic } from './ProfileInfo';

const PublicProfile = ({ view: { viewUser, loading, error }, match: { params }, getViewProfile}) => {
    useEffect(() => {
        getViewProfile(params.handle);
        setTimeout(() => {}, 1000);
    }, []);

    if(viewUser !== null) {
        return(
            <div> 
                <ProfileInfoPublic />
                <PhotosDisplayPublic />
            </div>
        );
    } else if (loading) {
        return <Spinner animation='border' role='status'></Spinner>
    } else if (error !== null) {
        return(
            <h1>User was not found</h1>
        )
    } 
    else {
        return(
            <h1>loading...</h1>
        )
    }
}

PublicProfile.propTypes = {
    getViewProfile: PropTypes.func.isRequired,
    view: PropTypes.object
}

const mapStateToProps = state => ({
    view: state.view,
})

export default connect(mapStateToProps, { getViewProfile })(PublicProfile);
