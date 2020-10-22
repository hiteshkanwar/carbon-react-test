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
import  { history } from '../../App';



type LoginFormState = {
  email: string;
  password: string;
  error: any;
};

type Props = {
  success: boolean;
  loginUser: (email, password) => void;
};


const Login: React.FC<Props> = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


   const inputValidation = async() => {
        let emailError = await validate.email(email);
        let passwordError = await validate.inputField(password, 'Password', 8, 16);

        let isInputValidation;
         if (emailError){
           isInputValidation = true;
            setError(
                "Email or password is wrong"
            )
        }
        if (passwordError){
           isInputValidation = true;
            setError(
                passwordError
            )
        }
        return isInputValidation;
    }

    const onSubmit = async(e) => {
        var validate = await inputValidation();
        if(validate){return null}
        e.preventDefault();
        props.loginUser(email, password)
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
                           { (props.success == false || error != "")&&
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
                                                       labelText='Email'
                                                       placeholder='Type your email'
                                                       className='some-class'
                                                       onChange={(e)=>setEmail(
                                                          e.target.value
                                                        )}
                                                    />
                                                </Column>
                                            </Row>
                                            <Row>
                                                <Column className='password-input'>
                                                    <TextInput.PasswordInput
                                                        helperText="Optional helper text"
                                                        hidePasswordLabel="Hide password"
                                                        labelText="Password Confirmation"
                                                        placeholder="Type In"
                                                        showPasswordLabel="Show password"
                                                        onChange={(e)=>setPassword(
                                                          e.target.value
                                                        )}
                                                       
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
                                       <div className="google-button">
                                    
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
