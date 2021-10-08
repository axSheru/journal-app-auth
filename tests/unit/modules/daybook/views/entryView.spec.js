import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

import journal from '@/modules/daybook/store/journal'
import EntryView from '@/modules/daybook/views/EntryView'

import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }//Se hace de esta forma para poder establecer un estado inicial personalizado.
            }
        }
    })

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoadig: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper 

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MjrZSR1hwEC8mfMROiA'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })
    
    test('Debe de sacar al usuario porque el id no existe.', () => {
        
        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe.'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })

    })
    
    test('Debe de mostrar la entrada correctamente.', () => {
        
        expect( wrapper.html() ).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()

    })
    
    test('Debe de borrar la entrada y salir.', (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )
        
        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado no se puede recuperar.',
            showDenyButton: true,
            confirmButtonText: 'Sí, estoy seguro.'
        })

        setTimeout(() => {
            
            expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-MjrZSR1hwEC8mfMROiA')
            expect( mockRouter.push ).toHaveBeenCalled()
            done()

        }, 1)

    })
    
})
