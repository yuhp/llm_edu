import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Activity, Bot, Cpu, Database, FileSearch, Network, NotebookPen, ShieldCheck, User, Wrench } from 'lucide-react';
import { Flow, Node, Stage } from '../types';

const getNodeIcon = (type: Node['type'], label: string) => {
  if (type === 'user') return <User className="h-5 w-5" />;
  if (type === 'db') return <Database className="h-5 w-5" />;
  if (type === 'llm') return <Cpu className="h-5 w-5" />;
  if (type === 'tool') {
    if (label.toLowerCase().includes('skill') || label.includes('技能')) return <FileSearch className="h-5 w-5" />;
    return <Wrench className="h-5 w-5" />;
  }
  if (type === 'manager') return <Network className="h-5 w-5" />;
  if (type === 'agent') {
    if (label.toLowerCase().includes('research') || label.includes('研究')) return <FileSearch className="h-5 w-5" />;
    if (label.toLowerCase().includes('review') || label.includes('审查')) return <ShieldCheck className="h-5 w-5" />;
    if (label.toLowerCase().includes('persona') || label.includes('人设')) return <NotebookPen className="h-5 w-5" />;
    return <Bot className="h-5 w-5" />;
  }
  return <Activity className="h-5 w-5" />;
};

const getNodeColors = (type: Node['type']) => {
  switch (type) {
    case 'user':
      return 'border-slate-600 bg-slate-800 text-slate-200';
    case 'llm':
      return 'border-blue-500/50 bg-blue-900/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
    case 'db':
      return 'border-emerald-500/50 bg-emerald-900/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    case 'tool':
      return 'border-amber-500/50 bg-amber-900/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
    case 'manager':
      return 'border-cyan-500/40 bg-slate-800 text-cyan-300';
    case 'agent':
      return 'border-purple-500/50 bg-purple-900/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
    default:
      return 'border-slate-700 bg-slate-800 text-slate-300';
  }
};

type RenderedFlow = {
  flow: Flow;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  midX: number;
  midY: number;
  isActive: boolean;
  isPast: boolean;
};

export default function StageVisualizer({ stage }: { stage: Stage }) {
  const [activeSequence, setActiveSequence] = useState(0);
  const maxSequence = Math.max(...stage.flows.map((flow) => flow.sequence), 0);

  useEffect(() => {
    setActiveSequence(0);
    if (maxSequence === 0) return;

    let current = 1;
    const interval = setInterval(() => {
      setActiveSequence(current);
      current += 1;
      if (current > maxSequence) current = 0;
    }, 1800);

    return () => clearInterval(interval);
  }, [stage, maxSequence]);

  const renderedFlows = stage.flows
    .map((flow): RenderedFlow | null => {
      const startNode = stage.nodes.find((node) => node.id === flow.from);
      const endNode = stage.nodes.find((node) => node.id === flow.to);
      if (!startNode || !endNode) return null;

      const dx = endNode.x - startNode.x;
      const dy = endNode.y - startNode.y;
      const boxW = 15;
      const boxH = 22;

      let tStart = 100;
      if (Math.abs(dx) > 0.001) tStart = Math.min(tStart, Math.abs(boxW / 2 / dx));
      if (Math.abs(dy) > 0.001) tStart = Math.min(tStart, Math.abs(boxH / 2 / dy));
      if (tStart === 100) tStart = 0;

      let tEnd = 100;
      if (Math.abs(dx) > 0.001) tEnd = Math.min(tEnd, Math.abs(boxW / 2 / dx));
      if (Math.abs(dy) > 0.001) tEnd = Math.min(tEnd, Math.abs(boxH / 2 / dy));
      if (tEnd === 100) tEnd = 0;

      if (tStart + tEnd >= 1) {
        tStart = 0;
        tEnd = 0;
      }

      return {
        flow,
        startX: startNode.x + dx * tStart,
        startY: startNode.y + dy * tStart,
        endX: endNode.x - dx * tEnd,
        endY: endNode.y - dy * tEnd,
        midX: (startNode.x + endNode.x) / 2,
        midY: (startNode.y + endNode.y) / 2,
        isActive: activeSequence === flow.sequence,
        isPast: activeSequence > flow.sequence,
      };
    })
    .filter((flow): flow is RenderedFlow => flow !== null);

  return (
    <div className="relative h-full w-full font-sans">
      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
        {renderedFlows.map(({ flow, startX, startY, endX, endY }) => (
          <line
            key={`bg-${stage.id}-${flow.id}`}
            x1={`${startX}%`}
            y1={`${startY}%`}
            x2={`${endX}%`}
            y2={`${endY}%`}
            fill="none"
            stroke={flow.dotted ? '#475569' : '#334155'}
            strokeWidth="1.5"
            strokeDasharray={flow.dotted ? '4 4' : 'none'}
          />
        ))}
      </svg>

      {stage.nodes.map((node) => {
        const isFocus = stage.flows.some(
          (flow) => flow.sequence === activeSequence && (flow.from === node.id || flow.to === node.id),
        );

        return (
          <div
            key={`${stage.id}-${node.id}`}
            className="absolute z-20"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: isFocus ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className={`flex min-w-[100px] flex-col items-center justify-center rounded-xl border p-3 sm:p-4 ${getNodeColors(node.type)}`}
            >
              <div className={`mb-2 rounded-lg border border-white/5 bg-slate-900/60 p-2 ${isFocus ? 'animate-pulse text-white' : ''}`}>
                {getNodeIcon(node.type, node.label)}
              </div>
              <span className="whitespace-nowrap text-xs font-semibold tracking-tight text-white">{node.label}</span>
              <span className="mt-0.5 text-[9px] font-mono uppercase italic tracking-widest opacity-60">{node.type}</span>
            </motion.div>
          </div>
        );
      })}

      <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full">
        <defs>
          <marker id="arrow-active" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="14" markerHeight="14" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#60a5fa" />
          </marker>
          <marker id="arrow-past" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="14" markerHeight="14" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>
        <AnimatePresence>
          {renderedFlows.map(({ flow, startX, startY, endX, endY, isActive, isPast }) => {
            if (!isActive && !isPast) return null;

            return (
              <motion.line
                key={`active-${stage.id}-${flow.id}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isPast ? 0.4 : 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                fill="none"
                stroke={isActive ? '#60a5fa' : '#64748b'}
                strokeWidth="2.5"
                strokeDasharray={flow.dotted ? '4 4' : 'none'}
                markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow-past)'}
              />
            );
          })}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        {renderedFlows.map(({ flow, midX, midY, isActive }) => {
          if (!isActive) return null;

          return (
            <div
              key={`label-${stage.id}-${flow.id}`}
              className="pointer-events-none absolute z-40 flex items-center justify-center"
              style={{
                left: `${midX}%`,
                top: `${midY}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <span className="whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-[10px] font-mono tracking-tight text-slate-200 shadow-md shadow-slate-950">
                  {flow.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center justify-center gap-2">
        {Array.from({ length: maxSequence }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index + 1 === activeSequence
                ? 'w-6 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                : index + 1 < activeSequence
                  ? 'w-1.5 bg-blue-500/40'
                  : 'w-1.5 bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
