import React, { useEffect, useState } from "react";
import { COURSES } from "../data/courses";
import { RequestInfoProps } from "../data/interfaces";
import { sendInquire } from "../services/EmailService";
import { emailPattern, phonePattern, ciPattern } from "../helpers/tools";
import { Link } from "react-router-dom";

const RequestInfo: React.FC<RequestInfoProps> = ({
  inquiringName,
  requiresPhysicalPresence,
  requiresGraduationYear,
}) => {
  const [ongoing, setOngoing] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResultMessage, setShowResultMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    ci: "",
    year: "",
  });

  useEffect(() => {
    validateFields();
  }, [formFields, ongoing]);

  const validateFields = () => {
    const { name, email, phone, course, ci, year } = formFields;
    if (
      name.length > 0 &&
      emailPattern.test(email) &&
      phonePattern.test(phone) &&
      course.length > 0 &&
      ciPattern.test(ci) &&
      ((requiresGraduationYear &&
        ((year.length === 4 && Number(year) <= new Date().getFullYear()) ||
          ongoing)) ||
        !requiresGraduationYear)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleChange = (component: string, value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [component]: value,
    }));
  };
  const handleCheckboxChange = () => {
    setOngoing(!ongoing);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsDisabled(true);
    try {
      await sendInquire({
        ...formFields,
        inquire: inquiringName,
        year: ongoing ? "" : formFields.year,
      });
      setIsSuccess(true);
      setIsDisabled(false);
      setFormFields({
        name: "",
        email: "",
        phone: "",
        course: "",
        ci: "",
        year: "",
      });
    } catch (error) {
      setIsSuccess(false);
      console.log(`Error trying to send inquire: ${error}`);
    } finally {
      setIsProcessing(false);
      setShowResultMessage(true);
    }
  };

  return (
    <div id="contact" className="modal">
      <h3>{inquiringName}</h3>
      <p>
        Para realizar la <em>{inquiringName}</em> debe indicar algunos datos;
        estos son necesarios para poder procesarlo de manera eficiente y
        asegurar que la información proporcionada es correcta y completa.
      </p>
      {requiresPhysicalPresence && (
        <p>
          <strong>
            Nota: para <em>{inquiringName}</em> solo podrá{" "}
            <u>retirarlo la persona físicamente</u> por la escuela.
          </strong>
        </p>
      )}
      {!requiresPhysicalPresence && (
        <p>
          <strong>
            Nota: una vez procesada la <em>{inquiringName}</em> se enviará por
            correo electrónico al indicado en éste formulario.
          </strong>
        </p>
      )}
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
            <span>Procesando pedido</span>, un momento mientras enviamos la
            información.
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
              <span>{isSuccess ? "Consulta enviada" : "Ocurrió un error"}</span>
              {isSuccess
                ? ", pronto nos estaremos contactando."
                : " al enviar la información, por favor intenta nuevamente o por otro medio."}
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
            Nombre y apellido (alumno): <span>*</span>
          </label>
          <input
            name="name"
            type="text"
            id="name"
            value={formFields.name}
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}
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
            value={formFields.email}
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="phone" accessKey="P">
            Celular: <span>*</span>
          </label>
          <input
            name="phone"
            type="text"
            id="phone"
            placeholder="09XXXXXXX"
            aria-placeholder="09XXXXXXX"
            value={formFields.phone}
            onChange={(e) => {
              handleChange("phone", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="course" accessKey="C">
            Curso: <span>*</span>
          </label>
          <select
            name="course"
            id="course"
            onChange={(e) => {
              handleChange("course", e.target.value);
            }}
            defaultValue="-1"
            value={formFields.course || "-1"}
          >
            <option key="-1" value="-1" disabled>
              Seleccionar
            </option>
            {COURSES.map((course, index) => (
              <option key={index} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ci" accessKey="D">
            Documento: <span>*</span>
          </label>
          <input
            name="ci"
            type="text"
            id="ci"
            aria-placeholder="1.234.567-8"
            placeholder="1.234.567-8"
            value={formFields.ci}
            onChange={(e) => {
              handleChange("ci", e.target.value);
            }}
          />
        </div>
        {requiresGraduationYear && (
          <div style={{ display: "flex", alignItems: "stretch" }}>
            <label
              htmlFor="ongoing"
              accessKey="O"
              style={{ marginRight: "10px" }}
            >
              Cursando actualmente:
            </label>
            <input
              type="checkbox"
              id="ongoing"
              name="ongoing"
              checked={ongoing}
              onChange={handleCheckboxChange}
              style={{ width: "auto" }}
            />
          </div>
        )}

        {!ongoing && (
          <div>
            <label htmlFor="year" accessKey="A">
              Año de egreso:
            </label>
            <input
              name="year"
              type="text"
              id="year"
              aria-placeholder="2024"
              placeholder="2024"
              pattern="[0-9]{4}"
              value={formFields.year}
              onChange={(e) => {
                handleChange("year", e.target.value);
              }}
            />
          </div>
        )}
        <input
          type="submit"
          className="submit"
          id="submit"
          value="Consultarnos"
          disabled={isDisabled || isProcessing ? true : false}
          aria-disabled={isDisabled || isProcessing}
          onClick={(e) => handleSubmit(e)}
        />
      </fieldset>
    </div>
  );
};

export default RequestInfo;
