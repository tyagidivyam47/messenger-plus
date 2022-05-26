import { ErrorMessage, useField } from "formik";
import React, { useState } from "react";

const TextField = ({ label, onInputChange, ...props }) => {
  
  const [field, meta] = useField(props);
    // console.log(field);
  const inputChangeHandler = (e) => {
    onInputChange(e.target.name, e.target.value);
    // console.log(e.target.name, ",", e.target.value);
  };

  return (
    <div className="flex flex-col my-4">
      <div className="text-left ml-52 text-lg font-semibold text-white">
        <label htmlFor={field.name}>{label}</label>
      </div>

      <div className="">
        <div className="items-center mx-52">
          <input
            onKeyUp={field.onChange}
            onChange={inputChangeHandler}
            autoComplete="off"
            onBlur={field.onBlur}
            className={`w-full rounded-md border-4 focus:border-orange-400 ${
              meta.error && meta.touched && "border-solid border-red-500"
            }`}
            id={field.name}
            {...props}
            // {...field}
          />
        </div>
        <div className="text-center text-red-900 font-semibold">
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </div>
  );
};

export default TextField;
