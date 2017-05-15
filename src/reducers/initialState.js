export default {
  venues: {
    data: [],
    sortDesc: false,
    sortKey: 'VName',
    filterString: ''
  },
  teams: [],
  posts: {
          data: [],
          sortDesc: true,
          sortKey: 'id',
          filterString: '',
          venue: null

  },
  ajaxCallsInProgress: 0,
  session: !!sessionStorage.jwt
};
