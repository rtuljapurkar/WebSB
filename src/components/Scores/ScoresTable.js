import React from 'react';
import PropTypes from 'prop-types';
import { Column, Cell, Table } from 'fixed-data-table';
import toastr from 'toastr';
let ExampleImage = require('../common/ExampleImage');
import ReactStars from 'react-stars';
import '../../styles/fixed-data-table.css';

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
  children: PropTypes.element.isRequired,
  venues: PropTypes.array.isRequired
};


function MixedCell ({data, rowIndex, columnKey, venues}) {
    // let venueID = data[rowIndex]["VenueID"];
    // let vname = "";
    // if(isNaN(venueID))
    // {
    //   venueID = 0;
    //   vname = "";
    // }
    // try{
    //   vname = venues.data[venueID-1].VName;
    // }
    // catch(ex) {
    //   vname = "";
    // }
    //  if(vname !== ""){
         return  (
            <Cell>
                 <table >
                 <tbody>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                     <td><a href={"/"}>{"Celtics 111 - Cavaliers 108"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                   <tr>
                     {/* <td><a href={"/amenities/"+venueID}>{vname}</a></td> */}
                      <td><a href={"/"}>{"Spurs 100 - Warriors 136"}</a></td>
                   </tr>
                 </tbody>
                 </table>
             </Cell>
        );
        // }
        // else {
        //      return null;
        // }
}

MixedCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
  scores: PropTypes.object,
  venues: PropTypes.array.isRequired
};

//  --------------------------------------------------------------------------------------------------------------//
class ScoresTable extends React.Component {
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
    const {filterString} = this.props.scores;
    const str = filterString.toLowerCase();
    return str !== ''
      ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : localData;
  }

  sortData () {
    const data = [...this.props.scores.data] ;
    const {sortKey, sortDesc} = this.props.scores;
    const multiplier = sortDesc ? -1 : 1;
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0;
      const bVal = b[sortKey] || 0;
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
    });
    return data;
  }

  render () {
    const { filterString, sortKey, sortDesc } = this.props.scores;
    const venues = this.props.venues;
    const {sortBy} = this.props.actions;
    const headerCellProps = { sortBy, sortKey, sortDesc };
    let localData = this.sortData();
    localData = this.filterData(localData);
    localData = [{a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}, {a:"a"}];
    // console.log(localData);
    // console.log(venues);
    return (

        <Table
           rowHeight={30}           
           headerHeight={50}
           height={200}
           width={250}
           minWidth={100}
          rowsCount={localData.length}>
          <Column
            columnKey="id"
            header={<SortHeaderCell {...headerCellProps} sortBy={sortBy} > Scores </SortHeaderCell>}
            cell={<MixedCell data={localData} venues={venues} />}
            flexGrow={3}
             width={250}
             minWidth={100}
              />
        </Table>
    );
  }
}

ScoresTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,
  // state data
  data: PropTypes.array.isRequired,
  venues: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired
};

export default ScoresTable;
