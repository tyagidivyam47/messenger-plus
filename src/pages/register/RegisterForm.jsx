import { Form, Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "../../components/TextField";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  // console.log(data.name);

  const dataChangeHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    // e.preventDefault();
    setData({ ...data, loading: true });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // console.log(result.user);

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        createdAt: Timestamp.fromDate(new Date()),
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
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Enter a correct email")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be minimum 6 characters")
      .required("Password is Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <div className="mx-60 space-y-9">
      <h1 className="text-3xl font-bold text-center text-orange-600">
        REGISTER
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={onSubmitHandler}
      >
        {(formik) => (
          <div className="bg-orange-400 rounded-lg">
            <Form>
              <TextField
                label="Name"
                name="name"
                value={data.name}
                type="text"
                onInputChange={dataChangeHandler}
              />
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
                {data.loading && <p>Registering...</p>}
                {!data.loading && <p>Register</p>}
                {/* Register */}
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

export default RegisterForm;
