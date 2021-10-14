import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

import authApi from '@/api/authApi'

const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }//Se hace de esta forma para poder establecer un estado inicial personalizado.
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {

    beforeAll( async() => {

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)

    })

    //Básicas. =========================================================================================
    test('Este es el estado inicial; Debe de tener el siguiente state.', () => {

        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
        
    })

    //Mutations. =========================================================================================
    test('mutation: setEntries', () => {
        
        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit( 'journal/setEntries', journalState.entries )
        expect( store.state.journal.entries.length ).toBe( 2 )
        
        store.commit( 'journal/setEntries', journalState.entries )
        expect( store.state.journal.entries.length ).toBe( 4 )

        expect( store.state.journal.isLoading ).toBeFalsy()

    })

    test('mutation: updateEntry', () => {
        
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-MjrZSR1hwEC8mfMROiA',
            date: 1631946119673,
            picture: "https://res.cloudinary.com/axsheru/image/upload/v1632117386/bchmkui2wgfjnqob7ahb.jpg",
            text: 'Hola mundo desde pruebas.'
        }

        store.commit( 'journal/updateEntry', updatedEntry )

        const storeEntries = store.state.journal.entries

        expect( storeEntries.length ).toBe( 2 )
        expect( storeEntries.find( e => e.id === updatedEntry.id ) ).toEqual(updatedEntry)

    })

    test('mutation: addEntry, delteEntry', () => {

        //addEntry
        
        const store = createVuexStore( journalState )

        const newEntry = { id: 'ABC-123', text: 'Hola mundo.' }

        store.commit( 'journal/addEntry', newEntry )

        const storeEntries = store.state.journal.entries

        expect( storeEntries.length ).toBe( 3 )
        expect( storeEntries.find( e => e.id === newEntry.id ) ).toEqual( newEntry )

        //deleteEntry

        store.commit( 'journal/deleteEntry', newEntry.id )

        expect( store.state.journal.entries.length ).toBe( 2 )
        expect( store.state.journal.entries.find( e => e.id === newEntry.id ) ).toBeFalsy()

    })
    
    //Getters. =========================================================================================

    test('getters: getEntriesByTerm, getEntriesById', () => {
        
        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        //getEntriesByTerm

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        expect( store.getters['journal/getEntriesByTerm']('frogs').length ).toBe(1)

        expect( store.getters['journal/getEntriesByTerm']('frogs') ).toEqual([ entry2 ])

        //getEntriesById

        expect( store.getters['journal/getEntriesById']( entry1.id ) ).toEqual( entry1 )

    })

    //Actions. =========================================================================================

    test('actions: loadEntries', async() => {
        
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2)

    })

    test('actions: updateEntry', async() => {
        
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-MjrZSR1hwEC8mfMROiA',
            date: 1631946119673,
            text: "The mandalorian caughts the Mythrol.",
            otroCampo: true,
            otromas: { a: 1 }
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === updatedEntry.id ) ).toEqual({
            id: '-MjrZSR1hwEC8mfMROiA',
            date: 1631946119673,
            text: "The mandalorian caughts the Mythrol.",
        })

    })
    
    test('actions: createEntry, deleteEntry', async() => {
        
        //addEntry

        const store = createVuexStore( journalState )

        const newEntry = { date: 1631946119673, text: 'Nueva entrada desde las pruebas.' }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect( typeof id ).toBe( 'string')

        expect( store.state.journal.entries.find( e => e.id === id ) ).toBeTruthy()
        
        //deleteEntry
        
        await store.dispatch('journal/deleteEntry', id)
        
        expect( store.state.journal.entries.find( e => e.id === id ) ).toBeFalsy()

    })
    
})