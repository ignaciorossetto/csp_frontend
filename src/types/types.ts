export type AuthState = {
    loading: boolean,
    error: null | object,
    user: null | ContextUser
}


export enum LoginProcess {
    START ='LOGIN_START',
    SUCCESS ='LOGIN_SUCCESS',
    FAILED ='LOGIN_FAILED'
}

export enum LogoutProcess {
    START ='LOGOUT_START',
    SUCCESS ='LOGOUT_SUCCESS',
    FAILED ='LOGOUT_FAILED'
}

export interface AuthContextType {
    user: AuthState['user'];
    loading: AuthState['loading'];
    error: AuthState['error'];
    dispatch: React.Dispatch<AuthAction>;
  }


export type AuthAction =   |{type: LoginProcess, payload: object | null}              
                    |{type: LogoutProcess}

export type ContextUser = {
    UserType: {
        title: string
    },
    active: null | boolean,
    address: string | null,
    createdAt: string,
    email: string,
    id_user: number,
    id_userType: number,
    updatedAt: string,
    username: string,
    }