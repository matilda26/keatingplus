import React from "react";
import "./sideCol.css";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal from "@material-ui/core/Modal";

import { FormControl } from "@material-ui/core";
import { ReactComponent as Logo } from "./logo-stacked.svg";
import { ReactComponent as Plus } from "./plus.svg";

import { connect } from "react-redux";
import { addToDo } from "../actions";
import moment from "moment";

// import { express } from "express";
// import bodyParser from "body-parser";
// import request from "superagent";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class SingleCol extends React.Component {
  state = {
    data: {
      name: "",
      company: "",
      email: "",
      gstReg: "",
      ABN: "",
      noOfSites: "",
      noOfEmployees: "",
      package: "",
      bankFeed: "",
      extras: ""
    },
    errors: {},
    formSubmitted: false,
    modalOpen: false
  };

  handleChange = (type, text) => {
    this.setState({
      data: {
        ...this.state.data,
        [type]: text
      }
    });
  };

  toggleModal = () => {
    this.setState((state, props) => {
      return {
        modalOpen: !state.modalOpen
      };
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.validateFields();
    if (
      !this.state.errors.name &&
      !this.state.errors.company &&
      !this.state.errors.email &&
      !this.state.errors.gstReg &&
      !this.state.errors.ABN &&
      !this.state.errors.noOfSites &&
      !this.state.errors.noOfEmployees &&
      !this.state.errors.package &&
      !this.state.errors.bankFeed
    ) {
      console.log("no errors");

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "signup", ...this.state.data })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));

      event.preventDefault();

      this.props.addToDo({
        [moment().format()]: this.state.data
      });

      this.toggleModal();

      this.setState({
        data: {
          name: "",
          company: "",
          email: "",
          gstReg: "",
          ABN: "",
          noOfSites: "",
          noOfEmployees: "",
          package: "",
          bankFeed: ""
        },
        errors: {},
        formSubmitted: true
      });
    }
  };

  // addToMailchimp = () => {
  //   const app = express();
  //   app.use(bodyParser.json());
  //   app.use(bodyParser.urlencoded({ extended: true }));
  //   const mailchimpInstance = "us3",
  //     listUniqueId = process.env.REACT_APP_MAILCHIMP_LIST_ID,
  //     mailchimpApiKey = process.env.REACT_APP_MAILCHIMP_API_KEY;

  //   app.post("/signup", function(req, res) {
  //     request
  //       .post(
  //         "https://" +
  //           mailchimpInstance +
  //           ".api.mailchimp.com/3.0/lists/" +
  //           listUniqueId +
  //           "/members/"
  //       )
  //       .set("Content-Type", "application/json;charset=utf-8")
  //       .set(
  //         "Authorization",
  //         "Basic " + new Buffer("any:" + mailchimpApiKey).toString("base64")
  //       )
  //       .send({
  //         email_address: req.body.email,
  //         status: "subscribed",
  //         merge_fields: {
  //           FNAME: req.body.firstName,
  //           LNAME: req.body.lastName
  //         }
  //       })
  //       .end(function(err, response) {
  //         if (
  //           response.status < 300 ||
  //           (response.status === 400 && response.body.title === "Member Exists")
  //         ) {
  //           res.send("Signed Up!");
  //         } else {
  //           res.send("Sign Up Failed :(");
  //         }
  //       });
  //   });
  // };

  validateFields = async () => {
    const { data } = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const ABNRegex = /^(\d *?){11}$/;

    if (data.name.length < 1) {
      console.log("name failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            name: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            name: false
          }
        };
      });
    }
    if (data.company.length < 1) {
      console.log("company failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            company: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            company: false
          }
        };
      });
    }
    if (emailRegex.test(String(data.email).toLowerCase()) === false) {
      console.log("email failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            email: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            email: false
          }
        };
      });
    }
    if (data.gstReg === "") {
      console.log("gst failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            gstReg: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            gstReg: false
          }
        };
      });
    }
    if (ABNRegex.test(data.ABN) === false) {
      console.log("ABN failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            ABN: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            ABN: false
          }
        };
      });
    }
    if (data.noOfSites === "") {
      console.log("noOfSites failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            noOfSites: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            noOfSites: false
          }
        };
      });
    }
    if (data.noOfEmployees === "") {
      console.log("noOfEmployees failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            noOfEmployees: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            noOfEmployees: false
          }
        };
      });
    }
    if (data.package === "") {
      console.log("package failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            package: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            package: false
          }
        };
      });
    }
    if (data.bankFeed === "") {
      console.log("bankFeed failed");
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            bankFeed: true
          }
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          errors: {
            ...state.errors,
            bankFeed: false
          }
        };
      });
    }
    // test
  };

  render() {
    return (
      <>
        <div className="header">
          <Logo className="header-logo" />
        </div>
        <div className="top-banner">
          <p>
            <span className="text-highlight__lightgreen">AUTOMATIC</span>{" "}
            ACCOUNTING ONLINE
          </p>
        </div>
        <div className="form-scrollbounds">
          <div className="form-text">
            <h2 className="form-heading">
              Fill out our questionnaire for a detailed quote:
            </h2>
            <div className="underline-detail" />
            <p className="side-heading">
              As an extension to your Cloud RMS Property Management System, you
              can now have{" "}
              <span className="text-highlight__lightgreen">
                all your Bas calculated and lodged
              </span>{" "}
              as well as all your{" "}
              <span className="text-highlight__lightgreen">
                annual reports and tax returns done online
              </span>{" "}
              with the minimum of fuss.
              <br />
              <br />
              With our simple accurate system we guarantee you will be{" "}
              <span className="text-highlight__lightgreen">
                corporately compliant and up to date.
              </span>{" "}
              Choose all or any of our unique online services.
            </p>
            <p className="note">
              Please note, all required fields are marked with a{" "}
              <span className="MuiFormLabel-asterisk">*</span>
            </p>
          </div>
          <div className="form-wrapper">
            <form className="form" onSubmit={this.handleSubmit}>
              <input type="hidden" name="form-name" value="signup" />
              <TextField
                id="company-name"
                label="Business name"
                className="input"
                value={this.state.data.company}
                onChange={text =>
                  this.handleChange("company", text.target.value)
                }
                margin="normal"
                required={true}
                error={this.state.errors.company === true}
                helperText={
                  this.state.errors.company
                    ? "Please add your Buisness name"
                    : null
                }
              />
              <TextField
                id="abn"
                label="ABN"
                className="input"
                value={this.state.data.ABN}
                onChange={text => this.handleChange("ABN", text.target.value)}
                margin="normal"
                required={true}
                error={this.state.errors.ABN === true}
                helperText={
                  this.state.errors.ABN ? "Please enter a valid ABN" : null
                }
              />
              <TextField
                id="name"
                label="Contact name"
                className="input"
                value={this.state.data.name}
                onChange={text => this.handleChange("name", text.target.value)}
                margin="normal"
                required={true}
                error={this.state.errors.name === true}
                helperText={
                  this.state.errors.name ? "Please add a contact name" : null
                }
              />
              <TextField
                id="email"
                label="Email"
                className="input"
                value={this.state.data.email}
                onChange={text => this.handleChange("email", text.target.value)}
                margin="normal"
                required={true}
                type="email"
                error={this.state.errors.email === true}
                helperText={
                  this.state.errors.email ? "Please enter a valid email" : null
                }
              />
              <FormLabel component="legend" className="checkbox-label">
                GST Registration
                <span className="MuiFormLabel-asterisk">*</span>
              </FormLabel>
              <RadioGroup
                aria-label="gstReg"
                name="gstReg"
                className="label"
                value={this.state.data.gstReg}
                onChange={option =>
                  this.handleChange("gstReg", option.target.value)
                }
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                  className={
                    this.state.data.gstReg === "cash" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="accrual"
                  control={<Radio />}
                  label="Accrual"
                  className={
                    this.state.data.gstReg === "accrual" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="notRegistered"
                  control={<Radio />}
                  label="Not currently registered"
                  className={
                    this.state.data.gstReg === "notRegistered" ? "selected" : ""
                  }
                />
              </RadioGroup>
              {this.state.errors.gstReg === true && (
                <FormHelperText>Please select an option above</FormHelperText>
              )}

              <TextField
                id="noOfSites"
                label="Number of sites"
                className="input"
                value={this.state.data.noOfSites}
                onChange={text =>
                  this.handleChange("noOfSites", text.target.value)
                }
                margin="normal"
                required={true}
                type="number"
                error={this.state.errors.noOfSites === true}
                helperText={
                  this.state.errors.noOfSites
                    ? "Please enter your number of sites"
                    : null
                }
              />
              <FormControl>
                <InputLabel htmlFor="no-of-employees">
                  Number of employees
                  <span className="MuiFormLabel-asterisk">*</span>
                </InputLabel>
                <Select
                  value={this.state.data.noOfEmployees}
                  onChange={value =>
                    this.handleChange("noOfEmployees", value.target.value)
                  }
                  inputProps={{
                    name: "noOfEmployees",
                    id: "no-of-employees"
                  }}
                  error={this.state.errors.noOfEmployees === true}
                >
                  <MenuItem value={""}>Please select</MenuItem>
                  <MenuItem value={"1"}>Self employed</MenuItem>
                  <MenuItem value={"1-10"}>1-10 employees</MenuItem>
                  <MenuItem value={"11-50"}>11-50 employees</MenuItem>
                  <MenuItem value={"51-200"}>51-200 employees</MenuItem>
                  <MenuItem value={"201-500"}>201-500 employees</MenuItem>
                  <MenuItem value={"501-1,000"}>501-1,000 employees</MenuItem>
                  <MenuItem value={"1,001-5,000"}>
                    1,001-5,000 employees
                  </MenuItem>
                  <MenuItem value={"5,001-10,000"}>
                    5,001-10,000 employees
                  </MenuItem>
                  <MenuItem value={"10,000+"}>10,001+ employees</MenuItem>
                </Select>
                {this.state.errors.package === true && (
                  <FormHelperText>Please select an option</FormHelperText>
                )}
              </FormControl>
              <FormLabel component="legend" className="checkbox-label">
                What cloud based accounting package are you using?
                <span className="MuiFormLabel-asterisk">*</span>
              </FormLabel>
              <RadioGroup
                aria-label="package"
                name="package"
                className="label"
                value={this.state.data.package}
                onChange={option =>
                  this.handleChange("package", option.target.value)
                }
              >
                <FormControlLabel
                  value="xero"
                  control={<Radio />}
                  label="Xero"
                  className={
                    this.state.data.package === "xero" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="myob"
                  control={<Radio />}
                  label="MYOB"
                  className={
                    this.state.data.package === "myob" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="quickbooks"
                  control={<Radio />}
                  label="Quickbooks"
                  className={
                    this.state.data.package === "quickbooks" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  className={
                    this.state.data.package === "other" ? "selected" : ""
                  }
                />
              </RadioGroup>
              {this.state.errors.package === true && (
                <FormHelperText>Please select an option above</FormHelperText>
              )}
              <FormLabel component="legend" className="checkbox-label">
                Have you got Bank-Feed?
                <span className="MuiFormLabel-asterisk">*</span>
              </FormLabel>
              <RadioGroup
                aria-label="bankFeed"
                name="bankFeed"
                className="label"
                value={this.state.data.bankFeed}
                onChange={option =>
                  this.handleChange("bankFeed", option.target.value)
                }
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                  className={
                    this.state.data.bankFeed === "yes" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                  className={
                    this.state.data.bankFeed === "no" ? "selected" : ""
                  }
                />
              </RadioGroup>
              {this.state.errors.bankFeed === true && (
                <FormHelperText>Please select an option above</FormHelperText>
              )}
              {this.state.data.bankFeed === "no" && (
                <p className="bank-feed-message">
                  In order to proceed you need a bank-feed. Contact your Bank or
                  Keating & Co to arrange this simple process.
                  <br />
                  <br />
                  <a
                    className="contact-email"
                    href="mailto:rutherford.matilda@gmail.com"
                  >
                    Contact Keating & Co
                  </a>
                </p>
              )}
              <FormLabel component="legend" className="checkbox-label">
                I am interested in:
              </FormLabel>
              <RadioGroup
                aria-label="extras"
                name="extras"
                className="label"
                value={this.state.data.extras}
                onChange={option =>
                  this.handleChange("extras", option.target.value)
                }
              >
                <FormControlLabel
                  value="autoBas"
                  control={<Radio />}
                  label="+ AutoBas"
                  className={
                    this.state.data.extras === "autoBas" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="autoReturns"
                  control={<Radio />}
                  label="+ AutoReturns"
                  className={
                    this.state.data.extras === "autoReturns" ? "selected" : ""
                  }
                />
                <FormControlLabel
                  value="autoReporting"
                  control={<Radio />}
                  label="+ AutoReporting"
                  className={
                    this.state.data.extras === "autoReporting" ? "selected" : ""
                  }
                />
              </RadioGroup>
              <h3 className="terms-heading">Please note:</h3>
              <p className="terms-message">
                By clicking submit you agree to receive communications from
                Keating and Co.
              </p>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="submit-button"
                onClick={this.handleSubmit}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.toggleModal}
        >
          <div className="modal">
            <h2 id="simple-modal-title">Thank you for submitting!</h2>
            <p id="simple-modal-description">
              A Keating & Co representative will be in touch with you soon with
              your estimate.
            </p>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="modal-button"
              onClick={this.toggleModal}
            >
              Close
            </Button>
          </div>
        </Modal>
        <div className="main-body">
          <h2 className="form-heading">Our online services</h2>
          <div className="underline-detail bottom-detail" />
          <div className="service-wrapper">
            <div className="service">
              <div className="section-heading__wrapper">
                <Plus className="section-plus lightgreen" />
                <h3 className="section-heading">
                  <span className="text-highlight__lightgreen">Auto</span>Bas
                </h3>
              </div>
              <p className="section-body">
                Have your Bas calculated and lodged on time, everytime.
              </p>
            </div>
            <div className="service">
              <div className="section-heading__wrapper">
                <Plus className="section-plus midgreen" />
                <h3 className="section-heading">
                  <span className="text-highlight__midgreen">Auto</span>Returns
                </h3>
              </div>
              <p className="section-body">
                Receive your statutory returns before they are due and have them
                lodged simply and easily.
              </p>
            </div>
            <div className="service">
              <div className="section-heading__wrapper">
                <Plus className="section-plus darkgreen" />
                <h3 className="section-heading">
                  <span className="text-highlight__darkgreen">Auto</span>
                  Reporting
                </h3>
              </div>
              <p className="section-body">
                Keep up to date with your business finances with our online
                instant access bookkeeping and reporting.
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-banner">
          <h3 className="bottom-heading">
            For more information on Keating & Co, please visit
          </h3>
          <a
            href="https://www.keatingco.com.au"
            target="_blank"
            className="bottom-link"
          >
            keatingco.com.au
          </a>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(
  mapStateToProps,
  { addToDo }
)(SingleCol);
