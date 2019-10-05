export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_DAY':
      return { ...state, readingPlan: action.payload }
    case 'LOAD_PLAN_TYPE':
      return { ...state, readingPlanType: action.payload }
    default:
      return state
  }
}