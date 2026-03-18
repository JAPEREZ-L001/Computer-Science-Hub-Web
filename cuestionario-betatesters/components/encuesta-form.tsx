"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// ─── Schema ──────────────────────────────────────────────────────────────────

const schema = z.object({
  // Sección 1
  rol: z.enum(["dev", "biz", "no_tecnico", "otro"], { required_error: "Selecciona tu rol" }),
  rol_otro: z.string().optional(),
  familiaridad: z.enum(["no_conocia", "habia_oido", "conozco_alguien", "parte_activa"], { required_error: "Selecciona una opción" }),
  dispositivo: z.enum(["laptop_desktop", "tablet", "telefono"], { required_error: "Selecciona un dispositivo" }),

  // Sección 2
  entiende_csh: z.string().min(1, "Este campo es requerido"),
  claridad_homepage: z.enum(["muy_claro", "claro", "algo_confuso", "muy_confuso"], { required_error: "Selecciona una opción" }),
  confusion_detalle: z.string().optional(),
  propuesta_valor: z.string().min(1, "Este campo es requerido"),

  // Sección 3
  inicio_rapido: z.enum(["si", "mas_o_menos", "no"], { required_error: "Selecciona una opción" }),
  inicio_detalle: z.string().optional(),
  sobre_csh_facilidad: z.enum(["muy_facil", "facil", "normal", "dificil"], { required_error: "Selecciona una opción" }),
  valores_facilidad: z.enum(["muy_facil", "facil", "normal", "dificil"], { required_error: "Selecciona una opción" }),
  programas_facilidad: z.enum(["muy_facil", "facil", "normal", "dificil"], { required_error: "Selecciona una opción" }),
  ruta_sugerida: z.enum(["oriento_bastante", "podria_simplificarse", "no_la_note", "no_resulto_util"], { required_error: "Selecciona una opción" }),
  ruta_mejora: z.string().optional(),

  // Sección 4.1 – Dev
  dev_seriedad: z.enum(["mucho", "bastante", "poco", "nada"]).optional(),
  dev_no_es_para_mi: z.string().optional(),
  dev_seccion_interes: z.string().optional(),

  // Sección 4.2 – Biz
  biz_iniciativas_claras: z.enum(["muy_claro", "algo_claro", "poco_claro", "nada_claro"]).optional(),
  biz_info_faltante: z.string().optional(),
  biz_frase_justificacion: z.string().optional(),

  // Sección 4.3 – No técnico
  nt_abrumado: z.enum(["no_todo_bien", "un_poco", "bastante", "mucho"]).optional(),
  nt_solo_expertos: z.string().optional(),

  // Sección 5
  ganas_participar: z.enum(["muchas", "algunas", "pocas", "ninguna"], { required_error: "Selecciona una opción" }),
  cta_claros: z.enum(["si", "mas_o_menos", "no"], { required_error: "Selecciona una opción" }),
  cta_cambiar: z.string().optional(),
  micro_intake: z.enum(["muy_largo", "bien", "muy_corto"], { required_error: "Selecciona una opción" }),
  micro_intake_mejora: z.string().optional(),

  // Sección 6
  sensacion_visual: z.enum(["muy_profesional", "cuidada_pesada", "simple_clara", "confusa"], { required_error: "Selecciona una opción" }),
  animaciones: z.enum(["muy_agradables", "bien_muchas", "casi_no_note", "molestas"], { required_error: "Selecciona una opción" }),
  animaciones_detalle: z.string().optional(),

  // Sección 7
  cambio_uno: z.string().min(1, "Este campo es requerido"),
  mas_gusto: z.string().min(1, "Este campo es requerido"),
  sorpresa_positiva: z.string().optional(),
  comentarios_adicionales: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-header">
      <span className="section-number">{number}</span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
  register,
  error,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset className="field-group">
      <legend className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </legend>
      <div className="radio-options">
        {options.map((opt) => (
          <label key={opt.value} className="radio-label">
            <input type="radio" value={opt.value} {...register(name)} />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="field-error">{error}</p>}
    </fieldset>
  );
}

function TextField({
  label,
  name,
  register,
  error,
  placeholder,
  required,
  rows,
}: {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows ?? 3}
        placeholder={placeholder ?? "Tu respuesta aquí..."}
        {...register(name)}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function EncuestaForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const rol = watch("rol");
  const claridad = watch("claridad_homepage");

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Error al enviar");
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Error inesperado");
    }
  }

  if (status === "success") {
    return (
      <div className="success-screen">
        <div className="success-icon">✓</div>
        <h1>¡Gracias por tu feedback!</h1>
        <p>
          Tu respuesta ha sido registrada. Nos ayuda mucho para mejorar el
          Computer Science Hub.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="survey-form" noValidate>
      {/* ── Encabezado ── */}
      <header className="form-header">
        <p className="form-tag">Computer Science Hub · Beta</p>
        <h1 className="form-title">Encuesta para Betatesters</h1>
        <p className="form-description">
          Queremos entender cómo experimentas la web del Hub desde tu perspectiva.
          Esta encuesta toma entre <strong>5 y 10 minutos</strong>.
        </p>
      </header>

      {/* ─────────────────────────────────────────
          SECCIÓN 1: Perfil
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="1" title="Perfil del betatester" />

        <RadioGroup
          label="Rol principal"
          name="rol"
          required
          register={register}
          error={errors.rol?.message}
          options={[
            { value: "dev", label: "Desarrollador / estudiante de computación" },
            { value: "biz", label: "Persona de negocios / gestión / producto" },
            { value: "no_tecnico", label: "Usuario no técnico (interesado en tecnología)" },
            { value: "otro", label: "Otro" },
          ]}
        />
        {rol === "otro" && (
          <div className="field-group indent">
            <label className="field-label" htmlFor="rol_otro">Especifica tu rol</label>
            <input type="text" id="rol_otro" placeholder="Tu rol..." {...register("rol_otro")} />
          </div>
        )}

        <RadioGroup
          label="Nivel de familiaridad con CSH antes de esta prueba"
          name="familiaridad"
          required
          register={register}
          error={errors.familiaridad?.message}
          options={[
            { value: "no_conocia", label: "No conocía el Hub" },
            { value: "habia_oido", label: "Lo había oído mencionar" },
            { value: "conozco_alguien", label: "Conozco a alguien que participa" },
            { value: "parte_activa", label: "Soy parte activa del Hub" },
          ]}
        />

        <RadioGroup
          label="Dispositivo usado durante la prueba"
          name="dispositivo"
          required
          register={register}
          error={errors.dispositivo?.message}
          options={[
            { value: "laptop_desktop", label: "Laptop / Desktop" },
            { value: "tablet", label: "Tablet" },
            { value: "telefono", label: "Teléfono" },
          ]}
        />
      </section>

      {/* ─────────────────────────────────────────
          SECCIÓN 2: Primera impresión
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="2" title="Primera impresión y claridad" />

        <TextField
          label="En tus propias palabras, ¿qué entiendes que es el Computer Science Hub?"
          name="entiende_csh"
          required
          register={register}
          error={errors.entiende_csh?.message}
          rows={4}
        />

        <RadioGroup
          label="¿Qué tan claro te quedó esto en los primeros 10–15 segundos en la homepage?"
          name="claridad_homepage"
          required
          register={register}
          error={errors.claridad_homepage?.message}
          options={[
            { value: "muy_claro", label: "Muy claro" },
            { value: "claro", label: "Claro" },
            { value: "algo_confuso", label: "Algo confuso" },
            { value: "muy_confuso", label: "Muy confuso" },
          ]}
        />
        {(claridad === "algo_confuso" || claridad === "muy_confuso") && (
          <TextField
            label="¿Qué te confundió?"
            name="confusion_detalle"
            register={register}
            error={errors.confusion_detalle?.message}
            placeholder="Cuéntanos qué te generó confusión..."
          />
        )}

        <TextField
          label="¿Qué dirías que es la 'propuesta de valor' principal del Hub según la web?"
          name="propuesta_valor"
          required
          register={register}
          error={errors.propuesta_valor?.message}
          rows={3}
        />
      </section>

      {/* ─────────────────────────────────────────
          SECCIÓN 3: Navegación y estructura
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="3" title="Navegación y estructura" />

        <RadioGroup
          label="¿Pudiste entender rápidamente por dónde empezar a explorar?"
          name="inicio_rapido"
          required
          register={register}
          error={errors.inicio_rapido?.message}
          options={[
            { value: "si", label: "Sí, fue evidente" },
            { value: "mas_o_menos", label: "Más o menos" },
            { value: "no", label: "No, me costó" },
          ]}
        />

        <TextField
          label="Explica brevemente tu respuesta"
          name="inicio_detalle"
          register={register}
          rows={2}
          placeholder="¿Qué te ayudó o qué te costó?"
        />

        <div className="field-group">
          <p className="field-label">¿Qué tan fácil fue encontrar cada sección?<span className="required">*</span></p>
          <div className="matrix-table">
            <div className="matrix-row matrix-header">
              <span></span>
              {["Muy fácil", "Fácil", "Normal", "Difícil"].map((h) => (
                <span key={h} className="matrix-col-label">{h}</span>
              ))}
            </div>
            {[
              { label: "Sobre CSH", name: "sobre_csh_facilidad" },
              { label: "Valores", name: "valores_facilidad" },
              { label: "Programas", name: "programas_facilidad" },
            ].map((row) => (
              <div key={row.name} className="matrix-row">
                <span className="matrix-row-label">{row.label}</span>
                {[
                  { value: "muy_facil" },
                  { value: "facil" },
                  { value: "normal" },
                  { value: "dificil" },
                ].map((opt) => (
                  <label key={opt.value} className="matrix-cell">
                    <input type="radio" value={opt.value} {...register(row.name as keyof FormValues)} />
                  </label>
                ))}
              </div>
            ))}
          </div>
          {(errors.sobre_csh_facilidad || errors.valores_facilidad || errors.programas_facilidad) && (
            <p className="field-error">Completa la valoración de las secciones</p>
          )}
        </div>

        <RadioGroup
          label="¿Te resultó útil la 'ruta sugerida' que aparece en la homepage?"
          name="ruta_sugerida"
          required
          register={register}
          error={errors.ruta_sugerida?.message}
          options={[
            { value: "oriento_bastante", label: "Sí, me orientó bastante" },
            { value: "podria_simplificarse", label: "Está bien pero podría simplificarse" },
            { value: "no_la_note", label: "No la noté" },
            { value: "no_resulto_util", label: "No me resultó útil" },
          ]}
        />

        <TextField
          label="¿Qué mejorarías de esa ruta?"
          name="ruta_mejora"
          register={register}
          placeholder="Sugerencias para mejorar la ruta sugerida..."
          rows={2}
        />
      </section>

      {/* ─────────────────────────────────────────
          SECCIÓN 4: Contenido por perfil (condicional)
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="4" title="Contenido y mensaje" />

        {!rol && (
          <p className="conditional-hint">
            Esta sección se adaptará según el rol que seleccionaste en la sección 1.
          </p>
        )}

        {/* 4.1 Dev */}
        {rol === "dev" && (
          <div className="conditional-block">
            <p className="sub-section-tag">Para desarrolladores / estudiantes de computación</p>

            <RadioGroup
              label="¿Qué tanto sientes que la web refleja una comunidad 'seria' de ingeniería (no solo un club)?"
              name="dev_seriedad"
              register={register}
              options={[
                { value: "mucho", label: "Mucho" },
                { value: "bastante", label: "Bastante" },
                { value: "poco", label: "Poco" },
                { value: "nada", label: "Nada" },
              ]}
            />

            <TextField
              label="¿Hay algo en el contenido que te haga pensar 'esto no es para mí como dev'?"
              name="dev_no_es_para_mi"
              register={register}
              rows={3}
              placeholder="¿Algo que te hiciera sentir que no encajas como desarrollador?"
            />

            <TextField
              label="¿Qué sección te interesó más como desarrollador (y por qué)?"
              name="dev_seccion_interes"
              register={register}
              rows={3}
              placeholder="Sección y razón..."
            />
          </div>
        )}

        {/* 4.2 Biz */}
        {rol === "biz" && (
          <div className="conditional-block">
            <p className="sub-section-tag">Para personas de negocios / gestión / producto</p>

            <RadioGroup
              label="¿Te queda claro en qué tipo de iniciativas/proyectos podría participar/apoyar tu organización?"
              name="biz_iniciativas_claras"
              register={register}
              options={[
                { value: "muy_claro", label: "Muy claro" },
                { value: "algo_claro", label: "Algo claro" },
                { value: "poco_claro", label: "Poco claro" },
                { value: "nada_claro", label: "Nada claro" },
              ]}
            />

            <TextField
              label="¿Qué información te faltó para confiar más en el Hub (métricas, casos, estructura)?"
              name="biz_info_faltante"
              register={register}
              rows={3}
              placeholder="¿Qué datos o evidencias te darían más confianza?"
            />

            <TextField
              label="Si tuvieras que justificar internamente colaborar con el Hub, ¿qué frase de la web usarías?"
              name="biz_frase_justificacion"
              register={register}
              rows={2}
              placeholder="Cita textual o paráfrasis..."
            />
          </div>
        )}

        {/* 4.3 No técnico */}
        {rol === "no_tecnico" && (
          <div className="conditional-block">
            <p className="sub-section-tag">Para usuarios no técnicos</p>

            <RadioGroup
              label="¿Te sentiste abrumado/a por términos técnicos o la jerga?"
              name="nt_abrumado"
              register={register}
              options={[
                { value: "no_todo_bien", label: "No, entendí todo bien" },
                { value: "un_poco", label: "Un poco" },
                { value: "bastante", label: "Bastante" },
                { value: "mucho", label: "Mucho" },
              ]}
            />

            <TextField
              label="¿Hubo alguna parte que te hizo sentir que 'esto es solo para expertos'?"
              name="nt_solo_expertos"
              register={register}
              rows={3}
              placeholder="¿Qué sección o contenido te generó esa sensación?"
            />
          </div>
        )}

        {rol === "otro" && (
          <div className="conditional-block">
            <p className="conditional-hint">
              Dado que tu perfil es &quot;Otro&quot;, comparte libremente qué mensaje o contenido te resultó relevante o irrelevante de la web.
            </p>
            <TextField
              label="¿Qué contenido te resultó relevante o irrelevante?"
              name="dev_no_es_para_mi"
              register={register}
              rows={4}
              placeholder="Comparte tu perspectiva..."
            />
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────
          SECCIÓN 5: Engagement y CTAs
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="5" title="Engagement y CTAs" />

        <RadioGroup
          label="Después de navegar el sitio, ¿qué tanto te dan ganas de hacer 'algo' (sumarte, escribir, participar)?"
          name="ganas_participar"
          required
          register={register}
          error={errors.ganas_participar?.message}
          options={[
            { value: "muchas", label: "Muchas ganas" },
            { value: "algunas", label: "Algunas ganas" },
            { value: "pocas", label: "Pocas ganas" },
            { value: "ninguna", label: "Ninguna" },
          ]}
        />

        <RadioGroup
          label="¿Los botones principales (CTA) te resultaron claros?"
          name="cta_claros"
          required
          register={register}
          error={errors.cta_claros?.message}
          options={[
            { value: "si", label: "Sí, sabría perfectamente qué pasa si hago clic" },
            { value: "mas_o_menos", label: "Más o menos" },
            { value: "no", label: "No, me generan dudas" },
          ]}
        />

        <TextField
          label="¿Cuál CTA cambiarías y cómo?"
          name="cta_cambiar"
          register={register}
          placeholder="Describe qué cambiarías..."
          rows={2}
        />

        <RadioGroup
          label="El formulario corto de interés (micro-intake) te pareció…"
          name="micro_intake"
          required
          register={register}
          error={errors.micro_intake?.message}
          options={[
            { value: "muy_largo", label: "Muy largo" },
            { value: "bien", label: "Bien de longitud" },
            { value: "muy_corto", label: "Muy corto / le falta algo" },
          ]}
        />

        <TextField
          label="¿Qué quitarías o agregarías al micro-intake?"
          name="micro_intake_mejora"
          register={register}
          placeholder="Sugerencias de cambio..."
          rows={2}
        />
      </section>

      {/* ─────────────────────────────────────────
          SECCIÓN 6: Diseño y animaciones
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="6" title="Diseño, animaciones y sensación general" />

        <RadioGroup
          label="¿Cómo describirías la sensación visual de la web?"
          name="sensacion_visual"
          required
          register={register}
          error={errors.sensacion_visual?.message}
          options={[
            { value: "muy_profesional", label: "Muy profesional" },
            { value: "cuidada_pesada", label: "Cuidada pero un poco 'pesada'" },
            { value: "simple_clara", label: "Simple pero clara" },
            { value: "confusa", label: "Confusa / recargada" },
          ]}
        />

        <RadioGroup
          label="Las animaciones y transiciones te parecieron…"
          name="animaciones"
          required
          register={register}
          error={errors.animaciones?.message}
          options={[
            { value: "muy_agradables", label: "Muy agradables" },
            { value: "bien_muchas", label: "Bien, pero un poco muchas" },
            { value: "casi_no_note", label: "Casi no las noté" },
            { value: "molestas", label: "Molestas / distraen" },
          ]}
        />

        <TextField
          label="Comenta cualquier animación que te haya gustado o molestado"
          name="animaciones_detalle"
          register={register}
          placeholder="Animación específica que destacarías..."
          rows={2}
        />
      </section>

      {/* ─────────────────────────────────────────
          SECCIÓN 7: Preguntas abiertas finales
      ───────────────────────────────────────── */}
      <section className="form-section">
        <SectionHeader number="7" title="Preguntas abiertas finales" />

        <TextField
          label="Si pudieras cambiar solo UNA cosa del sitio hoy, ¿qué sería y por qué?"
          name="cambio_uno"
          required
          register={register}
          error={errors.cambio_uno?.message}
          rows={4}
          placeholder="Una cosa, con tu razonamiento..."
        />

        <TextField
          label="¿Qué es lo que más te gustó de la experiencia?"
          name="mas_gusto"
          required
          register={register}
          error={errors.mas_gusto?.message}
          rows={3}
          placeholder="Lo que más valoras..."
        />

        <TextField
          label="¿Hay algo que te haya sorprendido positivamente (aunque sea pequeño)?"
          name="sorpresa_positiva"
          register={register}
          rows={3}
          placeholder="Algo inesperadamente bueno..."
        />

        <TextField
          label="Comentarios adicionales"
          name="comentarios_adicionales"
          register={register}
          rows={4}
          placeholder="Cualquier otra cosa que quieras compartir..."
        />
      </section>

      {/* ─── Submit ─── */}
      <div className="submit-area">
        {status === "error" && (
          <p className="submit-error">
            {errorMessage || "Hubo un error al enviar el formulario. Intenta de nuevo."}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="submit-btn"
        >
          {status === "loading" ? "Enviando..." : "Enviar encuesta"}
        </button>
        <p className="submit-note">
          Tus respuestas son anónimas y se usarán únicamente para mejorar la plataforma.
        </p>
      </div>
    </form>
  );
}
