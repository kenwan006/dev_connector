import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateProps = state =>({ 
    alerts: state.alert //the alert in the redux is returned to alerts, and this alerts will be used as argument of function Alert
});

export default connect(mapStateProps)(Alert);
