import React, { Component } from 'react';

import Input from '../userInterfaces/Input/Input';
import Button from '../userInterfaces/Button/Button';

class Form extends Component {
    persistDataValid = true;

    state = {
        controlData: this.props.controls.map(i => {
            let value;
            if (i.type !== 'select')
            {
                value = {
                    value: (() => {
                        if (this.props.data && this.props.data[i.name]) {
                            return this.props.data[i.name];
                        }
                        else {
                            this.persistDataValid = false;
                            return '';
                        }
                    })(),
                    valid: this.props.data && this.props.data[i.name],
                    touched: false,
                    name: i.name,
                    errorMessage: null
                };
            }
            else {
                value = {
                    value: (() => {
                        if (this.props.data && this.props.data[i.name]) {
                            return this.props.data[i.name];
                        }
                        else {
                            this.persistDataValid = false;
                            return i.elementConfiguration.options[0].value;
                        }
                    })(),
                    valid: true,
                    name: i.name
                };
            }
            return value;
        }),
        isFormValid: this.props.data && this.persistDataValid
    }

    validateControlData = (value, rules) => {
        if (!rules) {
            return { valid: true, errorMessage: null };
        }
        let isValid = true,
            errorMessage = null;
        if (rules.required) {
            let test = value.trim() !== '';
            isValid = test && isValid;
            errorMessage = !test ? 'This field cannot be empty.' : errorMessage;
        }
        if (rules.minLength) {
            let test = value.length >= rules.minLength;
            isValid = test && isValid;
            errorMessage = !test ? 'Too few characters.' : errorMessage;
        }
        if (rules.maxLength) {
            let test = value.length <= rules.maxLength;
            isValid = test && isValid;
            errorMessage = !test ? 'Too many characters.' : errorMessage;
        }
        if (rules.email) {
            //eslint-disable-next-line
            const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            let test = emailRegex.test(String(value).toLowerCase());
            isValid = test && isValid;
            errorMessage = !test ? 'Invalid email.' : errorMessage;
        }
        return { valid: isValid, errorMessage };
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {};
        this.state.controlData.forEach(i => {
            data[i.name] = i.value
        });
        this.props.submit(data);
    }

    onInputChange = (e, index) => {
        const copy = [ ...this.state.controlData ];
        const controlData = { ...copy[index] };
        controlData.value = e.target.value;
        controlData.touched = true;
        const info = this.validateControlData(controlData.value, this.props.controls[index].validation);
        controlData.valid = info.valid;
        controlData.errorMessage = info.errorMessage;
        copy[index] = controlData;
        let isFormValid = true;
        for (let i = 0; i < copy.length; ++i) {
            isFormValid = copy[i].valid && isFormValid;
        }
        this.setState({ controlData: copy, isFormValid });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                {this.props.controls.map((i, index) => {
                    return (
                        <Input 
                            type={i.type} 
                            change={(e) => this.onInputChange(e, index)} 
                            elementConfiguration={i.elementConfiguration} 
                            value={this.state.controlData[index].value}
                            label={i.label}
                            valid={this.state.controlData[index].valid}
                            touched={this.state.controlData[index].touched}
                            errorMessage={this.state.controlData[index].errorMessage}
                            key={index}
                        />
                    );
                })}
                <Button disabled={!this.state.isFormValid} margin="16px 0 0 0" width="100%">{this.props.submitLabel}</Button>
            </form>
        );
    }
}

export default Form;