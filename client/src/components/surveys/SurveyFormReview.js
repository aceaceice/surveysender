import React from "react";
import { connect } from "react-redux";
import { FIELDS } from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = FIELDS.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn white-text" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default withRouter(
  connect(
    (state) => ({
      formValues: state.form.surveyForm.values,
    }),
    actions
  )(SurveyFormReview)
);
