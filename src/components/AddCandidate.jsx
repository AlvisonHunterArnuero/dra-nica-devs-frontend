import React, { Component } from "react";
import { connect } from "react-redux";
import { createCandidate } from "../candidates/actions";
import { Redirect } from "react-router-dom";

import toast from "react-hot-toast";
class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeSeniority = this.onChangeSeniority.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeHired = this.onChangeHired.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.saveCandidate = this.saveCandidate.bind(this);
    this.notify = this.notify.bind(this);

    this.state = {
      fullname: "",
      seniority: "trainee",
      email: "",
      hired: "referred",
      phone: "",
      sex: "male",
      redirect: false,
    };
  }

  onChangeFullName(e) {
    this.setState({
      fullname: e.target.value,
    });
  }

  onChangeSeniority(e) {
    this.setState({
      seniority: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeHired(e) {
    this.setState({
      hired: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeSex(e) {
    this.setState({
      sex: e.target.value,
    });
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

  saveCandidate() {
    const { fullname, seniority, email, hired, phone, sex } = this.state;
    this.props
      .createCandidate(fullname, seniority, email, hired, phone, sex)
      .then(() => {
        this.setState({
          redirect: true,
        });
      });
      this.notify('Candidate was saved successfully.');
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div className='container text-white my-4'>
        <div className='mb-3'>
          <label className='form-label' htmlFor='name'>
            Full Name
          </label>
          <input
            type='text'
            className='form-control'
            id='fullname'
            required
            value={this.state.fullname}
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
            value={this.state.seniority}
            onChange={this.onChangeSeniority}
            name='seniority'
          >
            <option defaultValue='trainee'>Trainee</option>
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
            value={this.state.email}
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
            value={this.state.hired}
            onChange={this.onChangeHired}
            name='hired'
          >
            <option defaultValue='referred'>Referred</option>
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
            value={this.state.phone}
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
            value={this.state.sex}
            onChange={this.onChangeSex}
            name='sex'
          >
            <option defaultValue='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <button onClick={this.saveCandidate} className='btn btn-success'>
          Save
        </button>
      </div>
    );
  }
}
export default connect(null, { createCandidate })(AddCandidate);
