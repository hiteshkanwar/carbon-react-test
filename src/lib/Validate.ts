export const validate = {
	// Validattion for email format
    email: (email) => {
		var errorMessage;
		var wrongEmailFormat = 'Wrong email address format';
		var emptyEmail = "Email can't be empty";
		var emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ ;
		if(email){
			if(emailFormat.test(email)===false){
				errorMessage = wrongEmailFormat;
			}
			else{
				errorMessage = false;
			}
		}	
		else if(!email){
			errorMessage = emptyEmail;
		}

		return errorMessage;
	},

	// this function holds the max, min input validations
	inputField: (value, name, minLength, maxLength) => {
		var inputError;
		if(value){
			if(maxLength && minLength){
				if(value.length<minLength || value.length>maxLength){
					inputError = `${name} should be between ${minLength}-${maxLength} characters`;
				}
			}else if(maxLength || minLength){
				if(minLength && value.length<minLength){
					inputError = `${name} should be atleast ${minLength} characters`;
				}else if(maxLength && value.length>maxLength){
					inputError = `${name} can't be greater than ${maxLength} characters`;
				}
			}
		}else{
			inputError = `${name} field is required`;
		}
		return inputError
	},
	
}