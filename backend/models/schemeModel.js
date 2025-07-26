import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  scheme_name: {
    type: String,
    required: true
  },
  scheme_dept: {
    type: String,
    required: true
  },
  scheme_code: {
    type: String,
    required: true
  },
  scheme_details: {
    type: String,
    required: true
  },
  scheme_benefits: {
    type: Array,
    required: true
  },
  scheme_eligibility: {
    type: Array,
    required: true
  },
  scheme_documents_required: {
    type: Array,
    required: true
  },
  scheme_brochure: {
    type: String,
    required: true
  },

},
  {
    timestamps: true
  });

const schemeModel = mongoose.model("scheme", schemeSchema);

export default schemeModel;
