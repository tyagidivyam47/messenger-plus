import { Form, Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import * as Yup from "yup";
// import TextField from "../../components/TextField";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  // console.log(auth.currentUser)


  const navigate = useNavigate();

  // console.log(data.name);

  const dataChangeHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    // e.preventDefault();
    await setData({ ...data, loading: true });


    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // console.log(result.user);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
    } catch (error) {
      setData({ ...data, error: error.message });
    }

    setData({
      name: "",
      email: "",
      password: "",
      // error: null,
      loading: false,
    });

    navigate("/");
  };

  const validate = Yup.object({
    email: Yup.string()
      .email("Enter a correct email")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be minimum 6 characters")
      .required("Password is Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="mx-60 space-y-9">
      <h1 className="text-3xl font-bold text-center text-orange-600">Login with Email and Password</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={onSubmitHandler}
      >
        {(formik) => (
          <div className="bg-orange-400 rounded-lg">
            <Form>
              <TextField
                label="Email"
                name="email"
                value={data.email}
                type="text"
                onInputChange={dataChangeHandler}
              />
              <TextField
                label="Password"
                name="password"
                value={data.password}
                type="password"
                onInputChange={dataChangeHandler}
              />
              <button
                type="submit"
                className="ml-52 rounded-md text-white p-2 mb-3 items-center bg-orange-700 hover:bg-orange-600"
              >
                {data.loading && <p>Logging In...</p>}
                {!data.loading && <p>Login</p>}
              </button>

              <div className="text-center">
                {data.loading && <LoadingSpinner />}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
