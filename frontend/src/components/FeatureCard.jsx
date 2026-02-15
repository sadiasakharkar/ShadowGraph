import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

export default function FeatureCard({ icon, title, desc, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <GlassCard className="h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/30">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-xl shadow-glow">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
      </GlassCard>
    </motion.div>
  );
}
