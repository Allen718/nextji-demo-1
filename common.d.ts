type Post = {
  id: string;
  title: string;
  date: string;
};
declare module "*.jpg" {
  const src: string;
  export default src;
}
