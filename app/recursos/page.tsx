"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, BookOpen, Code, Cpu, Palette, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"

type Area = "all" | "computacion" | "diseño" | "profesional"
type Nivel = "all" | "basico" | "intermedio" | "avanzado"

const areas = [
  { id: "all" as Area, label: "Todas las áreas", icon: Filter },
  { id: "computacion" as Area, label: "Computación", icon: Code },
  { id: "diseño" as Area, label: "Diseño", icon: Palette },
  { id: "profesional" as Area, label: "Profesional", icon: Cpu },
]

const niveles = [
  { id: "all" as Nivel, label: "Todos" },
  { id: "basico" as Nivel, label: "Básico" },
  { id: "intermedio" as Nivel, label: "Intermedio" },
  { id: "avanzado" as Nivel, label: "Avanzado" },
]

const recursos = [
  {
    nombre: "CS50 — Harvard",
    descripcion: "El curso introductorio de ciencias de la computación más popular del mundo. Cubre desde pensamiento computacional hasta desarrollo web.",
    area: "computacion" as Area,
    nivel: "basico" as Nivel,
    fuente: "Harvard / edX",
    url: "https://cs50.harvard.edu/",
  },
  {
    nombre: "freeCodeCamp",
    descripcion: "Plataforma gratuita con certificaciones en desarrollo web, APIs, visualización de datos, machine learning y más.",
    area: "computacion" as Area,
    nivel: "basico" as Nivel,
    fuente: "freeCodeCamp.org",
    url: "https://www.freecodecamp.org/",
  },
  {
    nombre: "The Odin Project",
    descripcion: "Ruta de aprendizaje completa de full-stack: HTML, CSS, JavaScript, Node.js y Ruby on Rails con proyectos reales.",
    area: "computacion" as Area,
    nivel: "intermedio" as Nivel,
    fuente: "The Odin Project",
    url: "https://www.theodinproject.com/",
  },
  {
    nombre: "MIT OpenCourseWare — Algorithms",
    descripcion: "Curso completo de algoritmos y estructuras de datos del MIT, con grabaciones de clases, notas y problem sets.",
    area: "computacion" as Area,
    nivel: "avanzado" as Nivel,
    fuente: "MIT OCW",
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
  },
  {
    nombre: "Figma para principiantes",
    descripcion: "Curso oficial de Figma que cubre los fundamentos de diseño de interfaces: componentes, auto-layout, prototipos y variables.",
    area: "diseño" as Area,
    nivel: "basico" as Nivel,
    fuente: "Figma",
    url: "https://www.youtube.com/@Figma",
  },
  {
    nombre: "Refactoring UI",
    descripcion: "Guía de diseño práctica para desarrolladores: tipografía, color, espaciado y jerarquía visual sin necesidad de ser diseñador.",
    area: "diseño" as Area,
    nivel: "intermedio" as Nivel,
    fuente: "Adam Wathan & Steve Schoger",
    url: "https://www.refactoringui.com/",
  },
  {
    nombre: "Interviewing.io — Mock Interviews",
    descripcion: "Práctica de entrevistas técnicas con ingenieros de empresas top. Feedback real y anónimo para mejorar tu performance.",
    area: "profesional" as Area,
    nivel: "avanzado" as Nivel,
    fuente: "Interviewing.io",
    url: "https://interviewing.io/",
  },
  {
    nombre: "Tech Interview Handbook",
    descripcion: "Guía completa y gratuita para prepararse para entrevistas técnicas: algoritmos, system design, behavioral y negociación.",
    area: "profesional" as Area,
    nivel: "intermedio" as Nivel,
    fuente: "Yangshun Tay",
    url: "https://www.techinterviewhandbook.org/",
  },
  {
    nombre: "Roadmap.sh",
    descripcion: "Rutas de aprendizaje visuales para frontend, backend, DevOps, AI/ML y más. Comunidad activa con guías y checklists.",
    area: "computacion" as Area,
    nivel: "intermedio" as Nivel,
    fuente: "roadmap.sh",
    url: "https://roadmap.sh/",
  },
]

