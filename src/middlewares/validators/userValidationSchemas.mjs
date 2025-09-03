import { validationResult } from 'express-validator';
import { deleteImage } from '../../utils/helpers.mjs';

export const userValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: 'Username must be at least 3-30 characters',
    },
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    isString: {
      errorMessage: 'Username must be a string',
    },
  },
  fullName: {
    notEmpty: {
      errorMessage: 'fullName cannot be empty',
    },
    isString: {
      errorMessage: 'fullName must be a string',
    },
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
      errorMessage: 'fullName must be at least 3-50 characters',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password cannot be empty',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters',
    },
  },
  image: {
    custom: {
      options: (value, { req }) => {
        if (!req.file) {
          return true;
        }

        const file = req.file;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 512 * 1024; // 2 MB

        if (!allowedTypes.includes(file.mimetype))
          throw new Error('Only JPEG, PNG, or WEBP images are allowed');

        if (file.size > maxSize)
          throw new Error('Image must be less than 512KB');

        return true;
      }
    }
  }
};

export const userPatchValidationSchema = {
  fullName: {
    optional: true,
    isString: {
      errorMessage: 'fullName must be a string',
    },
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
      errorMessage: 'fullName must be at least 3-50 characters',
    },
  },
  password: {
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters',
    },
  },
  newPassword: {
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'New Password must be at least 6 characters',
    },
  },
  image: {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (!req.file) {
          return true;
        }

        const file = req.file;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 512 * 1024; // 512KB

        if (!allowedTypes.includes(file.mimetype))
          throw new Error('Only JPEG, PNG, or WEBP images are allowed');

        if (file.size > maxSize)
          throw new Error('Image must be less than 512KB');

        return true;
      }
    }
  }
};

export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    if (req.file) {
      deleteImage(req.file.path);
    }
    return res.status(400).send(result.array());
  }
  next();
}
