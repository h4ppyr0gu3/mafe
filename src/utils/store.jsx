import { createContext, ParentComponent, useContext } from "solid-js"
import { UserService } from "./user_service"


export RootState = {
    userService
}

const StoreContext = createContext()

export const useAppSelector = () => useContext(StoreContext)
export const StoreProvider: ParentComponent = (props) => {
    return <StoreContext.Provider value={rootState}>{props.children}</StoreContext.Provider>
}
