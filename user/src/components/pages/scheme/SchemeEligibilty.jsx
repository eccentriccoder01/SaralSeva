import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import find from "./../../../assets/find.svg";
import { Button } from "@/components/ui/button";

const SchemeEligibility = () => {
  return (
    <div className="px-[5vw] lg:px-[10vw] py-12 bg-orange-50/30 dark:bg-gray-900/30">
      <div className="flex flex-col lg:flex-row items-center gap-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/40">
        <div className="lg:w-1/2">
          <img src={find} alt="Find your perfect scheme" className="w-full max-w-md mx-auto"/>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold text-orange-900 dark:text-amber-400 jost">Did you find your perfect scheme?</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Find the right scheme that aligns with your needs. Whether it's for financial assistance, welfare, or development, explore options designed to support your goals. If you meet the required criteria, you can proceed to check your eligibility and start your application.
          </p>
          <Button className="text-white font-bold bg-gradient-to-r from-orange-600 to-amber-600 w-[200px] py-6 rounded-lg text-lg mt-8 shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all">
            Check Eligibility
          </Button>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-4xl font-extrabold text-center text-orange-900 dark:text-amber-400 jost">Scheme Eligibility Criteria</h2>
        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-black/40 hover:shadow-lg transition-shadow" value="item-1">
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-stone-800 dark:text-gray-200 hover:no-underline">Pradhan Mantri Awas Yojana</AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <p>1. Families without a house or with up to two rooms with kutcha walls and roof.</p>
                <p>2. Households with no literate adult above 25 years of age.</p>
                <p>3. Households with no adult member aged between 16 and 60 years.</p>
                <p>4. Families with a disabled member and no other able-bodied adult.</p>
                <p>5. Landless candidates earning income through casual labour.</p>
                <p>6. Applicants belonging to SC, ST, and Minority categories.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-black/40 hover:shadow-lg transition-shadow" value="item-2">
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-stone-800 dark:text-gray-200 hover:no-underline">Mudra Yojana</AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <p>1. Any Indian Citizen who has a business plan for a non-farm sector income-generating activity.</p>
                <p>2. Activities such as manufacturing, processing, trading or service sector are eligible.</p>
                <p>3. The credit requirement should be less than 10 lakh.</p>
                <p>4. The borrower should not be a defaulter to any bank or financial institution.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-black/40 hover:shadow-lg transition-shadow" value="item-3">
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-stone-800 dark:text-gray-200 hover:no-underline">Mahila Samriddhi Yojana</AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <p>1. The applicant must be a woman entrepreneur.</p>
                <p>2. The applicant must belong to the backward classes category.</p>
                <p>3. The age of the applicant should be between 18 and 50 years.</p>
                <p>4. The annual family income of the applicant should not exceed Rs. 3 lakh.</p>
                <p>5. The applicant must be a member of a Self-Help Group (SHG).</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SchemeEligibility;
