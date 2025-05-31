{
  "id": "bio_constraints",
  "title": "القيود البيولوجية للنظام العصبي",
  "version": "1.0",
  "constraints": {
    "neural_transmission": {
      "speed": "80-120 m/s",
      "source": "Kandel's Principles of Neural Science"
    },
    "synaptic_delay": {
      "chemical": "1-5 ms",
      "electrical": "0.1-0.3 ms",
      "source": "Hodgkin & Huxley 1952"
    },
    "energy_budget": {
      "human_brain": "20W",
      "neuron_resting": "0.01 pW",
      "neuron_active": "0.1 pW",
      "source": "Raichle & Gusnard 2002"
    },
    "processing_limits": {
      "max_firing_rate": "200-500 Hz",
      "max_parallel_processes": "7±2",
      "source": "Miller's Law"
    }
  },
  "integration_rules": {
    "simulators": "يجب أن تحترم حدود السرعة والطاقة",
    "oscillators": "ترددات الهزازات يجب أن تكون ضمن نطاق موجات الدماغ",
    "generative_collapse": "زمن الانهيار > التأخير المشبكي"
  }
}