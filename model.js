var log = require('logger')('model-vehicles');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = require('validators').types;

var vehicle = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        validator: types.ref(),
        server: true,
        required: true,
        index: true
    },
    has: {type: Object, default: {}},
    allowed: {type: Object, default: {}},
    createdAt: {type: Date, default: Date.now, index: true},
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        validator: types.ref(),
        required: true,
        index: true
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
        index: true
    },
    make: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-makes',
        validator: types.ref(),
        required: true,
        index: true
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle-models',
        validator: types.ref(),
        required: true,
        index: true
    },
    manufacturedAt: {
        type: Date,
        validator: types.date({
            max: Date.now
        }),
        required: true,
        index: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'countries',
        validator: types.ref(),
        required: true,
        index: true
    },
    fuel: {
        type: String,
        validator: types.string({
            enum: ['none', 'petrol', 'diesel', 'electric', 'hybrid']
        }),
        required: true,
        index: true
    },
    transmission: {
        type: String,
        validator: types.string({
            enum: ['none', 'manual', 'automatic', 'manumatic']
        }),
        required: true,
        index: true
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
        index: true
    },
    driveType: {
        type: String,
        validator: types.string({
            enum: ['front', 'rear', 'all']
        }),
        required: true,
        index: true
    },
    mileage: {
        type: Number,
        validator: types.number({
            min: 0
        }),
        required: true,
        index: true
    },
    condition: {
        type: String,
        validator: types.string({
            enum: ['brand-new', 'unregistered', 'used']
        }),
        required: true,
        index: true
    },
    engine: {
        type: Number,
        validator: types.number({
            max: 20000
        }),
        required: true,
        index: true
    },
    color: {
        type: String,
        validator: types.color(),
        required: true,
        index: true
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
        validator: types.number({
            min: 0
        }),
        required: true,
        index: true
    },
    currency: {
        type: String,
        validator: types.currency(),
        required: true
    },
    centralLock: {
        type: Boolean,
        validator: types.boolean(),
        index: true
    },
    sunroof: {
        type: Boolean,
        validator: types.boolean(),
        index: true
    },
    powerShutters: {
        type: Boolean,
        validator: types.boolean(),
        index: true
    },
    powerMirrors: {
        type: Boolean,
        validator: types.boolean(),
        index: true
    },
    airConditioned: {
        type: Boolean,
        validator: types.boolean(),
        index: true
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
});

vehicle.index({description: 'text'});

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