/* eslint-disable no-unused-labels */
const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
} = require('./handler');
const routes = [{

        //menambahkan catatan
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,

    },
    //menampilkan catatan
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    //menampilkan catatan secara spesifik
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },

    //mengedit catatan
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    //menghapus catatan
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;