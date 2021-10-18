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
    
    test('Debe de mostrar el componente correctamente.', () => {

        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store ]
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()
        
    })
    

})
