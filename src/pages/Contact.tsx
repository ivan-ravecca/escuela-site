import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContactLeftColumn from "../components/ContactLeftColumn";
import { GOOGLE_MAPS_URL } from "../../app.config";
import { sendContact } from "../services/EmailService";
import { debounce } from "../helpers/tools";
import { emailPattern } from "../helpers/tools";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [showResultMessage, setShowResultMessage] = useState(false);

  useEffect(() => {
    setIsDisabled(!areFieldsValid());
  }, [name, email, comments]);

  const debouncedHandleChange = debounce((component: string, value: string) => {
    switch (component) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "comments":
        setComments(value);
        break;
      default:
        throw new Error("Invalid component");
    }
  }, 300);

  const areFieldsValid = () => {
    if (!name || !email || !comments) {
      return false;
    }

    if (name.length < 3) {
      return false;
    }

    if (email.length < 6 || !emailPattern.test(email)) {
      return false;
    }

    if (comments.length < 10) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendEmail();
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setComments("");
  };

  const sendEmail = async () => {
    setIsProcessing(true);
    try {
      await sendContact(name, email, comments);
      setIsSuccess(true);
      clearFields();
    } catch (error) {
      setIsSuccess(false);
      console.error("Error sending email", error);
    } finally {
      setIsProcessing(false);
      setShowResultMessage(true);
    }
  };
  return (
    <>
      <div className="container floated">
        <ContactLeftColumn />
        <div className="eleven floated right">
          <section className="page-content">
            <h1 className="margin">Formulario de contacto</h1>
            <section id="contact">
              <mark id="message">
                <div
                  className="notification notice"
                  style={{ display: isProcessing ? "block" : "none" }}
                >
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 40 40"
                      stroke="#000"
                      style={{ marginRight: "10px" }}
                    >
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(2 2)" strokeWidth="3">
                          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                          <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </g>
                      </g>
                    </svg>
                    <span>Enviando consulta</span>, un momento mientras enviamos
                    la consulta.
                  </p>
                </div>
                {showResultMessage && (
                  <div
                    className={`notification ${isSuccess ? "success" : "error"} closeable`}
                    style={{
                      display: "block",
                    }}
                  >
                    <p>
                      <span>
                        {isSuccess
                          ? "Gracias por contactarnos"
                          : "Ocurrió un error"}
                      </span>
                      {isSuccess
                        ? ", tu consulta ha sido enviada con éxito."
                        : " al enviar tu consulta, por favor intenta nuevamente o por otro medio."}
                    </p>
                    <Link
                      className="close"
                      to="#"
                      onClick={() => setShowResultMessage(false)}
                    >
                      <i className="icon-remove"></i>
                    </Link>
                  </div>
                )}
              </mark>

              <fieldset>
                <div>
                  <label htmlFor="name" accessKey="U">
                    Nombre: <span>*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    onChange={(e) =>
                      debouncedHandleChange("name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label htmlFor="email" accessKey="E">
                    Email: <span>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    pattern="^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
                    onChange={(e) =>
                      debouncedHandleChange("email", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label htmlFor="comments" accessKey="C">
                    Mensaje: <span>*</span>
                  </label>
                  <textarea
                    name="comments"
                    cols={40}
                    rows={3}
                    id="comments"
                    spellCheck="true"
                    onChange={(e) =>
                      debouncedHandleChange("comments", e.target.value)
                    }
                  ></textarea>
                </div>
              </fieldset>
              <input
                type="submit"
                className="submit"
                id="submit"
                value="Consultarnos"
                disabled={isDisabled || isProcessing ? true : false}
                aria-disabled={isDisabled || isProcessing}
                onClick={(e) => handleSubmit(e)}
              />
              <div className="clearfix"></div>
            </section>
          </section>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="sixteen columns">
          <h3>Nos ubicamos en</h3>
          <section className="google-map-container">
            <iframe
              id="map"
              data-animate-effect="fadeIn"
              src={GOOGLE_MAPS_URL}
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact;
