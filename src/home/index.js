import React from 'react'
import './homepage.css'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import GoogleSpreadsheet from 'google-spreadsheet'
import { FormControl } from '@material-ui/core'
import { ReactComponent as Logo } from './logo-stacked.svg'
import { ReactComponent as Plus } from './plus.svg'
import { ReactComponent as Arrow } from './arrow.svg'

const creds = require('../helpers/credentials.json')

const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID)
let sheet;

class Homepage extends React.Component {
  state = {
      data: {
          name: '',
          company: '',
          email: '',
          gstReg: '',
          ABN: '',
          noOfSites: null,
          noOfEmployees: '',
          accSoft: '',
          package: '',
          opState: '',
      }
  }

  handleChange = (type, text) => {
    this.setState({
      [type]: text
    })
    console.log(text)
  }

  componentDidMount() {
      doc.useServiceAccountAuth(creds, (err) => console.log('error: ', err));

      console.log('DOC: ', doc)
      doc.getInfo((err, info) => {
        // console.log('Loaded doc: '+info.title+' by '+info.author.email);
        console.log('info: ', info)
        console.log('get info err: ', err)
        // sheet = info.worksheets[0];
        // console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        // this.step();
      });
  }

  step = (err) => {
    if( err ) {
        console.log('Error: '+err);
      }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    
  }

  render() {

    return (
        <>
        <div className='header'>
            <Logo className='header-logo'/>
        </div>
        <div className='top-banner'>
            <p><span className='text-highlight__lightgreen'>AUTOMATIC</span> ACCOUNTING ONLINE</p>
        </div>
        <div className='main-body'>
            <div className='form-wrapper'>
                <h2 className='form-heading'>Fill out our questionnaire for a detailed quote:</h2>
                <p className='note'>Please note, all required fields are marked with a <span className='MuiFormLabel-asterisk'>*</span></p>
                <form className='form' onSubmit={this.handleSubmit}>
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
                    <FormControl>
                        <InputLabel htmlFor="no-of-employees">Number of employees<span className='MuiFormLabel-asterisk'>*</span></InputLabel>
                        <Select
                        value={this.state.noOfEmployees}
                        onChange={(value) => this.handleChange('noOfEmployees', value.target.value)}
                        inputProps={{
                            name: 'noOfEmployees',
                            id: 'no-of-employees',
                        }}
                        >
                            <MenuItem value={''}>Please select</MenuItem>
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
                    </FormControl>
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
                    <Button variant="contained" size="large" color="primary" className='submit-button'>
                       Submit
                    </Button>
                </form>
            </div>
            <div className='side-content'>
                <p className='side-heading'>As an extension to your Cloud RMS Property Management System, you can now have all your Bas calculated and lodged as well as all your annual reports and tax returns done online with the minimum of fuss.<br/><br/>With our simple accurate system we guarantee you will be corporately compliant and up to date. Choose all or any of our unique online services.</p>
                <div className='section-heading__wrapper'>
                        <Plus className='section-plus lightgreen'/>
                        <h3 className='section-heading'><span className='text-highlight__lightgreen'>Auto</span>Bas</h3>
                        <Arrow className='section-arrow lightgreen
                        '/>
                </div>
                <p className='section-body'>Have your Bas calculated and lodged on time, everytime.</p>
                <div className='section-heading__wrapper'>
                        <Plus className='section-plus midgreen'/>
                        <h3 className='section-heading'><span className='text-highlight__midgreen'>Auto</span>Returns</h3>
                        <Arrow className='section-arrow midgreen
                        '/>
                </div>
                <p className='section-body'>Receive your statutory returns before they are due and have them lodged simply and easily.</p>
                <div className='section-heading__wrapper'>
                        <Plus className='section-plus darkgreen'/>
                        <h3 className='section-heading'><span className='text-highlight__darkgreen'>Auto</span>Reporting</h3>
                        <Arrow className='section-arrow darkgreen
                        '/>
                </div>
                <p className='section-body'>Keep up to date with your business finances with our online instant access bookkeeping and reporting.</p>
            </div>
        </div>
        <div className='bottom-banner'>
            <h3 className='bottom-heading'>For more information on Keating & Co, please visit</h3>
            <a href='https://www.keatingco.com.au' target='_blank' className='bottom-link'>keatingco.com.au</a>
        </div>
      </>
    );
  }
}

export default Homepage;
