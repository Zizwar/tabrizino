// pseudocode/attention_manager_pseudo.js
// هذا الملف يحتوي على الكود الزائف لمفهوم "إدارة الانتباه"
// All function names and logic are illustrative and theoretical.

class AttentionManager {
    constructor(config, motivationCore, environmentalVariables, middleware, metaCognition) {
        this.config = config; // يتضمن العتبات، التكاليف، إلخ.

        // واجهات للمفاهيم الأخرى الضرورية
        this.motivation = motivationCore;
        this.environment = environmentalVariables;
        this.filterLayer = middleware; // Middleware يتأثر بـ distraction_filter_modulator
        this.metaMonitor = metaCognition;

        this.currentAttentionalState = {
            focusTargetId: null,
            attentionMode: 'scanning', // initial mode
            filterStrength: 0.5,
            peripheralAwareness: 0.7
        };
        this.attentionHistory = [];
    }

    /**
     * الوظيفة الرئيسية التي تقوم بتحديث وتوجيه الانتباه.
     * تُستدعى بشكل دوري أو عند حدوث أحداث مهمة.
     */
    async runAttentionCycle() {
        // 1. اكتشاف بروز المدخلات الحالية
        const salienceMap = this.detectSalience();

        // 2. تخصيص التركيز بناءً على البروز والأهداف الحالية
        const focusDecision = this.allocateFocus(salienceMap);
        
        // 3. تعديل فلتر المشتتات بناءً على وضع التركيز
        this.modulateDistractionFilter(focusDecision.newMode);

        // 4. تطبيق قرار التركيز وتحديث الحالة
        this.currentAttentionalState.focusTargetId = focusDecision.newTargetId;
        this.currentAttentionalState.attentionMode = focusDecision.newMode;
        
        // 5. تسجيل التغيير في الانتباه
        this.attentionHistory.push({...this.currentAttentionalState, timestamp: Date.now()});
        this.metaMonitor.logAttentionStateChange(this.currentAttentionalState);

        return this.currentAttentionalState;
    }

    /**
     * يقيّم مدى بروز وأهمية المدخلات المختلفة.
     * @returns {Array<object>} - خريطة بالمنبهات البارزة ودرجة بروزها.
     */
    detectSalience() {
        const stimuli = this.environment.getAllCurrentStimuli(); // افتراض أن هذه الدالة تعيد كل المنبهات
        const activeGoals = this.motivation.getActiveGoals(); // الأهداف النشطة حالياً

        let salienceScores = stimuli.map(stimulus => {
            let score = 0;
            // عامل البروز الذاتي للمنبه (مثل: صوت عالٍ، لون زاهٍ)
            score += stimulus.intrinsicSalience * 0.4;

            // عامل الصلة بالأهداف الحالية
            activeGoals.forEach(goal => {
                if (this.isStimulusRelevantToGoal(stimulus, goal)) {
                    score += goal.priority * 0.6; // الأهداف ذات الأولوية الأعلى تجعل المنبهات المتعلقة بها أبرز
                }
            });
            return { stimulusId: stimulus.id, score: Math.min(1.0, score) };
        });

        salienceScores.sort((a, b) => b.score - a.score); // ترتيب حسب الأعلى بروزاً
        // console.log("AttentionManager: Detected Salience:", salienceScores.slice(0,3));
        return salienceScores;
    }

    /**
     * يقرر أين يوجه الانتباه وما هو وضع الانتباه المناسب.
     * @param {Array<object>} salienceMap - خريطة البروز.
     * @returns {object} - قرار التركيز الجديد (الهدف والوضع).
     */
    allocateFocus(salienceMap) {
        let newTargetId = this.currentAttentionalState.focusTargetId;
        let newMode = this.currentAttentionalState.attentionMode;
        const cognitiveLoad = this.metaMonitor.getCurrentCognitiveLoad();

        const mostSalient = salienceMap.length > 0 ? salienceMap[0] : null;

        // هل يجب تغيير التركيز؟
        if (mostSalient && mostSalient.stimulusId !== newTargetId) {
            if (mostSalient.score > this.config.salience_threshold_for_interruption || newTargetId === null) {
                const switchCost = this.config.switching_cost_penalty;
                if (cognitiveLoad + switchCost < 0.9) { // إذا كان هناك موارد كافية للتحويل
                    newTargetId = mostSalient.stimulusId;
                    newMode = 'deep_focus'; // بدايةً، التركيز العميق على المنبه الجديد
                    console.log(`AttentionManager: Switching focus to ${newTargetId} due to high salience.`);
                } else {
                     console.log(`AttentionManager: High salience for ${mostSalient.stimulusId} but switch cost too high.`);
                }
            }
        }

        // تعديل وضع الانتباه بناءً على المهمة والضغط المعرفي
        if (newTargetId) { // إذا كان هناك هدف للتركيز
            const taskComplexity = this.environment.getStimulusComplexity(newTargetId); // افتراض وجود دالة كهذه
            if (taskComplexity > 0.7 && cognitiveLoad < 0.6) {
                newMode = 'deep_focus';
            } else if (this.motivation.getActiveGoals().length > 1 && cognitiveLoad < 0.5) {
                newMode = 'divided_attention_simulated'; // محاكاة للانتباه المقسم
            } else {
                newMode = 'sustained_attention';
            }
        } else { // لا يوجد هدف محدد للتركيز
            newMode = 'scanning';
        }
        
        return { newTargetId, newMode };
    }

