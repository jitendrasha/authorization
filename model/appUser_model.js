
const Mongoose = require("mongoose");

// Now you can use Schema in your code
const { Schema } = Mongoose;


const options = {
  toJSON: {
    transform: (doc, obj) => {
      delete obj.__v;
      delete obj.id;
      return obj;
    },
    virtuals: false,
  },
  strict: true,
  timestamps: true,
  collection: "appUsers",
};







const appUserSchema = new Schema(
  {
    fullName: { type: String, index: true },
    mobile: { type: String, unique: true },
    email: { type: String, index: true },
    avatar: { type: String },
    language: { type: String },
    gender: { type: String },
    nationality: { type: String },
    country: { type: String },
    city: { type: String },
    status: { type: Boolean, default: true },
    type: {
      type: Array,
      // enum: ['buyer', 'seller']
    },
    activeUserType: { type: String },
    otp: {
      value: { type: String },
      expiry: { type: Date },
      mobile: { type: String },
    },
    otp_resend: {
      resendCount: { type: Number, default: 1 },
      resendSession: { type: Number },
      currentSession: { type: Number },
      check: { type: Boolean, default: false },
    },
    registration_token: { type: String },
    registration_token_buyer: { type: String },
    buyerLoggedIn: { type: Boolean, default: false },
    sellerLoggedIn: { type: Boolean, default: false },
    buyer: {
      customerId: { type: String },
      status: {
        type: String,
        default: "active",
        enum: ["active", "disable", "blacklisted"],
      },
      //address: [buyerAddress],
      rating: { type: Number },
      vonageUserID: { type: String },
      vonage: { type: Object },
      contactCreated: { type: Boolean },
      hubspotVid: { type: String },
      isDeleted: { type: Boolean, default: false },
    },
    state: {
      type: String,
      enum: ["Created", "Registered"],
      default: "Created",
      sparse: true,
      background: true,
    },
    stripeCustomerId: { type: String, sparse: true, background: true },
  },
  options
);


const appUserModel = Mongoose.model("appUser", appUserSchema);

appUserModel.on("index", (error) => {
  if (error) console.log(error.message);
  else console.log("Seller Index created successfully");
});


module.exports =appUserModel
