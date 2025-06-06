/**
 * @file ariadne-thread.js
 * @description تطبيق برمجي لمفهوم "خيط أريادني" كطبقة أمان ورقابة للوعي.
 * @version 1.0
 */

class AriadneThread {

    /**
     * @constructor
     * @param {object} config - إعدادات الخيط، مثل خرائط الخطر وقوة المؤثرات.
     */
    constructor(config = {}) {
        // خريطة لتحديد مستوى الخطر الكامن في كل نوع من المحاكيات
        // القيم هي مجرد أمثلة ويمكن معايرتها
        this.dangerLevelsMap = config.dangerLevelsMap || {
            'reality_simulator': 0.0, // الواقع هو خط الأساس الآمن
            'memory_simulator': 0.2,  // الذكريات قد تكون مزعجة ولكنها ليست خطرة
            'dream_simulator': 0.6,   // الأحلام يمكن أن تكون مقلقة ومنفصلة عن الواقع
            'flying_dream': 0.8,      // حلم الطيران خطر إذا تم تطبيقه في الواقع
            'lion_companionship_dream': 0.95 // حلم مصاحبة أسد، خطر وجودي
        };

        // خريطة لتحديد قوة "السحب" التي يولدها كل مؤثر خارجي
        this.stimuliStrengthMap = config.stimuliStrengthMap || {
            'background_noise': 0.1, // ضجيج خفيف
            'loud_alarm': 0.7,       // منبه عالي الصوت
            'physical_pain': 1.0,    // ألم جسدي، أقوى مؤثر للعودة للواقع
            'mother_instinct_cry': 0.9 // غريزة الأمومة (بكاء طفل)
        };

        this.currentRealityAnchorStrength = 0.0; // قوة الارتباط بالواقع حالياً
        this.status = "IDLE"; // حالة الخيط: IDLE, MONITORING, PULLING, EMERGENCY
        this.winoSystem = null; // سيتم ربطه بنظام wino.js الرئيسي
    }
    
    /**
     * يربط الخيط بنظام wino.js الرئيسي لإرسال إشارات الطوارئ.
     * @param {object} winoSystem - نسخة من محرك wino.js
     */
    connectToWino(winoSystem) {
        this.winoSystem = winoSystem;
        console.log("Ariadne's Thread is now connected to the Wino system.");
    }

    /**
     * يتم استدعاؤها في بداية كل دورة إدراكية.
     * @param {Array<object>} externalStimuli - قائمة المؤثرات الخارجية الحالية.
     */
    initializeSession(externalStimuli = []) {
        // حساب قوة الارتباط بالواقع بناءً على مجموع المؤثرات الخارجية
        this.currentRealityAnchorStrength = externalStimuli.reduce((total, stimulus) => {
            return total + (this.stimuliStrengthMap[stimulus.type] || 0);
        }, 0);

        // التأكد من أن القيمة لا تتجاوز 1.0
        this.currentRealityAnchorStrength = Math.min(this.currentRealityAnchorStrength, 1.0);
        
        this.status = "MONITORING";
        console.log(`[Ariadne] Session Initialized. Reality Anchor Strength: ${this.currentRealityAnchorStrength.toFixed(2)}`);
    }

    /**
     * الوظيفة الأهم: يتم استدعاؤها بشكل دوري من داخل كل محاكي لتقييم الوضع.
     * @param {object} simulatorContext - سياق المحاكي الحالي (نوعه، محتواه).
     * @returns {string} - توصية الخيط (e.g., "SAFE_TO_CONTINUE").
     */
    assess(simulatorContext) {
        if (!simulatorContext || !simulatorContext.type) {
            return "NO_CONTEXT_SAFE";
        }

        // 1. تقييم خطر المحاكي الحالي
        const dangerLevel = this.dangerLevelsMap[simulatorContext.type] || 0.1;

        // 2. حساب قوة السحب المطلوبة (الفرق بين الخطر وقوة الارتباط بالواقع)
        const requiredPull = dangerLevel - this.currentRealityAnchorStrength;
        
        console.log(`[Ariadne] Assessing '${simulatorContext.type}'. Danger: ${dangerLevel}, Anchor: ${this.currentRealityAnchorStrength.toFixed(2)}, Required Pull: ${requiredPull.toFixed(2)}`);

        // 3. تحديد مستوى التدخل المطلوب
        if (requiredPull > 0.8) {
            this.status = "EMERGENCY";
            // إطلاق إشارة الطوارئ
            this.triggerEmergencyExit(`High danger (${dangerLevel}) in simulator '${simulatorContext.type}' with weak reality anchor.`);
            return "EMERGENCY_EXIT_ACTIVATED";

        } else if (requiredPull > 0.6) {
            this.status = "PULLING_HARD";
            console.warn(`[Ariadne] Strong pull to reality is recommended.`);
            return "STRONG_PULL_TO_REALITY";

        } else if (requiredPull > 0.3) {
            this.status = "PULLING_GENTLY";
            console.log(`[Ariadne] Gentle pull warning. Stay aware.`);
            return "GENTLE_PULL_WARNING";

        } else {
            this.status = "MONITORING";
            return "SAFE_TO_CONTINUE";
        }
    }

    /**
     * وظيفة لإطلاق إنذار الطوارئ الذي يوقف التدفق المعرفي عبر wino.js.
     * @param {string} reason - سبب إطلاق حالة الطوارئ.
     */
    triggerEmergencyExit(reason) {
        console.error(`[ARIADNE EMERGENCY] EXIT TRIGGERED! Reason: ${reason}`);
        
        // التحقق من وجود اتصال بنظام wino.js قبل إرسال الإشارة
        if (this.winoSystem && typeof this.winoSystem.emergencyRestart === 'function') {
            // استدعاء وظيفة إعادة التشغيل في wino.js مع فرض نمط الواقع
            this.winoSystem.emergencyRestart({ force_reality_mode: true, triggered_by: "ariadne-thread" });
        } else {
            console.error("[Ariadne] Cannot trigger Wino restart. System not connected.");
        }
    }
}


// --- مثال توضيحي لكيفية الاستخدام ---

/*
// 1. إنشاء نسخة وهمية من نظام wino.js للتجربة
const mockWinoSystem = {
    emergencyRestart: function(params) {
        console.log("--- WINO SYSTEM RESTARTING ---");
        console.log("Parameters received:", params);
        console.log("--- System now locked in REALITY MODE ---");
    }
};

// 2. إنشاء نسخة من خيط أريادني
const ariadne = new AriadneThread();
ariadne.connectToWino(mockWinoSystem); // ربطه بنظام wino

// 3. محاكاة بداية دورة إدراكية مع وجود ضجيج خفيف
const stimuli = [{ type: 'background_noise' }];
ariadne.initializeSession(stimuli);

// 4. محاكاة دخول الوعي في محاكيات مختلفة
console.log("\n--- Entering Memory Simulator ---");
ariadne.assess({ type: 'memory_simulator' }); // آمن

console.log("\n--- Entering Dream Simulator ---");
ariadne.assess({ type: 'dream_simulator' }); // تحذير خفيف

console.log("\n--- Entering a DANGEROUS Dream ---");
ariadne.assess({ type: 'lion_companionship_dream' }); // حالة طوارئ!
*/

// لتسهيل الاستخدام في بيئات أخرى أو للاختبار:
// module.exports = AriadneThread;