    /**
     * يعدل قوة فلتر المشتتات في `Middleware`.
     * @param {string} currentAttentionMode - وضع الانتباه الحالي.
     */
    modulateDistractionFilter(currentAttentionMode) {
        let newFilterStrength = 0.5; // القوة الافتراضية
        switch (currentAttentionMode) {
            case 'deep_focus':
                newFilterStrength = 0.85; // فلتر قوي جداً لمنع المشتتات
                this.currentAttentionalState.peripheralAwareness = 0.1;
                break;
            case 'sustained_attention':
                newFilterStrength = 0.7;
                this.currentAttentionalState.peripheralAwareness = 0.3;
                break;
            case 'divided_attention_simulated':
                newFilterStrength = 0.4; // فلتر أضعف للسماح بمرور معلومات من مهام متعددة
                this.currentAttentionalState.peripheralAwareness = 0.6;
                break;
            case 'scanning':
                newFilterStrength = 0.2; // فلتر ضعيف جداً للسماح بأقصى وعي محيطي
                this.currentAttentionalState.peripheralAwareness = 0.8;
                break;
        }
        this.currentAttentionalState.filterStrength = newFilterStrength;
        this.filterLayer.updateDistractionFilterStrength(newFilterStrength); // إخبار Middleware
        // console.log(`AttentionManager: Filter strength set to ${newFilterStrength} for mode ${currentAttentionMode}`);
    }

    /**
     * آلية تحويل الانتباه (مبسطة).
     * @param {string} newTargetId - معرّف الهدف الجديد للانتباه.
     * @returns {boolean} - هل تم التحويل بنجاح.
     */
    switchAttention(newTargetId) {
        // محاكاة تكلفة التحويل
        const switchCost = this.config.switching_cost_penalty;
        const currentLoad = this.metaMonitor.getCurrentCognitiveLoad();

        if (currentLoad + switchCost > 1.0) {
            console.warn("AttentionManager: Cannot switch attention, cognitive overload.");
            return false;
        }

        // محاكاة "الوميض الانتباهي" أو فترة عدم التركيز أثناء التحويل
        this.currentAttentionalState.focusTargetId = null;
        this.currentAttentionalState.attentionMode = 'switching';
        // console.log("AttentionManager: Attention switching initiated...");

        // setTimeout(() => { // محاكاة للوقت المستغرق للتحويل
            this.currentAttentionalState.focusTargetId = newTargetId;
            this.currentAttentionalState.attentionMode = 'deep_focus'; // افتراض التركيز العميق بعد التحويل
            this.modulateDistractionFilter('deep_focus');
            // console.log(`AttentionManager: Attention switched to ${newTargetId}`);
        // }, switchCost * 1000); // تحويل الوقت لمللي ثانية (نظرياً)

        return true;
    }

    // --- دوال مساعدة (أمثلة) ---
    isStimulusRelevantToGoal(stimulus, goal) {
        // منطق لتحديد ما إذا كان المنبه ذا صلة بالهدف
        return stimulus.keywords && goal.keywords && stimulus.keywords.some(k => goal.keywords.includes(k)); // مثال بسيط
    }
}

// مثال لكيفية استخدام الكلاس (نظرياً)
/*
const attentionConfig = {
    default_focus_breadth: 0.5,
    switching_cost_penalty: 0.15,
    salience_threshold_for_interruption: 0.8,
    vigilance_decrement_rate: 0.005
};

// يجب توفير واجهات حقيقية أو محاكاة للمفاهيم الأخرى
const mockMotivation = { getActiveGoals: () => [{ id: 'goal1', priority: 0.9, keywords: ['urgent', 'report'] }] };
const mockEnvironment = { 
    getAllCurrentStimuli: () => [
        { id: 'stimulusA', intrinsicSalience: 0.5, keywords: ['report', 'data'] },
        { id: 'stimulusB', intrinsicSalience: 0.9, keywords: ['emergency', 'alarm'] }, // منبه عالى البروز
        { id: 'stimulusC', intrinsicSalience: 0.2, keywords: ['background', 'music'] }
    ],
    getStimulusComplexity: (id) => 0.6 // تعقيد افتراضي
};
const mockMiddleware = { updateDistractionFilterStrength: (strength) => console.log(`Middleware: Filter updated to ${strength}`) };
const mockMetaCognition = { getCurrentCognitiveLoad: () => 0.4, logAttentionStateChange: (state) => {} };

const attentionSystem = new AttentionManager(attentionConfig, mockMotivation, mockEnvironment, mockMiddleware, mockMetaCognition);

async function testAttentionCycle() {
    console.log("Running attention cycle...");
    const newState = await attentionSystem.runAttentionCycle();
    console.log("New Attentional State:", newState);
}

// testAttentionCycle();
// بعد فترة، إذا ظهر منبه 'stimulusB' ببروز عالٍ، يجب أن يحول الانتباه إليه.
*/

