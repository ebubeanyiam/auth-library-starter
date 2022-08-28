import express from "express";
import { createUser, verifyUser } from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema, verifyUserSchema } from "../schemas/user.schema";

const router = express.Router();

router
  .route("/")
  /**
  //    * @public   
  //    * @api {post} v1/wallet 
  //    * @apiDescription Create a wallet
  //    * @apiVersion 1.0.0
  //    * @apiName Create Wallet
  //    * @apiGroup wallet
  //    * @apiPermission public
  //    *
  //    * @apiHeader {String}   Token         Application access token
  //    *
  //    * @apiSuccess {String}  user_id         User's id
  //    * @apiSuccess {String}  phonenumber       User's Phonenumber
  //    * @apiSuccess {String}  alias      Wallet alias
  //    * @apiSuccess {String}  balance    Customer's balance
  //    * @apiSuccess {Date}    createdAt  Timestamp
  //    *
  //    * @apiError (Unauthorized 401) Unauthorized   Only authenticated calls can access the data
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(validateResource(createUserSchema), createUser);

router
  .route("/verify")
  /**
  //    * @public   
  //    * @api {post} v1/wallet 
  //    * @apiDescription Create a wallet
  //    * @apiVersion 1.0.0
  //    * @apiName Create Wallet
  //    * @apiGroup wallet
  //    * @apiPermission public
  //    *
  //    * @apiHeader {String}   Token         Application access token
  //    *
  //    * @apiSuccess {String}  user_id         User's id
  //    * @apiSuccess {String}  phonenumber       User's Phonenumber
  //    * @apiSuccess {String}  alias      Wallet alias
  //    * @apiSuccess {String}  balance    Customer's balance
  //    * @apiSuccess {Date}    createdAt  Timestamp
  //    *
  //    * @apiError (Unauthorized 401) Unauthorized   Only authenticated calls can access the data
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(validateResource(verifyUserSchema), verifyUser);

export default router;
