'use strict';
import React, {createContext, useEffect, useReducer} from 'react';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    isError: false
}

export const UserContext =  createContext(INITIAL_STATE);

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                isError: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                isError: false
            }                       
            case "LOGIN_FAILURE":
                return {
                    user: null,
                    isFetching: false,
                    isError: action.payload
                }    
        default:
            return state;
    }

}

console.log("Context is being used")

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return <UserContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch
    }}>
        {children}
    </UserContext.Provider>
}