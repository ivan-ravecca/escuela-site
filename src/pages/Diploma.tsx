import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiploma } from "../services/DiplomaService";

const Diploma: React.FC = () => {
  const { diplomaHash } = useParams<{ diplomaHash: string }>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    const fetchDiploma = async (diplomaID: string) => {
      try {
        setIsLoading(true);
        const response = await getDiploma(diplomaID);

        if (!response.ok) {
          throw new Error(`Failed to fetch diploma: ${response.status}`);
        }
        // Extract filename from Content-Disposition header if available
        const contentDisposition = response.headers.get("content-disposition");

        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
          );
          if (filenameMatch && filenameMatch[1]) {
            // Remove quotes if present
            const extractedName = filenameMatch[1].replace(/['"]/g, "");
            setFileName(extractedName);
          }
        }

        // Assuming the API returns a URL or blob for the PDF
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setPdfUrl(url);
        setError(null);
      } catch (err) {
        console.error("Error fetching diploma:", err);
        setError(
          "Error al descargar el diploma, por favor pongase en contacto con la Escuela.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (diplomaHash) {
      fetchDiploma(diplomaHash);
    }

    // Clean up created object URL when component unmounts
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [diplomaHash]);

  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <h2>Diploma {fileName && ` - ${fileName}`}</h2>
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
                  <span>Cargando diploma</span>, un momento mientras descarga.
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

            {pdfUrl && !isLoading && !error && (
              <div className="w-full flex justify-center">
                <div className="mb-4 flex justify-end">
                  <a
                    href={pdfUrl}
                    download={fileName || "diploma.pdf"}
                    className="button color"
                    style={{ marginBottom: "15px" }}
                  >
                    <i className="icon-download"></i> Descargar Diploma
                  </a>
                </div>
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="800px"
                  className="border rounded shadow-lg"
                  title={fileName}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diploma;
