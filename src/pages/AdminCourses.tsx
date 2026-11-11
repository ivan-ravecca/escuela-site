import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseService } from "../services/CourseService";
import { useCourses } from "../contexts/CourseContext";
import { SiteCourse, SiteCourseInput } from "../types/siteCourse";
import "../styles/adminCourses.scss";

const emptyCourse = (): SiteCourseInput => ({
  id: "", title: "", term: "", openRegistration: "", info: "", curriculum: null,
  requirements: [], images: [], mostWanted: false, shortCourse: false,
  masterClass: false, sortOrder: 1, menuOrder: 0,
  menuPositions: { mostWanted: 1, shortCourse: 1, masterClass: 1 }, published: true, durationHours: null,
  modality: null, category: null, syllabusSummary: null, schedule: null,
  jobOpportunities: null,
});

function toInput(course: SiteCourse): SiteCourseInput {
  return {
    id: course.id, title: course.title, term: course.term,
    openRegistration: course.openRegistration, info: course.info,
    curriculum: course.curriculum, requirements: course.requirements, images: course.images,
    mostWanted: course.mostWanted, shortCourse: course.shortCourse, masterClass: course.masterClass,
    sortOrder: Math.max(1, course.sortOrder), menuOrder: course.menuOrder,
    menuPositions: course.menuPositions, published: course.published,
    durationHours: course.durationHours, modality: course.modality, category: course.category,
    syllabusSummary: course.syllabusSummary, schedule: course.schedule, jobOpportunities: course.jobOpportunities,
  };
}

function message(error: unknown): string {
  if (axios.isAxiosError(error) && typeof error.response?.data?.message === "string") {
    return error.response.data.message;
  }
  return "No se pudo completar la operación. Inténtalo nuevamente.";
}

function slugify(title: string): string {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function HtmlField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="admin-courses__html-field">
      <label>{label}
        <textarea value={value} rows={8} onChange={(event) => onChange(event.target.value)} />
      </label>
      <details>
        <summary>Vista previa de {label}</summary>
        <iframe
          title={`Vista previa de ${label}`}
          sandbox=""
          srcDoc={`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><body>${value}</body>`}
        />
      </details>
    </div>
  );
}

