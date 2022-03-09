export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL'

const BASE_URL = "http://192.168.178.38:3000"
export const registerUser = (authData) => {
    const { fullName, email, password } = authData
    console.log(authData)
    return async dispatch => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            }),

        }

        const result = await fetch(`${BASE_URL}/api/users/register`, settings)
        const resultData = await result.json()
        console.log(resultData)
        if(resultData.success) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: resultData
            })
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: resultData
            })
        }
        return resultData
        
    }
}

export const loginUser = (authData) => {
    const { email, password } = authData
    return async dispatch => {
        // Logic to do login user
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),

        }

        const result = await fetch(`${BASE_URL}/api/users/login`, settings)
        const resultData = await result.json()
        console.log("login",resultData)
        if(resultData.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultData
            })
        } else {
            console.log("I failed to login")
            dispatch({
                type:LOGIN_USER_FAIL,
                payload: resultData
            })
        }
        //? DONT FORGET TO RETURN IF YOU WANT TO HAVE A RESULT.
       return resultData
    }
}