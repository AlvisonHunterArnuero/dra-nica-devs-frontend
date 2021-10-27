import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveCandidates, deleteCandidate } from "../candidates/actions";
import toast, { Toaster } from "react-hot-toast";

class CandidateList extends Component {
  componentDidMount() {
    this.props.retrieveCandidates();
  }
  notify(strcustomTitle) {
    toast.success(strcustomTitle, {
      style: {
        border: "1px dotted black",
        background: "#cfe2ff",
        color: "#084298",
      },
    });
  }

  removeCandidate = (id) => {
    this.props.deleteCandidate(id).then(() => {
      this.props.retrieveCandidates();
      this.notify("Candidate has been successfully deleted.");
    });
  };
  // To color the hiring status
  renderSwitch = (param) => {
    switch (param) {
      case "interviewed":
        return <span className='text-warning'>{param}</span>;
      case "hired":
        return <span className='text-info'>{param}</span>;
      case "rejected":
        return (
          <span className='text-danger text-decoration-line-through'>
            {param}
          </span>
        );
      default:
        return <span className='text-primary'>{param}</span>;
    }
  };

  render() {
    const { candidates } = this.props;
    return (
      <div className='container my-4'>
        <Toaster gutter={8} />
        <div className='row justify-content-center'>
          <div className='col text-info'>
            <h2 className="fw-normal">
              <i className='fas fa-users text-warning'></i> 
              <span className="text-success"> DRA-NICA-DEVS</span>
            </h2>
          </div>
          <div className='col-auto'>
            <Link to='/add-candidate'>
              <button
                className='btn btn-outline-primary'
                data-bs-toggle='tooltip'
                data-bs-placement='bottom'
                title='Add Candidate'
              >
                <i className='fas fa-user-plus'></i>
              </button>
            </Link>
          </div>
          <div className='col-auto'>
            <button
              className='btn btn-outline-danger'
              data-bs-toggle='tooltip'
              data-bs-placement='bottom'
              title='Logout'
              onClick={() => {
                sessionStorage.clear();
                window.location.reload(false);
              }}
            >
              <i className='fas fa-sign-out-alt'></i>
            </button>
          </div>
        </div>
        {!candidates ? (
     <div className="spinner-border text-info" role="status">
     <span className="visually-hidden">Loading...</span>
   </div>
        ) : (
          <div className='row my-4'>
            <table className='table table-dark table-hover text-center'>
              <thead className='text-uppercase text-white'>
                <tr>
                  <th scope='col'>
                    <i className='text-muted small fas fa-laptop-code'></i> Id
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-file-signature'></i>{" "}
                    Full Name
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-laptop-code'></i>{" "}
                    Seniority
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-traffic-light'></i>{" "}
                    email
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-traffic-light'></i>{" "}
                    Status
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-phone-square'></i>{" "}
                    Phone
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-venus-mars'></i>{" "}
                    Gender
                  </th>
                  <th scope='col'>
                    <i className='text-muted small fas fa-cog'></i> Actions
                  </th>
                </tr>
              </thead>
              <tbody className='fw-normal'>
                {candidates &&
                  candidates.map(
                    (
                      { id, fullname, seniority, email, hired, phone, sex },
                      i
                    ) => (
                      <tr key={i}>
                        <th scope='row'>{id}</th>
                        <td>{fullname}</td>
                        <td className='text-capitalize'>{seniority}</td>
                        <td>{email}</td>
                        <td className='text-capitalize'>
                          {this.renderSwitch(hired)}
                        </td>
                        <td>{phone}</td>
                        <td>
                          {sex === "male" ? (
                            <i className='text-white fas fa-male'></i>
                          ) : (
                            <i className='text-warning fas fa-female'></i>
                          )}
                        </td>
                        <td>
                          <Link to={`/edit-candidate/${id}`}>
                            <i className='text-info far fa-edit'></i>
                          </Link>
                          <button
                            className='text-danger border-0 btn btn-outline-secondary'
                            onClick={() => this.removeCandidate(id)}
                          >
                            <i className='fas fa-trash-alt'></i>
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    candidates: state.candidates,
  };
};

export default connect(mapStateToProps, {
  retrieveCandidates,
  deleteCandidate,
})(CandidateList);
