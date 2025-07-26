import schemeAppliedModel from "../models/schemeAppliedModel.js";
import schemeModel from "../models/schemeModel.js";
import {v2 as cloudinary} from 'cloudinary'


const addSchemeController = async (req, res) => {
    const { scheme_name, scheme_dept, scheme_details, scheme_benefits, scheme_eligibility, scheme_documents_required ,scheme_code} = req.body;
    try {

        if (!req.file) {
          return res.status(400).send('No file uploaded.');
        }
     
        let pdfUrl = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw"
          });

        const newScheme = new schemeModel({
            scheme_name,
            scheme_dept,
            scheme_details,
            scheme_benefits,
            scheme_eligibility: scheme_eligibility || [],
            scheme_benefits: scheme_benefits || [],
            scheme_documents_required : scheme_documents_required || [],
            scheme_brochure:pdfUrl.secure_url,
            scheme_code
        })

        await newScheme.save();

        return (
            res.json({
                success: true,
                message: "Scheme successfully added"
            })
        )
    } catch (error) {
        console.log(error)
        return ({
            success: true,
            message: "Scheme not added something went wrong"
        })
    }
}

//list all schemes
const listSchemeController = async (req, res) => {
    try {
        const products = await schemeModel.find({})
        return res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}


const getSingleSchemeController = async (req, res) => {
    const id = req.params.id;
    try {
        const scheme = await schemeModel.findById(id);
        return res.json({
            success: true,
            scheme
        });
    } catch (error) {
        console.log( error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};


export { addSchemeController ,listSchemeController ,getSingleSchemeController} 





