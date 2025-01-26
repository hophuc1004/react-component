export const END_POINT = {
  commentCompetency: 'v1/competency/evaluator-comment',
  deleteCommentCompetency: (id: number) => `v1/competency/evaluator-comment/${id}`,
  generatePresignedUrl: 'v1/presigned-url',
  getPendingDeduct: 'v1/leave-request/annual-wait-to-deduct',
  getMyLeaveList: 'v1/leave-request/my-request',
  leaveCategoryList: 'v1/employee/leave-category',
  getDurationLeave: 'v1/leave-request/check-duration',
  getLeaveBalance: 'v1/leave-request/balances',
  createLeaveRequest: 'v1/leave-request'
}
