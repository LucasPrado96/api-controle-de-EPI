import Users from '../models/User'
import * as Yup from "yup";
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken'

import auth from '../../config/auth';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    
    const isValid = await schema.isValid(request.body);

    const invalidLogin = () => {
       response
        .status(401)
        .json({ message: "make sure your password or email are correct" });
    };

    

    if (!isValid) {
      return invalidLogin();
    }

    const { email, password } = request.body;

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return invalidLogin();
    }

    const isSamePassword = await user.checkPassword(password);


    if (!isSamePassword) {
      return invalidLogin();
    }
    
   

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: jwt.sign({id: user.id}, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  }
}

export default new SessionController();
