import { shallowMount } from '@vue/test-utils'

import NavBar from '@/modules/daybook/components/NavBar'
import createVuexStore from '../../../mock-data/mock-store'

describe('Pruebas en el NavBar component.', () => {

    const store = createVuexStore({
        user: {
            name: 'Andy',
            email: 'andy@gmail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach( () => jest.clearAllMocks() )
    
    test('Debe de mostrar el componente correctamente.', () => {

        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store ]
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()
        
    })
    
    test('Clic en el logout, debe de cerrar sesión y redireccionar.', async () => {
        
        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store ]
            }
        })

        await wrapper.find('button').trigger('click')

        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'login' })

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken: null,
            refreshToken: null
        })

    })
    
})
