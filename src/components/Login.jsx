import { useState, useReducer, useEffect } from "react";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@")
    };
  }

  if (action.type == "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@")
    };
  }

  return {
    value: "",
    isValid: false
  };
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    };
  }

  if (action.type == "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    };
  }

  return {
    value: "",
    isValid: false
  };
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setFormIsValid(emailIsValid  && passwordIsValid)
    }, 500);

    return () => {
      clearTimeout(timerId);
    }
  }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR"
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR"
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <div className={classes.card}>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button 
            type="submit"
            className={classes.btn}
            disabled={!formIsValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;