function CourseForm({ existing, onCancel, onSaved }: {
  existing?: SiteCourse;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [course, setCourse] = useState<SiteCourseInput>(() => existing ? toInput(existing) : emptyCourse());
  const [requirements, setRequirements] = useState(() => course.requirements.join("\n"));
  const [autoSlug, setAutoSlug] = useState(!existing);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const update = <K extends keyof SiteCourseInput>(key: K, value: SiteCourseInput[K]) =>
    setCourse((current) => ({ ...current, [key]: value }));

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const src = await CourseService.upload(file);
      setCourse((current) => ({
        ...current,
        images: [...current.images, { src, alt: "", isActive: current.images.length === 0 }],
      }));
    } catch (cause) {
      console.error("Error al subir imagen", cause);
      setError(message(cause));
    } finally {
      setBusy(false);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await CourseService.save({
        ...course,
        requirements: requirements.split("\n").map((item) => item.trim()).filter(Boolean),
        curriculum: course.curriculum?.trim() ? course.curriculum : null,
      }, existing?.recordId);
      await onSaved();
    } catch (cause) {
      console.error("Error al guardar curso", cause);
      setError(message(cause));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="admin-courses__form" onSubmit={submit}>
      <div className="headline"><h3>{existing ? "Editar curso" : "Nuevo curso"}</h3></div>
      {error && <div className="notification error" role="alert"><p>{error}</p></div>}
      <label>Nombre
        <input required maxLength={255} value={course.title} onChange={(event) => {
          const title = event.target.value;
          setCourse((current) => ({ ...current, title, id: autoSlug ? slugify(title) : current.id }));
        }} />
      </label>
      <label>ID de la URL
        <input required maxLength={191} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={course.id}
          onChange={(event) => { setAutoSlug(false); update("id", event.target.value); }} />
      </label>
      <p className="admin-courses__hint">URL: /cursos/{course.id || "id-del-curso"}. Al cambiar el ID se conservará la URL anterior.</p>
      <label>Duración o descripción breve
        <textarea value={course.term} onChange={(event) => update("term", event.target.value)} />
      </label>
      <HtmlField label="Inscripciones (HTML básico)" value={course.openRegistration} onChange={(value) => update("openRegistration", value)} />
      <HtmlField label="Información (HTML básico)" value={course.info} onChange={(value) => update("info", value)} />
      <HtmlField label="Temario (HTML básico)" value={course.curriculum || ""} onChange={(value) => update("curriculum", value)} />
      <label>Requisitos, uno por línea
        <textarea rows={5} value={requirements} onChange={(event) => setRequirements(event.target.value)} />
      </label>
      <fieldset className="admin-courses__section">
        <legend>Menú</legend>
        <p className="admin-courses__hint">Las posiciones empiezan en 1 y solo cuentan los cursos publicados. Al mover un curso, los demás se desplazan. Si la posición supera la cantidad disponible, se ubicará al final.</p>
        <label>Posición en el listado <input type="number" required min="1" max="1000000" value={course.sortOrder} onChange={(event) => update("sortOrder", Number(event.target.value))} /></label>
        {([
          ["mostWanted", "Los más buscados"],
          ["shortCourse", "Cursos cortos"],
          ["masterClass", "Masterclass"],
        ] as const).map(([key, label]) => (
          <div key={key}>
            <label className="admin-courses__choice"><input type="checkbox" checked={course[key]} onChange={(event) => update(key, event.target.checked)} /> {label}</label>
            {course[key] && <label>Posición en {label}<input type="number" required min="1" max="1000000" value={course.menuPositions[key]} onChange={(event) => update("menuPositions", { ...course.menuPositions, [key]: Number(event.target.value) })} /></label>}
          </div>
        ))}
        <label className="admin-courses__choice"><input type="checkbox" checked={course.published} onChange={(event) => update("published", event.target.checked)} /> Publicado</label>
      </fieldset>
      <fieldset className="admin-courses__section">
        <legend>Imágenes</legend>
        <label>Subir imagen JPEG, PNG o WebP (máximo 8 MB)
          <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
            event.target.value = "";
          }} />
        </label>
        {course.images.map((image, index) => (
          <div className="admin-courses__image" key={image.src}>
            <img src={image.src} alt={image.alt} />
            <div className="admin-courses__image-details">
            <label>Texto alternativo
              <input value={image.alt} onChange={(event) => update("images", course.images.map((item, i) => i === index ? { ...item, alt: event.target.value } : item))} />
            </label>
            <label className="admin-courses__choice"><input type="radio" name="active-image" checked={image.isActive} onChange={() => update("images", course.images.map((item, i) => ({ ...item, isActive: i === index })))} /> Imagen activa</label>
            <div className="admin-courses__actions">
            <button className="button gray" type="button" disabled={index === 0} onClick={() => {
              const images = [...course.images];
              [images[index - 1], images[index]] = [images[index], images[index - 1]];
              update("images", images);
            }}>Subir</button>
            <button className="button gray" type="button" onClick={() => {
              const images = course.images.filter((_, i) => i !== index);
              if (images.length && !images.some((item) => item.isActive)) images[0] = { ...images[0], isActive: true };
              update("images", images);
            }}>Quitar</button>
            </div>
            </div>
          </div>
        ))}
      </fieldset>
      <fieldset className="admin-courses__section">
        <legend>Información adicional para el asistente (opcional)</legend>
        <label>Duración en horas <input type="number" min="1" value={course.durationHours ?? ""} onChange={(event) => update("durationHours", event.target.value ? Number(event.target.value) : null)} /></label>
        <label>Modalidad <select value={course.modality ?? ""} onChange={(event) => {
          const value = event.target.value;
          if (value === "" || value === "presencial" || value === "virtual" || value === "semipresencial") update("modality", value || null);
        }}><option value="">Sin especificar</option><option value="presencial">Presencial</option><option value="virtual">Virtual</option><option value="semipresencial">Semipresencial</option></select></label>
        <label>Categoría <select value={course.category ?? ""} onChange={(event) => {
          const value = event.target.value;
          if (value === "" || value === "inicial" || value === "avanzado" || value === "especializacion") update("category", value || null);
        }}><option value="">Sin especificar</option><option value="inicial">Inicial</option><option value="avanzado">Avanzado</option><option value="especializacion">Especialización</option></select></label>
        <label>Resumen del temario <textarea value={course.syllabusSummary ?? ""} onChange={(event) => update("syllabusSummary", event.target.value || null)} /></label>
        <label>Horarios <textarea value={course.schedule ?? ""} onChange={(event) => update("schedule", event.target.value || null)} /></label>
        <label>Salidas laborales <textarea value={course.jobOpportunities ?? ""} onChange={(event) => update("jobOpportunities", event.target.value || null)} /></label>
      </fieldset>
      <div className="admin-courses__actions">
        <button className="button medium color" type="submit" disabled={busy}>{busy ? "Procesando..." : "Guardar"}</button>
        <button className="button medium gray" type="button" disabled={busy} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<SiteCourse[]>([]);
  const [editing, setEditing] = useState<SiteCourse | "new" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { refresh } = useCourses();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setCourses(await CourseService.list(true));
    } catch (cause) {
      console.error("Error al cargar administración de cursos", cause);
      setError(message(cause));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let active = true;
    CourseService.list(true).then((items) => {
      if (active) setCourses(items);
    }).catch((cause) => {
      if (active) {
        console.error("Error al cargar administración de cursos", cause);
        setError(message(cause));
      }
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const saved = async () => {
    setEditing(null);
    await Promise.all([load(), refresh()]);
  };
  const toggle = async (course: SiteCourse) => {
    if (!window.confirm(course.published ? `¿Despublicar ${course.title}?` : `¿Restaurar ${course.title}?`)) return;
    try {
      await CourseService.save({ ...toInput(course), published: !course.published }, course.recordId);
      await saved();
    } catch (cause) {
      console.error("Error al actualizar publicación", cause);
      setError(message(cause));
    }
  };

  return (
    <div className="page-content admin-courses"><div className="container"><div className="sixteen columns">
      <h2>Administración de cursos</h2>
      {editing ? <CourseForm key={editing === "new" ? "new" : editing.recordId} existing={editing === "new" ? undefined : editing} onCancel={() => setEditing(null)} onSaved={saved} /> : (
        <>
          <div className="admin-courses__toolbar">
            <button className="button medium color" type="button" onClick={() => setEditing("new")}>Nuevo curso</button>
          </div>
          {loading && <div className="notification notice" role="status"><p>Cargando cursos...</p></div>}
          {error && <div className="notification error" role="alert"><p>{error}</p> <button className="button gray" type="button" onClick={() => void load()}>Reintentar</button></div>}
          {!loading && !error && courses.length === 0 && <div className="notification notice"><p>No hay cursos para mostrar.</p></div>}
          <ul className="admin-courses__list">{courses.map((course) => (
            <li className="admin-courses__item" key={course.recordId}>
              <div className="admin-courses__item-info">
                <h3>{course.title}</h3>
                <span className={`admin-courses__status ${course.published ? "admin-courses__status--published" : ""}`}>{course.published ? "Publicado" : "Despublicado"}</span>
                {course.published ? (
                  <a className="admin-courses__path" href={course.path} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${course.title} en una pestaña nueva`}>{course.path}</a>
                ) : (
                  <span className="admin-courses__path">{course.path}</span>
                )}
              </div>
              <div className="admin-courses__actions">
                <button className="button color" type="button" onClick={() => setEditing(course)}>Editar</button>
                <button className="button gray" type="button" onClick={() => void toggle(course)}>{course.published ? "Despublicar" : "Restaurar"}</button>
              </div>
            </li>
          ))}</ul>
        </>
      )}
    </div></div></div>
  );
};

export default AdminCourses;
