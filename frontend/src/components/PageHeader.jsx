import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="mb-7 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-cyan">ShadowGraph Module</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted md:text-[15px]">{subtitle}</p>
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </motion.div>
  );
}
