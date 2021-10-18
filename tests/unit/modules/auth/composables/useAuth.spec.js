import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/currentState': 'authenticated'
    }
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
    
    test('loginUser fallido.', async () => {

        const { loginUser } = useAuth()

        const loginForm = { email: 'ale@gmail.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL/PASSWORD DO NOT EXISTS' })

        const resp = await loginUser( loginForm )

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/signInUser', loginForm )
        expect( resp ).toEqual({ ok: false, message: 'EMAIL/PASSWORD DO NOT EXISTS' })
        
    })
    
    test('checkAuthStatus.', async () => {

        const { checkAuthStatus } = useAuth()

        mockStore.dispatch.mockReturnValue({ ok: true })

        await checkAuthStatus()

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/checkAuthentication' )
        
    })
    
    test('logout.', () => {
        
        const { logout } = useAuth()

        logout()

        expect( mockStore.commit ).toHaveBeenCalledWith( 'auth/logout' )
        expect( mockStore.commit ).toHaveBeenCalledWith( 'journal/clearEntries' )

    })
    
    test('Computed: authStatus.', () => {
        
        const { authStatus } = useAuth()

        expect( authStatus.value ).toBe( 'authenticated' )

    })
    
})


