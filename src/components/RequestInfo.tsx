import React, { useEffect, useState } from "react";
import { COURSES } from "../data/courses";
import { RequestInfoProps } from "../data/interfaces";
import { sendInquire } from "../services/EmailService";
import { emailPattern, phonePattern, ciPattern } from "../helpers/tools";

const RequestInfo: React.FC<RequestInfoProps> = ({
  inquiringName,
  requiresPhysicalPresence,
  requiresGraduationYear,
}) => {
  const [ongoing, setOngoing] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      console.log(`Error trying to send inquire: ${error}`);
    } finally {
      setIsProcessing(false);
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
      <fieldset>
        <div>
          <label htmlFor="name" accessKey="U">
            Nombre y apellido (alumno): <span>*</span>
          </label>
          <input
            name="name"
            type="text"
            id="name"
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
