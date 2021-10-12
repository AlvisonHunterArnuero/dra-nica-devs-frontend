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
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeHiredStatus = this.onChangeHiredStatus.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.saveCandidate = this.saveCandidate.bind(this);

    this.state = {
      currentCandidate: {
        fullname: "",
        seniority: "",
        email: "",
        hired: "",
        age: "",
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
    console.log('SENIORITY');
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

  onChangeBreed(e) {
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

  onChangeHiredStatus(e) {
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

  onChangeAge(e) {
    const age = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCandidate: {
          ...prevState.currentCandidate,
          age: age,
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
      <div className='submit-form'>
        
        <div>
          <div className='form-group'>
            <label htmlFor='name'>Full Name {this.state.currentCandidate.fullname}</label>
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

          <div className='form-group'>
            <label htmlFor='animal'>Seniority</label>
            <input
              type='text'
              className='form-control'
              id='seniority'
              required
              value={currentCandidate.seniority}
              onChange={this.onChangeSeniority}
              name='seniority'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              className='form-control'
              id='email'
              required
              value={currentCandidate.email}
              onChange={this.onChangeBreed}
              name='email'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              className='form-control'
              id='location'
              required
              value={currentCandidate.location}
              onChange={this.onChangeLocation}
              name='location'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='age'>Age</label>
            <input
              type='text'
              className='form-control'
              id='age'
              required
              value={currentCandidate.age}
              onChange={this.onChangeAge}
              name='age'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='sex'>Sex</label>
            <input
              type='text'
              className='form-control'
              id='sex'
              required
              value={currentCandidate.sex}
              onChange={this.onChangeSex}
              name='sex'
            />
          </div>
          <button onClick={this.saveCandidate} className='btn btn-success'>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateCandidate })(EditCandidate);
