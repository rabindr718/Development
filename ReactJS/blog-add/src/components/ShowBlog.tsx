// import React from "react";
// import { useSelector } from "react-redux";

// const BlogDisplay: React.FC = () => {
//   const blogs = useSelector((state: any) => state.blogs);

//   return (
//     <div>
//       {blogs.map((blog: any, index: any) => (
//         <div key={index}>
//           <h3>{blog.fullname}</h3>
//           <p>{blog.textdata}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogDisplay;
// BlogDisplay.tsx
import React from "react";
import { useSelector } from "react-redux";

const BlogDisplay: React.FC = () => {
  const blogs = useSelector((state: any) => state.blogs);

  return (
    <div>
      {blogs.map((blog: any, index: any) => (
        <div key={index}>
          <h3>{blog.fullname}</h3>
          <p>{blog.textdata}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogDisplay;
