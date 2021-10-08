import { shallowMount } from '@vue/test-utils'
import About from '@/views/About'

describe('Pruebas en el About view.', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount( About )
    });

    test('Debe de hacer match con el snapshot.', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Debe de renderizar un elemento con la clase about.', () => {

        const classAbout = wrapper.find('.about')
        
        expect( classAbout ).toBeTruthy()

    })

})