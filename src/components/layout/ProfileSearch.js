import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import { searchForUsers } from '../../actions/user';
import styles from "../styles/profileStyles.module.css";

const ProfileSearch = ({
  search: { usersFound, loading, error },
  searchForUsers,
  match: { params }
}) => {
  useEffect(() => {
    searchForUsers(params.searchTerm);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!usersFound.msg) {
    return (
      <div>
        <h1>Results</h1>
        {usersFound.length !== 0
          ? usersFound.map(user => {
            return (
              <div className={styles.cardStyle} key={user._id}>
                <Card style={{ width: '96vw '}}>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle>{user.profile.location}</Card.Subtitle>
                  <Card.Body>
                    <Card.Text>@{user.username}</Card.Text>
                    <Card.Text style={{overflow:"hidden", textOverflow: "ellipsis", height:"20px"}}>{user.profile.bio}</Card.Text>
                    {(user.profile.services !== undefined && user.profile.services.length !== 0) ?  
                      <Fragment>
                      <b>Services: </b>
                       { user.profile.services.map((service, i) => { return(
                      <u key={i} style={{margin: "0 5px"}}>{service.name}</u>
                      )})} </Fragment> : null}
                      <Button style={{display: "list-item"}} variant='primary' href={'/profile/' + user.username}>
                      Go to profile
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            )
            })
          : null}
      </div>
    );
  } else if (error !== null) {
    return <h1>No users were found...</h1>;
  } else {
    return <h1>loading...</h1>;
  }
};

ProfileSearch.propTypes = {
  searchForUsers: PropTypes.func.isRequired,
  search: PropTypes.object
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { searchForUsers }
)(ProfileSearch);
