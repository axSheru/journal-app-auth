import { shallowMount } from '@vue/test-utils'
import Login from '@/modules/auth/views/Login'

import createVuexStore from '../../../mock-data/mock-store'

import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoadig: jest.fn(),
    close: jest.fn()
}))


describe('Pruebas en el login component.', () => {

    const store = createVuexStore({
        status: 'not-authenticated',// 'authenticated', 'not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()
    
    test('Debe de hacer match con el snapshot.', () => {
        
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()

    })
    
    test('Credenciales incorrectas, debe retornar error de autenticación.', async() => {

        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales.' })
        
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toHaveBeenCalledWith( 'auth/signInUser', {email: '', password: ''} )
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Error en credenciales.', 'error')

    })
    
    test('Credenciales correctas, debe de redirigir a no-entry view.', async() => {
        
        store.dispatch.mockReturnValueOnce({ ok: true })
        
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        const [ txtEmail, txtPassword ] = wrapper.findAll('input')
        await txtEmail.setValue('ale@gmail.com')
        await txtPassword.setValue('123456')

        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toHaveBeenCalledWith( 'auth/signInUser', { email: 'ale@gmail.com', password: '123456' } )
        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'no-entry' })

    })
    
})
