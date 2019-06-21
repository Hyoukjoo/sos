import app from './app';

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is Running ~ PORT: ${process.env.SERVER_PORT}`);
  console.log(new Date());
});
