import { validationResult } from 'express-validator';

export const noteValidationSchema = {
  title: {
    isLength: {
      options: {
        min: 3,
        max: 300,
      },
      errorMessage: 'Title must be at least 3-300 characters',
    },
    notEmpty: {
      errorMessage: 'Title cannot be empty',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
  },
  content: {
    isLength: {
      options: {
        min: 3,
        max: 100000,
      },
      errorMessage: 'Content must be at least 3-100000 characters',
    },
    notEmpty: {
      errorMessage: 'Content cannot be empty',
    },
    isString: {
      errorMessage: 'Content must be a string',
    },
  },
  tags: {
    isArray: {
      options: { min: 1 },
      errorMessage: 'Tags must be an array with at least 1 item',
    },
  },
  "tags.*": {
    isString: {
      errorMessage: 'Each tag must be a string',
    },
    notEmpty: {
      errorMessage: 'Tags cannot be empty',
    },
  },
  isPinned: {
    optional: true,
    isBoolean: {
      errorMessage: 'isPinned must be a boolean (true/false)',
    },
  },
  isArchived: {
    optional: true,
    isBoolean: {
      errorMessage: 'isPinned must be a boolean (true/false)',
    },
  },
};

export const notePatchValidationSchema = {
  title: {
    optional: true,
    isLength: {
      options: {
        min: 3,
        max: 300,
      },
      errorMessage: 'Title must be at least 3-300 characters',
    },
    notEmpty: {
      errorMessage: 'Title cannot be empty',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
  },
  content: {
    optional: true,
    isLength: {
      options: {
        min: 3,
        max: 100000,
      },
      errorMessage: 'Content must be at least 3-100000 characters',
    },
    notEmpty: {
      errorMessage: 'Content cannot be empty',
    },
    isString: {
      errorMessage: 'Content must be a string',
    },
  },
  tags: {
    optional: true,
    isArray: {
      options: { min: 1 },
      errorMessage: 'Tags must be an array with at least 1 item',
    },
  },
  "tags.*": {
    isString: {
      errorMessage: 'Each tag must be a string',
    },
    notEmpty: {
      errorMessage: 'Tags cannot be empty',
    },
  },
  isPinned: {
    optional: true,
    isBoolean: {
      errorMessage: 'isPinned must be a boolean (true/false)',
    },
    toBoolean: true,
  },
  isArchived: {
    optional: true,
    isBoolean: {
      errorMessage: 'isArchived must be a boolean (true/false)',
    },
    toBoolean: true,
  },
};

export const noteValidate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send(result.array());
  }
  next();
};
