var log = require('logger')('model-vehicles');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongins = require('mongins');
var Locations = require('model-locations');
var validators = require('validators');
var model = require('model');

var types = validators.types;

var vehicle = Schema({
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
                'bus'
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
            enum: ['none', 'petrol', 'diesel', 'electric', 'hybrid']
        }),
        required: true,
        searchable: true
    },
    transmission: {
        type: String,
        validator: types.string({
            enum: ['none', 'manual', 'automatic', 'manumatic']
        }),
        required: true,
        searchable: true
    },
    doors: {
        type: Number,
        required: true,
        validator: types.number({
            max: 50,
            min: 0
        })
    },
    steering: {
        type: String,
        required: true,
        validator: types.string({
            enum: ['left', 'right']
        })
    },
    seats: {
        type: Number,
        validator: types.number({
            max: 1000,
            min: 0
        }),
        required: true,
        searchable: true
    },
    driveType: {
        type: String,
        validator: types.string({
            enum: ['front', 'rear', 'all']
        }),
        required: true,
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
    engine: {
        type: Number,
        validator: types.number({
            max: 20000
        }),
        required: true,
        searchable: true
    },
    color: {
        type: String,
        validator: types.string({
            enum: ['black', 'white', 'grey', 'red', 'blue', 'green', 'orange', 'purple', 'brown', 'pink']
        }),
        required: true,
        searchable: true
    },
    description: {
        type: String,
        validator: types.string({
            length: 1000
        }),
        searchable: true
    },
    images: {
        type: [Schema.Types.ObjectId],
        ref: 'binaries',
        validator: types.array({
            max: 5,
            validator: types.ref()
        })
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
    centralLock: {
        type: Boolean,
        validator: types.boolean(),
        searchable: true
    },
    sunroof: {
        type: Boolean,
        validator: types.boolean(),
        searchable: true
    },
    powerShutters: {
        type: Boolean,
        validator: types.boolean(),
        searchable: true
    },
    powerMirrors: {
        type: Boolean,
        validator: types.boolean(),
        searchable: true
    },
    airConditioned: {
        type: Boolean,
        validator: types.boolean(),
        searchable: true
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

vehicle.plugin(mongins());
vehicle.plugin(mongins.user);
vehicle.plugin(mongins.createdAt());
vehicle.plugin(mongins.updatedAt());
vehicle.plugin(mongins.tags({
    location: Locations.tagger
}));

model.ensureIndexes(vehicle, [
    {images: 1, createdAt: 1, _id: 1},
    {price: 1, createdAt: 1, _id: 1},
    {price: 1, createdAt: -1, _id: -1},
    {price: 1, manufacturedAt: 1, createdAt: 1, _id: 1},
    {price: 1, manufacturedAt: 1, createdAt: -1, _id: -1},
    {price: 1, manufacturedAt: -1, createdAt: 1, _id: 1},
    {price: 1, manufacturedAt: -1, createdAt: -1, _id: -1},
    {price: 1, mileage: 1, createdAt: 1, _id: 1},
    {price: 1, mileage: 1, createdAt: -1, _id: -1},
    {price: 1, mileage: -1, createdAt: 1, _id: 1},
    {price: 1, mileage: -1, createdAt: -1, _id: -1}
]);

vehicle.index({description: 'text'});

module.exports = mongoose.model('vehicles', vehicle);
