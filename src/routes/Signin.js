import React from "react";
import { connect } from "react-redux";
import { signin } from "../actions";
import { Redirect } from "react-router-dom";
import { parseQueryParameters } from "../utils";

import Loading from "../components/Loading";

class Signin extends React.Component {
  state = {
    username: "",
    password: ""
  };

  onChange = e => {
    const { target } = e,
      { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  submit = e => {
    e.preventDefault();
    const validate = this.validate();
    if (validate.valid) {
      const { username, password } = this.state;
      this.setState({
        errors: []
      });
      this.props.signin({
        username,
        password
      });
    } else {
      this.setState({
        errors: validate.errors
      });
    }
  };

  validate = () => {
    const errors = [];
    const { username, password } = this.state;
    if (!username) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return {
      valid: Object.keys(errors).length < 1 ? true : false,
      errors
    };
  };

  render() {
    const { username, password, errors = [] } = this.state,
      { signinIn, signinError, signedIn, expired, location } = this.props,
      { search } = location,
      params = parseQueryParameters(search);
    if (signedIn) {
      return <Redirect to={params.redirect || "/explore/items"} />;
    }
    return (
      <div className="flex-container flex-column align-center space-between login">
        <p className="login__header">Easy gestor de medios</p>
        <form onSubmit={this.submit} className="card login__form">
          <div className="login__form-title">Log in</div>
          <div className="card-body">
            {expired && (
              <p className="text-danger expired-text">
                Su sesión ha expirado, por favor ingrese nuevamente
              </p>
            )}
            <label className="form-group">
              <span>Usuario</span>
              <input
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
                className={`form-control ${
                  errors.username ? " is-invalid" : ""
                }`}
              />
              <p className="invalid-feedback">{errors.username}</p>
            </label>
            <label className="form-group">
              <span>Contraseña</span>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
                className={`form-control ${
                  errors.password ? " is-invalid" : ""
                }`}
              />
              <p className="invalid-feedback">{errors.password}</p>
            </label>
            {signinIn && <Loading className="login__form-loader" />}
            <button type="submit" className="btn btn-link login__form-submit">
              Entrar
            </button>
            {signinError && (
              <p className="text-danger">
                El nombre de usuario o la contraseña pueden ser incorrectos
              </p>
            )}
          </div>
        </form>
        <p className="login__footer">© 2019 Easy Argentina</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  const { signedIn, signinError, signinIn, expired } = user;
  return {
    expired,
    signedIn,
    signinError,
    signinIn
  };
};

export default connect(
  mapStateToProps,
  { signin }
)(Signin);
