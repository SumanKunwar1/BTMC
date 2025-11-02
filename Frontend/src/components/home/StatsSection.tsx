import { useEffect, useState, useRef } from "react";
import { Clock, Users, Map } from "lucide-react";
import { motion, useInView } from "framer-motion";

// Define type for stat items
interface Stat {
  icon: React.ElementType;
  endValue: number;
  suffix?: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: Clock,
    endValue: 20,
    suffix: "+",
    label: "Years of Experience",
    description: "in Buddhist Education",
  },
  {
    icon: Users,
    endValue: 5000,
    suffix: "+",
    label: "Students Trained",
    description: "from around the world",
  },
  {
    icon: Map,
    endValue: 300,
    suffix: "+",
    label: "Pilgrimage Tours",
    description: "successfully organized",
  },
];

interface CountUpProps {
  end: number;
  suffix?: string;
  trigger: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ end, suffix = "", trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    setCount(0);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [trigger, end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

interface StatItemProps {
  stat: Stat;
}

const StatItem: React.FC<StatItemProps> = ({ stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const IconComponent = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <IconComponent className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
      </motion.div>

      <motion.div
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CountUp end={stat.endValue} suffix={stat.suffix} trigger={isInView} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-xl font-semibold mb-1">{stat.label}</div>
        <div className="text-red-100">{stat.description}</div>
      </motion.div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="bg-red-600 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
