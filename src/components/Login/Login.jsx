// This component holds the login screen
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

import {
    ArrowRight32, 
} from '@carbon/icons-react';

import { connect } from 'react-redux';
import SidebarScreen from './SidebarScreen';
import AppFooter from './AppFooter';
import { loginUser } from '../../actions/auth';
import { validate } from '../../lib/Validate';
import {
  InlineNotification,
} from 'carbon-components-react';
import './Login.scss';
import GoogleLogin from 'react-google-login';
import  { history } from '../../App.js';




const Login = (props) => {

    const [state, setState] = useState({});

    const inputValidation = async() => {
        var emailError = await validate.email(state.email);
        var passwordError = await validate.inputField(state.password, 'Password', 8, 16);
        var isInputValidation;
        if(emailError || passwordError){
            isInputValidation = true;
            setState({
                ...state,
                emailError,
                passwordError,
            })
        }
        return isInputValidation;
    }

    const onSubmit = async(e) => {
        var validate = await inputValidation();
        if(validate){return null}
        e.preventDefault();
        props.loginUser(state)
    }

    const responseGoogle = (response) => {
      console.log(response);
      if (response.tokenObj){
        sessionStorage.setItem('user',JSON.stringify(response.tokenObj))
        history.push('/dashboard');
      } 

    }
    return(
        <>
            <Grid className='login-wrapper'>
                <Row>
                    <Column sm={12} md={3} lg={3} className='sidebar-header'>
                        <SidebarScreen/>
                    </Column>
                    <Column sm={12} md={9} lg={9}>
                        <div className='form-wrapper login'>
                            <h4 className='app-logo'>Strobes</h4>
                            <h2 className='page-title'>Login</h2>
                            <p className='sub-title'>
                                Don't have an accout?
                                <Link to='/register'>Register Now</Link>
                            </p>
                            { props.success == false &&
                             <div>
                                <InlineNotification
                                  kind="error"
                                  iconDescription="describes the close button"
                                  subtitle={<span>Email or Password is wrong</span>}
                                  title=""
                                />
                              </div>
                              }
                            <Form>
                                
                                    <FluidForm>
                                        <Grid narrow>
                                            <Row> 
                                                <Column>
                                                    <TextInput
                                                        invalid={state.emailError}
                                                        labelText='Email'
                                                        placeholder='Type your email'
                                                        className='some-class'
                                                        invalidText={state.emailError}
                                                        onChange={(e)=>setState({
                                                            ...state,
                                                            emailError: false,
                                                            email: e.target.value
                                                        })}
                                                    />
                                                </Column>
                                            </Row>
                                            <Row>
                                                <Column className='password-input'>
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
                                            </Row>
                                            <Row>
                                                <Column>
                                                    <Button 
                                                        className='btn-fluid'
                                                        renderIcon={ArrowRight32}
                                                        onClick={(e) => onSubmit(e)}
                                                    >
                                                        Submit
                                                    </Button>
                                                    
                                                </Column>
                                            </Row>
                                        </Grid>
                                    </FluidForm>
                                     <Row className="justify-content-center">
                                    <Column sm={12} md={12} lg={12}>
                                      <center><p className="seprator-box">Or</p></center>
                                       <div className="google-button">
                                        <GoogleLogin
                                                clientId="336242337843-o0st76legn2s61e7296i8llpofu50ta9.apps.googleusercontent.com"
                                                buttonText="Login"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                              />
                                          </div>
                                       </Column>
                                        </Row>

                                             
                            </Form>
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
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
