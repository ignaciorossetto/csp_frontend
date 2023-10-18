import {useReducer, createContext, Reducer, useEffect, ReactNode } from "react";
import { AuthAction, AuthContextType, AuthState, ContextUser, LoginProcess, LogoutProcess } from "../types/types";
               

const INITIAL_STATE: AuthState = {
    loading: false,
    error: null,
    user: JSON.parse(localStorage.getItem("csp_user") ?? 'null') as ContextUser || null
}

const initialAuthContext: AuthContextType = {
    user: INITIAL_STATE.user,
    loading: INITIAL_STATE.loading,
    error: INITIAL_STATE.error,
    dispatch: () => {} 
  };


export const AuthContext = createContext<AuthContextType>(initialAuthContext)

const AuthReducer: Reducer<AuthState, AuthAction> = (state, action):AuthState => {
    switch (action.type) {
        case LoginProcess.START:
            return {
                loading: true,
                error: null,
                user: null,
            }
        case LoginProcess.SUCCESS:
            return {
                loading: false,
                error: null,
                user: action.payload as ContextUser | null,
            }
        case LoginProcess.FAILED:
            return {
                loading: false,
                error: action.payload,
                user: null,
            }
        case LogoutProcess.SUCCESS:
            
            return {
                loading: false,
                error: null,
                user: null
            }
        default:
            return INITIAL_STATE
    }
}

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=> {
        localStorage.setItem("csp_user", JSON.stringify(state.user))
    }, [state.user])
    return (
        <AuthContext.Provider
        value={{
            user:state.user,
            loading:state.loading,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
     
}