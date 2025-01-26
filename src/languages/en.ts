import { GENDER } from '~/shared/constants/gender'
import { MARITAL_STATUS } from '~/shared/constants/marital-status'

const EN = {
  general: 'General',
  contact: 'Contact',
  family: 'Family',
  emergencyContact: 'Emergency Contact',
  vehicle: 'Vehicle',
  social: 'Social',
  idCard: 'ID Card',
  issuedPlace: 'Issued Place',
  issuedDate: 'Issued Date',
  expiredDate: 'Expired Date',
  workProfile: 'Work Profile',
  projectAllocation: 'Project Allocation',
  'My Profile': 'My Profile',
  'Appraisal Management': 'Appraisal Management',
  'Template Management': 'Template Management',
  'Employee Lifecycle': 'Employee Lifecycle',
  'Leave Information Board': 'Leave Information Board',
  'Request Management': 'Request Management',
  active: 'Active',
  close: 'Close',
  closed: 'Closed',
  jobTitle: 'Job Title',
  companyLevel: 'Company Level',
  editUserInfo: {
    editGeneral: 'Edit General',
    editIDCard: 'Edit ID Card',
    editContact: 'Edit Contact',
    editAddress: 'Edit Address',
    thisFieldIsRequired: 'This field is required.',
    enterYourPlaceOfBirth: 'Enter your place of birth',
    selectYourGender: 'Select your gender',
    selectYourRelationship: 'Select relationship',
    selectYourMaritalStatus: 'Select your marital status'
  },
  pleaseEnterValidDate: 'Please enter a valid date.',
  editCardModal: {
    noIDCardNumberProvided: 'No ID card number provided.',
    enterIDCardNumber: 'Enter ID card number',
    idCardIsNotValid: 'ID Card is not valid.',
    enterIssuePlace: 'Enter Issued Place',
    noIssuePlaceProvided: 'No issue place provided.'
  },
  organizationInfo: {
    viewOrgChart: 'View org chart'
  },
  department: 'Department',
  division: 'Division',
  lineManager: 'Line Manager',
  projectRole: 'Project Role',
  projectName: 'Project Name',
  errorAlert: {
    Success: 'Success',
    Failed: 'Failed',
    Info: 'Info',
    Warning: 'Warning'
  },
  infoParams: {
    fullName: 'Full Name',
    dob: 'Date of Birth',
    birthday: 'Birthday',
    placeOfBirth: 'Place of Birth',
    maritalStatus: 'Marital Status',
    gender: 'Gender',
    phone: 'Mobile Number',
    personalEmail: 'Personal Email',
    address: 'Address',
    relationship: 'Relationship',
    skypeId: 'Skype ID',
    website: 'Website',
    linkedIn: 'LinkedIn',
    bikeNumber: 'Bike Number',
    bikeColor: 'Bike Color',
    bikeBrand: 'Bike Brand',
    expiredDate: 'Expired Date',
    issuePlace: 'Issued Place',
    currentAddress: 'Current Address',
    permanentAddress: 'Permanent Address'
  },
  orgParams: {
    staffCard: 'Staff Card',
    projectGroup: 'Project',
    projectManager: 'Project Manager',
    staffId: 'Staff Id'
  },
  taxParams: {
    taxId: 'PIT Code',
    numberOfDependents: 'Number of Dependents',
    dependentName: 'Dependents {{index}}'
  },
  tax: 'Personal Income Tax',
  insurance: 'Insurance Info',
  insuranceParams: {
    socialNumber: 'Social Insurance Number',
    socialRegisteredNumber: 'Registration Phone Number',
    healthRegistrationPlace: 'Health Registration Place'
  },
  employeeName: 'Employee Name',
  newEmployeeProfile: 'New Employee',
  enterEmployeeFullName: "Enter employee's full name",
  onboardingEmployeeManagement: {
    level: 'Level',
    onboardingTasks: 'Onboarding Tasks',
    pendingTasksFrom: 'Pending Tasks from',
    onboardingEmployee: 'Onboarding Employee',
    action: 'Action'
  },
  leaveManagement: 'Leave Management',
  employeeInfoPage: {
    onboarding: 'Onboarding',
    personalDetails: 'Personal Details',
    documents: 'Documents',
    organizationInfo: 'Organization Info',
    compensationAndBenefits: 'Compensation & Benefits',
    leaveRequest: 'Leave Request',
    performanceAppraisals: 'Performance Appraisals',
    competencyAssessment: 'Competency Assessment',
    myProfile: 'My Profile',
    employeeLifecycle: 'Employee Lifecycle',
    leaveInformationBoard: 'Leave Information Board',
    requestManagement: 'Request Management',
    templateManagement: 'Template Management',
    competencyManagement: 'Competency Management',
    appraisalManagement: 'Appraisal Management'
  },
  employeeManagement: {
    phoneNumber: 'Phone Number',
    filter: 'Filter'
  },
  contract: 'Contract Information',
  contractType: 'Contract Type',

  contractParams: {
    contractNo: 'Contract Number',
    startDate: 'Start Date',
    endDate: 'End Date',
    jobTitle: 'Job Title in Contract'
  },

  companyBank: 'Company Bank Info',
  personalBank: 'Personal Bank Info',
  bankParams: {
    name: 'Bank Name',
    accountHolder: 'Bank Account Holder',
    accountNumber: 'Bank Account Number'
  },

  employeeHealthcare: 'Employee Healthcare Program',
  dependentHealthcare: 'Relative Healthcare Program',

  healthcareParams: {
    nameOfBeneficiary: 'Name of Beneficiary',
    birthDay: 'Date of Birth',
    citizenCard: 'Citizen ID Card Number',
    provider: 'Healthcare Provider',
    startDate: 'Start Date',
    endDate: 'End Date'
  },

  companyEmail: 'Company Email',
  status: 'Status',
  joinDate: 'Join Date',
  employeeProfile: 'Employee Profile',
  marital: {
    [MARITAL_STATUS.SINGLE]: 'Single',
    [MARITAL_STATUS.MARRIED]: 'Married',
    [MARITAL_STATUS.DIVORCED]: 'Divorced',
    [MARITAL_STATUS.WIDOWED]: 'Widowed',
    [MARITAL_STATUS.SEPARATED]: 'Separated'
  },

  gender: {
    [GENDER.MALE]: 'Male',
    [GENDER.FEMALE]: 'Female',
    [GENDER.OTHER]: 'Other',
    [GENDER.PREFER_NOT_TO_MENTION]: 'Prefer not to mention'
  },
  estatus: {
    applicants: 'Applicants',
    candidate: 'Candidate',
    probation: 'Probation',
    employee: 'Employee',
    alumni: 'Alumni'
  },
  noImageToShow: 'No image to show',
  numberOfProjects: 'Number of project',
  organizationalChart: 'Role & Responsibility',
  numberOfRelatives: 'Number of relative • {{ val }}',
  numberOfContacts: 'Number of contact • {{ val }}',
  searchEmployeePlaceholder: 'Search by name or staff ID',
  searchOnboardingEmployeePlaceholder: 'Search by name',
  noEmployeesMatchYourSearch: 'No employees match your search.',
  tryAnotherKeyword: 'Try another keyword.',
  noEmployeesMatchYourFilterCriteria: 'No employees match your filter criteria.',
  tryAdjustingYourFiltersOrUsingTheSearchFeature: 'Try adjusting your filters or using the search feature.',
  noEmployeesFound: 'No employees have been added yet.',
  noEmployeeOnboard: 'No new employees are currently being onboarded.',
  noCompetencyAssessment: 'You have no competency assessments to view.',
  noPastCompetencyAssessment: 'You have no past competency assessment to view.',
  noLeaveRequestFound: 'You have no leave request submissions yet.',
  noPerformanceAppraisal: 'You have no performance appraisal to assess.',
  noPerformanceAppraisalEvaluated: 'You have no performance appraisal to evaluate or the current appraisal ended.',
  noPastAppraisalSubmitted: 'There are no performance appraisal ended.',
  noPastAppraisalEvaluated: 'There are no performance appraisal evaluated.',
  noCompetencyAssessmentToAssess: 'You have no competency assessment to assess.',
  expiredDateMustBeGreaterThanIssuedDate: 'Expired date must be greater than the Issued date.',
  noReview360: 'No 360° reviews available. Create a review to get started.',

  common: {
    discard: 'Discard',
    close: 'Close',
    requiredInfo: 'This information is required.',
    submit: 'Submit',
    reSubmit: 'Resubmit',
    finalize: 'Finalize',
    save: 'Save',
    cancel: 'Cancel',
    create: 'Create',
    saved: 'Saved',
    saving: 'Saving',
    edit: 'Edit',
    cancelRequest: 'Cancel request',
    approve: 'Approve',
    rejectRequest: 'Reject request',
    confirmRejection: 'Confirm rejection',
    discardRejection: 'Discard rejection',
    seftRating: 'Self Rating',
    managerRating: 'Manager Rating',
    resubmitSelfEvaluation: 'Resubmit self-evaluation',
    submitSelfEvaluation: 'Submit self-evaluation',
    guideline: 'Guideline',
    submittedDate: 'Submitted Date'
  },
  leavePage: {
    requestLeave: 'New request',
    leaveBalance: 'Leave Balance',
    unpaidLeave: 'Unpaid Leave',
    advanceLeave: 'Advance Leave',
    annual: 'Annual',
    remaining: 'Remaining from {{year}}',
    loyalty: 'Loyalty',
    pendingDeduction: 'Pending Deduction'
  },
  leaveInformationRecordTable: {
    leaveInformationInYear: 'Leave Information in {{year}}',
    supportFinalSettlement: 'Supporting Final Settlement',
    summaryLeaveInformation: 'Summary Leave Information After Final Settlement',
    employeeInformation: 'Employee Information',
    leaveTakenperMonthsInYear: 'Leave Taken per Months in {{year}}',
    afterFinalSettlement: 'After Final Settlement',
    colName: 'Name',
    totalLeaveTakenCol: 'Total Leave Taken',
    totalUnpaidLeaveTakenCol: 'Total Unpaid Leave Taken',
    advanceLeaveCol: 'Advance Leave from {{year}} to Q1 {{year}}',
    leaveBalanceCol: 'Leave Balance in {{year}}',
    maxLeaveTransferCol: 'Max. Leaves Transferred to Q1 {{year}}',
    actualAnnualLeaveCol: 'Actual Annual Leave in Q1 {{year}}',
    loyaltyLeaveCol: 'Loyalty Leave',
    temporaryLeaveBalanceCol: 'Temporary Leave Balance on March 31',
    annualLeaveCol: 'Annual Leave',
    temporarilyCalculatedMessage: 'Temporarily calculated for leave balance in Final settlement {{date}}'
  },
  month: {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec'
  },
  buttonTitle: {
    'New Leave Request': 'New Leave Request',
    'View org chart': 'View org chart',
    'New request': 'New request',
    'New Employee': 'New Employee',
    Archive: 'Archive',
    Complete: 'Complete',
    Approve: 'Approve',
    'Reject request': 'Reject request',
    Publish: 'Publish'
  },
  requestManagement: {
    'to Review': 'To Review',
    Done: 'Done',
    'Past Live': 'Past Leave',
    endTo: 'To',
    day: 'day',
    days: 'day',
    status: {
      'In-review': 'In-review',
      Approved: 'Approved',
      Rejected: 'Rejected',
      Taken: 'Taken',
      Canceled: 'Canceled',
      'On Leave': 'On Leave',
      Closed: 'Closed',
      'Pending rejection': 'Pending rejection',
      Evaluated: 'Evaluated',
      Published: 'Published',
      'Not-submitted': 'Not-submitted',
      Submitted: 'Submitted',
      Draft: 'Draft',
      Active: 'Active',
      Missed: 'Missed'
    },
    'Approval requests': 'Approval requests',
    'Rejected/Pending Rejection requests': 'Rejected/Pending Rejection requests'
  },
  today: 'Today',
  leaveRequestModal: {
    title: 'New Leave Request',
    leaveBalance: 'Leave Balance',
    discardBtn: 'Discard',
    submitBtn: 'Submit',
    leaveCategory: 'Leave Category',
    beneficiaryEntity: 'Beneficiary',
    helperText: 'This information is required.',
    duration: 'Duration',
    durationDefault: '1 day',
    pendingWorkLoad: 'Pending Workload',
    notes: 'Notes',
    optional: '(Optional)',
    handleOverWork: 'Leave your handover work here',
    reasonMessage: 'Leave your reason or message here',
    date: 'Date',
    time: 'Time',
    startFrom: 'From',
    endTo: 'To'
  },
  leaveReason: {
    Annual: 'Annual',
    'Sickness/Accident': 'Sickness/Accident',
    Maternity: 'Maternity',
    Wedding: 'Wedding',
    Funeral: 'Funeral',
    Unpaid: 'Unpaid',
    Husband: 'Husband',
    Wife: 'Wife',
    Myself: 'Myself',
    Children: 'Children',
    Parent: 'Parent',
    Sibling: 'Sibling',
    'Parent in-law': 'Parent in-law',
    Spouse: 'Spouse',
    Grandparents: 'Grandparents'
  },
  leaveDetail: {
    project: 'Project',
    leaveCategory: 'Leave Category',
    beneficiary: 'Beneficiary',
    period: 'Period',
    duration: 'Duration',
    pendingWorkload: 'Pending Workload',
    notes: 'Notes',
    supportingDocument: 'Supporting Document',
    noteEmpty: 'No notes added.',
    supportDocumentEmpty: 'No document uploaded.',
    requester: 'Requester',
    husband: 'Husband'
  },
  editRequestModal: {
    title: 'Edit leave request',
    cancelBtn: 'Cancel',
    saveBtn: 'Save changes'
  },
  requester: {
    warningCancel: {
      title: 'Cancel Leave Request'
    }
  },
  approver: {
    warningReject: {
      title: 'Reject Leave Request',
      btnDiscard: 'Discard',
      btnConfirm: 'Confirm',
      placeholder: 'Write down your reason here'
    }
  },

  performance: {
    'Template Management': 'Template Management',
    'Appraisal Management': 'Appraisal Management',
    'Current Appraisals': 'Current Appraisals',
    'Appraisal Name': 'Appraisal Name',
    halfOfYearTitle: 'Performance Appraisal for Half of {{year}}',
    endOfYearTitle: 'Performance Appraisal for End of {{year}}',
    halfOfYear: 'Half of {{year}}',
    endOfYear: 'End of {{year}}',
    'Past Appraisals': 'Past Appraisals'
  },

  formNotStartedYet:
    'The evaluation period has not started yet, you can review the assessment from self-evaluator while waiting.',
  formEvaluatorMissed:
    'You missed submitting evaluation for employee and the deadline has passed. Please contact the admin to continue.',
  evaluationDetail: {
    publishInfo: 'Publish Information',
    recipients: 'Recipients',
    status: 'Status',
    formType: 'Form Type',
    yearOfEvaluation: 'Phase',
    selfEvaluationPeriod: 'Self-Evaluation Period',
    startFrom: 'Start From',
    due: 'Due',
    period: 'Period',
    contributionPeriod: 'Evaluation/Contribution Period',
    namePartA: 'Historical Performance',
    evaluationCriteria: 'Evaluation Criteria',
    self: 'Self',
    evaluator: 'Evaluator',
    namePartB: `Employee's Contribution`,
    timeAtThePublish: 'At the time of publication',
    employeeContribute: `Employee's contribution`,
    'Impact Indicators': 'Impact Indicators',
    'Analytical Thinking & Problem Solving': 'Analytical Thinking & Problem Solving',
    'Behavioral Characteristics': 'Behavioral Characteristics',
    'Business Knowledge': 'Business Knowledge',
    Communication: 'Communication',
    'Effective communication': 'Effective communication',
    'Knowledge sharing': 'Knowledge sharing',
    Interaction: 'Interaction',
    'Tools & Technology': 'Tools & Technology',
    Leadership: 'Leadership',
    Facilitation: 'Facilitation',
    'Driving alignment': 'Driving alignment',
    Influencing: 'Influencing',
    'Conflict resolution': 'Conflict resolution',
    Teaching: 'Teaching',
    Mentoring: 'Mentoring',
    'Outcome Indicators': 'Outcome Indicators',
    'Self Organization': 'Self Organization',
    'Reliability, delivery accountability': 'Reliability, delivery accountability',
    'Economic thinking': 'Economic thinking',
    'Time Management': 'Time Management',
    'Adaptability & Flexibility': 'Adaptability & Flexibility',
    Feedback: 'Feedback',
    'Delivering feedback': 'Delivering feedback',
    'Seeking and receiving feedback': 'Seeking and receiving feedback',
    Collaboration: ' Collaboration',
    Teamwork: 'Teamwork',
    'Relationship building': 'Relationship building',
    'Handling disagreement': 'Handling disagreement',
    'Strategic Impact': 'Strategic Impact',
    'Business acumen': 'Business acumen',
    'Strategic work': 'Strategic work',
    'Product thinking': 'Product thinking',
    EmployeesContribution: "Employee's Contribution",
    ShareOpinitionOverallImpact: 'Share your thoughts about overall value and impact to your organization.',
    optional: 'Optional',
    exampleMessage: 'Example here',
    'Performance Appraisal template published.': 'Performance Appraisal template published.'
  },
  headerEvaluationDetail: {
    managerRating: 'Manager Rating',
    selfRating: 'Self Rating',
    project: 'Project',
    yearOfEvaluation: 'Phase',
    evaluationPeriod: 'Evaluation Period',
    status: 'Status'
  },
  errorConfigTemplate: {
    errorDueDateSelfAndEvaluator: 'Due date of self-evaluator must happen before Start date of evaluator.',
    errorStartAndDueEvaluator: 'Start date of evaluator must happen before Due date of evaluator.',
    errorDueDateSelfAndEvaluatorAdvance: `"Due" date of Self-Evaluation must be less than "Start" date of Evaluation/Contribution.`,
    errorDueDateSelfAndCurrent: 'Due date must be greater than current date.'
  },
  publishTemplateModal: {
    headerTitle: 'Publish performance appraisal',
    btnName: 'Publish',
    description:
      'All employees in respective levels will receive the performance appraisal form once published. Are you sure you want to publish?'
  },
  evaluatorSubmitModal: {
    headerTitle: 'Submit evaluation',
    btnName: 'Submit',
    description:
      'The evaluation will return to self-evaluators accordingly once submitted. Are you sure you want to submit?'
  },
  'You have no performance appraisals submissions yet.': 'You have no performance appraisals submissions yet.',
  'You did not evaluate any performance appraisal yet.': 'You did not evaluate any performance appraisal yet.',
  evaluatorPreSubmitModal: {
    headerTitle: 'Resubmit evaluation',
    btnName: 'Resubmit',
    description: 'The previous evaluation results will be overridden once submitted. Are you sure you want to resubmit?'
  },
  evaluatorWarningSite: {
    infoSelfMissed:
      '{{employeeName}} missed submitting evaluation and the deadline has passed. Please ask self-evaluator for more details.',
    evaluatorMissed:
      'You missed submitting evaluation for employee and the deadline has passed. Please contact the admin to continue.'
  },
  selfEvaluatorWarningSite: {
    infoEvaluatorMissed:
      '{{managerName}} missed submitting evaluation for you and his/her evaluation deadline has passed. Please contact your evaluator for more details.',
    selfEvaluatorMissed:
      'You missed submitting your self-evaluation and the deadline has passed. Please contact the admin to continue.'
  },
  guidelineAssStage: {
    btn: 'Close',
    title: 'Assessment Stage',
    startDescription: 'The Competency Assessment will go through 2 main stages:',
    firstSubTitle: 'Stage 1: Entry Assessment',
    firstSubDescription:
      'You and your direct lead will assess your current progress and define your expected progress, gaps, and any action plan if needed.',
    secondSubTitle: 'Stage 2: Exit Assessment',
    secondSubDescription:
      'You and your direct lead will assess your actual progress at the end of the assessment period. This result will define if you have or have not met the defined expectation in the Entry Assessment stage.',
    endDescription:
      'Throughout the assessment period, you can require an ad hoc review. This will be called an In-Progress Assessment (IA). You can create as many IAs as you prefer.'
  },
  guidelineAssStageEval: {
    btn: 'Close',
    title: 'Assessment Stage',
    startDescription: 'The Competency Assessment will go through 2 main stages:',
    firstSubTitle: 'Stage 1: Entry Assessment',
    firstSubDescription:
      'You and your employee will assess their current progress and define the expected progress, gaps, and any action plan if needed.',
    secondSubTitle: 'Stage 2: Exit Assessment',
    secondSubDescription:
      'You and your employee will assess their actual progress at the end of the assessment period. This result will define if they have or have not met the defined expectation in the Entry Assessment stage.',
    endDescription:
      'Throughout the assessment period, your employee can require an ad hoc review. This will be called an In-Progress Assessment (IA). They can create as many IAs as they prefer.'
  },
  competencySubmitModal: {
    content: 'The assessment will be sent to your evaluator accordingly. Are you sure you want to submit?',
    contentFinalize:
      'The results will return to the employee accordingly once finalized. Are you sure you want to finalize?',
    contentResubmitted:
      'The submission will be overridden to the previous submission. Are you sure you want to resubmit?',
    title: 'Submit Assessment',
    titleFinalize: 'Finalize Assessment',
    titleResubmitted: 'Resubmit Assessment'
  },
  contentTooltipDisabledChart: {
    employee: 'Submit the Entry Assessment to view the Competency Chart.',
    evaluator: 'Available after employee submit their Entry Assessment.'
  },
  competency: {
    assessmentRecord_one: 'Assessment Record',
    assessmentRecord_other: 'Assessment Records',

    toastEntrySubmitted: 'Entry Assessment successfully submitted',
    toastEntryReSubmitted: 'Entry Assessment successfully resubmitted',

    toastIASubmitted: 'In-Progress Assessment successfully submitted',
    toastIAReSubmitted: 'In-Progress Assessment successfully resubmitted',

    toastExitSubmitted: 'Exit Assessment successfully submitted',
    toastExitReSubmitted: 'Exit Assessment successfully resubmitted',

    toastEntryFinalize: 'Entry Assessment successfully finalized',
    toastExitFinalize: 'Exit Assessment successfully finalized',
    toastIAFinalize: 'In-Progress Assessment successfully finalized',

    button: {
      submitIA: 'Submit In-Progress Assessment',
      reSubmitIA: 'Resubmit In-Progress Assessment',
      submitExit: 'Submit Exit Assessment',
      reSubmitExit: 'Resubmit Exit Assessment',
      reSubmitEntry: 'Resubmit Entry Assessment',
      submitEntry: 'Resubmit Entry Assessment',
      finalizeEntry: 'Finalize Entry Assessment',
      finalizeIA: 'Finalize In-Progress Assessment',
      finalizeExit: 'Finalize Exit Assessment'
    },
    otherSubmittedEntry: '{{other}} submitted the Entry Assessment on {{date}} ',
    youSubmittedEntry: 'You submitted the Entry Assessment on {{date}} ',
    youReSubmittedEntry: 'You resubmitted the Entry Assessment on {{date}} ',
    otherReSubmittedEntry: '{{other}} resubmitted the Entry Assessment on {{date}} ',
    youFinalizeEntry: 'You finalized the Entry Assessment on {{date}}',
    otherFinalizeEntry: '{{other}} finalized the Entry Assessment on {{date}}',
    youSubmittedExit: 'You submitted the Exit Assessment on {{date}}',
    otherSubmittedExit: '{{other}} submitted the Exit Assessment on {{date}}',
    youReSubmittedExit: 'You resubmitted the Exit Assessment on {{date}}',
    youSubmittedIA: 'You submitted the In-Progress Assessment on {{date}}',
    youReSubmittedIA: 'You resubmitted the In-progress Assessment on {{date}}',
    otherReSubmittedExit: '{{other}} resubmitted the Exit Assessment on {{date}}',
    youFinalizeExit: 'You finalized the Exit Assessment on {{date}}',
    otherFinalizeExit: '{{other}} finalized the Exit Assessment on {{date}}',
    youFinalizeIA: 'You finalized the In-Progress Assessment on {{date}}',
    otherSubmittedIA: '{{other}} submitted the In-Progress Assessment on {{date}}',
    otherReSubmittedIA: '{{other}} resubmitted the In-Progress Assessment on {{date}}',
    otherFinalizeIA: '{{other}} finalized the In-Progress Assessment on {{date}}',

    incomplete: 'The assessment is incomplete, but no actions can be taken after the period ended.'
  },
  messageCompleteOnboarding: 'All items must be marked as Done before completing the onboarding process.',

  listCompetencyPage: {
    currentStage: 'Current Stage',
    nextAction: 'Next Action',
    phase: 'Phase'
  },

  tableAppraisalTemplate: {
    appraisalName: 'Appraisal Name',
    formType: 'Form Type',
    startFrom: 'Start From',
    due: 'Due',
    status: 'Status'
  },

  employees_one: '{{count}} employee',
  employees_other: '{{count}} employees',
  loginFailed: `We couldn't find your email.\nPleas recheck with your organization.`,
  somethingWentWrong: `Something went wrong. Please sign in again.`,
  onboarding: {
    doneUp: 'Done',
    done: 'done',
    taskDetail: 'Task Details',
    taskName: 'Task Name',
    dueBy: 'Due by',
    noDue: 'No due',
    description: 'Description',
    optional: '(Optional)',
    upload: 'Upload',
    notes: 'Notes',
    addANote: 'Add a note',
    placeHolderGroup: 'Select a group',
    placeHolderPerson: 'Select a person',
    assignedTo: 'Assigned to',
    status: 'Status',
    helperErrorDate: 'Please enter a valid date.',
    placeHolderTaskDesc: 'Enter the task description',
    placeHolderTaskName: 'Enter task name',
    helperTextRequire: 'This field is required.',
    guideUploadText: 'Upload the document related to the task',
    relatedAttachments: 'Related attachments',
    toastDeleteSuccess: 'Task deleted successfully.',
    toastUpdateSuccess: 'Task completed successfully.',
    toastUpdateFailed: 'Task completed failed.',
    onboardingChecklist: 'Onboarding Checklist',
    infoUpdatedBy: 'Marked as Done by {{updateName}} on {{timeUpdated}}',
    deleteTask: 'Delete Task?',
    descriptionDelete:
      'You’re about to permanently delete this task, its attachments, and all the data. Are you sure you want to delete the task?',
    createTask: 'Create a Task',
    newTask: 'New Task',
    errorFileNoteSupport: 'Sorry, your selected file(s) below are not supported by our system.',
    headerNotSupport: 'Unsupported File',
    footer: 'Modal footer',
    headerMaximumFile: 'Maximum File Size Reached',
    errorFileMaximum: 'Sorry, your selected file(s) below exceed our maximum file size limit of {{maxSize}}MB.',
    onBoardingSuccess: 'Onboarding completed successfully',
    onBoardingFailed: 'Failed to complete onboarding'
  },
  gotIt: 'Got it',
  onboardingChecklist: 'Onboarding Checklist'
}

export default EN
