// import { useState } from 'react';

// export function useCreate() {
//   const [values, setValues] = useState();
//   const [submittedData, setSubmittedData] = useState([]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setSubmittedData([...submittedData, values]);
//     setValues();
//   };

//   return {
//     values,
//     handleChange,
//     handleSubmit,
//     submittedData,
//   };
// }
