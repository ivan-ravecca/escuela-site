import React, { useState } from "react";
import { generateDiploma } from "../services/DiplomaService";

const DiplomaGenerate: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [qrResults, setQrResults] = useState<
    { link: string; imageUrl?: string; success: boolean }[]
  >([]);

  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <h2>Generar Diploma </h2>
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
                  <span>Generando QR</span>, un momento por favor.
                </p>
              </div>
            )}
            {error && (
              <div
                className={`notification error closeable`}
                style={{
                  display: "block",
                }}
              >
                <p>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
              <textarea
                placeholder="Ingrese los enlaces uno por línea"
                rows={5}
                style={{ width: "100%", marginBottom: "15px" }}
                id="linksTextarea"
                onChange={() => {
                  // Clear error when user starts typing
                  if (error) setError(null);
                }}
              />
              <div style={{ marginBottom: "20px" }}>
                <button
                  className="button medium color"
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      setError(null);

                      const textarea = document.getElementById(
                        "linksTextarea",
                      ) as HTMLTextAreaElement;
                      const links = textarea.value
                        .split("\n")
                        .map((link) => link.trim())
                        .filter((link) => link.length > 0);

                      if (links.length === 0) {
                        setError("Por favor ingrese al menos un enlace");
                        setIsLoading(false);
                        return;
                      }

                      const results = await Promise.all(
                        links.map(async (link) => {
                          try {
                            const response = await generateDiploma(link);
                            let blobData;
                            try {
                              if (
                                response &&
                                typeof response.blob === "function"
                              ) {
                                blobData = await response.blob();
                              } else {
                                // If it's JSON or other format, create error
                                throw new Error("Invalid response format");
                              }
                            } catch (blobError) {
                              console.error(
                                `Error processing response for ${link}:`,
                                blobError,
                              );
                              throw blobError;
                            }

                            // Now create URL from valid blob
                            const imageUrl = URL.createObjectURL(blobData);
                            return {
                              link,
                              imageUrl,
                              success: true,
                            };
                          } catch (err) {
                            console.error(
                              `Error generating QR for ${link}:`,
                              err,
                            );
                            return { link, success: false };
                          }
                        }),
                      );

                      // Save the results to state
                      setQrResults(results);
                    } catch (err) {
                      console.error("Error generating QRs:", err);
                      setError("Error al generar los códigos QR");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  Generar QR
                </button>
                <button
                  className="button medium"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    // Clear textarea
                    const textarea = document.getElementById(
                      "linksTextarea",
                    ) as HTMLTextAreaElement;
                    if (textarea) textarea.value = "";

                    // Clean up any object URLs
                    qrResults.forEach((result) => {
                      if (result.success && result.imageUrl) {
                        URL.revokeObjectURL(result.imageUrl);
                      }
                    });

                    // Clear results and errors
                    setQrResults([]);
                    setError(null);
                  }}
                >
                  Limpiar
                </button>
              </div>
            </form>

            {!isLoading && !error && qrResults && qrResults.length > 0 && (
              <div>
                <h3>Códigos QR Generados</h3>
                <div
                  className="qr-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {qrResults.map((result, index) => (
                    <div
                      key={index}
                      className="qr-item"
                      style={{
                        border: "1px solid #eee",
                        padding: "15px",
                        borderRadius: "5px",
                      }}
                    >
                      {result.success ? (
                        <>
                          <img
                            src={result.imageUrl}
                            alt={`QR Code for ${result.link}`}
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                          <p
                            style={{
                              marginTop: "10px",
                              wordBreak: "break-all",
                            }}
                          >
                            {result.link}
                          </p>
                          <a
                            href={result.imageUrl}
                            download={`qr-${index}.png`}
                            className="button small color"
                            style={{ marginTop: "10px" }}
                          >
                            Descargar QR
                          </a>
                        </>
                      ) : (
                        <div
                          className="notification error"
                          style={{ display: "block" }}
                        >
                          <p>Error al generar QR para: {result.link}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiplomaGenerate;
