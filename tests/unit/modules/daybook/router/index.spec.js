import daybookRouter from '@/modules/daybook/router'

describe('Pruebas en el router module del daybook.', () => {
    
    test('El router debe de tener esta configuración.', () => {
        
        expect( daybookRouter ).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )
                },
            ]
        })

    })

    test('Debe de comprobar que las rutas te redirigen a los componentes esperados.', async () => {
        
        //expect( (await daybookRouter.children[0].component()).default.name ).toBe('NoEntrySelected')//Muy rígido.
        //expect( (await daybookRouter.children[1].component()).default.name ).toBe('EntryView')//Muy rígido.

        const promiseRoutes = []
        daybookRouter.children.forEach( child => promiseRoutes.push( child.component() ) )

        const routes = (await Promise.all( promiseRoutes )).map( r => r.default.name )

        expect( routes ).toContain( 'EntryView' )
        expect( routes ).toContain( 'NoEntrySelected' )

    })

    test('Debe de retornar el id de la ruta.', () => {
        
        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        //expect( daybookRouter.children[1].props( route ) ).toEqual({ id: 'ABC-123' })//Muy rígido.

        const entryRoute = daybookRouter.children.find( route => route.name === 'entry' )//Más dinámico.
        
        expect( entryRoute.props( route ) ).toEqual({ id: 'ABC-123' })

    })

})
