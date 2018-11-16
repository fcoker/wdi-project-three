const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost/events';
const secret = process.env.SECRET || 'black horse';

module.exports = {
  port: port,
  dbUri: dbUri,
  secret: secret
};
