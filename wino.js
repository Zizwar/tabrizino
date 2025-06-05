// wino.js (main.js) - The entry point and orchestrator for WinoScript
// الملف الرئيسي لتشغيل وتنظيم إطار عمل WinoScript

// --- 1. IMPORT STATEMENTS & SETUP ---
// ملاحظة: هذا الكود يفترض بيئة Node.js لتحميل الملفات والموديولات.
// إذا كنت تستخدم بيئة متصفح، ستحتاج إلى تعديل آلية تحميل الملفات (e.g., using fetch for JSON and <script> tags for classes).

const fs = require('fs');
const path = require('path');

// --- (مهم) تحميل كلاسات المفاهيم الأساسية ---
// افترض أن كل ملف "_pseudo.js" يقوم بتصدير الكلاس الخاص به.
// مثال: في ملف motivation_core_pseudo.js يجب أن يكون هناك: module.exports = MotivationCore;
const { MotivationCore } = require('./core/pseudocode/motivation_core_pseudo.js');
const { AttentionManager } = require('./core/pseudocode/attention_manager_pseudo.js');
const { Middleware } = require('./core/pseudocode/middleware_pseudo.js'); // افترض وجود هذا الملف
const { SimulatorOrchestrator } = require('./core/pseudocode/simulators_pseudo.js');
const { CognitiveSimulator } = require('./core/pseudocode/simulators_pseudo.js'); // قد تحتاجه إذا كان المنسق يستخدمه مباشرة
const { GenerativeCollapse } = require('./core/pseudocode/generative_collapse_pseudo.js'); // افترض وجود هذا الملف
const { MetaCognitiveMonitor } = require('./core/pseudocode/safe_metacognition_pseudo.js'); // افترض وجود هذا الملف
const { EmbodimentInterface } = require('./core/pseudocode/embodiment_interface_pseudo.js');
const { EnvironmentalVariables } = require('./core/pseudocode/environmental_variables_pseudo.js'); // افترض وجود هذا الملف
const { SkillAcquisitionManager } = require('./core/pseudocode/skill_acquisition_pseudo.js');
const { GenerativeReconstructionEngine } = require('./core/pseudocode/generative_reconstruction_pseudo.js'); // افترض وجود هذا الملف
const { NoiseFactor } = require('./core/pseudocode/noise_factor_pseudo.js'); // افترض وجود هذا الملف
const { TrustMatrix } = require('./core/pseudocode/trust_matrix_pseudo.js'); // افترض وجود هذا الملف
const { SelfCopies } = require('./core/pseudocode/self_copies_pseudo.js'); // افترض وجود هذا الملف
const { Oscillators } = require('./core/pseudocode/oscillators_pseudo.js'); // افترض وجود هذا الملف
const { EmotionalEncryptionEngine } = require('./core/pseudocode/emotional_encryption_pseudo.js'); // افترض وجود هذا الملف


// دالة مساعدة لتحميل ملفات JSON
function loadJSONConfig(filePath) {
    try {
        const fullPath = path.resolve(__dirname, filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`WinoScript Critical Error: Failed to load JSON config from ${filePath}`, error);
        throw error; // أعد رمي الخطأ لإيقاف التهيئة إذا فشل تحميل ملف أساسي
    }
}

class WinoSystem {
    constructor(configPaths) {
        this.configPaths = configPaths;
        this.concepts = {}; // لتخزين نسخ المفاهيم (instances)
        this.cognitiveFlowChart = null; // سيحمل السكريبت الرئيسي (cognitive_flow.json)
        this.isInitialized = false;

        // كائن الحالة الديناميكي الرئيسي الذي يتدفق عبر النظام
        this.dynamicState = {
            // يمكن أن يبدأ بقيم أولية أو يتم ملؤه تدريجياً
        };
        console.log("WinoScript: WinoSystem instance created.");
    }

