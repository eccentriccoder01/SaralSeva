import React, { useState } from "react";
import { Button } from "./ui/button";
import { CircleX } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const AddScheme = () => {
  const [scheme_name, setScheme_name] = useState("");
  const [scheme_dept, setScheme_dept] = useState("");
  const [scheme_code, setScheme_code] = useState("");
  const [scheme_details, setScheme_details] = useState("");
  const [scheme_eligibility, setScheme_eligibility] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [scheme_benefits, setScheme_benefits] = useState(["", "", "", "", ""]);
  const [scheme_documents_required, setScheme_documents_required] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [pdf, setPdf] = useState([]);

  const handleEligibilityChange = (index, value) => {
    const newEligibility = [...scheme_eligibility];
    newEligibility[index] = value;
    setScheme_eligibility(newEligibility);
  };

  const handleAddEligibility = () => {
    setScheme_eligibility([...scheme_eligibility, ""]);
  };

  const handleRemoveEligibility = (index) => {
    const newEligibility = scheme_eligibility.filter((_, i) => i !== index);
    setScheme_eligibility(newEligibility);
  };

  const handleBenefitsChange = (index, value) => {
    const newBenefits = [...scheme_benefits];
    newBenefits[index] = value;
    setScheme_benefits(newBenefits);
  };

  const handleAddBenefits = () => {
    setScheme_benefits([...scheme_benefits, ""]);
  };

  const handleRemoveBenefits = (index) => {
    const newBenefits = scheme_benefits.filter((_, i) => i !== index);
    setScheme_benefits(newBenefits);
  };

  const handleDocumentRequiredChange = (index, value) => {
    const newDocument = [...scheme_documents_required];
    newDocument[index] = value;
    setScheme_documents_required(newDocument);
  };

  const handleAddDocumentRequired = () => {
    setScheme_documents_required([...scheme_documents_required, ""]);
  };

  const handleRemoveDocumentRequired = (index) => {
    const newDocument = scheme_documents_required.filter((_, i) => i !== index);
    setScheme_documents_required(newDocument);
  };

  const handleDocumentChange = (e) => {
    setPdf([...pdf, e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("scheme_name", scheme_name);
    formData.append("scheme_dept", scheme_dept);
    formData.append("scheme_details", scheme_details);
    scheme_eligibility.forEach((item) =>
      formData.append("scheme_eligibility[]", item)
    );
    scheme_benefits.forEach((item) =>
      formData.append("scheme_benefits[]", item)
    );
    scheme_documents_required.forEach((item) =>
      formData.append("scheme_documents_required[]", item)
    );
    formData.append("pdf", pdf[0]);
    formData.append("scheme_code", scheme_code);

    console.log(
      scheme_name,
      scheme_dept,
      scheme_details,
      scheme_eligibility,
      scheme_documents_required,
      scheme_benefits,
      pdf,
      scheme_code
    );
    // Send formData to your backend
    await axios
      .post("http://localhost:5000/api/v1/schemes/add_scheme", formData)
      .then((res) => {
        toast.success("Scheme Added Successfully");
        setScheme_name("");
        setScheme_dept("");
        setScheme_details("");
        setScheme_eligibility(["", "", "", "", ""]);
        setScheme_benefits(["", "", "", "", ""]);
        setScheme_documents_required(["", "", "", "", ""]);
        setScheme_code("");
        setPdf([]);
        toast(
          <div className='w-full p-4 text-white bg-green-900 rounded-lg'>
            <h1 className="text-md">Scheme added successfully</h1>
          </div>
        );
      });
  };

  return (
    <div className="px-[5vw] lg:px-0 pt-10 lg:pt-0">
      <Toaster />
      <h1 className="mt-5 text-4xl text-center">Add Scheme</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col flex-wrap justify-center gap-5 mx-auto md:flex-col lg:flex-row">
          <div className="w-[100%] md:w-[100%] lg:w-[45%]">
            <h1 className="px-3 py-2 mt-5 font-semibold text-black bg-gray-100">
              Scheme Information
            </h1>
            <div className="flex gap-4 px-3 mt-4">
              <label htmlFor="name" className="w-40">
                Scheme Name
              </label>
              <input
                type="text"
                id="name"
                name="scheme_name"
                value={scheme_name}
                onChange={(e) => setScheme_name(e.target.value)}
                className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
              />
            </div>

            <div className="flex gap-4 px-3 mt-4">
              <label htmlFor="dept" className="w-40">
                Scheme Code
              </label>
              <input
                type="text"
                id="scheme_code"
                className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
                value={scheme_code}
                name="scheme_code"
                onChange={(e) => setScheme_code(e.target.value)}
              />
            </div>
            <div className="flex gap-4 px-3 mt-4">
              <label htmlFor="dept" className="w-40">
                Scheme Department
              </label>
              <select
                name="dept"
                id="scheme_dept"
                value={scheme_dept}
                onChange={(e) => setScheme_dept(e.target.value)}
                className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
              >
                <option value="">Choose Ministry</option>
                <option value="ministry of panchayati raj">
                  Ministry Of Panchayati Raj
                </option>
                <option value="ministry of finance">Ministry Of Finance</option>
                <option value="ministry of agriculture and farmers welfare">
                  Ministry Of Agriculture and Farmers Welfare
                </option>
                <option value="ministry of agriculture and farmers welfare">
                  Ministry Of New and Renewable Energy
                </option>
                <option value="ministry of agriculture and farmers welfare">
                  Ministry Of Social Justice and Empowerment
                </option>
              </select>
            </div>

            <div className="flex gap-2 px-3 mt-5">
              <label htmlFor="details" className="w-44">
                Scheme Details
              </label>
              <textarea
                name="scheme_details"
                id="details"
                value={scheme_details}
                onChange={(e) => setScheme_details(e.target.value)}
                className="w-[100%] border border-gray-500 py-2 rounded-md p-3"
              ></textarea>
            </div>
            <div className="flex gap-4 px-3 mt-4">
              <label htmlFor="brochure" className="w-40">
                Scheme Brochure
              </label>
              <input
                type="file"
                id="brochure"
                onChange={handleDocumentChange}
                className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
              />
            </div>
          </div>

          <div className="w-[100%] md:w-[100%] lg:w-[45%]">
            <h1 className="px-3 py-2 mt-5 font-semibold text-black bg-gray-100">
              Scheme Eligibility
            </h1>
            {scheme_eligibility.map((item, index) => (
              <div className="flex gap-4 px-3 mt-4" key={index}>
                <label htmlFor={`eligibility${index}`} className="w-40">
                  Criteria {index + 1}
                </label>
                <input
                  type="text"
                  id={`eligibility${index}`}
                  value={item}
                  onChange={(e) =>
                    handleEligibilityChange(index, e.target.value)
                  }
                  required
                  className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
                />
                <Button
                  className="text-black bg-transparent hover:bg-white"
                  onClick={() => handleRemoveEligibility(index)}
                >
                  <CircleX className="hover:scale-105" />
                </Button>
              </div>
            ))}
            <button
              className="text-white bg-green-700"
              onClick={handleAddEligibility}
            >
              Add More Criteria
            </button>
          </div>

          <div className="w-[100%] md:w-[100%] lg:w-[45%]">
            <h1 className="px-3 py-2 mt-5 font-semibold text-black bg-gray-100">
              Scheme Benefits
            </h1>
            {scheme_benefits.map((item, index) => (
              <div className="flex gap-4 px-3 mt-4" key={index}>
                <label htmlFor={`benefit${index}`} className="w-40">
                  Benefit {index + 1}
                </label>
                <input
                  type="text"
                  id={`benefit${index}`}
                  value={item}
                  onChange={(e) => handleBenefitsChange(index, e.target.value)}
                  className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
                />
                <button
                  onClick={() => handleRemoveBenefits(index)}
                  className="text-black bg-transparent hover:bg-white"
                >
                  <CircleX className="hover:scale-105" />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddBenefits}
              className="text-white bg-green-700"
            >
              Add More Benefits
            </button>
          </div>

          <div className="w-[100%] md:w-[100%] lg:w-[45%]">
            <h1 className="px-3 py-2 mt-5 font-semibold text-black bg-gray-100">
              Scheme Document Required
            </h1>
            {scheme_documents_required.map((item, index) => (
              <div className="flex gap-4 px-3 mt-4" key={index}>
                <label htmlFor={`document${index}`} className="w-40">
                  Document {index + 1}
                </label>
                <input
                  type="text"
                  id={`document${index}`}
                  value={item}
                  onChange={(e) =>
                    handleDocumentRequiredChange(index, e.target.value)
                  }
                  className="border border-gray-500 w-[100%] py-2 rounded-md p-3"
                />
                <Button
                  onClick={() => handleRemoveDocumentRequired(index)}
                  className="text-black bg-transparent hover:bg-white"
                >
                  <CircleX className="hover:scale-105" />
                </Button>
              </div>
            ))}
            <button
              onClick={handleAddDocumentRequired}
              className="text-white bg-green-700"
            >
              Add More Documents
            </button>
          </div>

          <div className="w-[100%] md:w-[100%] lg:w-[45%] flex justify-center items-center mx-auto mt-10 mb-10">
            <Button
              className="px-10 text-lg uppercase bg-green-900"
              type="submit"
            >
              Add Scheme
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddScheme;
