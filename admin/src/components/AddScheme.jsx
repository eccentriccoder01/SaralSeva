import React, { useState } from "react";
import { Button } from "./ui/button";
import { CircleX, PlusCircle } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const AddScheme = () => {
  const [scheme_name, setScheme_name] = useState("");
  const [scheme_dept, setScheme_dept] = useState("");
  const [scheme_code, setScheme_code] = useState("");
  const [scheme_details, setScheme_details] = useState("");
  const [scheme_eligibility, setScheme_eligibility] = useState([""]);
  const [scheme_benefits, setScheme_benefits] = useState([""]);
  const [scheme_documents_required, setScheme_documents_required] = useState([""]);
  const [pdf, setPdf] = useState(null);

  const handleDynamicChange = (setter, index, value) => setter(prev => prev.map((item, i) => i === index ? value : item));
  const handleDynamicAdd = (setter) => setter(prev => [...prev, ""]);
  const handleDynamicRemove = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("scheme_name", scheme_name);
    formData.append("scheme_dept", scheme_dept);
    formData.append("scheme_details", scheme_details);
    scheme_eligibility.forEach(item => formData.append("scheme_eligibility[]", item));
    scheme_benefits.forEach(item => formData.append("scheme_benefits[]", item));
    scheme_documents_required.forEach(item => formData.append("scheme_documents_required[]", item));
    formData.append("pdf", pdf);
    formData.append("scheme_code", scheme_code);

    try {
        await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/add_scheme", formData);
        toast.success("Scheme Added Successfully");
        // Reset form fields
        setScheme_name(""); setScheme_dept(""); setScheme_details("");
        setScheme_eligibility([""]); setScheme_benefits([""]); setScheme_documents_required([""]);
        setScheme_code(""); setPdf(null); e.target.reset();
    } catch (error) {
        toast.error("Failed to add scheme.");
    }
  };
  
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <Toaster position="top-center" richColors />
      <h1 className="text-3xl font-bold text-center text-orange-900 jost">Add New Scheme</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
                <h2 className="p-3 font-semibold text-orange-900 bg-amber-100 rounded-lg">Scheme Information</h2>
                <div><label className="font-medium">Scheme Name</label><input type="text" value={scheme_name} onChange={(e) => setScheme_name(e.target.value)} className={inputClasses} required /></div>
                <div><label className="font-medium">Scheme Code</label><input type="text" value={scheme_code} onChange={(e) => setScheme_code(e.target.value)} className={inputClasses} required /></div>
                <div><label className="font-medium">Scheme Department</label>
                    <select value={scheme_dept} onChange={(e) => setScheme_dept(e.target.value)} className={inputClasses} required>
                        <option value="">Choose Ministry</option>
                        <option value="Ministry Of Panchayati Raj">Ministry Of Panchayati Raj</option>
                        <option value="Ministry Of Finance">Ministry Of Finance</option>
                        <option value="Ministry Of Agriculture and Farmers Welfare">Ministry Of Agriculture and Farmers Welfare</option>
                    </select>
                </div>
                <div><label className="font-medium">Scheme Details</label><textarea value={scheme_details} onChange={(e) => setScheme_details(e.target.value)} className={inputClasses} rows={4} required></textarea></div>
                <div><label className="font-medium">Scheme Brochure (PDF)</label><input type="file" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} className={inputClasses} required /></div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
                <div>
                    <h2 className="p-3 font-semibold text-orange-900 bg-amber-100 rounded-lg">Scheme Eligibility</h2>
                    {scheme_eligibility.map((item, index) => (
                        <div className="flex gap-2 mt-2 items-center" key={index}>
                            <input type="text" placeholder={`Criteria ${index + 1}`} value={item} onChange={(e) => handleDynamicChange(setScheme_eligibility, index, e.target.value)} className={inputClasses} required />
                            <Button type="button" variant="ghost" size="icon" onClick={() => handleDynamicRemove(setScheme_eligibility, index)}><CircleX className="text-red-500" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="mt-2 gap-2" onClick={() => handleDynamicAdd(setScheme_eligibility)}><PlusCircle size={16} /> Add Criteria</Button>
                </div>
                <div>
                    <h2 className="p-3 font-semibold text-orange-900 bg-amber-100 rounded-lg">Scheme Benefits</h2>
                    {scheme_benefits.map((item, index) => (
                         <div className="flex gap-2 mt-2 items-center" key={index}>
                            <input type="text" placeholder={`Benefit ${index + 1}`} value={item} onChange={(e) => handleDynamicChange(setScheme_benefits, index, e.target.value)} className={inputClasses} required />
                            <Button type="button" variant="ghost" size="icon" onClick={() => handleDynamicRemove(setScheme_benefits, index)}><CircleX className="text-red-500" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="mt-2 gap-2" onClick={() => handleDynamicAdd(setScheme_benefits)}><PlusCircle size={16} /> Add Benefit</Button>
                </div>
                 <div>
                    <h2 className="p-3 font-semibold text-orange-900 bg-amber-100 rounded-lg">Documents Required</h2>
                    {scheme_documents_required.map((item, index) => (
                         <div className="flex gap-2 mt-2 items-center" key={index}>
                            <input type="text" placeholder={`Document ${index + 1}`} value={item} onChange={(e) => handleDynamicChange(setScheme_documents_required, index, e.target.value)} className={inputClasses} required />
                            <Button type="button" variant="ghost" size="icon" onClick={() => handleDynamicRemove(setScheme_documents_required, index)}><CircleX className="text-red-500" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="mt-2 gap-2" onClick={() => handleDynamicAdd(setScheme_documents_required)}><PlusCircle size={16} /> Add Document</Button>
                </div>
            </div>
        </div>
        <div className="flex justify-center mt-10">
            <Button className="px-12 py-6 text-lg font-bold text-white uppercase bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-lg" type="submit">Add Scheme</Button>
        </div>
      </form>
    </div>
  );
};

export default AddScheme;