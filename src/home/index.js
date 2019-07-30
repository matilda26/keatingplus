import React from 'react';
import './homepage.css';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Homepage extends React.Component {
  state = {
    name: '',
    company: '',
    email: '',
    gstReg: '',
    ABN: '',
    noOfSites: null,
    noOfEmployees: '',
    accSoft: '',
    package: '',
    opState: ''
  }

  handleChange = (type, text) => {
    this.setState({
      [type]: text
    })
    console.log(text)
  }

  render() {
    return (
        <form className='form'>
            <TextField
                id="standard-name"
                label="Name"
                className='input'
                value={this.state.name}
                onChange={(text) => this.handleChange('name', text.target.value)}
                margin="normal"
                required={true}
            />
            <TextField
                id="company-name"
                label="Company"
                className='input'
                value={this.state.company}
                onChange={(text) => this.handleChange('company', text.target.value)}
                margin="normal"
                required={true}
            />
            <TextField
                id="email"
                label="Email"
                className='input'
                value={this.state.email}
                onChange={(text) => this.handleChange('email', text.target.value)}
                margin="normal"
                required={true}
                type='email'
            />
            <FormLabel component="legend" className='checkbox-label'>GST Registration<span className='MuiFormLabel-asterisk'>*</span></FormLabel>
            <RadioGroup
            aria-label="gstReg"
            name="gstReg"
            className='label'
            value={this.state.gstReg}
            onChange={(option) => this.handleChange('gstReg', option.target.value)}
            >
                <FormControlLabel value="cash" control={<Radio />} label="Cash" className={this.state.gstReg === 'Cash' ? 'selected' : ''}/>
                <FormControlLabel value="accrual" control={<Radio />} label="Accrual" className={this.state.gstReg === 'Accrual' ? 'selected' : ''}/>
            </RadioGroup>
            <TextField
                id="abn"
                label="ABN"
                className='input'
                value={this.state.ABN}
                onChange={(text) => this.handleChange('ABN', text.target.value)}
                margin="normal"
                required={true}
            />
            <TextField
                id="noOfSites"
                label="Number of sites"
                className='input'
                value={this.state.noOfSites}
                onChange={(text) => this.handleChange('noOfSites', text.target.value)}
                margin="normal"
                required={true}
                type='number'
            />
            <InputLabel htmlFor="no-of-employees">Number of employees<span className='MuiFormLabel-asterisk'>*</span></InputLabel>
            <Select
            value={this.state.noOfEmployees}
            onChange={(value) => this.handleChange('noOfEmployees', value.target.value)}
            inputProps={{
                name: 'noOfEmployees',
                id: 'no-of-employees',
            }}
            >
                <MenuItem value={'1'}>Self employed</MenuItem>
                <MenuItem value={'1-10'}>1-10 employees</MenuItem>
                <MenuItem value={'11-50'}>11-50 employees</MenuItem>
                <MenuItem value={'51-200'}>51-200 employees</MenuItem>
                <MenuItem value={'201-500'}>201-500 employees</MenuItem>
                <MenuItem value={'501-1,000'}>501-1,000 employees</MenuItem>
                <MenuItem value={'1,001-5,000'}>1,001-5,000 employees</MenuItem>
                <MenuItem value={'5,001-10,000'}>5,001-10,000 employees</MenuItem>
                <MenuItem value={'10,000+'}>10,001+ employees</MenuItem>
            </Select>
            <TextField
                id="accSoft"
                label="Accounting Software"
                className='input'
                value={this.state.accSoft}
                onChange={(text) => this.handleChange('accSoft', text.target.value)}
                margin="normal"
                required={true}
            />
            <TextField
                id="package"
                label="Package used"
                className='input'
                value={this.state.package}
                onChange={(text) => this.handleChange('package', text.target.value)}
                margin="normal"
                required={true}
            />

            <FormLabel component="legend" className='checkbox-label'>Are you operating online or offline?<span className='MuiFormLabel-asterisk'>*</span></FormLabel>
            <RadioGroup
            aria-label="opState"
            name="opState"
            className='label'
            value={this.state.opState}
            onChange={(option) => this.handleChange('opState', option.target.value)}
            >
                <FormControlLabel value="online" control={<Radio />} label="Online" className={this.state.gstReg === 'Online' ? 'selected' : ''}/>
                <FormControlLabel value="offline" control={<Radio />} label="Offline" className={this.state.gstReg === 'Offline' ? 'selected' : ''}/>
            </RadioGroup>
        </form>
    );
  }
}

export default Homepage;