    async initialize() {
        try {
            console.log("WinoScript: Initializing WinoSystem...");

            // 1. تحميل مخطط التدفق الإدراكي (السكريبت الرئيسي)
            this.cognitiveFlowChart = loadJSONConfig(this.configPaths.cognitiveFlow);
            console.log(`WinoScript: Loaded Cognitive Flow: '${this.cognitiveFlowChart.title}' with ${this.cognitiveFlowChart.steps.length} steps.`);

            // 2. تحميل إعدادات عامة أو خاصة بالمفاهيم إذا وجدت
            const generalConfig = loadJSONConfig(this.configPaths.generalConfig || './core/index.json'); // افترض وجود ملف إعدادات عام أو استخدم index.json
            const simulatorTypesConfig = loadJSONConfig(this.configPaths.simulatorsConfig); // إعدادات أنواع المحاكيات

            // --- 3. (مهم) تهيئة جميع المفاهيم الأساسية مع الاعتماديات (Dependency Injection) ---
            // الترتيب هنا مهم لتوفير الاعتماديات عند الحاجة

            // -- Interfaces & Foundational --
            this.concepts.embodiment_interface = new EmbodimentInterface(generalConfig.concepts?.embodiment_interface?.config || {});
            this.concepts.environmental_variables = new EnvironmentalVariables(generalConfig.concepts?.environmental_variables?.config || {});
            this.concepts.noise_factor = new NoiseFactor(generalConfig.concepts?.noise_factor?.config || {});
            this.concepts.oscillators = new Oscillators(generalConfig.concepts?.oscillators?.config || {});
            this.concepts.emotional_encryption = new EmotionalEncryptionEngine(generalConfig.concepts?.emotional_encryption?.config || {});
            this.concepts.generative_reconstruction = new GenerativeReconstructionEngine(generalConfig.concepts?.generative_reconstruction?.config || {});


            // -- Core Engines & Memory --
            this.concepts.motivation_core = new MotivationCore(
                generalConfig.concepts?.motivation_core?.config || {},
                this.concepts.embodiment_interface,
                this.concepts.environmental_variables,
                this.concepts.oscillators
                // لاحقا, يمكن تمرير `prediction_engine` إذا كان منفصلاً, أو يعتمد على `simulators_orchestrator`
            );

            // -- Meta Layers & Security --
            this.concepts.meta_cognition = new MetaCognitiveMonitor(generalConfig.concepts?.meta_cognition?.config || {});
            this.concepts.attention_manager = new AttentionManager(
                generalConfig.concepts?.attention_manager?.config || {},
                this.concepts.motivation_core,
                this.concepts.environmental_variables, // يفترض أن AttentionManager يستطيع الوصول إليه مباشرة أو يتم تمريره
                null, // placeholder for middleware, will be set after middleware init
                this.concepts.meta_cognition
            );
            this.concepts.middleware = new Middleware(
                generalConfig.concepts?.middleware?.config || {},
                this.concepts.attention_manager // Middleware يتأثر بالانتباه
            );
            // تحديث مرجع Middleware في AttentionManager إذا كان ضرورياً
            this.concepts.attention_manager.filterLayer = this.concepts.middleware;


            // -- Simulators & Orchestration --
            const simulatorOrchestratorDependencies = {
                embodiment_interface: this.concepts.embodiment_interface,
                attention_manager: this.concepts.attention_manager,
                skill_acquisition_manager: null, // سيتم تهيئته لاحقاً
                meta_cognition: this.concepts.meta_cognition,
                simulators_config: simulatorTypesConfig // Pass the loaded simulator types config
            };
            this.concepts.simulators_orchestrator = new SimulatorOrchestrator(simulatorOrchestratorDependencies);

            // -- Learning --
            const skillAcquisitionDependencies = {
                simulators_orchestrator: this.concepts.simulators_orchestrator,
                generative_reconstruction: this.concepts.generative_reconstruction,
                meta_cognition: this.concepts.meta_cognition,
                noise_factor: this.concepts.noise_factor
            };
            this.concepts.skill_acquisition_process = new SkillAcquisitionManager(skillAcquisitionDependencies);
            // تحديث مرجع skillProvider في منسق المحاكيات
            this.concepts.simulators_orchestrator.skillProvider = this.concepts.skill_acquisition_process;


            // -- Decision & Social --
            this.concepts.generative_collapse = new GenerativeCollapse(
                generalConfig.concepts?.generative_collapse?.config || {},
                this.concepts.motivation_core,
                this.concepts.embodiment_interface
            );
            this.concepts.trust_matrix = new TrustMatrix(generalConfig.concepts?.trust_matrix?.config || {});
            this.concepts.self_copies = new SelfCopies(generalConfig.concepts?.self_copies?.config || {});


            console.log("WinoScript: All core concepts initialized successfully.");
            this.isInitialized = true;
        } catch (error) {
            console.error("WinoScript Critical Error: Initialization failed.", error);
            this.isInitialized = false;
        }
    }

