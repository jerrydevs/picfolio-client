import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button, ButtonGroup, Container,Row,Col, Image} from 'react-bootstrap';
import youtube_icon from "../../images/icons/youtube_icon.png"
import twitter_icon from "../../images/icons/twitter_icon.png"
import facebook_icon from "../../images/icons/facebook_icon.png"
import linkedin_icon from "../../images/icons/linkedin_icon.png"
import instagram_icon from "../../images/icons/instagram_icon.png"
import location_icon from "../../images/icons/location_icon.png"
import user_icon from "../../images/icons/user_icon.png"

import UploadPhoto from '../profile-forms/UploadPhoto';
import PhotosDisplay from './PhotosDisplay';
import ProfilePhotoDisplay from './ProfilePhotoDisplay';
import UploadProfilePhoto from '../profile-forms/UploadProfilePhoto';

import styles from '../styles/profileStyles.module.css';

const ProfileInfo = ({ profile , user, auth: { isAuthenticated }}) => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  {console.log(profile)}
  return (
    <div className={styles.profile_info}>
      {profile !== null ? (
        <div>
        <div className="container">
          <Image src={user_icon} className={styles.profile_image} />
          {isAuthenticated? <div className="middle"><UploadProfilePhoto /></div> : null}
        </div>

            {user !== null? <h1 className={styles.name_display}>{user.name}</h1> : null }
            {user !== null? <h3 className={styles.username_display}>@{user.username}</h3> : null}
            {profile.location ? <div className={styles.loc_display}><img className={styles.icon} alt="location" src={location_icon}/>   {profile.location}</div> : null}
              <div className={styles.bio_container}>
                {profile.bio ? <p className={styles.bio}>{profile.bio}</p> : null}
              </div>
              {profile.services !== null ? 
                profile.services.map((service, i) => { return(
                  <div key={i}>
                    <p className={styles.service_name}>{service.name}</p> 
                    <p className={styles.service_description}>{service.description}</p> 
                    <p className={styles.price}>Price: ${service.price}</p> 
                  </div>
                )}) : null}
              <div className={styles.social_links}>
                {profile.social && profile.social.youtube ? <a href={profile.social.youtube}><img className={styles.icon} alt="youtube" src={youtube_icon}/></a>: null}
                {profile.social && profile.social.twitter ? <a href={profile.social.twitter}><img className={styles.icon} alt="twitter" src={twitter_icon}/></a>: null}
                {profile.social && profile.social.facebook ? <a href={profile.social.facebook}><img className={styles.icon} alt="facebook" src={facebook_icon}/></a>: null}
                {profile.social && profile.social.linkedin ? <a href={profile.social.linkedin}><img className={styles.icon} alt="linkedin" src={linkedin_icon}/></a> : null}
                {profile.social && profile.social.instagram ? <a href={profile.social.instagram}><img className={styles.icon} alt="instagram" src={instagram_icon}/></a>: null}
              </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToPropsPrivate = state => ({
  profile: state.user.profile,
  user: state.auth.user,
  auth: state.auth});

const mapStateToPropsPublic = state => ({
  profile: state.view.viewUser.profile,
  user: state.view.viewUser,
  auth: state.auth});

export const ProfileInfoPrivate = connect(
  mapStateToPropsPrivate,
  {}
)(ProfileInfo);

export const ProfileInfoPublic = connect(
  mapStateToPropsPublic,
  {}
)(ProfileInfo);