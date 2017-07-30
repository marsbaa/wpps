import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { startGrade } from 'actions';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  componentWillMount() {
    const { dispatch, grade } = this.props;
    if (isEmpty(grade)) {
      dispatch(startGrade());
    }
  }
  render() {
    const { grade } = this.props;
    return (
      <div
        style={{
          margin: '20px 40px 40px 20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {Object.keys(grade).map(key => {
          return (
            <Link key={key} to={'/' + grade[key].name}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'papayawhip',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '5px'
                }}
              >
                <h1>
                  {grade[key].name}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    grade: state.grade
  };
}

export default connect(mapStateToProps)(Dashboard);
