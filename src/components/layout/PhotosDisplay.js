import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fileType from 'file-type';
import styles from '../styles/profileStyles.module.css';

const PhotosDisplay = ({ photos }) => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  let photoBuffer;
  let b64encoded;
  let data;
  let mime;

  return (
    <div className={styles.photo_display}>
      {((photos !== undefined) && (photos !== null)) ? (
        console.log(photos),
        photos.slice(0).reverse().map((photo, index) => {
          photoBuffer = photo.photo.data;
          b64encoded = btoa(new Uint8Array(photoBuffer).reduce(function(data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));
          // b64encoded = btoa(String.fromCharCode.apply(null, photoBuffer));
          mime = fileType(Buffer.from(photoBuffer)).mime;
          data = 'data:' + mime + ';base64,' + b64encoded;
          return <div className={styles.image_container} key={index+'div'}><img className={styles.display_image} key={index} src={data} /></div>;
        })
      ) : (
        <p>Loading</p>
      )}

    </div>
  );
};

PhotosDisplay.propTypes = {
  photos: PropTypes.array
};

const mapStateToPropsPrivate = state => ({
  photos: state.photo.photos
});
  
const mapStateToPropsPublic = state => ({
  photos: state.view.viewPhoto
})

export const PhotosDisplayPrivate = connect(
  mapStateToPropsPrivate,
  {}
)(PhotosDisplay);

export const PhotosDisplayPublic = connect(
  mapStateToPropsPublic,
  {}
)(PhotosDisplay);