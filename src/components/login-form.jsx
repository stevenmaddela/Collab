import { useState } from "react";

class User {
    constructor(name,email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export function validateName(inputName) {
        if (inputName == null || inputName.length == 0) {
            return "Enter a name\n";
        }
        if (!(/^[a-zA-Z\s]*$/.test(inputName))) {
            return "Invalid Characters\n";
        }
        return "";
}

export function validateEmail(inputEmail) {
    if (inputEmail == null || inputEmail.length == 0) {
        return "Enter an email address\n";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) {
        return "Invalid Email\n";
    }
    return "";
}

export function validatePassword(inputPassword) {
    if (inputPassword == null || inputPassword.length == 0) {
        return "Enter a password\n";
    }
    if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/).test(inputPassword)) {
        return "Ensure your password has 1 uppercase, lowercase, and number\n"
    }
    return "";
}

export default function LoginForm() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        setInputs(values => ({...values, [name]: event.target.value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateInput(inputs.username, inputs.email, inputs.password)) {
            let user = new User(inputs.username, inputs.email, inputs.password);
            alert(inputs.username + "\n" + inputs.email + "\n" + inputs.password);
        }
    };

    function validateInput(inputName, inputEmail, inputPassword) {
        let alertMessage = "";
        alertMessage += (validateName(inputName) + validateEmail(inputEmail) + validatePassword(inputPassword))
        if (alertMessage.length != 0) {
            alert(alertMessage);
            return false;
        }
        return true;
    } 
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter your name:
                <input 
                    type="text" 
                    value={inputs.username || ""} 
                    aria-label="user name" 
                    placeholder="Enter Name"
                    name="username"
                    onChange={handleChange}
                />
            </label>
            <label>
                Enter your email:
                <input 
                    type="text"
                    value={inputs.email || ""} 
                    aria-label="user email" 
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                />
            </label>
            <label>
                Enter your password:
                <input 
                    type="password" 
                    value={inputs.password || ""}
                    aria-label="user password" 
                    placeholder="Enter password" 
                    name="password"
                    onChange={handleChange}
                />
            </label>
            <input type="submit"/>
        </form>
    );
}