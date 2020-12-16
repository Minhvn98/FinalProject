const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    idUserSend: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    idUserReceived: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    content: String,
    status: Number,
    link: String,
    onModel: {
      type: String,
      enum: ['Admin', 'Lecture', 'Student'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
