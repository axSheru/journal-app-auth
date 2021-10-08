import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
    cloud_name: 'axsheru',
    api_key: '134181768662663',
    api_secret: '9n7dq_xjHebzAB9Ocl-ACn4Xhp0'
})

describe('Pruebas sobre el helper uploadImage', () => {

    test('Debe de cargar un archivo y retornar el URL.', async( done ) => {
        
        const { data } = await axios.get('https://res.cloudinary.com/axsheru/image/upload/v1632117386/bchmkui2wgfjnqob7ahb.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

        //Se toma el ID.
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '')
        
        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done()
        })

    })
    
})