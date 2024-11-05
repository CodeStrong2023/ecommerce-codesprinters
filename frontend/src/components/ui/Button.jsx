/* eslint-disable react/prop-types */
export const Button = ({ children, onClick, className }) => {
  return (
    <button className={className} onClick={onClick} type="submit">
      {children}
    </button>
  );
};
