import { create } from 'zustand'

export const useEmployeeManageStore = create((set) => ({
  showEmployeeSideBar: true,
  setShowEmployeeSidebar: (isShow) => set(() => ({ showEmployeeSideBar: isShow })),

  employeeCurrentScored: 0,
  setEmployeeCurrentScored: (scored) => set(() => ({ employeeCurrentScored: scored })),

  disabledFormSelfEvaluation: false,
  setDisabledFormSelfEvaluation: (disabled) => set(() => ({ disabledFormSelfEvaluation: disabled })),

  managerRatedScored: 0,
  setManagerRatedScored: (scored) => set(() => ({ managerRatedScored: scored })),

  listLeaveCategory: [],
  setListLeaveCategory: (listLeave) => set((state) => ({ listLeaveCategory: [...state.listLeaveCategory, listLeave] })),

  openLeaveRequest: false,
  setOpenLeaveRequest: (open) => set(() => ({ openLeaveRequest: open })),

  considerModal: false,

  isLoadingMyLeave: false,
  listLeaveRequest: [],
  openGuidelineAssStage: false,
  showAssRecordInfoLeft: true,
  isOpenProficiencyLevelModal: false,
  countClickRefNumber: 0,
  isOpenCompetencyChartModal: false,
  isEvaluatorEvaluatedCompetency: false,
  isCreateExitAssessment: false,
  isEvaluatorFinalizeExitCompetency: false,
  isOpenGuidelineModal: false,
  isActionAfterCreateExit: false,
  isActionAfterCreateIA: false,
  isOpenCareerLadderModal: false,
  amountIaAssessment: 0,
  currentStageName: null,
  isDeleteIA: false,
  isOpenModalConsiderDeleteIa: false,
  isEvaluatorFinalizeIACompetency: false,
  isCreateTaskEmployeeManage: false,
  arrAttachmentsCreateEmployeeManage: []
}))
