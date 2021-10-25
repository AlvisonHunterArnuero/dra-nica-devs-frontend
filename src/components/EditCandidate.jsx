import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCandidate } from "../candidates/actions";
import { Redirect } from "react-router-dom";
import CandidateService from "../candidates/candidatesService";

class EditCandidate extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeSeniority = this.onChangeSeniority.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeHired = this.onChangeHired.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.saveCandidate = this.saveCandidate.bind(this);

    this.state = {
      currentCandidate: {
        fullname: "",
        seniority: "",
        email: "",
        hired: "",
        phone: 0,
        sex: "",
      },
      redirect: false,
    };
  }

  componentDidMount() {
    this.getCandidate(window.location.pathname.replace("/edit-candidate/", ""));
  }

  onChangeFullName(e) {
    const fullname = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          fullname: fullname,
        },
      };
    });
  }

  onChangeSeniority(e) {
    const seniority = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          seniority: seniority,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          email: email,
        },
      };
    });
  }

  onChangeHired(e) {
    const hired = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          hired: hired,
        },
      };
    });
  }

  onChangePhone(e) {
    const phone = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          phone: phone,
        },
      };
    });
  }

  onChangeSex(e) {
    const sex = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          sex: sex,
        },
      };
    });
  }

  getCandidate(id) {
    CandidateService.get(id).then((response) => {
      this.setState({
        currentCandidate: response.data,
      });
    });
  }

  saveCandidate() {
    this.props
      .updateCandidate(this.state.currentCandidate.id, this.state.currentCandidate)
      .then(() => {
        this.setState({
          redirect: true,
        });
      });
  }

  render() {
    const { redirect, currentCandidate } = this.state;
    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className='container text-white my-4'>
        <div className='mb-3'>
          <label className='form-label' htmlFor='name'>
            Full Name {this.state.currentCandidate.fullname}
          </label>
          <input
            type='text'
            className='form-control'
            id='fullname'
            required
            value={currentCandidate.fullname}
            onChange={this.onChangeFullName}
            name='fullname'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='seniority'>
            Seniority
          </label>
          <select
            className='form-select'
            aria-label='Seniority Level'
            id='seniority'
            required
            value={currentCandidate.seniority}
            onChange={this.onChangeSeniority}
            name='seniority'
          >
            <option value='trainee'>Trainee</option>
            <option value='junior'>Junior</option>
            <option value='mid'>Mid</option>
            <option value='senior'>Senior</option>
            <option value='leader'>Leader</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input
            type='text'
            className='form-control'
            id='email'
            required
            value={currentCandidate.email}
            onChange={this.onChangeEmail}
            name='email'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='hired'>
            Status
          </label>
          <select
            className='form-select'
            aria-label='Status Level'
            id='hired'
            required
            value={currentCandidate.hired}
            onChange={this.onChangeHired}
            name='hired'
          >
            <option value='referred'>Referred</option>
            <option value='interviewed'>Interviewed</option>
            <option value='hired'>Hired</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='phone'>
            Phone
          </label>
          <input
            type='text'
            className='form-control'
            id='phone'
            required
            value={currentCandidate.phone}
            onChange={this.onChangePhone}
            name='phone'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='sex'>
            Sex
          </label>
          <select
            className='form-select'
            aria-label='Sex Type'
            id='sex'
            required
            value={currentCandidate.sex}
            onChange={this.onChangeSex}
            name='sex'
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <button onClick={this.saveCandidate} className='btn btn-success'>
          Submit
        </button>
      </div>
    );
  }
}

export default connect(null, { updateCandidate })(EditCandidate);
