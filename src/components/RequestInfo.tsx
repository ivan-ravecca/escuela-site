import React, { useState } from "react";
import { COURSES } from "../data/courses";
import { RequestInfoProps } from "../data/interfaces";

const RequestInfo: React.FC<RequestInfoProps> = ({
  inquiringName,
  requiresPhysicalPresence,
  requiresGraduationYear,
}) => {
  const [ongoing, setOngoing] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsDisabled(true);
      setIsProcessing(false);
    }, 2000);
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
          <input name="name" type="text" id="name" />
        </div>

        <div>
          <label htmlFor="email" accessKey="E">
            Email: <span>*</span>
          </label>
          <input name="email" type="email" id="email" />
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
          />
        </div>
        <div>
          <label htmlFor="course" accessKey="C">
            Curso: <span>*</span>
          </label>
          <select name="course" id="course">
            <option key="-1" value="" disabled selected>
              Seleccionar
            </option>
            {COURSES.map((course, index) => (
              <option key={index} value={course.id}>
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
              onClick={() => setOngoing(!ongoing)}
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
