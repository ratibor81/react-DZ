import jwt from 'jwt-simple';
import users from '../../constants/users';

const SECRET = 'jquery_is_amazing';

export const singUpWithEmailAndPassword = ({ name, email, password }) =>
  new Promise(resolve => {
    const user = users.find(user1 => user1.email === email);

    setTimeout(() => {
      if (user) Promise.reject(new Error('User already exists!'));

      const newUser = {
        name,
        email,
        password,
        token: jwt.encode(user.password, SECRET),
      };

      users.push(newUser);

      resolve({
        user: {
          name: newUser.name,
          email: newUser.email,
        },
        token: newUser.token,
      });
    }, 300);
  });

export const signInWithEmailAndPassword = ({ email, password }) =>
  new Promise(resolve => {
    const user = users.find(user1 => user1.email === email);

    setTimeout(() => {
      if (!user) {
        return Promise.reject(new Error('User does not exist!'));
      }

      if (user.password !== password) {
        return Promise.reject(new Error('Invalid password!'));
      }

      user.token = jwt.encode(user.password, SECRET);

      return resolve({
        user: {
          name: user.name,
          email: user.email,
        },
        token: user.token,
      });
    }, 300);
  });
