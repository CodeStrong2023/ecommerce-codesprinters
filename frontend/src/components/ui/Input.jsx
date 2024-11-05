/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
export const Input = forwardRef(
  ({ label, type, placeholder, ...rest }, ref) => {
    return (
      <div className="my-6 mx-4">
        <label htmlFor={label} className="block text-xl text-[#128546]">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={label}
          className="input-login"
          placeholder={placeholder}
          {...rest} // Spread the rest of the props here
        />
      </div>
    );
  }
);
