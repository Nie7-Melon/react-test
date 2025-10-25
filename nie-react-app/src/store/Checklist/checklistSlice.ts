import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  finallyShowCheckboxList: [],
  basicInformation: { },
  nieChecklistOptions: [],
}

const NieChecklistSlice = createSlice({
  name: 'Checklist',
  initialState,
  reducers: {
    initChecklistInfo(state) {
      // 直接重置状态，不需要返回
      state.finallyShowCheckboxList = []
      state.basicInformation = {}
      state.nieChecklistOptions = []
    },
    handleChangeBasicInformationValues(state, { payload }) {
      // 合并更新基本信息
      state.basicInformation = { ...state.basicInformation, ...payload }
      console.log('state.basicInformation:', state.basicInformation)
      // 不需要 return state
    },
    handleChangeBasicInformation(state, { payload }) {
      // 直接替换整个 basicInformation 对象 （替换这样做，但是一般不用这种方式）
      state.basicInformation = payload
      // 不需要 return state
    },
    handleChangeFinallyShowCheckboxList(state, { payload }) {
      state.finallyShowCheckboxList = payload
    },
    // 新增：更新选项列表的 reducer
    handleChangeNieChecklistOptions(state, { payload }) {
      state.nieChecklistOptions = payload
    }
  }
})

export const { 
  initChecklistInfo, 
  handleChangeBasicInformationValues, 
  handleChangeFinallyShowCheckboxList, 
  handleChangeBasicInformation,
  handleChangeNieChecklistOptions  
} = NieChecklistSlice.actions

export default NieChecklistSlice.reducer