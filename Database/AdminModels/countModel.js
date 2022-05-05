const mongoose = require('mongoose');

const countClickSchema = new mongoose.Schema({
    clickcount:{type : Number}
},
{
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000,
      },  
}
);
module.exports =mongoose.model('countClick',countClickSchema);