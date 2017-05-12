import * as types from './actionTypes';

export function beginAjaxCall() {
  //console.log("in beginAjaxCall");
  return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
  return {type: types.AJAX_CALL_ERROR};
}
