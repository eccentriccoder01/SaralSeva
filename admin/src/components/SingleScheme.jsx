import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleScheme = () => {

    const {id} = useParams();
    const [scheme, setScheme] = useState([]);
    const getScheme = async () => {
        await axios
          .get(`http://localhost:5000/api/v1/schemes/single_scheme/${id}`)
          .then((res) => {
            console.log(res.data);
            setScheme(res.data.scheme);
          });
      };
    
      useEffect(() => {
        getScheme();
      }, []);

     
    
  return (
    <div className="w-full ">
    <h1 className="text-3xl mulish-bold">{scheme.scheme_name}</h1>
    <p className="mt-3 text-gray-500 uppercase">{scheme.scheme_dept}</p>

      <h1 className="mt-10 text-2xl mulish-bold">Details</h1>
      <p className="mt-3 text-gray-500">
        Scheme Code : {scheme.scheme_code}
      </p>
      <p className="mt-5">{scheme.scheme_details}</p>

      <h1 className="mt-10 text-2xl mulish-bold">Benefits</h1>
      <ul>
        {scheme.scheme_benefits?.map((item, index) => {
          return (
            <li key={index} className="mt-3">
              {index + 1}. {item}
            </li>
          );
        })}
      </ul>

      <h1 className="mt-10 text-2xl mulish-bold">Elegibilty</h1>
      <ul>
        {scheme.scheme_eligibility?.map((item, index) => {
          return (
            <li key={index} className="mt-3">
              {index + 1}. {item}
            </li>
          );
        })}
      </ul>

      <h1 className="mt-10 text-2xl mulish-bold">Application Process</h1>
      <p className="mt-3">
        1. Registration on On SaralSeva Portal Link : Register
      </p>
      <p className="mt-3">2. Already have an account: Login</p>
      
      <p className="mt-3">3. Fill in the required details.</p>
   
      <h1 className="mt-10 text-2xl mulish-bold">Documents Required</h1>
      <ul>
        {scheme.scheme_documents_required?.map((item, index) => {
          return (
            <li key={index} className="mt-3">
              {index + 1}. {item}
            </li>
          );
        })}
      </ul>

      <h1 className="mt-10 text-2xl mulish-bold">Sources and References</h1>
      <p className="flex gap-3 mt-3">
        Guidelines{" "}
        <ExternalLink
          className="text-green-900 hover:scale-110"
        //   onClick={handleClick}
        />
      </p>
  </div>
  )
}

export default SingleScheme
