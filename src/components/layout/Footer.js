import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Navbar, Nav, ButtonGroup} from 'react-bootstrap';
import styles from '../styles/footerStyles.module.css'

const Footer = () => {
  return (

/*  <Navbar className="nav-color" expand="lg"  sticky="top" variant="light">
    </Navbar>
  */

<Navbar className={styles.foot}>
<div className="text-center">

      <div className={styles.linkList}>
          <a style={{color:"gray"}} href="#!">About Picfolio</a>
          <a style={{color:"gray"}} href="#!">FAQ</a>
          <a style={{color:"gray"}} href="#!">Contact Us</a>
      </div>

      <div className={styles.copyright}>     © 2019 Copyright Picfolio Inc.
      </div>

</div>

</Navbar>

  );
};


export default Footer;
