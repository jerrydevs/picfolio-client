import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Navbar, Nav, NavDropdown, Button, FormControl, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/navbarStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [searchForm, setSearchForm] = useState('');

  const onSearchChange = event => {
    setSearchForm(event.target.value);
  };

  const onSearchSubmit = event => {
    event.preventDefault();
    return <Redirect to={'/profile/'+searchForm} />
  };

  const onClickLogout = event => {
    event.preventDefault();
    logout();
  };

  const authLinks = (
    <div className={styles.nav_container}>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>Home</Nav.Link>
        <NavDropdown title='Profile Options' id='basic-nav-dropdown'>
          <NavDropdown.Item as={Link} to='/edit-my-profile'>
            Edit Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/add-a-service'>
            {' '}
            Add a Service
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href='/' onClick={event => onClickLogout(event)}>
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );

  const guestLinks = (
    <div className={styles.nav_container}>
    <Nav className='mr-0 mt-2 ' >
      <Nav.Link >
        <form className="form-inline mr-5">
        <input className="form-control form-control-sm mr-3 w-75" style={{width: "100%"}} type="text" placeholder="Search by name or location"
        aria-label="Search users field" value={searchForm} onChange={event => onSearchChange(event)}
        required/>
         <Link style={{color: "#752D7E"}} as={Link} to={'/search/' + searchForm}>
         <FontAwesomeIcon icon={faSearch} /></Link>
        </form>
      </Nav.Link>
      <Nav.Link href='/register'>Register</Nav.Link>
      <Nav.Link href='/login'>Login</Nav.Link>
    </Nav>
  </div>
  );

  return (
    <Navbar sticky='top' bg='light' variant='light'>
      <Navbar.Brand href='/'>
        <img
          width='340px'
          src='/picfolio_logo_text.png'
          className={styles.brand}
          alt='Picfolio logo'
        />
      </Navbar.Brand>
      {!loading && isAuthenticated ? authLinks : guestLinks}

    </Navbar>

  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
