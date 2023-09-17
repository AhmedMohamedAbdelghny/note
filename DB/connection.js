import mongoose from "mongoose";


const dbConnection = async () => {
  return await mongoose.connect(process.env.URI).then(() => {
    console.log(`db connection successfully in ${process.env.URI}........ `);
  }).catch((err) => {
    console.log("db connection failed ********", err);
  })
}
export default dbConnection