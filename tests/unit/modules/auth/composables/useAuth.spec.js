import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn()
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Pruebas en useAuth.', () => {

    beforeEach( () => jest.clearAllMocks() )
    
    test('createUser exitoso.', async () => {

        const { createUser } = useAuth()

        const newUSer = { name: 'Ale', email: 'ale@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await createUser( newUSer )

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/createUser', { name: 'Ale', email: 'ale@gmail.com' } )
        expect( resp ).toEqual({ ok: true })
        
    })

    test('createUSer fallido, usuario ya existe.', async () => {

        const { createUser } = useAuth()

        const newUSer = { name: 'Ale', email: 'ale@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser( newUSer )

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/createUser', newUSer )    
        expect( resp ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

    })
    
    test('loginUser exitoso.', async () => {

        const { loginUser } = useAuth()

        const loginForm = { email: 'ale@gmail.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await loginUser( loginForm )

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/signInUser', loginForm )
        expect( resp ).toEqual({ ok: true })
        
    })
    
})


