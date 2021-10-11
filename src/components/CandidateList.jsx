import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveCandidates, deleteCandidate } from "../candidates/actions";

class CandidateList extends Component {
  componentDidMount() {
    this.props.retrieveCandidates();
  }

  removeCandidate = (id) => {
    this.props.deleteCandidate(id).then(() => {
      this.props.retrieveCandidates();
    });
  };

  render() {
    const { candidates } = this.props;
    return (
      <div className='list row'>
        <div className='col-md-6'>
          <h4>Candidates List</h4>
          <div>
            <Link to='/add-pet'>
              <button className='button-primary'>Add candidate</button>
            </Link>
          </div>
          <table className='u-full-width'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Animal</th>
                <th>Breed</th>
                <th>Location</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates &&
                candidates.map(
                  ({ id, name, animal, breed, location, age, sex }, i) => (
                    <tr key={i}>
                      <td>{name}</td>
                      <td>{animal}</td>
                      <td>{breed}</td>
                      <td>{location}</td>
                      <td>{age}</td>
                      <td>{sex}</td>
                      <td>
                        <button onClick={() => this.removeCandidate(id)}>
                          Delete
                        </button>
                        <Link to={`/edit-candidate/${id}`}>
                          <button>Edit</button>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    candidates: state.candidates,
  };
};

export default connect(mapStateToProps, { retrieveCandidates, deleteCandidate })(CandidateList);
