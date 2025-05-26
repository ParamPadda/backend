// const blogModel = require("../models/blog.model");

// const getBlogs = async (req, res) => {
//   console.log("=== getBlogs API called ===");
  
//   try {
//     // Test 1: Basic response
//     console.log("Test 1: Sending basic response");
//     // Uncomment this to test basic API response
//     // return res.status(200).json({
//     //   success: true,
//     //   message: "API is working",
//     //   data: []
//     // });

//     // Test 2: Database connection
//     console.log("Test 2: Checking database connection");
//     const count = await blogModel.countDocuments();
//     console.log("Total blogs in database:", count);

//     if (count === 0) {
//       console.log("No blogs found in database");
//       return res.status(200).json({
//         success: true,
//         data: [],
//         message: "No blogs found"
//       });
//     }

//     // Test 3: Fetch basic blog data (without processing)
//     console.log("Test 3: Fetching raw blog data");
//     const blogs = await blogModel.find({}, { 
//       title: 1, 
//       about: 1, 
//       createdAt: 1, 
//       mostLiked: 1,
//       likes: 1 
//     }).sort({ createdAt: -1 });
    
//     console.log("Raw blogs fetched:", blogs.length);
//     console.log("First blog sample:", blogs[0] ? {
//       id: blogs[0]._id,
//       title: blogs[0].title,
//       about: blogs[0].about?.substring(0, 50) + "..."
//     } : "No blogs");

//     // Test 4: Simple formatting
//     console.log("Test 4: Simple formatting");
//     const formattedBlogs = blogs.map(blog => ({
//       _id: blog._id,
//       title: blog.title || 'Untitled',
//       about: blog.about || 'No description',
//       createdAt: blog.createdAt,
//       mostLiked: Boolean(blog.mostLiked),
//       likes: blog.likes || 0,
//     }));

//     console.log("Formatted blogs:", formattedBlogs.length);
//     console.log("Sending response...");

//     res.status(200).json({
//       success: true,
//       data: formattedBlogs,
//       count: formattedBlogs.length
//     });

//   } catch (error) {
//     console.error("=== ERROR in getBlogs ===");
//     console.error("Error message:", error.message);
//     console.error("Error stack:", error.stack);
//     console.error("Error name:", error.name);
    
//     res.status(500).json({ 
//       success: false, 
//       message: "Server error in getBlogs", 
//       error: error.message,
//       errorType: error.name
//     });
//   }
// };

// module.exports = getBlogs;



const blogModel = require("../models/blog.model");

const getBlogs = async (req, res) => {
  console.log("=== getBlogs API called ===");
  
  try {
    console.log("Fetching blogs from database...");
    const blogs = await blogModel.find({}, { 
      title: 1, 
      about: 1, 
      createdAt: 1, 
      mostLiked: 1,
      likes: 1 
    }).sort({ createdAt: -1 });
    
    console.log("Blogs fetched:", blogs.length);

    if (!blogs || blogs.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No blogs found"
      });
    }

    const formattedBlogs = blogs.map(blog => ({
      _id: blog._id,
      title: blog.title || 'Untitled',
      about: blog.about || 'No description',
      createdAt: blog.createdAt,
      mostLiked: Boolean(blog.mostLiked),
      likes: blog.likes || 0,
    }));

    console.log("Successfully formatted blogs:", formattedBlogs.length);
    
    res.status(200).json({
      success: true,
      data: formattedBlogs,
    });
  } catch (error) {
    console.error("Error in getBlogs:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

module.exports = getBlogs;