var log = require('logger')('model-vehicles');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongins = require('mongins');
var Locations = require('model-locations');
var validators = require('validators');
var model = require('model');

var types = validators.types;
var requires = validators.requires;

var schema = Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        validator: types.ref(),
        required: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'contacts',
        validator: types.ref(),
        required: true
    },
    type: {
        type: String,
        validator: types.string({
            enum: [
                'bicycle',
                'excavator',
                'loader',
                'bulldozer',
                'digger',
                'tractor',
                'truck',
                'cement-mixer',
                'crane',
                'road-roller',
                'motorbike',
                'three-wheeler',
                'scooter',
                'car',
                'van',
                'suv',
                'cab',
                'lorry',
                'van',
                'bus',
                'other'
            ]
        }),
        required: true,
        searchable: true
    },
    make: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-makes',
        validator: types.ref(),
        required: true,
        searchable: true
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-models',
        validator: types.ref(),
        required: true,
        searchable: true
    },
    edition: {
        type: String,
        validator: types.string({
            length: 50
        })
    },
    manufacturedAt: {
        type: Date,
        validator: types.date({
            max: Date.now
        }),
        required: true,
        searchable: true,
        sortable: true
    },
    fuel: {
        type: String,
        validator: types.string({
            enum: ['none', 'petrol', 'diesel', 'electric', 'hybrid', 'other']
        }),
        required: true,
        searchable: true
    },
    transmission: {
        type: String,
        validator: types.string({
            enum: ['manual', 'automatic', 'manumatic', 'other']
        }),
        required: true,
        searchable: true
    },
    engine: {
        type: Number,
        validator: types.number({
            max: 20000
        }),
        require: requires.engine()
    },
    driveType: {
        type: String,
        validator: types.string({
            enum: ['front', 'rear', 'four', 'all', 'other']
        }),
        require: requires.driveType(),
        searchable: true
    },
    mileage: {
        type: Number,
        validator: types.number({
            min: 0
        }),
        required: true,
        searchable: true,
        sortable: true
    },
    condition: {
        type: String,
        validator: types.string({
            enum: ['brand-new', 'unregistered', 'used']
        }),
        required: true,
        searchable: true
    },
    color: {
        type: String,
        validator: types.string({
            enum: ['black', 'white', 'grey', 'silver', 'red', 'blue', 'green', 'orange', 'purple', 'brown', 'pink', 'yellow', 'other']
        }),
        required: true,
        searchable: true
    },
    price: {
        type: Number,
        validator: types.number({
            min: 0
        }),
        required: true,
        searchable: true,
        sortable: true
    },
    currency: {
        type: String,
        validator: types.string({
            enum: ['LKR']
        }),
        required: true
    },
    description: {
        type: String,
        validator: types.string({
            length: 5000
        })
    },
    images: {
        type: [Schema.Types.ObjectId],
        ref: 'binaries',
        validator: types.array({
            max: 5,
            validator: types.ref()
        })
    },
    doors: {
        type: Number,
        validator: types.number({
            max: 50,
            min: 0
        })
    },
    steering: {
        type: String,
        validator: types.string({
            enum: ['left', 'right']
        })
    },
    seats: {
        type: Number,
        validator: types.number({
            max: 1000,
            min: 0
        })
    },
    centralLock: {
        type: Boolean,
        validator: types.boolean()
    },
    sunroof: {
        type: Boolean,
        validator: types.boolean()
    },
    powerShutters: {
        type: Boolean,
        validator: types.boolean()
    },
    powerMirrors: {
        type: Boolean,
        validator: types.boolean()
    },
    airConditioned: {
        type: Boolean,
        validator: types.boolean()
    },
    spareWheels: {
        type: Boolean,
        validator: types.boolean()
    },
    toolkit: {
        type: Boolean,
        validator: types.boolean()
    },
    tinted: {
        type: Boolean,
        validator: types.boolean()
    },
    navigator: {
        type: Boolean,
        validator: types.boolean()
    },
    entertainment: {
        type: Boolean,
        validator: types.boolean()
    },
    security: {
        type: Boolean,
        validator: types.boolean()
    },
    racks: {
        type: Boolean,
        validator: types.boolean()
    },
    seatBelts: {
        type: Boolean,
        validator: types.boolean()
    },
    canopy: {
        type: Boolean,
        validator: types.boolean()
    }
}, {collection: 'vehicles'});

schema.plugin(mongins());
schema.plugin(mongins.user);
schema.plugin(mongins.permissions({
    workflow: 'model'
}));
schema.plugin(mongins.status({
    workflow: 'model'
}));
schema.plugin(mongins.visibility({
    workflow: 'model'
}));
schema.plugin(mongins.createdAt());
schema.plugin(mongins.updatedAt());
schema.plugin(mongins.modifiedAt());
schema.plugin(mongins.tags({
    location: Locations.tagger
}));

model.ensureIndexes(schema, [
    {images: 1, updatedAt: 1, _id: 1},
    {price: 1, updatedAt: 1, _id: 1},
    {price: 1, updatedAt: -1, _id: -1},
    {price: 1, manufacturedAt: 1, updatedAt: 1, _id: 1},
    {price: 1, manufacturedAt: 1, updatedAt: -1, _id: -1},
    {price: 1, manufacturedAt: -1, updatedAt: 1, _id: 1},
    {price: 1, manufacturedAt: -1, updatedAt: -1, _id: -1},
    {price: 1, mileage: 1, updatedAt: 1, _id: 1},
    {price: 1, mileage: 1, updatedAt: -1, _id: -1},
    {price: 1, mileage: -1, updatedAt: 1, _id: 1},
    {price: 1, mileage: -1, updatedAt: -1, _id: -1}
]);

module.exports = mongoose.model('vehicles', schema);
