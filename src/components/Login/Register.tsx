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



type RegisterFormState = {
  firstName: string
  lastName: string
  companyName: string
  email: string;
  password: string;
  error: any;
  submit: boolean;
};

type Props = {
  success: boolean;
  registerUser: (email, password) => void;
};


const InvalidFirstNameProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'FirstName',
  invalid: true,
  invalidText:
    'First Name can not be blank.',
};

const Register = (props: any) => {


   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [companyName, setCompanyName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirmation, setPasswordConfirmation] = useState("");
   const [error, setError] = useState("");
   const [submit, setSubmit] = useState(false)



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
        if (firstName == "" || lastName == "" || companyName == "" || emailError =="" || password =="" || passwordConfirmation =="")
        {
           setSubmit(true)
           return false
        }
        return submit;
    }

  

     const onSubmit = async(e) => {
        var validate = await inputValidation();
        if(validate){return null}
        e.preventDefault();
        props.registerUser(email, password)
    }

    console.log(submit)


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
                                                    invalid={submit=== true && firstName ==""}
                                                    invalidText="This can not be blank."
                                                    labelText='First Name'
                                                    placeholder='Type In'
                                                    className='some-class'
                                                    onChange={(e)=>setFirstName(
                                                      e.target.value
                                                    )}
                                                />
                                            </Column>
                                            <Column sm={12} md={4}>
                                                <TextInput
                                                    invalid={submit=== true && lastName ==""}
                                                    invalidText="This can not be blank."
                                                    labelText='Last Name'
                                                    placeholder='Type In'
                                                    onChange={(e)=>setLastName(
                                                      e.target.value
                                                    )}
                                                />
                                            </Column>
                                        </Row>
                                        <Row className='mrt-15'>
                                            <Column sm={12} md={4}>
                                                <TextInput

                                                   invalid={submit=== true && companyName ==""}
                                                   invalidText="This can not be blank."
                           
                                                    labelText='Company'
                                                    placeholder='Type In'
                                                    onChange={(e)=>setLastName(
                                                      e.target.value
                                                    )}
                                              
                                                />
                                            </Column>
                                            <Column sm={12} md={4}>
                                                <TextInput
                                                    invalid={submit=== true && email ==""}
                                                    invalidText="This can not be blank."
                                                    labelText='Email'
                                                    placeholder='me@gmail.com'
                                                    onChange={(e)=>setEmail(
                                                      e.target.value
                                                    )}
                                                />
                                             
                                            </Column>
                                        </Row>
                                        <Row className='mrt-15'>
                                            <Column sm={12} md={4} className='password-input'>
                                                <TextInput.PasswordInput
                                                    invalid={submit=== true && password ==""}
                                                    invalidText="This can not be blank."
                                                    helperText="Optional helper text"
                                                    hidePasswordLabel="Hide password"
                                                    labelText="Password"
                                                    placeholder="Type In"
                                                    showPasswordLabel="Show password"
                                                    onChange={(e)=>setPassword(
                                                      e.target.value
                                                    )}
                                                />
                                            </Column>
                                            <Column sm={12} md={4} className='password-input'>
                                                <TextInput.PasswordInput
                                                    invalid={submit=== true && passwordConfirmation ==""}
                                                    invalidText="This can not be blank."
                                                    hidePasswordLabel="Hide password"
                                                    labelText="Password Confirmation"
                                                    placeholder="Type In"
                                                    showPasswordLabel="Show password"
                                                    onChange={(e)=>setPasswordConfirmation(
                                                      e.target.value
                                                    )}
                                                    // onChange={(e)=>setState({
                                                    //     ...state,
                                                    //     confirmPasswordError: false,
                                                    //     confirmPassword: e.target.value
                                                    // })}
                                                />
                                            </Column>
                                        </Row>
                                        <Row className='mrt-15'>
                                            <Column sm={8} md={8}>
                                                <Button 
                                                onClick={(e) => onSubmit(e)} 
                                                className='btn-fluid' 
                                                renderIcon={ArrowRight32}>Continue to your free account</Button>
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