    /**
     * الدالة الرئيسية لتشغيل دورة إدراكية كاملة.
     * @param {object} trigger - المؤثر الذي بدأ الدورة (e.g., { type: 'external_event', data: {...} })
     */
    async runCognitiveCycle(trigger) {
        if (!this.isInitialized) {
            console.error("WinoScript Error: System not initialized. Cannot run cycle.");
            return { success: false, error: "System not initialized", log: ["System not initialized"] };
        }

        console.log(`\nWinoScript: --- Starting New Cognitive Cycle (Trigger Type: ${trigger.type}) ---`);
        // إعادة تهيئة أو تحديث كائن الحالة مع كل دورة جديدة
        this.dynamicState = {
            currentTrigger: trigger,
            timestamp: Date.now(),
            log: [`Cycle initiated by: ${trigger.type}. Data: ${JSON.stringify(trigger.data).substring(0,100)}...`],
            errorsEncountered: [] // لتتبع الأخطاء خلال الدورة
            // ... يمكن إضافة حقول أخرى هنا أو تركها تتكون ديناميكياً
        };

        // تنفيذ خطوات السكريبت الرئيسي (cognitive_flow.json)
        for (const step of this.cognitiveFlowChart.steps) {
            console.log(`WinoScript: Executing Step ${step.step_number || step.step}: ${step.title}`); // استخدام step_number إذا وجد
            this.dynamicState.log.push(`Executing Step ${step.step_number || step.step}: ${step.title}`);

            try {
                for (const conceptId of step.concepts) {
                    const conceptInstance = this.concepts[conceptId];
                    if (!conceptInstance) {
                        const warningMsg = `Warning: Concept ID '${conceptId}' not found for step ${step.step_number || step.step}. Skipping.`;
                        console.warn(`WinoScript: ${warningMsg}`);
                        this.dynamicState.log.push(warningMsg);
                        this.dynamicState.errorsEncountered.push({step: step.step_number || step.step, concept: conceptId, error: "Instance not found"});
                        continue;
                    }

                    // --- (مهم) تحديد الدالة التي سيتم استدعاؤها في المفهوم ---
                    // هذا الجزء هو "قلب" المنسق، ويجب أن يكون مرناً.
                    // سنعتمد على اسم دالة قياسي (مثل process أو execute) أو نستخدم switch statement.
                    let stepOutput;
                    // (ملاحظة: يجب أن تكون المدخلات لهذه الدوال متوافقة مع ما يتوقعه كل مفهوم)
                    // المدخل الأساسي هو dynamicState، ويمكن لكل مفهوم أن يختار ما يحتاجه منه.
                    // المخرج سيتم دمجه مرة أخرى في dynamicState.

                    // مثال لدالة معالجة عامة لكل مفهوم:
                    if (typeof conceptInstance.processStep === 'function') {
                         stepOutput = await conceptInstance.processStep(this.dynamicState, step.input_from_dynamic_state, step.config_for_step);
                    }
                    // أو استخدام switch statement كما في المثال السابق إذا كانت الدوال مختلفة الأسماء:
                    else {
                        // (الكود التفصيلي الذي قدمته سابقاً لاستدعاء كل مفهوم بدالته الخاصة)
                        // هذا مثال مبسط جداً، ستحتاج لتفصيل هذا الجزء لكل مفهوم
                        switch (conceptId) {
                            case "motivation_core":
                                stepOutput = await conceptInstance.runMotivationCycle(); // قد يحتاج لتمرير dynamicState
                                this.dynamicState.motivation = stepOutput;
                                break;
                            case "attention_manager":
                                stepOutput = await conceptInstance.runAttentionCycle(); // قد يحتاج لتمرير dynamicState.motivation
                                this.dynamicState.attention = stepOutput;
                                break;
                            case "middleware":
                                const infoPacket = this.dynamicState.currentTrigger.data || {raw_data: "internal_query"};
                                stepOutput = await conceptInstance.processInformation(infoPacket, this.dynamicState.attention);
                                this.dynamicState.perception = stepOutput;
                                break;
                            case "simulators_orchestrator":
                                const simInput = {
                                    raw_data: this.dynamicState.perception?.filtered_data || this.dynamicState.currentTrigger.data?.raw_data || {},
                                    context: {
                                        current_skill_id: this.dynamicState.motivation?.primaryGoal?.properties?.skill_to_apply,
                                        complexity_estimate: 0.5,
                                        // ... أي سياق آخر مطلوب للمحاكيات
                                    }
                                };
                                const simGlobalCtx = { active_goal: this.dynamicState.motivation?.primaryGoal };
                                stepOutput = await conceptInstance.processWithAllSimulators(simInput, simGlobalCtx);
                                this.dynamicState.simulation = stepOutput;
                                break;
                            case "generative_collapse":
                                const possibilities = this.dynamicState.simulation?.gathered_possibilities || [];
                                const collapseCtx = {
                                    urgency_level: this.dynamicState.motivation?.primaryGoal?.properties?.urgency || 0.3,
                                    // ...
                                };
                                stepOutput = await conceptInstance.initiateCollapse(possibilities, collapseCtx, {});
                                this.dynamicState.decision = stepOutput;
                                break;
                            // ... أضف بقية المفاهيم
                            default:
                                console.log(`WinoScript: Concept ${conceptId} has default handling in step ${step.step_number || step.step}.`);
                                if (typeof conceptInstance.defaultProcess === 'function') {
                                     stepOutput = await conceptInstance.defaultProcess(this.dynamicState);
                                     this.dynamicState[conceptId.replace(/-/g, '_')] = stepOutput; // e.g., generative-collapse -> generative_collapse
                                }
                        }
                    }

                    if (stepOutput) {
                        // دمج المخرج في dynamicState
                        // يمكن أن يكون الدمج بسيطاً أو يعتمد على "output_to_dynamic_state" في cognitive_flow
                        if (step.output_to_dynamic_state_key) {
                            this.dynamicState[step.output_to_dynamic_state_key] = stepOutput;
                        } else {
                            // افتراض دمج عام إذا لم يتم تحديد مفتاح معين
                            this.dynamicState = { ...this.dynamicState, ...stepOutput };
                        }
                        this.dynamicState.log.push(`Output from ${conceptId} integrated. Keys: ${Object.keys(stepOutput).join(', ')}`);
                    }
                }
            } catch (error) {
                const errorMsg = `Error during step ${step.step_number || step.step} (${step.title}).`;
                console.error(`WinoScript: ${errorMsg}`, error);
                this.dynamicState.log.push(`${errorMsg} Message: ${error.message}`);
                this.dynamicState.errorsEncountered.push({step: step.step_number || step.step, title: step.title, error: error.message});
                // يمكنك أن تقرر إيقاف الدورة هنا أو محاولة المتابعة
                 break; // لإيقاف الدورة عند أول خطأ جسيم
            }
        }

        console.log(`WinoScript: --- Cognitive Cycle Ended (Final State has ${Object.keys(this.dynamicState).length} keys) ---`);
        // تسجيل الحالة النهائية أو جزء منها
        this.concepts.meta_cognition?.logCycleCompletion(this.dynamicState);

        return this.dynamicState; // إرجاع الحالة النهائية للدورة
    }
}

