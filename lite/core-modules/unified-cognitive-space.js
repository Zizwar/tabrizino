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

        // 1. وجهات نظر البرلمان هي نفسها "الخيارات" التي ستدخل في حالة تراكب كمي.
        //    نهيئ سياق القرار لوحدة القرار الكمي.
        const decision_context_for_quantum = {
            options: all_viewpoints, // كل وجهة نظر هي خيار محتمل
            type: 'parliamentary_synthesis', // نعطي العملية نوعاً مميزاً
            // نمرر السياقات ذات الصلة من الاستعلام الأصلي أو السياق العام
            social_models: context.social_models || query.social_models || [],
            trust_context: context.trust_context || query.trust_context || {},
            // نمرر أي معلومات سياقية أخرى قد تكون مهمة لوحدة القرار
            // مثل urgency, stakes, etc., if available in the original context or query
            ...(context.decision_details || {}), // إذا كان السياق يحتوي على تفاصيل قرار محددة
            ...context // نمرر السياق العام
        };

        // 2. نستدعي الوحدة المختصة (DecisionQuantum) للقيام بعملية الدمج الاحتمالي المعقدة.
        const final_decision = await this.space.decision_quantum.evaluate(
            decision_context_for_quantum, 
            context // السياق العام يمكن أن يمرر هنا أيضاً للتأثيرات البيئية وغيرها
        );

        // 3. نعيد النتيجة المركبة والذكية من وحدة القرار.
        return final_decision;
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