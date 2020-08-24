import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {reset} from 'redux-form';
import axios from 'axios';

class Add extends Component {

    renderInputField = (field) => {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                        <div className="form-group">
                            <input type="text" className="form-control" {...field.input} placeholder={field.placeholder}  />
                            <span className="text-danger">{field.meta.touched ? field.meta.error : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderFileField = ({ input, type, meta }) => {
        const { mime } = this.props;
        return ( 
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                        <div className="form-group">
                            <input type="file" className="form-control-file border"
                                name={input.name}
                                type={type}
                                accept={mime}
                                onChange={event => this.fileSelected(event, input)}
                                ref={ref=> this.fileInput = ref}
                            
                            />
                            <span className="text-danger">{meta.touched ? meta.error : ''}</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    fileSelected = (event, input) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            const imageObject = new window.Image();

            imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth;
                imageFile.height = imageObject.naturalHeight;
                input.onChange(imageFile);
                URL.revokeObjectURL(imageFile);
            };
            imageObject.src = localImageUrl;
        }        
        
    }

    
    onSubmit = (data) => {
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image);
        formData.append("description", data.description);
        formData.append("price", data.price);
        const config = {
            headers: { "content-type": "multipart/form-data" }
        };
        const url = 'https://orderingpizza-online.herokuapp.com/server/add.php';
        axios.post(url, formData, config)
        .then(function(response) {
            console.log(response.data)
            console.log("Pizza Inserted Successfully");
        })
        .catch(function(error) {
            console.log(error.message);
            console.log("ERROR");
        });
        this.fileInput.value = ""; 
        this.props.dispatch(reset('PizzaForm'));
    }

    render() {
        return (
            
                <form onSubmit={this.props.handleSubmit((values) => {
                    this.onSubmit(values);
                })}>
                    <h3 className="text-center text-secondary pb-2">Add Pizza</h3>

                    <Field
                        name="name"
                        component={this.renderInputField}
                        placeholder="Name"
                    />

                    <Field
                        name="image"
                        type="file"
                        component={this.renderFileField}
                    />

                    <Field
                        name="description"
                        component={this.renderInputField}
                        placeholder="Description"
                    />

                    <Field
                        name="price"
                        component={this.renderInputField}
                        placeholder="Price"
                    />
                
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                                <div className="form-group">
                                <input type="submit" className="btn btn-secondary btn-block" value="Add" />
                                </div>
                            </div>
                        </div>
                    </div>
                   

                </form>
            
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.name) {
        errors.name = 'Name is required' //errors.name sepse name=name(si dhe name e kom edhe ne databaz e pranndaj kjo name=name duher me qene ne baz si e kam ne databaz se ndryshe nuk e run qat field tani ne databaz) e kom aty lart tek <Field /> 
    }

    if(!values.image) {
        errors.image = 'Image is required'
    }

    if(!values.description) {
        errors.description = 'Description is required'
    }

    if(!values.price) {
        errors.price = 'Price is required'
    }

    return errors;
}

function mapStateToProps(state) {
    console.log(state)
    return {
        pizzaCart: state.pizzaCart
    }
}

export default reduxForm({
    validate, 
    form: 'PizzaForm',
    destroyOnUnmount: false
})(
    connect(mapStateToProps)(Add)
)