// --- تهيئة النظام وتشغيله (مثال) ---
async function main() {
    console.log("WinoScript: Starting main execution...");
    const configPaths = {
        cognitiveFlow: './core/cognitive_flow.json',
        simulatorsConfig: './core/simulators.json', // افترض أن هذا الملف يحتوي على إعدادات أنواع المحاكيات
        generalConfig: './core/index.json' // أو ملف إعدادات عام آخر
    };

    const winoSystem = new WinoSystem(configPaths);
    await winoSystem.initialize();

    if (winoSystem.isInitialized) {
        // مثال 1: مؤثر خارجي بسيط
        const externalEventTrigger = {
            type: 'external_visual_event',
            data: {
                raw_data: { object_detected: 'ball', color: 'red', trajectory: [1,2,3] },
                source_metadata: { sensor_id: 'cam01', reliability: 0.95 },
            }
        };
        console.log("\n WinoScript: --- RUNNING CYCLE 1 (External Event) ---");
        const finalState1 = await winoSystem.runCognitiveCycle(externalEventTrigger);
        console.log("WinoScript: Cycle 1 Log:");
        finalState1.log.forEach(logEntry => console.log(`  -> ${logEntry}`));
        if (finalState1.errorsEncountered && finalState1.errorsEncountered.length > 0) {
            console.error("WinoScript: Errors encountered in Cycle 1:", finalState1.errorsEncountered);
        }


        // مثال 2: دافع داخلي لتعلم مهارة
        const learnSkillTrigger = {
            type: 'internal_goal_activation',
            data: {
                goal_details: { type: 'learn_skill', skill_id: 'chess_basics', urgency: 0.7, properties: { skill_to_apply: 'chess_basics', urgency: 0.7 } },
                // يمكن إضافة بيانات ذات صلة بالممارسة هنا
            }
        };
        console.log("\n WinoScript: --- RUNNING CYCLE 2 (Learn Skill) ---");
        const finalState2 = await winoSystem.runCognitiveCycle(learnSkillTrigger);
        console.log("WinoScript: Cycle 2 Log:");
        finalState2.log.forEach(logEntry => console.log(`  -> ${logEntry}`));
        if (finalState2.errorsEncountered && finalState2.errorsEncountered.length > 0) {
            console.error("WinoScript: Errors encountered in Cycle 2:", finalState2.errorsEncountered);
        }

    } else {
        console.error("WinoScript: System could not be run due to initialization errors.");
    }
}

