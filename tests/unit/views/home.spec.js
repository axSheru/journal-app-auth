import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('Pruebas en el Home view.', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount( Home )
    });

    test('Debe de hacer match con el snapshot.', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Al hacer clic en un botón debe de redireccionar al no-entry.', () => {

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount( Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalled()
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })

    })

})