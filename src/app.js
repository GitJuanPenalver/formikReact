import React from "react";
import { withFormik, Field, ErrorMessage, Form } from 'formik';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function MyForm(props) {
    const {
        // handleSubmit,
        isSubmitting,
        handleChange,
        handleBlur,
        values,
        isValid,
        // errors,
        // touched,
    } = props;
    return (
        <Form> 
            {/* Con el componente form de Formik evitamos el handleSubmit en el formulario */}
         {/* <form onSubmit={handleSubmit}> */}
            <div className="row">
                Email:
                <Field name="email" type="email" className="input" />
                <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            {/* Otra manera de rellenar un Field */}
            <div className="row">
                Password
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="input"></input>
                <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                <button
                    type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                    disabled={isSubmitting || !isValid}>
                    Submit
                </button>
            </div>
        
        </Form>
    );
}

export default withFormik({
    mapPropsToValues(props) {
        return {
            email: props.defaultEmail,
            password: '',
        };
    },
   async validate(values) {
        const errors = {};

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 character';
            // await sleep(500);

            // if(Object.keys(errors).length){
            //     throw errors;
            // }
        }

        

        return errors
    },
    handleSubmit(values, formikBag) {
        console.log(values);
        formikBag.setSubmitting(false);
    },
})(MyForm);