// --- نقطة الدخول الرئيسية للتطبيق ---
if (require.main === module) {
    main().catch(err => {
        console.error("WinoScript: Unhandled error in main execution:", err);
        process.exit(1); // إنهاء البرنامج مع رمز خطأ
    });
}

module.exports = WinoSystem; // لتصدير الكلاس إذا أردت استخدامه كموديول

تعديلات core/cognitive_flow.json المقترحة:
 * تحديث العنوان والوصف (كما ناقشنا سابقاً):
   {
  "id": "cognitive_flow_main_script",
  "title": "WinoScript: السكريبت الإدراكي الرئيسي (Main Cognitive Flow)",
  "description": "يحدد هذا المخطط التسلسل القياسي للخطوات التي ينفذها `wino.js` (المنسق الرئيسي) لتشغيل دورة إدراكية كاملة. كل خطوة تستدعي واحداً أو أكثر من المفاهيم الأساسية، وتعدل 'كائن الحالة الديناميكي' الذي يتدفق عبر النظام.",
  // ... (بقية الملف)

 * إضافة step_number (اختياري لكن مفيد للتتبع):
   يمكنك إضافة حقل step_number لكل خطوة ليكون مرجعاً أوضح من step (الذي قد يكون وصفياً).
   "steps": [
    {
      "step_number": 0,
      "step": "context_setup_and_goal_priming", // يمكنك الإبقاء على هذا كمعرف وصفي
      "title": "تهيئة السياق وتحديد الهدف (Pre-computation & Goal Priming)",
      // ...
    },
    // ...
]

 * توضيح حقول input_from_dynamic_state و output_to_dynamic_state_key (تصبح مهمة جداً):
   هذه الحقول أصبحت الآن حيوية لـ wino.js ليعرف كيف يدير dynamicStateObject.
   * input_from_dynamic_state: (اختياري) يمكن أن يكون سلسلة نصية أو مصفوفة من المفاتيح التي يجب أن يأخذها المفهوم من dynamicState. إذا لم يحدد، يمكن للمفهوم أن يأخذ dynamicState كاملاً.
   * output_to_dynamic_state_key: (مهم) يحدد المفتاح الذي سيتم تحته تخزين مخرجات هذا المفهوم في dynamicState. إذا لم يحدد، يمكن لـ wino.js أن يقوم بدمج سطحي (shallow merge) للمخرجات مع dynamicState.
   مثال للخطوة 3 (middleware):
   {
  "step_number": 3,
  "step": "security_screening_and_trust_assessment",
  "title": "الجسر الإدراكي: استقبال وفلترة المدخلات وتقييم الثقة",
  "concepts": ["middleware", "trust_matrix"], // يمكن أن يكون أكثر من مفهوم
  "function": "يستقبل المدخلات من البيئة (أو المؤثر الحالي)، يقوم بفحصها، تصفيتها، وتقييم مصداقيتها وأمانها.",
  "input_from_dynamic_state": ["currentTrigger.data", "attention.profile"], // أمثلة للمفاتيح المطلوبة
  "output_to_dynamic_state_key": "perception", // سيتم تخزين مخرجات middleware تحت dynamicState.perception
  "config_for_step": { "filter_level": "normal" } // إعدادات خاصة بهذه الخطوة إذا لزم الأمر
}

   وفي كود wino.js، ستقوم باستخلاص هذه المدخلات وتمريرها، ثم تخزين المخرجات بناءً على output_to_dynamic_state_key.
شرح مفصل للكود في wino.js:
 * الاستيراد والتحميل:
   * يتم استيراد كلاسات المفاهيم الأساسية التي يفترض أنها مُعرَّفة ومُصدَّرة في ملفات _pseudo.js الخاصة بها.
   * loadJSONConfig: دالة مساعدة لتحميل ملفات JSON للإعدادات (مثل cognitive_flow.json).
 * كلاس WinoSystem:
   * constructor: يخزن مسارات ملفات الإعدادات ويهيئ قاموس this.concepts الذي سيحتوي على نسخ (instances) من المفاهيم.
   * initialize (مهم جداً):
     * يحمّل cognitive_flow.json (السكريبت الرئيسي).
     * يقوم بإنشاء نسخ (instances) من جميع كلاسات المفاهيم. هذا هو المكان الذي يتم فيه "حقن الاعتماديات" (Dependency Injection). على سبيل المثال، عندما يتم إنشاء AttentionManager، يتم تمرير نسخة من MotivationCore إليه. يجب مراعاة ترتيب التهيئة لضمان توفر الاعتماديات.
     * يخزن هذه النسخ في this.concepts باستخدام معرفات (IDs) تتوافق مع ما هو موجود في cognitive_flow.json (مثل motivation_core, attention_manager).
     * (جديد) يقوم بتهيئة SimulatorOrchestrator ويمرر له المفاهيم التي يحتاجها، ثم يهيئ SkillAcquisitionManager ويمرر له المنسق. ثم يقوم بتحديث مرجع skillProvider في المنسق.
   * runCognitiveCycle (الدالة الرئيسية):
     * تأخذ "مؤثراً" (trigger) كمدخل لبدء دورة إدراكية جديدة.
     * تعيد تهيئة this.dynamicState، وهو كائن يمثل الحالة الديناميكية التي تتدفق وتتغير خلال الدورة. يحتوي على سجل (log) لتتبع الأحداث.
     * حلقة التنفيذ: تمر عبر كل خطوة (step) في this.cognitiveFlowChart.steps.
     * استدعاء المفاهيم: لكل خطوة، تحدد المفاهيم (conceptId) التي يجب استدعاؤها.
     * تحديد الدالة: (الجزء الأكثر تعقيداً) يحدد الدالة المناسبة التي يجب استدعاؤها في كل مفهوم. الكود الحالي يحتوي على switch statement كمثال، ولكن في نظام أكثر تطوراً، يمكن أن يكون هذا أكثر ديناميكية (مثلاً، كل مفهوم يعرّف دالة قياسية مثل executeStep(dynamicState, stepConfig)).
     * إدارة الحالة: تمرر this.dynamicState (أو أجزاء منه ذات صلة) إلى المفهوم.
     * تحديث الحالة: تقوم بتحديث this.dynamicState بناءً على المخرجات من المفهوم. يمكن أن يتم ذلك عن طريق مفتاح محدد في cognitive_flow.json (مثل output_to_dynamic_state_key) أو عن طريق دمج سطحي للمخرجات.
     * معالجة الأخطاء: يسجل الأخطاء ويقرر ما إذا كان سيستمر أو يوقف الدورة.
     * في النهاية، تعيد this.dynamicState المكتمل.
 * دالة main (مثال للتشغيل):
   * توضح كيفية إنشاء نسخة من WinoSystem، تهيئتها، ثم تشغيل دورات إدراكية متعددة بمؤثرات مختلفة (مثال لمؤثر خارجي ومثال لدافع داخلي لتعلم مهارة).
   * تطبع سجل الدورة وأي أخطاء تمت مواجهتها.
 * نقطة الدخول if (require.main === module):
   * هذا نمط شائع في Node.js لتشغيل دالة main فقط عندما يتم تنفيذ الملف مباشرة (وليس عندما يتم استيراده كموديول).
لتشغيل هذا الكود في بيئة Node.js:
 * تأكد أن جميع ملفات _pseudo.js موجودة في المسارات الصحيحة وتقوم بتصدير الكلاسات (module.exports = ClassName;).
 * تأكد أن ملفات JSON (cognitive_flow.json, simulators.json, index.json) موجودة في المسارات الصحيحة.
 * ضع هذا الكود في ملف wino.js في جذر مشروعك (خارج مجلد core).
 * من الطرفية، نفذ: node wino.js.
هذه البنية تجعل wino.js هو المنظم المركزي الذي يستخدم cognitive_flow.json كخريطة طريق لتنسيق عمل جميع مفاهيمك. إنها خطوة كبيرة نحو نظام متكامل ومرن.
