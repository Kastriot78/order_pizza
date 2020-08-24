import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {reset} from 'redux-form';
import axios from 'axios';
import isValidEmail from 'sane-email-validation';

import './contact.css';

class Contact extends Component {

    renderInputField = (field) => {
       return (
            <div className="wrap-input1 validate-input text-center">
                <input className="input1" type="text" {...field.input} placeholder={field.placeholder} autocomplete="off"/>
                <span className="text-danger">{field.meta.touched ? field.meta.error : ''}</span>
            </div>
       )
    }

    renderTextArea = (field) => {
        return (
            <div className="wrap-input1 validate-input text-center">
                <textarea className="input1" {...field.input} placeholder={field.placeholder}></textarea>
                <span className="text-danger">{field.meta.touched ? field.meta.error : ''}</span>
            </div>
        )
    }

    onSubmit = (data) => {
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("subject", data.subject);
        formData.append("message", data.message);
        const url = 'https://orderpizza-online.herokuapp.com/server/contact.php'; 
        axios.post(url, formData)
        .then(function(response) {
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error.message);
            console.log("ERROR");
        });
        this.props.dispatch(reset('ContactForm'));
    }

    render() {
        return (
            <div className="contact1">
                <div className="container-contact1">
                    <div className="contact1-pic js-tilt" data-tilt>
                        <img src="/images/email.png" alt="IMG" />
                    </div>

                    <form className="contact1-form validate-form " onSubmit={this.props.handleSubmit((values) => {
                        this.onSubmit(values)})} >
                        <span className="contact1-form-title">
                            Get in touch
                        </span>

                        <Field
                            name="name"
                            component={this.renderInputField}
                            placeholder="Name"
                        />

                        <Field
                            name="email"
                            component={this.renderInputField}
                            placeholder="Email"
                        />

                        <Field
                            name="subject"
                            component={this.renderInputField}
                            placeholder="Subject"
                        />

                        <Field
                            name="message"
                            component={this.renderTextArea}
                            placeholder="Message"
                        />

                        <div className="container-contact1-form-btn ">
                            <button className="contact1-form-btn ">
                            <span>
                                Send Email
                                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.name) {
        errors.name = 'Name is required' //errors.name sepse name=name(si dhe name e kom edhe ne databaz e pranndaj kjo name=name duher me qene ne baz si e kam ne databaz se ndryshe nuk e run qat field tani ne databaz) e kom aty lart tek <Field /> 
    }

    if(!values.email) {
        errors.email = 'Email is required'
    } else if(!isValidEmail(values.email)) {
        errors.email = 'Email is not valid'
    }

    if(!values.subject) {
        errors.subject = 'Subject is required'
    }

    if(!values.message) {
        errors.message = 'Message is required'
    }

    return errors;
}

export default reduxForm({
    validate, 
    form: 'ContactForm',
    destroyOnUnmount: false
})(
    (Contact)
)

