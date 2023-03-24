const { nanoid } = require('nanoid');
const notes = require('./notes');
const addNoteHandler = (request, h) => {
    //(title, tags, and body) akan disimpan dlm bentuk JSON
    //melalui body request
    const { title, tags, body } = request.payload;

    //menggunakan module nanoid utk 
    //menghasilkan string utk id yang unik
    const id = nanoid(16);

    //waktu catatan baru ditambahkan
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //objek note yang dibutuhkan
    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };

    //memasukkan nilai-nilai dari objek
    //ke dalam array notes dengan method push()
    notes.push(newNote);

    //untuk mengetahui apakah newNote sudah masuk ke dalam array
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    //untuk menentukan respons yang diberikan server
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            error: 'false',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        }, );
        response.code(201);

        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};
//untuk mendapatkan seluruh catatan
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

//untuk mendapatkan catatan secara spesifik
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;
};

//mengedit catatan
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

//menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};