import { validationResult } from "express-validator";
import createError from "http-errors";
//? login route expects the LOGIC from the errorValidationChecker function -> wrap that function inside a function!
const errorValidationChecker = () => async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const foundErrors = errors.array();
      let messages = [];
      for (let e of foundErrors) {
        messages.push(e.msg);
      }
      //! better to push the complete array?
      const finalMessage = messages.join(", ");
      return res.status(401).json({ message: finalMessage });
    }
    next();
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export default errorValidationChecker