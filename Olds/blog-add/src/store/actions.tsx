const addBlog = (blog: any) => {
  return {
    type: "ADD_BLOG",
    payload: blog,
  };
};
export default addBlog;
