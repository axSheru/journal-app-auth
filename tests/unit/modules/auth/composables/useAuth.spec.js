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

        expect( mockStore.dispatch ).toHaveBeenLastCalledWith( 'auth/createUser', { name: 'Ale', email: 'ale@gmail.com' } )
        expect( resp ).toEqual({ ok: true })
        
    })
    
})


