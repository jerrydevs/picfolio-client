import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fileType from 'file-type';
import {Button, ButtonGroup, Container,Row,Col, Image} from 'react-bootstrap';

const ProfilePhotoDisplay = ({ profilephotos }) => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  let photoBuffer;
  let b64encoded;
  let data;
  let mime;

  return (
    <div >
      {profilephotos !== undefined? (
        profilephotos.map((profilePhoto, index) => {
          photoBuffer = profilePhoto.profilePhoto.data;
          console.log(profilePhoto);
          b64encoded = btoa(new Uint8Array(photoBuffer).reduce(function(data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));
          // b64encoded = btoa(String.fromCharCode.apply(null, photoBuffer));
          mime = fileType(Buffer.from(photoBuffer)).mime;
          data = 'data:' + mime + ';base64,' + b64encoded;
          return <div key={index} className="container"><Image src={data} className="image" key={0} roundedCircle responsive thumbnail fluid /></div>;
        })
      ) : (
        <p>Loading</p>
      )}

    </div>
  );
};

ProfilePhotoDisplay.propTypes = {
  profilephotos: PropTypes.array
};

const mapStateToProps = state => ({
  profilephotos: state.profilePhoto.profilephotos
});

export default connect(
  mapStateToProps,
  {}
)(ProfilePhotoDisplay);
