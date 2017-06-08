import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


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
             console.log(action.data[numberofDates-4].Dates);
             return Object.assign({}, state, {
                AvailableDates: action.data,
                dateSelected: action.data[numberofDates-4].Dates
              });

        }
        case types.CHANGE_SCORE_SELECTED_DATE_SUCCESS:
        {
            debugger;
             return Object.assign({}, state, {
                dateSelected: action.data
              });

        }

        default:
          return state;
      }
}
