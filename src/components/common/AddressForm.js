import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {countries} from './CountryStateData';

export default class AddressForm extends Component {

  state = {
    address: {
      addressType:"",
      line1:"",
      line2:"",
      city:"",
      state:"",
      country:"India",
      pin:""
    },
    states: [],
  }; 

  onChangeHandle = (value, field) => {
    let addr = {...this.state.address};
    addr[field] = value;
    this.setState({address: addr});
    this.props.onChange(this.state.address);
  }

  onCountryChange = (event, value) => {
    let address = {...this.state.address};
    address.country = value;
    address.state = "";
    let states = countries.find(obj => obj.country === value);
    states = states ? states.states : [];
    this.setState({address, states });
    this.props.onChange(address);
  }

  onStateChange = (event, value) => {
    let address = {...this.state.address};
    address.state = value;
    this.setState({address });
    this.props.onChange(address);
  }

  componentDidUpdate() {
  }

  render() {
    const { title } = this.props;
    return(<div>
    <Typography className={"margintop20px " } style={{color: "#3f51b5"}}>{title}</Typography>
        <Divider style={{width: "25%"}}/>
        <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
          <Grid item xs={6}>
            <TextField className="width100percent" label="Address Line 1" 
              onChange={e => this.onChangeHandle(e.target.value, "line1")}
                />
          </Grid>
          <Grid item xs={6}>
            <TextField className="width100percent" label="Address Line 2" 
                onChange={e => this.onChangeHandle(e.target.value, "line2")}/>
          </Grid>
          <Grid item xs={3}>
            <TextField className="width100percent" label="City/Town" 
                onChange={e => this.onChangeHandle(e.target.value, "city")}/>
          </Grid>
          <Grid item xs={3}>
            <Autocomplete className="width100percent"
              options={countries}
              getOptionLabel={option => option.country} 
              style={{ width: "100%" }}
              defaultValue={"India"}
              inputValue={this.state.address.country}//"India"
              onInputChange={this.onCountryChange}
              renderInput={params => <TextField style={{ width: "100%" }} {...params} label="Country" />}
            />
            {/*<TextField className="width100percent" label="Country" 
                onChange={e => this.onChangeHandle(e.target.value, "country")}/>*/}
          </Grid>

          <Grid item xs={3}>
            <Autocomplete className="width100percent"
              options={this.state.states}
              //getOptionLabel={option => option.country} 
              style={{ width: "100%" }}
              inputValue={this.state.address.state}//"India"
              onInputChange={this.onStateChange}
              renderInput={params => <TextField style={{ width: "100%" }} {...params} label="State/Provience" />}
            />
            {/*<TextField className="width100percent" label="State/Provience" 
                onChange={e => this.onChangeHandle(e.target.value, "state")}/>*/}
            
          </Grid>
          <Grid item xs={3}>
            <TextField className="width100percent" label="Pin Code"
                onChange={e => this.onChangeHandle(e.target.value, "pin")}/>
          </Grid>
        </Grid>
    </div>);
  }
}