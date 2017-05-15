import React from 'react';
import PropTypes from 'prop-types';
import { Column, Cell, Table } from 'fixed-data-table';
import toastr from 'toastr';
let ExampleImage = require('../common/ExampleImage');

// import ResponsiveTableWrapper from '../ResponsiveTableWrapper'
//import renderers from '../../modules/renderers'
import '../../styles/fixed-data-table.css';


// Stateless cell components for Table component

function renderSortArrow (sortKey, sortDesc, sortId) {
//  debugger;
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

function SortHeaderCell ({children, sortBy, sortKey, sortDesc, columnKey}) {
    const clickFunc = () => sortBy(columnKey);
//debugger;
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

function DataCell ({data, rowIndex, columnKey}) {
  return <Cell > {data[rowIndex][columnKey]} </Cell>;
}

function ImageCell ({data, rowIndex, columnKey}) {
  return <Cell height="200" alt="" width="200"> <img src={data[rowIndex][columnKey]} height="200" alt="" width="200" /> </Cell>;
}

function MixedCell ({data, rowIndex, columnKey}) {
  return  (<Cell>
  <table>
  <tbody>
    <tr>
      <td style={{"fontWeight": "bold", "fontSize": "14px"}}>
        {data[rowIndex]["VName"]} <br/>
        {data[rowIndex]["VCity"]}
      </td>
      <td rowSpan="2"  style={{"paddingLeft": "15px"}}>
        <img src={data[rowIndex]["VImage"]} height="200" alt="" width="200" />
      </td>
    </tr>
    <tr>
      <td>
        {data[rowIndex]["VDescription"]}
      </td>
    </tr>
  </tbody>
  </table>

  </Cell>);
}

// const ImageCell = ({data, rowIndex, columnKey}) => (
//
//   <ExampleImage
//     src={data[rowIndex][columnKey]}
//   />
// );

ImageCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string
};

MixedCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string
};

DataCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string
};
//  --------------------------------------------------------------------------------------------------------------//
class VenuesTable extends React.Component {
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

  filterData () {
    const {data, filterString} = this.props.venues;
    //debugger;
    const str = filterString.toLowerCase();
    return str !== ''
      ? data.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : data;
  }

  sortData () {
    const {data, sortKey, sortDesc} = this.props.venues;
    const multiplier = sortDesc ? -1 : 1;
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0;
      const bVal = b[sortKey] || 0;
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
    });
    return this;
  }

  render () {
    const { filterString, sortKey, sortDesc } = this.props.venues;
    const {sortBy} = this.props.actions;
    const headerCellProps = { sortBy, sortKey, sortDesc };
//debugger;
    const data = this.sortData().filterData();
//debugger;
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
          headerHeight={50}
          height={600}
          width={800}
          rowsCount={data.length}>
          <Column
            columnKey="VName"
            header={<SortHeaderCell {...headerCellProps} sortBy={sortBy} > Name </SortHeaderCell>}
            cell={<MixedCell data={data}  />}
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
