var log = require('logger')('model-vehicles');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = require('validators').types;

var vehicle = Schema({
    user: {
        server: true,
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
        validator: types.ref()
    },
    has: {type: Object, default: {}},
    allowed: {type: Object, default: {}},
    created: {type: Date, default: Date.now},
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true,
        validator: types.ref()
    },
    contacts: {
        type: Schema.Types.Mixed,
        required: true,
        validator: types.contacts({
            max: 10
        })
    },
    type: {
        type: String,
        required: true,
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
        })
    },
    make: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-makes',
        required: true,
        validator: types.ref()
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-models',
        required: true,
        validator: types.ref()
    },
    manufacturedAt: {
        type: Date,
        required: true,
        validator: types.date({
            max: Date.now
        })
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'countries',
        required: true,
        validator: types.ref()
    },
    fuel: {
        type: String,
        required: true,
        validator: types.string({
            enum: ['none', 'petrol', 'diesel', 'electric', 'hybrid']
        })
    },
    transmission: {
        type: String,
        required: true,
        validator: types.string({
            enum: ['none', 'manual', 'automatic', 'manumatic']
        })
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
        required: true,
        validator: types.number({
            max: 1000,
            min: 0
        })
    },
    driveType: {
        type: String,
        required: true,
        validator: types.string({
            enum: ['front', 'rear', 'all']
        })
    },
    mileage: {
        type: Number,
        required: true,
        validator: types.number({
            min: 0
        })
    },
    condition: {
        type: String,
        required: true,
        validator: types.string({
            enum: ['brand-new', 'unregistered', 'used']
        })
    },
    engine: {
        type: Number,
        required: true,
        validator: types.number({
            max: 20000
        })
    },
    color: {
        type: String,
        required: true,
        validator: types.color()
    },
    description: {
        type: String,
        validator: types.string({
            length: 1000
        })
    },
    photos: {
        type: [String],
        validator: types.binaries({
            max: 10
        })
    },
    price: {
        type: Number,
        required: true,
        validator: types.number({
            min: 0
        })
    },
    currency: {
        type: String,
        required: true,
        validator: types.currency()
    },
    centralLock: {
        type: Boolean,
        validator: types.boolean()
    },
    sunroof: {
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
    airConditioned: {
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
    powerShutters: {
        type: Boolean,
        validator: types.boolean()
    },
    powerMirrors: {
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
});

vehicle.set('toJSON', {
    getters: true,
    //virtuals: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

vehicle.virtual('id').get(function () {
    return this._id;
});

module.exports = mongoose.model('vehicles', vehicle);