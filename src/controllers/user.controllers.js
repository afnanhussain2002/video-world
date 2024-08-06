import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async(userId) =>{
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false});

    return {accessToken, refreshToken}
    
  } catch (error) {
    throw new ApiError(
      500,
      "Something Went wrong while generating access and refresh token"
    )
  }
}

const registerUser = asyncHandler(async (req, res) => {
  // It was just for test everything working or not
  /* res.status(200).json({
        message:"Everything is fine"
    }) */

  // steps for register a user

  // get user form frontend i mean postman

  const { fullName, username, email, password } = req.body;
  
  // validation - check empty
  
  if (
    [fullName, username, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // check if the user already exists: Using username, email
  console.log("body se aya", req.body);
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existUser) {
    console.log('Exists user', existUser);
    throw new ApiError(409, "email or username already exists");
  }
  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (req.files.coverImage) {
    coverImageLocalPath = req.files.coverImage[0].path;
  } else {
    coverImageLocalPath = "";
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar files is required");
  }

  // upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar files is required");
  }
  // create user object - create entry in db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // remove password and refresh token field form response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong when register the user");
  }
  // return user

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

// login the user

const loginUser = asyncHandler(async(req,res) =>{
  const {email, username, password} = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username or email is required")

  }

  const user = await User.findOne({
    $or:[{username}, {email}]
  })
  if (!user) {
    throw new ApiError(400, "User dose not exist")
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  
  const options = {
    httpOnly:true,
    secure:true
  }
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(200, {
      user: loggedInUser,
      accessToken,
      refreshToken,
    }),
    "User loggedIn Successfully"
  );
})

export { registerUser };
