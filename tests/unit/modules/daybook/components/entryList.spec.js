import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import EntryList from '@/modules/daybook/components/EntryList'

//import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'
    
/* const journalMockModule = {
    namespaced: true,
    getters: {
        //getEntriesByTerm: jest.fn(),
        getEntriesByTerm
    },
    state: () => ({
        isLoading: false,
        entries: journalState.entries
    })
}

const store = createStore({
    modules: {
        journal: { ...journalMockModule }
    }
}) */
//Por si queremos controlar el crear exactamente qué es lo que queremos.
//Así también se realiza un mock completo de todo el store, actions, getters, mutations....

const createVuexStore = ( initialState ) =>
createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }//Se hace de esta forma para poder establecer un estado inicial personalizado.
        }
    }
})

describe('Pruebas en el EntryList.', () => {

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper 

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('Debe de hacer match con el snapshot.', () => {
        
        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('Debe de llamar el getEntriesByTerm sin término y mostrar 2 entradas.', () => {
        
        expect( wrapper.findAll('entry-stub').length ).toBe(2)

    })
    
    test('Debe de llamar el getEntriesByTerm y filtrar las entradas.', async() => {
        
        const input = wrapper.find('input')
        await input.setValue('jedi')
        
        expect( wrapper.findAll('entry-stub').length ).toBe(1)

    })
    
    test('El botón de nuevo debe de redireccionar a /new.', () => {
        
        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })

    })
    
})
