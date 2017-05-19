import React from 'react';
import PropTypes from 'prop-types';
import { Column, Cell, Table } from 'fixed-data-table';
import toastr from 'toastr';
import ExampleImage from '../common/ExampleImage';
import '../../styles/fixed-data-table.css';
import {Button, Glyphicon} from 'react-bootstrap';

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
function MixedCell ({data, rowIndex, columnKey}) {
    let id = data[rowIndex]["id"];
 return  (<Cell>
             <table style={{"tableLayout": "fixed", "paddingRight": "10px" }}>
             <tbody>
               <tr  >
                 <td style={{"fontWeight": "bold", "color": "white", "paddingLeft": "10px", "fontSize": "14px",
                     "wordWrap":"break-word", "fontFamily": "Helvetica",  "width":"700px","backgroundColor": "black"}}>
                   {data[rowIndex]["VName"]} <br/>
                   {data[rowIndex]["VCity"]}
                 </td>
                 <td rowSpan="3"  style={{"paddingLeft": "15px"}}>
                   <img src={data[rowIndex]["VImage"]} height="200" width="200" alt=""   />
                 </td>
               </tr>

               <tr style={{"backgroundColor": "black" }}>
                 <td style={{"color": "white", "paddingLeft": "10px", "fontFamily": "Helvetica", "fontSize": "14px",
                                "wordWrap":"break-word", "width":"700px"}}>
                   {data[rowIndex]["VDescription"]}
                 </td>
               </tr>

               <tr style={{"backgroundColor": "black" }}>
                 <td style={{"color": "white", "paddingLeft": "10px", "paddingRight": "10px", "fontFamily": "Helvetica", "fontSize": "14px",
                                "wordWrap":"break-word"}}>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{"textAlign": "left" , "width":"600px" }}>
                                    <a href={"/posts/add/"+id}>
                                        <Button bsStyle="primary" bsSize="small" >
                                            <Glyphicon glyph="pencil" />  Review this Stadium
                                        </Button>
                                    </a>
                                </td>
                                <td style={{"textAlign": "center" }}>
                                    <a href={"/poi/"+id}>
                                        <Button bsStyle="primary" bsSize="small"  >
                                            <Glyphicon glyph="pencil" />  Local 411
                                        </Button>
                                    </a>
                                </td>
                                <td style={{"textAlign": "right" }}>
                                    <a href={"/amenities/"+id}>
                                        <Button bsStyle="primary" bsSize="small"  >
                                            <Glyphicon glyph="pencil" />  Amenities
                                        </Button>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

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
  columnKey: PropTypes.string
};

//  --------------------------------------------------------------------------------------------------------------//
class VenuesTable extends React.Component {
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
    const {filterString} = this.props.venues;
    const str = filterString.toLowerCase();
    return str !== ''
      ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : localData;
  }

  sortData () {
    const data = [...this.props.venues.data] ;
    const {sortKey, sortDesc} = this.props.venues;
    const multiplier = sortDesc ? -1 : 1;
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0;
      const bVal = b[sortKey] || 0;
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
    });
    return data;
  }

 // clickFunc(event){
 //     this.props.actions.sortBy(event.target.columnKey);
 // }

  render () {
    const { filterString, sortKey, sortDesc } = this.props.venues;
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
          rowHeight={200}
          rowWidth={200}
          headerHeight={80}
          height={800}
          width={900}
          rowsCount={localData.length}>
          <Column
            columnKey="VName"
            // header = { <a onClick={this.clickFunc}>
            //             Name {renderSortArrow(sortKey, sortDesc, "VName")}</a>
            //             }
           header ={<div colSpan="3">
                    <SortHeaderCell {...headerCellProps} sortBy={sortBy} columnKey={"VName"} > Name </SortHeaderCell>
                    <SortHeaderCell {...headerCellProps} sortBy={sortBy} columnKey={"VCity"} > City </SortHeaderCell>
                    </div>}
            cell={<MixedCell data={localData}/>}
            flexGrow={3}
            width={200} />
        </Table>
      </div>
    );
  }
}

VenuesTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,

  // state data
  data: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  venues: PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired


  //,
  //isFetching: PropTypes.bool.isRequired
};
SortHeaderCell.propTypes = {
  sortBy: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  columnKey: PropTypes.string,
  children: PropTypes.element.isRequired
};
export default VenuesTable;

// <Table
//   rowHeight={200}
//   rowWidth={200}
//   headerHeight={50}
//   height={600}
//   width={800}
//   rowsCount={data.length}>
//   <Column
//     columnKey='VName'
//     header={<SortHeaderCell {...headerCellProps} sortBy={sortBy} > Name </SortHeaderCell>}
//     cell={<DataCell data={data}  />}
//     flexGrow={3}
//     width={100} />
//   <Column
//     columnKey='VAddress'
//     header={<SortHeaderCell {...headerCellProps} sortBy={sortBy}> Address </SortHeaderCell>}
//     cell={<DataCell data={data} />}
//     flexGrow={1}
//     width={100} />
//     <Column
//     columnKey='VCity'
//     header={<SortHeaderCell {...headerCellProps} sortBy={sortBy}> City </SortHeaderCell>}
//     cell={<DataCell data={data} />}
//     flexGrow={1}
//     width={100} />
//      <Column
//      columnKey='VImage'
//      cell={<ImageCell1 data={data} {...headerCellProps} col="VImage" />}
//      flexGrow={1}
//      width={200}
//      height={200}  />
// </Table>


// ImageCell.propTypes = {
//   data: PropTypes.array.isRequired,
//   rowIndex: PropTypes.number,
//   columnKey: PropTypes.string
// };
//
// DataCell.propTypes = {
//   data: PropTypes.array.isRequired,
//   rowIndex: PropTypes.number,
//   columnKey: PropTypes.string
// };