function ResourceCard({ recurso, index }: { recurso: typeof recursos[number]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const areaColor: Record<string, string> = {
    computacion: "border-blue-400/20 text-blue-300/60",
    diseño: "border-purple-400/20 text-purple-300/60",
    profesional: "border-amber-400/20 text-amber-300/60",
  }

  const nivelLabel: Record<string, string> = {
    basico: "Básico",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  }

  return (
    <div
      ref={ref}
      className={`hover-lift group rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:bg-white/[0.05] reveal-scale stagger-${(index % 4) + 1} ${isInView ? "visible" : ""}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-base font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
          {recurso.nombre}
        </h3>
        <Link
          href={recurso.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-white/30 transition-colors hover:text-white"
          aria-label={`Ir a ${recurso.nombre}`}
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <p className="text-sm leading-relaxed text-white/45 mb-4 transition-colors duration-300 group-hover:text-white/60">
        {recurso.descripcion}
      </p>

      <div className="flex flex-wrap gap-2">
        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${areaColor[recurso.area]}`}>
          {recurso.area}
        </span>
        <span className="inline-flex rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
          {nivelLabel[recurso.nivel]}
        </span>
        <span className="inline-flex rounded-full border border-white/5 px-2.5 py-0.5 text-[10px] tracking-wider text-white/25">
          {recurso.fuente}
        </span>
      </div>
    </div>
  )
}

export default function RecursosPage() {
  const [areaFilter, setAreaFilter] = useState<Area>("all")
  const [nivelFilter, setNivelFilter] = useState<Nivel>("all")

  const filtered = recursos.filter((r) => {
    const areaMatch = areaFilter === "all" || r.area === areaFilter
    const nivelMatch = nivelFilter === "all" || r.nivel === nivelFilter
    return areaMatch && nivelMatch
  })

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Header />
      <div className="overflow-x-hidden">
      <section className="relative pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40 text-mask-reveal">
              Recursos de aprendizaje
            </span>
            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-mask-reveal inline-block">Aprendé a</span>
              <br />
              <span className="text-mask-reveal-delay inline-block text-white/40">
                tu ritmo
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/50 reveal-up visible" style={{ animationDelay: "0.5s" }}>
              Cursos, tutoriales y materiales curados por el equipo del Hub.
              Filtrados por área y nivel para que encuentres exactamente lo que
              necesitás en este momento.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Filters */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setAreaFilter(area.id)}
                  className={`btn-press inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                    areaFilter === area.id
                      ? "bg-white/10 border border-white/20 text-white"
                      : "border border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/15"
                  }`}
                >
                  <area.icon className="h-3.5 w-3.5" />
                  {area.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {niveles.map((nivel) => (
                <button
                  key={nivel.id}
                  onClick={() => setNivelFilter(nivel.id)}
                  className={`btn-press rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                    nivelFilter === nivel.id
                      ? "bg-white/10 border border-white/20 text-white"
                      : "border border-white/[0.06] text-white/35 hover:text-white/55"
                  }`}
                >
                  {nivel.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((recurso, index) => (
                <ResourceCard key={recurso.nombre} recurso={recurso} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-12 text-center">
              <BookOpen className="mx-auto mb-4 h-8 w-8 text-white/15" />
              <p className="text-sm text-white/40">
                No hay recursos con esa combinación de filtros todavía.
              </p>
              <button
                onClick={() => { setAreaFilter("all"); setNivelFilter("all") }}
                className="mt-3 text-xs text-white/30 underline hover:text-white/50"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-white/20">
            {filtered.length} recurso{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            ¿Querés aplicar lo aprendido en oportunidades reales?
          </p>
          <Link
            href="/oportunidades"
            className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            Ver oportunidades
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  )
}
