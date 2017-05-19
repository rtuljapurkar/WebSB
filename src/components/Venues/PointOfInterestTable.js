import React from 'react';
import PropTypes from 'prop-types';
import { Column, Cell, Table } from 'fixed-data-table';
import toastr from 'toastr';
import ExampleImage from '../common/ExampleImage';
import '../../styles/fixed-data-table.css';
import {Button, Glyphicon} from 'react-bootstrap';

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
    let rows = [];
    for (var key in data[rowIndex])
    {
      if (data[rowIndex].hasOwnProperty(key)
            && key!= "id" && key!= "VenueID" && key!= "Active" && key!= "POIGPSLoc"
        ) {
                let value = data[rowIndex][key] == null ? "": data[rowIndex][key];
                let modifiedkey = key.substr(3);
                if(modifiedkey == "Name"){
                    rows.push(<p style={{"fontSize":"24px"}}><b>{value}</b></p>);
                }
                else
                 {
                    rows.push(<p>{modifiedkey}: {value} </p>);

                }

          }
      }
 return  (<Cell style={{"border":"solid 1px #000", "paddingRight": "10px"}}>
             <table style={{"tableLayout": "fixed" }}>
             <tbody>
               <tr >
                 <td style={{"fontWeight": "bold", "paddingLeft": "10px", "fontSize": "14px",
                     "wordWrap":"break-word", "fontFamily": "Helvetica",  "width":"800px"}}>
                        {rows}
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
class PointOfInterestTable extends React.Component {

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
    const {filterString} = this.props.pointOfInterests;
    const str = filterString.toLowerCase();
    return str !== ''
      ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : localData;
  }

  sortData () {
    const data = [...this.props.pointOfInterests.data] ;
    const {sortKey, sortDesc} = this.props.pointOfInterests;
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
    const { filterString, sortKey, sortDesc } = this.props.pointOfInterests;
    const {sortBy} = this.props.actions;
    const headerCellProps = { sortBy, sortKey, sortDesc };
    let localData = this.sortData();
    localData = this.filterData(localData);
    let venue = this.props.pointOfInterests.venue;
    return (
      <div>
          <table style={{ "tableLayout": "fixed", "paddingRight": "10px",  "width":"760px"   }}>
              <tbody>
                <tr style={{"backgroundColor": "black" }} >
                  <td style={{"fontWeight": "bold", "color": "white", "paddingLeft": "10px", "fontSize": "14px",
                      "wordWrap":"break-word",  "fontFamily": "Helvetica",  "width":"600px" }}>
                    {venue.VName} <br/>
                    {venue.VCity}
                  </td>
                  <td rowSpan="2"  style={{"paddingLeft": "15px"}}>
                    <img src={venue.VImage} height="200" alt="" width="200" />
                  </td>
                </tr>
                <tr style={{"backgroundColor": "black" }}>
                  <td style={{"color": "white", "paddingLeft": "10px", "fontFamily": "Helvetica", "fontSize": "14px",
                                 "wordWrap":"break-word" ,  "width":"600px"}}>
                    {venue.VDescription}
                  </td>
                </tr>
              </tbody>
          </table>

        <input className="filter-input" value={filterString}
          onChange={this.handleFilterStringChange()}
          type="text" placeholder="Filter Rows"
          autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <br />
        <Table
          rowHeight={500}
          rowWidth={200}
          headerHeight={80}
          height={700}
          width={800}
          rowsCount={localData.length}>
          <Column
            columnKey="VName"
            // header = { <a onClick={this.clickFunc}>
            //             Name {renderSortArrow(sortKey, sortDesc, "VName")}</a>
            //             }
           header ={ <div colSpan="3">
                    <SortHeaderCell {...headerCellProps} sortBy={sortBy} columnKey={"AName"} > Name </SortHeaderCell>
                    <SortHeaderCell {...headerCellProps} sortBy={sortBy} columnKey={"AType"} > Type </SortHeaderCell>
                    </div>}
            cell={<MixedCell data={localData}/>}
            flexGrow={3}
            width={800} />
        </Table>
      </div>
    );
  }
}

PointOfInterestTable.propTypes = {
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,
  // state data
  data: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  pointOfInterests: PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired
};

SortHeaderCell.propTypes = {
  sortBy: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  columnKey: PropTypes.string,
  children: PropTypes.element.isRequired
};
export default PointOfInterestTable;
