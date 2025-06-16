/**
 * Script Manager - مدير السكريبتات
 * 
 * يدير "قوانين الفيزياء" المختلفة للفضاء المعرفي.
 * @module ScriptManager
 */
class ScriptManager {
    constructor() {
        this.scripts = new Map();
        this.initialize_default_scripts();
    }

    initialize_default_scripts() {
        this.add_script('default_reality.script', {
            name: 'Default Reality Physics',
            description: 'Standard cognitive processing rules.',
            parameters: {
                wave_interference_model: 'standard',
                memory_decay_rate: 0.01,
                decision_threshold_factor: 1.0
            }
        });

        this.add_script('dream_logic.script', {
            name: 'Dream Logic Physics',
            description: 'Altered cognitive rules for dream-like states.',
            parameters: {
                wave_interference_model: 'associative_fluid',
                memory_decay_rate: 0.001, // Slower decay, more access to distant memories
                reality_anchor_strength_modifier: 0.2, // Weaker reality anchors
                decision_threshold_factor: 0.5 // Easier to reach decisions
            }
        });
    }

    add_script(name, config) {
        this.scripts.set(name, config);
    }

    get_script(name) {
        return this.scripts.get(name);
    }

    get_script_parameters(name) {
        const script = this.get_script(name);
        return script ? script.parameters : null;
    }
}

module.exports = ScriptManager;