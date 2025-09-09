
const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const { DataTypes } = require('sequelize');

const shravani_allcolumns = sequelize.define("shravani_allcolumns", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    },
    aadhaar_number: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'aadhaar_number',
    },
    candidateName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Candidate_name',
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'gender',
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'dob',
    },
    alternateMobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'alternate_mobile_number',
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'whatsapp_number',
    },
    parentMobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'parent_mobile_number',
    },
    maritalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'marital_status',
    },
    religion: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'religion',
    },
    casteCategory: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'CasteCategory',
    },
    subCaste: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'SubCaste',
    },
    doYouHaveCasteCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_caste_certificate',
    },
    casteCertificateNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'caste_certificate_number',
    },
    casteIssuedDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'caste_issued_district',
    },
    casteApplicantName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'caste_applicantName',
    },
    casteIssAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'caste_Iss_Authority',
    },
    casteDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'caste_doc',
    },
    casteIssuedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'caste_issued_date',
    },
    annualFamilyIncome: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'annual_family_income',
    },
    doYouHaveIncomeCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_income_certificate',
    },
    incomeCertNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'income_cert_no',
    },
    incomeIssAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'income_Iss_Authority',
    },
    incomeDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'income_doc',
    },
    incomeIssuedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'income_issued_date',
    },
    doYouHaveDomicileMaharashtraKarnataka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_Domicile_maharashtra_karnataka',
    },
    doYouHaveDomicileCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_domicile_certificate',
    },
    domicileRelationType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'domicile_relation_type',
    },
    domicileCertNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'domicilecertnumber',
    },
    domicileApplicantName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'domicile_applicant_name',
    },
    domicileIssuedAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'domicile_issued_authority',
    },
    domicileDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'domicile_doc',
    },
    domicileIssuedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'domicile_issued_date',
    },
    doYouHaveDisability: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_disability',
    },
    disabilityType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'disability_type',
    },
    disabilityName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'disability_name',
    },
    doYouHaveDisabilityCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_disability_certificate',
    },
    disabilityCertificateNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'disability_certificate_no',
    },
    disabilityPercentage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'disability_percentage',
    },
    disabilityIssuedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'disability_issued_date',
    },
    disabilityIssuingAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'disability_issuing_authority',
    },
    disabilityDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'disabilty_doc',
    },
    bankAccName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'bankacc_name',
    },
    bankIfsc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'bank_ifsc',
    },
    permanentVillage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'permanent_village',
    },
    correpoAddressSameAsPermanentAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Correspo_Address_same_as_permanent_address',
    },
    correspondanceDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'correspondance_district',
    },
    correspondanceTaluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'correspondance_taluka',
    },
    correspondanceAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'correspondance_address',
    },
    correspondanceState: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'correspondance_state',
    },
    correspondanceVillage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'correspondance_village',
    },
    correspondancePincode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'correspondance_pincode',
    },
    isFatherAlive: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_father_alive',
    },
    fatherName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Fathername',
    },
    fatherOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'father_Occupation',
    },
    fatherSalaried: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'father_salaried',
    },
    motherAlive: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mother_alive',
    },
    motherName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Mothername',
    },
    motherOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mother_Occupation',
    },
    isMotherSalaried: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_mother_salaried',
    },
    guardianName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Guardianname',
    },
    guardianAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Guardianaddress',
    },
    guardianOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'GuardianOcuupation',
    },
    isGuardianSalaried: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_Guardiansallaried',
    },
    guardianRelationType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'guardian_Relationtype',
    },
    guardianCertificateDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'guardian_certificate_doc',
    },
    admissionYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_year',
    },
    instituteState: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_state',
    },
    instituteDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_district',
    },
    instituteTaluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_taluka',
    },
    qualificationLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'qualification_level',
    },
    courseStream: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'course_stream',
    },
    instituteName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_name',
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'coursename',
    },
    admissionType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'AdmissionType',
    },
    cetPercentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'CET_Percentage',
    },
    admissionApplicationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_application_id',
    },
    admissionLetterDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_letter_doc',
    },
    currentYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'current_year',
    },
    isCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_completed_pursuing',
    },
    admissionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'admission_date',
    },
    feesPaid: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'fees_paid',
    },
    feeReceiptDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'fee_reciept_doc',
    },
    admissionCategory: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_category',
    },
    modeStudy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mode_study',
    },
    class10Qualification: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_qualification',
    },
    class10Stream: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_stream',
    },
    class10State: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_state',
    },
    class10District: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_district',
    },
    class10Taluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_taluka',
    },
    class10Course: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_course',
    },
    class10Board: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_board',
    },
    class10Mode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_mode',
    },
    class10AdmissionYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_admission_year',
    },
    class10PassingYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_passing_year',
    },
    class10Result: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_result',
    },
    class10Percentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'class10_percentage',
    },
    class10Attempt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'class10_attempt',
    },
    class10Doc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_doc',
    },
    class10SeatNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_seatnumber',
    },
    class10MonthOfExam: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class10_monthofexam',
    },
    class10MarksObtained: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'class10_marks_obtained',
    },
    class12QualificationLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_qualification_level',
    },
    class12Stream: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_stream',
    },
    class12InstituteState: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_institute_state',
    },
    class12InstituteDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_institute_district',
    },
    class12Taluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_taluka',
    },
    class12CollegeName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_college_name',
    },
    class12Course: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_course',
    },
    class12Board: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_board',
    },
    class12SeatNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_seatnumber',
    },
    class12Mode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_mode',
    },
    class12AdmissionYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_admission_year',
    },
    class12PassingYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_passing_year',
    },
    class12Result: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_result',
    },
    class12Percentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'class12_percentage',
    },
    class12Attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'class12_attempts',
    },
    class12Doc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class12_doc',
    },
    doYouHaveGap: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'do_you_have_gap',
    },
    gapYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'gap_year',
    },
    gapDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'gap_doc',
    },
    areYouHostellerDayScholar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'are_you_hosteller_day_scholar',
    },
    hostelState: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_state',
    },
    hostelDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_district',
    },
    hostelTaluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_taluka',
    },
    hostelType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_type',
    },
    hostelName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_name',
    },
    hostelAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_address',
    },
    hostelPincode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_pincode',
    },
    hostelAdmissionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'hostel_admission_date',
    },
    hostelDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostel_doc',
    },
    candidateEligible: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'candidate_eligible',
    },
    applicationSubmissionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'application_submission_date',
    },
    applicationFailedReason: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'application_failed_reason',
    },
    applicationStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'application_status',
    },
    eligibleScheme1: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'eligible_scheme_1',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'email',
    },
    mahabdtUsername: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mahadbt_username',
    },
    mahabdtPassword: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mahadbt_password',
    },
    refCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ref_code',
    },
    prevQualificationLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'prev_qualification_level',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'createdAt',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updatedAt',
    },
    messAvailable: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Mess_Available',
    },
    rentPerMonth: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'Rent_Per_Month',
    },
    firstSchemaName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'First_Schema_Name',
    },
    secondSchemaName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Second_Schema_Name',
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Department_name',
    },
    schemaNamee: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Schema_Namee',
    },
    renewalApplication: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Renewal_Application',
    },

    beneficiaryInFamily: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'beneficiary_in_family',
    },
    undertakingNotMoreThanTwoBeneficiary: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'undertaking_Not_more_than_two_beneficiary',
    },

    registeredLabour: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Registered_labour',
    },
    registeredLabourDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Registered_labour_Doc',
    },
    alpaBhuDharakShetkari: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Alpa_bhu_dharak_Shetkari',
    },
    alpaBhuDharakShetkariDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Alpa_bhu_dharak_Shetkari_Doc',
    },
    declarationRectorSuperintendent: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'declaration_Rector_Superintendent',
    },
    nonCreamyDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Non_creamy_Layer_doc',
    },

    leavingCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Leaving_Certificate',
    },
    rationCard: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Ration_card',
    },
    castValidityCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Cast_Validity_Certificate',
    },
    capAllotmentLetter: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'CAP_Allotment_Letter',
    },
    hash_password: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hash_password',
    },

    currentScheme1: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'current_scheme1',
    },
    currentScheme2: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'current_scheme2',
    },
    currentDept1: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'current_dept1',
    },
    currentDept2: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'current_dept2',
    },
    dependentType: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'dependent_type',
},
    incomeCertHasBarcode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'income_cert_has_barcode',
},
    domicileCertHasBarcode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'domicile_has_barcode',
},

    casteCertHasBarcode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'caste_has_barcode',
},
   
}, {
    tableName: 'shravani_allcolumns',
    timestamps: false,
});

module.exports = shravani_allcolumns;
