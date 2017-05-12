import React, {PropTypes} from 'react';
import TeamListItem from './TeamListItem';
import { Table, Pagination } from 'react-bootstrap';

const TeamList = ({teams}) => {    
  return (
      <div>
        <Table bordered hover striped responsive   >
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>League</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th>Logo</th>
                </tr>
            </thead>
            <tbody>
                {teams.map((team, index) => {
                            return(
                                    <TeamListItem key={team.id} team = {team} />
                                  );
                        }
                    )

                }
            </tbody>
        </Table>
    </div>
  );

};
TeamList.propTypes = {
  teams: PropTypes.array.isRequired
};

export default TeamList;
