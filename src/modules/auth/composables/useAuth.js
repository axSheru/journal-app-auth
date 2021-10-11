import { useStore } from 'vuex'

const useAuth = () => {

    const store = useStore()
    console.log(store)

    const createUser = async( user ) => {
        
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    return {
        createUser
    }

}

export default useAuth