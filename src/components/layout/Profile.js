import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';

import { getCurrentProfile } from '../../actions/user';
import { getCurrentUserPhotos } from '../../actions/photo';

import { ProfileInfoPrivate } from './ProfileInfo';
import UploadPhoto from '../profile-forms/UploadPhoto';
import { PhotosDisplayPrivate } from './PhotosDisplay';

const Profile = ({
  auth: { user },
  isAuthenticated,
  getCurrentProfile,
  getCurrentUserPhotos,
  user: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentUserPhotos();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      {/* Show page depending if user has submitted profile info already */}
      {profile !== undefined ? (
        <Fragment>
          
          <ProfileInfoPrivate />
          <div>
          <UploadPhoto />
          <PhotosDisplayPrivate/>
          </div>
        </Fragment>

      ) : (
        <Fragment>
          <p>You dont have a profile yet!</p>
          <Link to='/create-my-profile'>Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentUserPhotos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCurrentUserPhotos }
)(Profile);
