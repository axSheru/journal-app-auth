import { shallowMount } from '@vue/test-utils'
import createVuexStore from '../../../mock-data/mock-store'

import Login from '@/modules/auth/views/Login'

describe('Pruebas en el login component.', () => {

    const store = createVuexStore({
        status: 'not-authenticated',// 'authenticated', 'not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })
    
    test('Debe de hacer match con el snapshot.', () => {
        
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()

    })
    

})
