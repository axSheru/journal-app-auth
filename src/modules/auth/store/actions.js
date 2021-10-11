import authApi from "@/api/authApi"

/* export const myAction = async ({ commit }) => {
    
} */


export const createUser = async ( { commit }, user ) => {
    const { name, email, password } = user
    console.warn(name, commit)

    try {

        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        console.log(data)

        //TODO: Mutation: loginUser

        return { ok: true }

    } catch (error) {

        return { ok: false, message: error.response.data.error.message }

    }
}