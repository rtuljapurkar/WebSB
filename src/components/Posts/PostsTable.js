import React from 'react';
import PropTypes from 'prop-types';
import { Column, Cell, Table } from 'fixed-data-table';
import toastr from 'toastr';
let ExampleImage = require('../common/ExampleImage');
import ReactStars from 'react-stars';

// import ResponsiveTableWrapper from '../ResponsiveTableWrapper'
//import renderers from '../../modules/renderers'
import '../../styles/fixed-data-table.css';


// Stateless cell components for Table component

function renderSortArrow (sortKey, sortDesc, sortId) {
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

function SortHeaderCell ({children, sortBy, sortKey, sortDesc, columnKey}) {
    const clickFunc = () => sortBy(columnKey);
  return (
    <Cell >
      <a onClick={clickFunc}>
        {children} {renderSortArrow(sortKey, sortDesc, columnKey)}
      </a>
    </Cell>
  );
}
SortHeaderCell.propTypes = {
  sortBy: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  columnKey: PropTypes.string,
  children: PropTypes.element.isRequired
};

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}


function MixedCell ({data, rowIndex, columnKey, venues}) {
    let ONE_DAY = 1000 * 60 * 60 * 24;
    // Convert both dates to milliseconds
    let currentDate = new Date().getTime();
    let postDate = new Date(data[rowIndex]["UploadTime"]).getTime();
    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(currentDate - postDate);
    // Convert back to days and return
    let days = Math.round(difference_ms/ONE_DAY);
    let postDate1 = new Date(data[rowIndex]["UploadTime"]);
    let postedTime = timeSince(postDate1);
    let venueID = data[rowIndex]["VenueID"];
    let vname = "";
    if(isNaN(venueID))
    {
      venueID = 0;
    }
    try{
      vname = venues.data[venueID].VName;
    }
    catch(ex) {
      vname = "";
    }
  //  debugger;
 return  (<Cell>
             <table style={{"border":"solid 1px #000", "tableLayout": "fixed", "paddingRight": "10px" }}>
             <tbody>
               <tr >
                 <td style={{"fontWeight": "bold", "color": "white", "paddingLeft": "10px", "fontSize": "14px",
                     "wordWrap":"break-word",  "fontFamily": "Helvetica",  "width":"600px", "backgroundColor": "black"}}>
                   {data[rowIndex]["UserName"]} <br/>
                          <ReactStars
                               name={name}
                               count={5}
                               className="form-control"
                               size={24}
                               edit={false}
                               value={data[rowIndex]["Stars"]}
                               color2={'#ffd700'} />
                               <hr style={{"color": "white"}}/>
                                 {vname}
                 </td>

                 <td rowSpan="3" style={{"backgroundColor": "white" }}>
                   <img src={data[rowIndex]["Image"]} height="200" alt="" width="200" />
                 </td>
               </tr>
               <tr style={{"backgroundColor": "black"}}>
                 <td style={{"color": "white", "paddingLeft": "10px", "fontFamily": "Helvetica", "fontSize": "14px",
                                "wordWrap":"break-word"}}>
                   {data[rowIndex]["Text"]}
                 </td>
               </tr>
               <tr style={{"backgroundColor": "black"}}>
                 <td style={{"color": "white", "paddingLeft": "10px", "fontFamily": "Helvetica", "fontSize": "14px",
                                "wordWrap":"break-word" , "textAlign": "Right"}}>
                   Posted {postedTime}
                 </td>
               </tr>
             </tbody>
             </table>
         </Cell>
         );
}

MixedCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
  venues: PropTypes.object
};

//  --------------------------------------------------------------------------------------------------------------//
class PostsTable extends React.Component {
  // constructor(props){
  //   this.
  // }
  componentWillMount () {

  }

  handleFilterStringChange () {
    return (e) => {
      e.preventDefault();
      this.props.actions.filterBy(e.target.value);
    };
  }

  doesMatch (str) {
    return (key) => (key + '').toLowerCase().indexOf(str) !== -1;
  }

  filterData (localData) {
    const {filterString} = this.props.posts;
    const str = filterString.toLowerCase();
    return str !== ''
      ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : localData;
  }

  sortData () {
    const data = [...this.props.posts.data] ;
    const {sortKey, sortDesc} = this.props.posts;
    const multiplier = sortDesc ? -1 : 1;
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0;
      const bVal = b[sortKey] || 0;
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
    });
    return data;
  }

  render () {
    const { filterString, sortKey, sortDesc } = this.props.posts;
    const venues = this.props.venues;

    const {sortBy} = this.props.actions;
    const headerCellProps = { sortBy, sortKey, sortDesc };
    let localData = this.sortData();
    localData = this.filterData(localData);
    return (
      <div>
        <input className="filter-input" value={filterString}
          onChange={this.handleFilterStringChange()}
          type="text" placeholder="Filter Rows"
          autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <br />
        <Table
          rowHeight={250}
          rowWidth={200}
          headerHeight={50}
          height={600}
          width={800}
          rowsCount={localData.length}>
          <Column
            columnKey="id"
            header={<SortHeaderCell {...headerCellProps} sortBy={sortBy} > All Posts </SortHeaderCell>}
            cell={<MixedCell data={localData} venues={venues} />}
            flexGrow={3}
            width={200} />
        </Table>
      </div>
    );
  }
}

PostsTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,
  // state data
  data: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired,
  venues: PropTypes.object
};

export default PostsTable;
