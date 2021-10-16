import createVuexStore from '../../../mock-data/mock-store'

describe('Vuex: Pruebas en el auth-module.', () => {
    
    test('Estado inicial.', () => {

        const store = createVuexStore({
            status: 'authenticating',// 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect( status ).toBe( 'authenticating' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )
        
    })
    
    //Mutations.

    test('Mutation: loginUSer.', () => {

        const store = createVuexStore({
            status: 'authenticating',// 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const payload = {
            user: { name: 'Alex', email: 'alex@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        }

        store.commit( 'auth/loginUser', payload )

        const { status, user, idToken, refreshToken } = store.state.auth

        expect( status ).toBe( 'authenticated' )
        expect( user ).toEqual( { name: 'Alex', email: 'alex@gmail.com' } )
        expect( idToken ).toBe( 'ABC-123' )
        expect( refreshToken ).toBe( 'XYZ-123' )
        
    })
    
    test('Mutation: logout', () => {
        
        const store = createVuexStore({
            status: 'authenticated',// 'authenticated', 'not-authenticated', 'authenticating'
            user: { name: 'Alex', email: 'alex@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        localStorage.setItem( 'idToken', 'ABC-123' )
        localStorage.setItem( 'refreshToken', 'XYZ-123' )

        store.commit( 'auth/logout' )

        const { status, user, idToken, refreshToken } = store.state.auth

        expect( status ).toBe( 'not-authenticated' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )

        expect( localStorage.getItem('idToken') ).toBe( null )
        expect( localStorage.getItem('refreshToken') ).toBe( null )

    })

    //Getters

    test('Getter: username.', () => {
        
        const store = createVuexStore({
            status: 'authenticated',// 'authenticated', 'not-authenticated', 'authenticating'
            user: { name: 'Alex', email: 'alex@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        expect( store.getters['auth/username'] ).toBe( 'Alex' )

    })

})
