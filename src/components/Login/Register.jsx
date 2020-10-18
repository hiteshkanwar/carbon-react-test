// This component holds the register screen
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import { 
    Grid, 
    Row, 
    Column, 
    Button,
    Form,
    TextInput,
    FluidForm,
} from 'carbon-components-react';
import { connect } from 'react-redux';
import {ArrowRight32} from '@carbon/icons-react';
import {
  InlineNotification,
} from 'carbon-components-react';

import SidebarScreen from './SidebarScreen';
import { validate } from '../../lib/Validate';
import AppFooter from './AppFooter';
import { registerUser } from '../../actions/auth';
import './Login.scss';



const Register = (props) => {
    const [state, setState] = useState({});

    const inputValidation = async() => {
        var firstNameError = await validate.inputField(state.firstName, 'First name');
        var lastNameError = await validate.inputField(state.lastName, 'Last Name');
        var companyNameError = await validate.inputField(state.companyName, 'Company name');
        var emailError = await validate.email(state.email);
        var passwordError = await validate.inputField(state.password, 'Password', 8, 16);
        var confirmPasswordError;
        if(state.password !== state.confirmPassword){
            confirmPasswordError = "Confirm password didn't match";
        }
        var isInputValidation;
        if(
            firstNameError || 
            lastNameError || 
            companyNameError || 
            emailError || 
            passwordError ||
            confirmPasswordError
        ){
            isInputValidation = true;
            setState({
                ...state,
                firstNameError,
                lastNameError,
                companyNameError,
                emailError,
                passwordError,
                confirmPasswordError
            })
        }
        return isInputValidation;
    }

    const onSubmit = async(e) => {
        var validate = await inputValidation();
        if(validate){return null}
        e.preventDefault();
        props.registerUser(state)
    } 


    return(
        <>
            <Grid className='login-wrapper'>
                <Row>
                    <Column sm={12} md={3} lg={3} className='sidebar-header'>
                        <SidebarScreen/>
                    </Column>
                    <Column sm={12} md={9} lg={9}>
                        <div className='form-wrapper'>
                            <h4 className='app-logo'>Strobes</h4>
                            <h2 className='page-title'>Register</h2>
                            <p className='sub-title'>
                                Already have an accout?
                                <Link to='/'>Login</Link>
                            </p>
                            { props.success == false &&
                             <div>
                                <InlineNotification
                                  kind="error"
                                  iconDescription="describes the close button"
                                  subtitle={<span>There is Some Error Please try again</span>}
                                  title=""
                                />
                              </div>
                              }
                            <Form>
                                <FluidForm>
                                    <Grid narrow>
                                        <Row>
                                            <Column sm={12} md={4}>
                                                <TextInput
                                                    invalid={state.firstNameError}
                                                    invalidText={state.firstNameError}
                                                    labelText='First Name'
                                                    placeholder='Type In'
                                                    className='some-class'
                                                    onChange={(e)=>setState({
                                                        ...state,
                                                        firstNameError: false,
                                                        firstName: e.target.value
                                                    })}
                                                />
                                            </Column>
                                            <Column sm={12} md={4}>
                                                <TextInput
                                                    invalid={state.lastNameError}
                                                    invalidText={state.lastNameError}
                                                    labelText='Last Name'
                                                    placeholder='Type In'
                                                    onChange={(e)=>setState({
                                                      ...state,
                                                      lastNameError: false,
                                                      lastName: e.target.value
                                                    })}
                                                />
                                            </Column>
                                        </Row>
                                        <Row className='mrt-15'>
                                            <Column sm={12} md={4}>
                                                <TextInput
                                                    invalid={state.companyNameError}
                                                    invalidText={state.companyNameError}
                                                    labelText='Company'
                                                    placeholder='Type In'
                                                    onChange={(e)=>setState({
                                                      ...state,
                                                      companyNameError: false,
                                                      companyName: e.target.value
                                                    })}
                                                />
                                            </Column>
                                            <Column sm={12} md={4}>
                                                <TextInput
                                                    invalid={state.emailError}
                                                    invalidText={state.emailError}
                                                    labelText='Email'
                                                    placeholder='me@gmail.com'
                                                    onChange={(e)=>setState({
                                                      ...state,
                                                      emailError: false,
                                                      email: e.target.value
                                                    })}
                                                />
                                             
                                            </Column>
                                        </Row>
                                        <Row className='mrt-15'>
                                            <Column sm={12} md={4} className='password-input'>
                                                <TextInput.PasswordInput
                                                    invalid={state.passwordError}
                                                    invalidText={state.passwordError}
                                                    helperText="Optional helper text"
                                                    hidePasswordLabel="Hide password"
                                                    labelText="Password Confirmation"
                                                    placeholder="Type In"
                                                    showPasswordLabel="Show password"
                                                    onChange={(e)=>setState({
                                                        ...state,
                                                        passwordError: false,
                                                        password: e.target.value
                                                    })}
                                                />
                                            </Column>
                                            <Column sm={12} md={4} className='password-input'>
                                                <TextInput.PasswordInput
                                                    invalid={state.confirmPasswordError}
                                                    invalidText={state.confirmPasswordError}
                                                    helperText="Optional helper text"
                                                    hidePasswordLabel="Hide password"
                                                    labelText="Password"
                                                    placeholder="Type In"
                                                    showPasswordLabel="Show password"
                                                    onChange={(e)=>setState({
                                                        ...state,
                                                        confirmPasswordError: false,
                                                        confirmPassword: e.target.value
                                                    })}
                                                />
                                            </Column>
                                        </Row>
                                        <Row className='mrt-15'>
                                            <Column sm={8} md={8}>
                                                <Button onClick={(e) => onSubmit(e)} className='btn-fluid' renderIcon={ArrowRight32}>Continue to your free account</Button>
                                            </Column>
                                        </Row>
                                    </Grid>
                                </FluidForm>
                            </Form>
                            <p className='privacy-policy-text'>By creating a Strobes account, you consent to and fully accept our privacy policy. Terms of Service apply.</p>
                        </div>
                        <AppFooter/>
                    </Column>
                </Row>
            </Grid>
        </>
    )
}

const mapStateToProps = state => {
  return {
    success: state.auth.success
  }
}

const mapDispatchToProps = {
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

