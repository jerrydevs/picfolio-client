import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uploadProfilePhoto } from '../../actions/profilePhoto';
import {Button, Row, Col,Form} from 'react-bootstrap';
const UploadProfilePhoto = ({ uploadProfilePhoto, history }) => {

  const [profilePhoto, setPhoto] = useState([]);


  const onChangePhoto = event => {
    console.log(event.target.files[0]);
    setPhoto({ ...profilePhoto, [event.target.name]: event.target.files[0] });
  };

  const onSubmit = event => {
    event.preventDefault();

    const form = new FormData();
    form.append('myPhoto', profilePhoto.myPhoto);

    console.log(profilePhoto.myPhoto);
    for (let pair of form.entries()){
      console.log(pair[0] + ' ' + pair[1]);
    }
    uploadProfilePhoto(form, history);

    window.location.replace('/profile');
  };

  return (
    <Fragment>
    <div className="upload-div">
    <Form onSubmit={event => onSubmit(event)}>

    <Col>
      <Row>
          <Form.Group controlId="formImageUpload">
            <Form.Control type="file"  accept="image/*" name='myPhoto'
            onChange={event => onChangePhoto(event)}  required/>
        </Form.Group>
     </Row>

    <Row>
    <Button className="populate-btn" type="submit">
      Update
    </Button>
    </Row>
    </Col>

      </Form>
      </div>
    </Fragment>
  );
  // return (
  //   <Fragment>
  //     <form
  //       className='form'
  //       action='http://localhost:5000/api/photo'
  //       method='POST'
  //       encType='multipart/form-data'
  //     >
  //       <input type='file' name='myPhoto' />

  //       <input type='submit' value='Upload' />
  //     </form>
  //   </Fragment>
  // );
};

UploadProfilePhoto.propTypes = {
  uploadProfilePhoto: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  null,
  { uploadProfilePhoto }
)(withRouter(UploadProfilePhoto));
