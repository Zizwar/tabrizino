/**
 * Unified Cognitive Space - الفضاء المعرفي الموحد
 * 
 * يحتوي على جميع المكونات المعرفية ويعالج المدخلات من خلال المناظير.
 * @module UnifiedCognitiveSpace
 */
const AgateMemory = require('./agate-memory');
const CoreSimulator = require('./core-simulator');
const PerspectivesManager = require('./perspectives-manager');
const DynamicOthersModeling = require('./dynamic-others-modeling');
const ScriptManager = require('./script-manager');
const RealityEngine = require('./reality-engine'); // Assuming RealityEngine is also part of the space
const WaveDynamics = require('./wave-dynamics');   // And WaveDynamics
const DecisionQuantum = require('./decision-quantum'); // And DecisionQuantum
 
class UnifiedCognitiveSpace {
    constructor(brain_capacity = 1000) {
        this.capacity = brain_capacity;
        
        // كل شيء في فضاء واحد
        this.space = {
            // الذاكرة الموحدة
            agate_memory: new AgateMemory(),
            
            // المحاكي الأساسي الواحد
            core_simulator: new CoreSimulator(),
            
            // مدير المناظير
            perspectives_manager: new PerspectivesManager(),
            
            // نماذج الآخرين
            others_models: new DynamicOthersModeling(brain_capacity),
            
            // مدير السكريبتات
            script_manager: new ScriptManager(),

            // محرك الواقع والوعي الذاتي
            reality_engine: new RealityEngine(),

            // ديناميكيات الموجات والتداخل المعرفي
            wave_dynamics: new WaveDynamics(),

            // نظام اتخاذ القرار الكمي
            decision_quantum: new DecisionQuantum(),
            
            // الحالة الحالية
            current_script_name: 'default_reality.script', // Default script
            active_perspectives: new Set(),
            system_state: {} // For overall state tracking
        };
    }

    // معالجة بمنظور واحد
    async process_with_perspective(query, perspective_name, context = {}) {
        const perspective_config = this.space.perspectives_manager.get_perspective(perspective_name);
        if (!perspective_config) {
            throw new Error(`Perspective "${perspective_name}" not found.`);
        }
        this.space.active_perspectives = new Set([perspective_name]);
        const script_parameters = this.space.script_manager.get_script_parameters(this.space.current_script_name);

        // تطبيق "العدسة" على المحاكي
        // The core_simulator will internally use its sub-modules like decision_quantum, wave_dynamics
        // or this UnifiedCognitiveSpace orchestrates calls to them based on core_simulator's output.
        // For now, let's assume core_simulator is a high-level processor.
        const simulation_result = await this.space.core_simulator.process({
            query: query,
            context: context,
            
            // فلاتر المنظور
            trust_matrix: perspective_config.trust_matrix,
            emotional_filter: perspective_config.emotional_filter,
            script_bias: perspective_config.script_bias || perspective_config.script_name, // Pass script name or bias
            
            // الذاكرة المفلترة حسب المنظور
            memory_access: this.space.agate_memory.create_filtered_access(perspective_config),
            
            // نماذج الآخرين المفلترة
            others_models_access: this.space.others_models.filter_by_perspective(perspective_config),
            script_parameters: script_parameters
        });

        // Validate with RealityEngine
        const validation = await this.space.reality_engine.validate(simulation_result, context);
        return { ...simulation_result, validation };
    }

    // البرلمان الداخلي - عدة مناظير في نفس الوقت
    async internal_parliament(query, perspective_names, context = {}) {
        this.space.active_perspectives = new Set(perspective_names);
        const concurrent_processing = perspective_names.map(name => 
            this.process_with_perspective(query, name, context)
        );
        
        const all_viewpoints = await Promise.all(concurrent_processing);
        
        // التفاعل والتركيب - Placeholder for synthesis logic
        // This would involve DecisionQuantum and WaveDynamics more directly
        // For now, let's assume a simple aggregation or selection.
        const synthesized_decision = this.space.decision_quantum.evaluate(
            { options: all_viewpoints, type: query.type, ...context }, // DecisionQuantum needs options
            context // Pass full context
        );
        return synthesized_decision; // This needs to be more sophisticated
    }

    // Placeholder for a more complex synthesis
    synthesize_parliament_decision(all_viewpoints, perspective_names) {
        // Simple strategy: pick the one with highest confidence or average them out
        // In a real scenario, this would be a complex probabilistic combination
        if (all_viewpoints.length === 0) return { decision: "No consensus", confidence: 0 };
        
        // This is a very naive synthesis.
        // A proper synthesis would involve `DecisionQuantum` to weigh these viewpoints.
        let best_viewpoint = all_viewpoints[0];
        for (const viewpoint of all_viewpoints) {
            if ((viewpoint.confidence || 0) > (best_viewpoint.confidence || 0)) {
                best_viewpoint = viewpoint;
            }
        }
        return best_viewpoint;
    }

    set_active_script(script_name) {
        if (this.space.script_manager.get_script(script_name)) {
            this.space.current_script_name = script_name;
            console.log(`Active script set to: ${script_name}`);
        } else {
            console.error(`Script "${script_name}" not found.`);
        }
    }
}

module.exports = UnifiedCognitiveSpace;