import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Missing Google service account credentials in environment variables.");
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// Human-readable labels for enum values
const ROL_LABELS: Record<string, string> = {
  dev: "Desarrollador / estudiante de computación",
  biz: "Persona de negocios / gestión / producto",
  no_tecnico: "Usuario no técnico",
  otro: "Otro",
};

const FAMILIARIDAD_LABELS: Record<string, string> = {
  no_conocia: "No conocía el Hub",
  habia_oido: "Lo había oído mencionar",
  conozco_alguien: "Conozco a alguien que participa",
  parte_activa: "Soy parte activa del Hub",
};

const DISPOSITIVO_LABELS: Record<string, string> = {
  laptop_desktop: "Laptop / Desktop",
  tablet: "Tablet",
  telefono: "Teléfono",
};

const CLARIDAD_LABELS: Record<string, string> = {
  muy_claro: "Muy claro",
  claro: "Claro",
  algo_confuso: "Algo confuso",
  muy_confuso: "Muy confuso",
};

const FACILIDAD_LABELS: Record<string, string> = {
  muy_facil: "Muy fácil",
  facil: "Fácil",
  normal: "Normal",
  dificil: "Difícil",
};

const INICIO_LABELS: Record<string, string> = {
  si: "Sí, fue evidente",
  mas_o_menos: "Más o menos",
  no: "No, me costó",
};

const RUTA_LABELS: Record<string, string> = {
  oriento_bastante: "Me orientó bastante",
  podria_simplificarse: "Podría simplificarse",
  no_la_note: "No la noté",
  no_resulto_util: "No me resultó útil",
};

const SERIEDAD_LABELS: Record<string, string> = {
  mucho: "Mucho",
  bastante: "Bastante",
  poco: "Poco",
  nada: "Nada",
};

const BIZ_CLARAS_LABELS: Record<string, string> = {
  muy_claro: "Muy claro",
  algo_claro: "Algo claro",
  poco_claro: "Poco claro",
  nada_claro: "Nada claro",
};

const NT_ABRUMADO_LABELS: Record<string, string> = {
  no_todo_bien: "No, entendí todo bien",
  un_poco: "Un poco",
  bastante: "Bastante",
  mucho: "Mucho",
};

const GANAS_LABELS: Record<string, string> = {
  muchas: "Muchas ganas",
  algunas: "Algunas ganas",
  pocas: "Pocas ganas",
  ninguna: "Ninguna",
};

const CTA_LABELS: Record<string, string> = {
  si: "Sí, claro",
  mas_o_menos: "Más o menos",
  no: "No, dudas",
};

const MICRO_LABELS: Record<string, string> = {
  muy_largo: "Muy largo",
  bien: "Bien de longitud",
  muy_corto: "Muy corto / le falta algo",
};

const VISUAL_LABELS: Record<string, string> = {
  muy_profesional: "Muy profesional",
  cuidada_pesada: "Cuidada pero pesada",
  simple_clara: "Simple pero clara",
  confusa: "Confusa / recargada",
};

const ANIMACIONES_LABELS: Record<string, string> = {
  muy_agradables: "Muy agradables",
  bien_muchas: "Bien, pero muchas",
  casi_no_note: "Casi no las noté",
  molestas: "Molestas / distraen",
};

function label(map: Record<string, string>, key?: string): string {
  if (!key) return "";
  return map[key] ?? key;
}

// ── Route handler ──────────────────────────────────────────────────────────── 

export async function POST(req: NextRequest) {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      return NextResponse.json(
        { error: "GOOGLE_SHEET_ID not configured" },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: Record<string, any> = await req.json();

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
      dateStyle: "short",
      timeStyle: "short",
    });

    // Build the row in the same order as the headers
    const row = [
      timestamp,
      label(ROL_LABELS, body.rol),
      body.rol_otro ?? "",
      label(FAMILIARIDAD_LABELS, body.familiaridad),
      label(DISPOSITIVO_LABELS, body.dispositivo),
      // Sección 2
      body.entiende_csh ?? "",
      label(CLARIDAD_LABELS, body.claridad_homepage),
      body.confusion_detalle ?? "",
      body.propuesta_valor ?? "",
      // Sección 3
      label(INICIO_LABELS, body.inicio_rapido),
      body.inicio_detalle ?? "",
      label(FACILIDAD_LABELS, body.sobre_csh_facilidad),
      label(FACILIDAD_LABELS, body.valores_facilidad),
      label(FACILIDAD_LABELS, body.programas_facilidad),
      label(RUTA_LABELS, body.ruta_sugerida),
      body.ruta_mejora ?? "",
      // Sección 4.1 Dev
      label(SERIEDAD_LABELS, body.dev_seriedad),
      body.dev_no_es_para_mi ?? "",
      body.dev_seccion_interes ?? "",
      // Sección 4.2 Biz
      label(BIZ_CLARAS_LABELS, body.biz_iniciativas_claras),
      body.biz_info_faltante ?? "",
      body.biz_frase_justificacion ?? "",
      // Sección 4.3 No técnico
      label(NT_ABRUMADO_LABELS, body.nt_abrumado),
      body.nt_solo_expertos ?? "",
      // Sección 5
      label(GANAS_LABELS, body.ganas_participar),
      label(CTA_LABELS, body.cta_claros),
      body.cta_cambiar ?? "",
      label(MICRO_LABELS, body.micro_intake),
      body.micro_intake_mejora ?? "",
      // Sección 6
      label(VISUAL_LABELS, body.sensacion_visual),
      label(ANIMACIONES_LABELS, body.animaciones),
      body.animaciones_detalle ?? "",
      // Sección 7
      body.cambio_uno ?? "",
      body.mas_gusto ?? "",
      body.sorpresa_positiva ?? "",
      body.comentarios_adicionales ?? "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Hoja1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[submit] Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
