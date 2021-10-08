import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Pruebas en el entry component.', () => {

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount( Entry, {
            props: {
                entry: journalState.entries[0]
            },
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
    });

    test('Debe de hacer match con el snapshot.', () => {
        
        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('Debe de redireccionar al hacer click en el entry-container.', () => {
        
        wrapper.find('.entry-container').trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: journalState.entries[0].id } })

    })

    test('Pruebas en las propiedades computadas.', () => {
        
        expect(wrapper.vm.day).toBe(18)
        expect(wrapper.vm.month).toBe('Septiembre')
        expect(wrapper.vm.yearDay).toBe('2021, Sábado')

    })
    
})
