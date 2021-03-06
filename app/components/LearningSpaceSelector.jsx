import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { Well, Row, Col, Badge } from 'react-bootstrap';
import Student from 'Student';
import _ from 'lodash';
import { laBox, laFooter } from 'styles.css';

const styleDropped = {
  border: '1px solid black',
  backgroundColor: 'white',
  padding: '0.2rem 0.5rem',
  marginRight: '0.2rem',
  marginBottom: '0.4rem',
  cursor: 'move',
  float: 'left',
  width: '120px',
  height: '35px',
  textAlign: 'center',
  fontSize: '14px'
};

const studentTarget = {
  canDrop(props, monitor) {
    let { id } = monitor.getItem();

    return (
      _.size(props.students) < props.maxSize &&
      _.size(_.filter(props.learningAgreements, { studentKey: id })) <
        props.earnBadge
    );
  },
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
    return { name: props.name };
  }
};

@DropTarget(ItemTypes.STUDENT, studentTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class LearningSpace extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    badge: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    learningAgreements: PropTypes.array.isRequired,
    maxSize: PropTypes.number.isRequired,
    moveStudent: PropTypes.func.isRequired,
    id: PropTypes.string,
    sessionId: PropTypes.number
  };

  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      name,
      picture,
      badge,
      students,
      learningAgreements,
      maxSize,
      moveStudent,
      id,
      earnBadge,
      sessionId,
      badgeEnabled
    } = this.props;
    const isActive = canDrop && isOver;

    let opacity: '1';
    if (isActive) {
      opacity = '0.2';
    } else if (canDrop) {
      opacity = '1';
    }

    return connectDropTarget(
      <div
        className="laBox"
        style={{
          opacity,
          backgroundImage: `url(${picture})`
        }}
      >
        <div style={{ height: '10px' }} />
        <div style={{ height: '70px', paddingLeft: '5px' }}>
          {_.size(students) !== 0
            ? Object.keys(students).map(key => {
                const { name, studentKey } = students[key];
                const count = _.size(
                  _.filter(learningAgreements, { studentKey: studentKey })
                );
                return (
                  <div>
                    <Student
                      key={studentKey}
                      name={name}
                      id={studentKey}
                      count={count}
                      styling={styleDropped}
                      moveStudent={() => {
                        moveStudent(studentKey);
                      }}
                    />
                  </div>
                );
              })
            : ''}
        </div>
        <Row className="laFooter">
          <Col xs={2}>
            {badgeEnabled
              ? <img style={{ marginTop: '5px', width: '20px' }} src={badge} />
              : null}
          </Col>
          <Col xs={8} style={{ margin: '0px', paddingTop: '10px' }}>
            <b>
              {name}
            </b>
          </Col>
          <Col xs={2} style={{ margin: '0px', paddingTop: '10px' }}>
            <b>
              {_.size(students)}/{maxSize}
            </b>
          </Col>
        </Row>
      </div>
    );
  }
}
