import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY environment variables."
    );
  }

  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: Record<string, any> = await req.json();

    const supabase = getSupabaseClient();

    const { error } = await supabase.from("respuestas_betatesters").insert([
      {
        rol: body.rol ?? null,
        rol_otro: body.rol_otro ?? null,
        familiaridad: body.familiaridad ?? null,
        dispositivo: body.dispositivo ?? null,
        entiende_csh: body.entiende_csh ?? null,
        claridad_homepage: body.claridad_homepage ?? null,
        confusion_detalle: body.confusion_detalle ?? null,
        propuesta_valor: body.propuesta_valor ?? null,
        inicio_rapido: body.inicio_rapido ?? null,
        inicio_detalle: body.inicio_detalle ?? null,
        sobre_csh_facilidad: body.sobre_csh_facilidad ?? null,
        valores_facilidad: body.valores_facilidad ?? null,
        programas_facilidad: body.programas_facilidad ?? null,
        ruta_sugerida: body.ruta_sugerida ?? null,
        ruta_mejora: body.ruta_mejora ?? null,
        dev_seriedad: body.dev_seriedad ?? null,
        dev_no_es_para_mi: body.dev_no_es_para_mi ?? null,
        dev_seccion_interes: body.dev_seccion_interes ?? null,
        biz_iniciativas_claras: body.biz_iniciativas_claras ?? null,
        biz_info_faltante: body.biz_info_faltante ?? null,
        biz_frase_justificacion: body.biz_frase_justificacion ?? null,
        nt_abrumado: body.nt_abrumado ?? null,
        nt_solo_expertos: body.nt_solo_expertos ?? null,
        ganas_participar: body.ganas_participar ?? null,
        cta_claros: body.cta_claros ?? null,
        cta_cambiar: body.cta_cambiar ?? null,
        micro_intake: body.micro_intake ?? null,
        micro_intake_mejora: body.micro_intake_mejora ?? null,
        sensacion_visual: body.sensacion_visual ?? null,
        animaciones: body.animaciones ?? null,
        animaciones_detalle: body.animaciones_detalle ?? null,
        cambio_uno: body.cambio_uno ?? null,
        mas_gusto: body.mas_gusto ?? null,
        sorpresa_positiva: body.sorpresa_positiva ?? null,
        comentarios_adicionales: body.comentarios_adicionales ?? null,
      },
    ]);

    if (error) {
      console.error("[submit] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[submit] Unexpected error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
