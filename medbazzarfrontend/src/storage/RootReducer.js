const initailState={
   data:{}
}
function RootReducer(state=initailState,action)
{  
  switch(action.type)
  {
  case "ADD_PRODUCT":
      state.data[action.payload[0]]=action.payload[1]
      return {data:state.data}
  case "DELETE_PRODUCT":
        delete state.data[action.payload[0]]
        return {data:state.data}
        
  default:
    return {data:state.data}
  }
}

export default RootReducer