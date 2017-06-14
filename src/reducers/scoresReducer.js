import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function scoresReducer(state =initialState.scores, action) {
      switch(action.type) {
        case types.LOAD_SCORES_SUCCESS:
        {
             return Object.assign({}, state, {
                data: action.data
              });

        }
        case types.LOAD_SCORES_AVAILABLE_DATES_SUCCESS:
        {
             let numberofDates = action.data.length;
            // this.setState({dateSelected: action.data[numberofDates-1].Dates});
             return Object.assign({}, state, {
                AvailableDates: action.data,
                dateSelected: moment(action.data[numberofDates-1].Dates, "MM/DD/YYYY").format("YYYY-MM-DD")
              });

        }
        case types.CHANGE_SCORE_SELECTED_DATE_SUCCESS:
        {

             return Object.assign({}, state, {
                dateSelected: moment(action.data, "MM/DD/YYYY").format("YYYY-MM-DD")
              });

        }

        default:
          return state;
      }
}
