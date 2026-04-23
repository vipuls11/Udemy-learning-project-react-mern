import React, { useContext } from 'react'
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import { useState } from 'react';
import Card from '../../shared/components/UIElement/Card';
import './Auth.css';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import SuccessModal from '../../shared/components/UIElement/SuccessModel';


const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, successMessage, sendRequest, clearError,  clearSuccess} = useHttpClient();

const [formState, inputHandler, setFormData] = useForm(
{
  email: {
    value: '',
    isValid: false
    },
  password: {
    value: '',
    isValid: false
  }
},
false
);

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
          useravatar: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );

    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: '',
            isValid: false
          },
          useravatar: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_AUTH_URI}/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
    auth.login(responseData.user?._id, responseData.accessToken);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('username', formState.inputs.username.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('useravatar', formState.inputs.useravatar.value);
        const responseData = await sendRequest(
           `${process.env.REACT_APP_API_AUTH_URI}/register`,
          'POST',
          formData,           
        );
        auth.login(responseData.user?._id, responseData.accessToken);

      } catch (err) {}
    }
  };




  return (
    <React.Fragment>
      {successMessage && <SuccessModal header="Success Message" successMessage={successMessage} onClear={clearSuccess} />} 
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
     
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="username"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="useravatar"
              type="file"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  )
}

export default Auth
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import  API from '../../util/api.js'
// import Card from "../../shared/components/UIElement/Card.jsx";
// import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner.jsx";

// const Auth = () => {
//   console.log(API, "vipul");
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const switchModeHandler = () => {
//     setIsLoginMode((prev) => !prev);
//   };

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       useravatar: null,
//     },

//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email").required("Required"),
//       password: Yup.string()
//         .min(6, "Minimum 6 characters")
//         .required("Required"),
//       username: !isLoginMode
//         ? Yup.string().required("Name required")
//         : Yup.string(),
//     }),

//     onSubmit: async (values) => {
//       setLoading(true);
//       setError(null);

//       try {
//         if (isLoginMode) {
//           // LOGIN
//           const res = await API.post("/login", {
//             email: values.email,
//             password: values.password,
//           });

//           console.log("Login Success:", res.data);
//         } else {
//           // SIGNUP
//           const formData = new FormData();
//           formData.append("username", values.username);
//           formData.append("email", values.email);
//           formData.append("password", values.password);
//           formData.append("useravatar", values.useravatar);
// console.log(API, "vipul")
//           const res = await API.post("/register", formData);

//           console.log("Signup Success:", res.data);
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || "Something went wrong");
//       }

//       setLoading(false);
//     },
//   });

//   return (
//      <Card className="authentication">
//     <div>
//       <h2>{isLoginMode ? "Login Required" : "Signup"}</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <LoadingSpinner asOverlay />}

//       <form onSubmit={formik.handleSubmit}>
//         {/* NAME */}
//         {!isLoginMode && (
//           <>
//             <input
//               type="text"
//               name="username"
//               placeholder="Your Name"
//               onChange={formik.handleChange}
//               value={formik.values.username}
//             />
//             {formik.errors.username && <p>{formik.errors.username}</p>}
//           </>
//         )}

//         {/* IMAGE */}
//         {!isLoginMode && (
//           <input
//             type="file"
//             onChange={(event) => {
//               formik.setFieldValue("useravatar", event.currentTarget.files[0]);
//             }}
//           />
//         )}

//         {/* EMAIL */}
//         <input
//           type="email"
//           name="email"
//           placeholder="E-Mail"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />
//         {formik.touched.email && formik.errors.email && (
//           <p>{formik.errors.email}</p>
//         )}

//         {/* PASSWORD */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//         />
//         {formik.errors.password && <p>{formik.errors.password}</p>}

//         <button type="submit" disabled={!formik.isValid}>
//           {isLoginMode ? "LOGIN" : "SIGNUP"}
//         </button>
//       </form>

//       <button onClick={switchModeHandler} style={{ marginTop: "10px" }}>
//         SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
//       </button>
//     </div>
// </Card>
//   );
// };

// export default Auth;