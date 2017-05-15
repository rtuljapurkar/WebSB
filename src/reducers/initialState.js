export default {
  venues: {
    data: [],
    sortDesc: false,
    sortKey: 'VName',
    filterString: ''
  },
  teams: [],
  posts: [],

  ajaxCallsInProgress: 0,
  session: !!sessionStorage.jwt
};
