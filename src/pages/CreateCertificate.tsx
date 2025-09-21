import React, { useState } from "react";
import { createCertificate } from "../services/DiplomaService";

const CreateCertificate: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    courseDate: "",
    certMec: false,
    driveUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleClearForm = () => {
    setFormData({
      studentName: "",
      courseName: "",
      courseDate: "",
      certMec: false,
      driveUrl: "",
    });
    setError(null);

    // Clean up object URL if exists
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.studentName || !formData.courseName || !formData.courseDate) {
      setError("Por favor complete todos los campos requeridos");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Clean up previous URL if exists
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      const response = await createCertificate(formData);

      if (!response) {
        throw new Error("No se recibió respuesta del servidor");
      }

      // Verificar si la respuesta ya es un Blob
      if (response instanceof Blob) {
        const url = URL.createObjectURL(response);
        setPdfUrl(url);
      } else {
        throw new Error("Formato de respuesta inesperado");
      }
    } catch (err) {
      console.error("Error generating certificate:", err);
      setError("Error al generar el certificado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <h2>Generar Certificado</h2>
          <div className="page-content">
            {isLoading && (
              <div
                className="notification notice"
                style={{ display: isLoading ? "block" : "none" }}
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
                  <span>Generando certificado</span>, un momento por favor.
                </p>
              </div>
            )}

            {error && (
              <div
                className="notification error closeable"
                style={{
                  display: "block",
                }}
              >
                <p>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-field" style={{ marginBottom: "15px" }}>
                <label htmlFor="studentName">Nombre de estudiante</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  required
                />
              </div>

              <div className="form-field" style={{ marginBottom: "15px" }}>
                <label htmlFor="courseName">Nombre de curso</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  required
                />
              </div>

              <div className="form-field" style={{ marginBottom: "15px" }}>
                <label htmlFor="courseDate">Fecha de curso</label>
                <input
                  type="text"
                  id="courseDate"
                  name="courseDate"
                  value={formData.courseDate}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  placeholder="Ej: 25 de Mayo de 2025"
                  required
                />
              </div>
              <div className="form-field" style={{ marginBottom: "15px" }}>
                <div className="form-field" style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="certMec"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="certMec"
                      name="certMec"
                      checked={formData.certMec}
                      onChange={(e) => {
                        const { name, checked } = e.target;
                        setFormData((prev) => ({ ...prev, [name]: checked }));
                      }}
                      style={{ marginRight: "8px" }}
                    />
                    Certifica MEC
                  </label>
                </div>
              </div>
              {!formData.certMec && (
                <div className="form-field" style={{ marginBottom: "15px" }}>
                  <label htmlFor="driveUrl">URL de Drive</label>
                  <input
                    type="text"
                    id="driveUrl"
                    name="driveUrl"
                    value={formData.driveUrl}
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>
              )}

              <div style={{ marginBottom: "20px" }}>
                <button
                  type="submit"
                  className="button medium color"
                  disabled={isLoading}
                >
                  Generar certificado
                </button>
                <button
                  type="button"
                  className="button medium"
                  style={{ marginLeft: "10px" }}
                  onClick={handleClearForm}
                >
                  Limpiar
                </button>
              </div>
            </form>

            {!isLoading && !error && pdfUrl && (
              <div className="pdf-container" style={{ marginTop: "20px" }}>
                <h3>Certificado Generado</h3>
                <div className="mb-4">
                  <a
                    href={pdfUrl}
                    download={`certificado-${formData.studentName}.pdf`}
                    className="button color"
                    style={{ marginBottom: "15px" }}
                  >
                    Descargar Certificado
                  </a>
                </div>
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="800px"
                  className="border rounded shadow-lg"
                  title={`Certificado de ${formData.studentName}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate;
