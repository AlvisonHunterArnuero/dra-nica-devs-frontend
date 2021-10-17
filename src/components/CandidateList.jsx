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
  // To color the hiring status
  renderSwitch = (param) => {
    switch (param) {
      case "interviewed":
        return <span className='text-info'>{param}</span>;
      case "hired":
        return <span className='text-success'>{param}</span>;
      case "rejected":
        return <span className='text-danger'>{param}</span>;
      default:
        return <span className='text-primary'>{param}</span>;
    }
  };

  render() {
    const { candidates } = this.props;
    return (
      <div className='container my-4'>
        <div className='row justify-content-center'>
          <div className='col text-info'>
            <h4>Candidates List</h4>
          </div>
          <div className='col-auto'>
            <Link to='/add-candidate'>
              <button className='btn btn-outline-primary'>
                <i className='fas fa-user-plus'></i>
              </button>
            </Link>
          </div>
        </div>
        {/* <div className='row border border-warning justify-content-center mt-3'>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='basic-addon1'>
              <i className='fas fa-search'></i>
            </span>
            <input
              type='text'
              className='form-control'
              placeholder='Type your search'
              aria-label='Username'
              aria-describedby='basic-addon1'
            />
          </div>
        </div> */}

        <div className='row my-4'>
          <table className='table table-dark table-hover text-center'>
            <thead className='text-uppercase text-warning'>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>Full Name</th>
                <th scope='col'>Seniority</th>
                <th scope='col'>email</th>
                <th scope='col'>Status</th>
                <th scope='col'>Age</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates &&
                candidates.map(
                  ({ id, fullname, seniority, email, hired, age, sex }, i) => (
                    <tr key={i}>
                      <th scope='row'>{id}</th>
                      <td>{fullname}</td>
                      <td>{seniority}</td>
                      <td>{email}</td>
                      <td className='text-capitalize'>
                        {this.renderSwitch(hired)}
                      </td>
                      <td>{age}</td>
                      <td>
                        {sex === "male" ? (
                          <i className='text-info fas fa-male'></i>
                        ) : (
                          <i className='text-warning fas fa-female'></i>
                        )}
                      </td>
                      <td>
                        <button
                          className='text-white border-0 btn btn-outline-secondary'
                          onClick={() => this.removeCandidate(id)}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </button>
                        <Link to={`/edit-candidate/${id}`}>
                          <i className='text-white far fa-edit'></i>
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
