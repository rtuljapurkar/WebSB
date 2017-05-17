// import React, {PropTypes} from 'react';
// import VenueListItem from './VenueListItem';
// import { Table, Pagination } from 'react-bootstrap';
//
// const VenueList = ({venues}) => {
//   return (
//       <div>
//         <Table bordered hover striped responsive   >
//             <thead>
//                 <tr>
//                     <th>Venue Name</th>
//                     <th>Address</th>
//                     <th>City</th>
//                     <th>Photo</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {venues.map((venue, index) => {
//                             return(
//                                     <VenueListItem key={venue.id} venue = {venue} />
//                                   );
//                         }
//                     )
//                 }
//             </tbody>
//         </Table>
//     </div>
//   );
//
// };
// VenueList.propTypes = {
//   venues: PropTypes.array.isRequired
// };
//
// export default VenueList;
