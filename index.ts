import { web } from "./src/app/web";

const port: number = 4000;

web.listen(port, () => {
  console.info(`app start at port ${port}`);
});
