import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUser, User } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send('Email already in use');
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    req.login(newUser, error => {
      if (error) {
        res.status(500).send('Login failed after registration');
      }
      res.status(201).send('User registered and logged in successfully');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed');
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error: string | null, user: IUser | false) => {
    if (error) {
      return res.status(500).send('Server error during login');
    }
    if (!user) {
      return res.status(401).send('Authentication failed');
    }

    req.login(user, loginError => {
      if (loginError) {
        res.status(500).send('Login error');
      } else {
        res.status(200).send('Login was successful');
      }
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout(error => {
    if (error) {
      return res.status(500).send('Logout failed');
    }

    req.session?.destroy(destroyError => {
      if (destroyError) {
        return res.status(500).send('Could not destroy session');
      }

      res.clearCookie('connect.sid');
      res.status(200).send('Logout successful');
    });
  });
};

export const checkAuth = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ loggedIn: true, user: req.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};
