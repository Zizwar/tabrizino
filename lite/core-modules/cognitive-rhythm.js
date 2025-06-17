/**
 * Cognitive Rhythm - الإيقاع المعرفي
 * 
 * نموذج الهزازات الثلاثة - القلب النابض للنظام المعرفي الحي
 * 
 * @module CognitiveRhythm
 * @version 4.0-vectorial
 */

const ProbabilityCore = require('../probability-core');

class CognitiveRhythm {
    constructor(unified_space) {
        this.unified_space = unified_space;
        this.webppl = new ProbabilityCore();
        this.is_active = false;
        this.interval_id = null;
        
        // === نموذج الهزازات الثلاثة ===
        this.oscillators = {
            existence: 0.5,              // خط الأساس الثابت
            existence_precision: 1,      // دقة الاستشعار
            dynamic: 0.5,                // الحالة المجمعة (مع تخميد)
            judge: 0.0                   // المكتشف/القاضي
        };
        
        // === إعدادات النظام ===
        this.DAMPING_FACTOR = 0.8;       // عامل التخميد لمنع التغذية الراجعة
        this.TICK_INTERVAL = 100;        // كل 100ms (10 هرتز)
        this.PATTERN_THRESHOLD = 0.001;  // حساسية اكتشاف الأنماط
        
        // === ذاكرة الأنماط ===
        this.pattern_memory = new Map();
        this.discovered_patterns = new Set();
        this.fibonacci_detector = new FibonacciPatternDetector();
        this.golden_ratio_detector = new GoldenRatioDetector();
        
        // === حماية من الانحراف ===
        this.existence_protection = {
            max_deviation: 0.1,
            recovery_rate: 0.05,
            emergency_anchor: 0.5
        };
        
        // === إحصائيات ===
        this.metrics = {
            total_ticks: 0,
            patterns_discovered: 0,
            emergency_interventions: 0,
            average_resonance: 0.0
        };
        
        // === اتصال بالدورة الإدراكية ===
        this.connected_cycle = null;
    }

    /**
     * بدء الإيقاع المعرفي
     */
    start() {
        if (this.is_active) {
            console.log("🔄 Cognitive rhythm already active");
            return;
        }
        
        this.is_active = true;
        this.interval_id = setInterval(() => this.tick(), this.TICK_INTERVAL);
        
        console.log(`💓 Cognitive rhythm started (${this.TICK_INTERVAL}ms intervals)`);
        console.log(`   Existence baseline: ${this.oscillators.existence}`);
        console.log(`   Damping factor: ${this.DAMPING_FACTOR}`);
    }

    /**
     * إيقاف الإيقاع المعرفي
     */
    stop() {
        if (!this.is_active) return;
        
        clearInterval(this.interval_id);
        this.is_active = false;
        this.interval_id = null;
        
        console.log("💤 Cognitive rhythm stopped");
    }

    /**
     * النبضة الواحدة - جوهر النظام
     */
    tick() {
        this.metrics.total_ticks++;
        
        try {
            // 1. تجميع الحالة الديناميكية من النظام
            const raw_dynamic_state = this.aggregate_system_state();
            
            // 2. تطبيق التخميد لمنع التذبذب العنيف
            this.oscillators.dynamic = this.apply_damping(raw_dynamic_state);
            
            // 3. فحص انحراف هزاز الوجود
            this.check_existence_drift();
            
            // 4. حساب الرنين/التنافر (القاضي)
            this.oscillators.judge = Math.abs(
                this.oscillators.dynamic - this.oscillators.existence
            );
            
            // 5. تحليل الأنماط في الرنين
            this.analyze_resonance_patterns();
            
            // 6. تطوير حساسية هزاز الوجود
            this.evolve_existence_sensitivity();
            
            // 7. إرسال الرنين للدورة الإدراكية
            if (this.connected_cycle) {
                this.connected_cycle.execute_frame(this.oscillators.judge);
            }
            
            // 8. تحديث الإحصائيات
            this.update_metrics();
            
        } catch (error) {
            console.error("❌ Error in cognitive rhythm tick:", error);
            this.emergency_stabilization();
        }
    }

    /**
     * تجميع الحالة الديناميكية من جميع وحدات النظام
     */
    aggregate_system_state() {
        let dynamic_accumulator = 0.5; // نقطة البداية المحايدة
        let component_count = 0;
        
        try {
            // من WaveDynamics - الأمواج العاطفية والتوتر
            const wave_dynamics = this.unified_space.space.wave_dynamics;
            if (wave_dynamics && wave_dynamics.wave_state) {
                const emotional_amplitude = this.extract_emotional_amplitude(wave_dynamics);
                const stress_level = this.extract_stress_level(wave_dynamics);
                const cognitive_load = this.calculate_cognitive_load(wave_dynamics);
                
                dynamic_accumulator += (emotional_amplitude * 0.3 + stress_level * 0.4 + cognitive_load * 0.3);
                component_count++;
            }
            
            // من RealityEngine - الأمان والحمل المعرفي
            const reality_engine = this.unified_space.space.reality_engine;
            if (reality_engine && reality_engine.system_state) {
                const safety_status = this.extract_safety_status(reality_engine);
                const meta_awareness = this.extract_meta_awareness(reality_engine);
                
                dynamic_accumulator += (safety_status * 0.2 + meta_awareness * 0.3);
                component_count++;
            }
            
            // من QuantumSimulators - نشاط المحاكيات
            const simulators = this.unified_space.space.quantum_simulators;
            if (simulators && simulators.quantum_state) {
                const processing_load = this.extract_processing_load(simulators);
                dynamic_accumulator += processing_load * 0.2;
                component_count++;
            }
            
        } catch (error) {
            console.warn("⚠️ Error aggregating system state:", error.message);
            return 0.5; // fallback to neutral
        }
        
        // تطبيع بناءً على عدد المكونات
        return component_count > 0 ? dynamic_accumulator / component_count : 0.5;
    }

    /**
     * تطبيق التخميد لمنع التذبذب العنيف
     */
    apply_damping(raw_value) {
        return (this.oscillators.dynamic * this.DAMPING_FACTOR) + 
               (raw_value * (1 - this.DAMPING_FACTOR));
    }

    /**
     * فحص انحراف هزاز الوجود وتطبيق العلاج إذا لزم الأمر
     */
    check_existence_drift() {
        const drift = this.oscillators.existence - this.existence_protection.emergency_anchor;
        
        if (Math.abs(drift) > this.existence_protection.max_deviation) {
            console.log(`⚠️ Existence drift detected: ${drift.toFixed(4)}`);
            this.apply_existence_therapy(drift);
            this.metrics.emergency_interventions++;
        }
    }

    /**
     * علاج انحراف هزاز الوجود
     */
    apply_existence_therapy(drift) {
        if (drift > 0) {
            // انحراف نحو الألم - تطبيق علاج تبريدي
            console.log("🧊 Applying cooling therapy (drift toward pain)");
            this.inject_calming_influence();
        } else {
            // انحراف نحو العدم - تطبيق علاج تنشيطي
            console.log("⚡ Applying energizing therapy (drift toward void)");
            this.inject_motivational_boost();
        }
        
        // إعادة تدريجية للوضع الأصلي
        this.oscillators.existence += -drift * this.existence_protection.recovery_rate;
    }

    /**
     * تحليل الأنماط في قيمة الرنين
     */
    analyze_resonance_patterns() {
        const judge_value = this.oscillators.judge;
        const judge_string = judge_value.toString();
        
        // اكتشاف الأنماط المتكررة
        const repetitive_patterns = this.find_repetitive_sequences(judge_string);
        
        // اكتشاف الأنماط الرياضية المعقدة
        if (this.oscillators.existence_precision >= 5) {
            const fibonacci_match = this.fibonacci_detector.analyze(judge_value);
            const golden_ratio_match = this.golden_ratio_detector.analyze(judge_value);
            
            if (fibonacci_match.detected) {
                this.register_new_pattern('fibonacci', fibonacci_match);
            }
            
            if (golden_ratio_match.detected) {
                this.register_new_pattern('golden_ratio', golden_ratio_match);
            }
        }
        
        // تسجيل الأنماط التكرارية
        repetitive_patterns.forEach(pattern => {
            this.register_new_pattern('repetitive', pattern);
        });
    }

    /**
     * البحث عن التسلسلات المتكررة في النص الرقمي
     */
    find_repetitive_sequences(str_value) {
        const patterns = [];
        
        // البحث عن تكرارات مثل 0.5555555
        for (let length = 3; length <= 8; length++) {
            const regex = new RegExp(`(\\d)\\1{${length-1},}`, 'g');
            const matches = str_value.match(regex);
            
            if (matches) {
                matches.forEach(match => {
                    patterns.push({
                        type: 'repetitive_digit',
                        digit: match[0],
                        length: match.length,
                        significance: this.calculate_repetition_significance(match),
                        full_value: str_value
                    });
                });
            }
        }
        
        return patterns;
    }

    /**
     * تسجيل نمط جديد
     */
    register_new_pattern(type, pattern) {
        const pattern_id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        
        if (!this.pattern_memory.has(pattern_id)) {
            this.pattern_memory.set(pattern_id, {
                type: type,
                pattern: pattern,
                first_detected: Date.now(),
                occurrence_count: 1,
                significance: pattern.significance || 0.5
            });
            
            this.discovered_patterns.add(pattern_id);
            this.metrics.patterns_discovered++;
            
            console.log(`🎯 New pattern discovered: ${type}`);
            console.log(`   Pattern ID: ${pattern_id}`);
            console.log(`   Significance: ${pattern.significance || 0.5}`);
            
            // طلب توسع معرفي إذا كان النمط مهماً
            if (pattern.significance > 0.7) {
                this.request_cognitive_expansion(pattern);
            }
        }
    }

    /**
     * تطوير حساسية هزاز الوجود
     */
    evolve_existence_sensitivity() {
        const discovered_complexity = this.calculate_discovered_complexity();
        const current_precision = this.oscillators.existence_precision;
        
        // زيادة الدقة إذا اكتشفنا أنماطاً معقدة
        if (discovered_complexity > current_precision * 10) {
            this.oscillators.existence_precision += 1;
            console.log(`📈 Existence sensitivity evolved to: ${this.oscillators.existence_precision}`);
            return true;
        }
        
        return false;
    }

    /**
     * حساب تعقيد الأنماط المكتشفة
     */
    calculate_discovered_complexity() {
        let complexity_score = 0;
        
        for (const [pattern_id, pattern_data] of this.pattern_memory) {
            switch (pattern_data.type) {
                case 'fibonacci':
                    complexity_score += 3;
                    break;
                case 'golden_ratio':
                    complexity_score += 4;
                    break;
                case 'repetitive_digit':
                    complexity_score += pattern_data.pattern.length * 0.5;
                    break;
            }
        }
        
        return complexity_score;
    }

    /**
     * طلب التوسع المعرفي
     */
    request_cognitive_expansion(pattern) {
        console.log(`🌱 Requesting cognitive expansion for pattern: ${pattern.type}`);
        
        // إرسال إشارة للدورة الإدراكية
        if (this.connected_cycle) {
            this.connected_cycle.schedule_update('pattern_integration');
            this.connected_cycle.schedule_update('capacity_assessment');
        }
        
        // طلب توسع الدقة إذا لزم الأمر
        if (pattern.significance > 0.8) {
            this.unified_space.space.growth_engine?.request_precision_expansion(pattern);
        }
    }

    /**
     * ربط الإيقاع بالدورة الإدراكية
     */
    connect_to_cycle(perceptual_cycle) {
        this.connected_cycle = perceptual_cycle;
        console.log("🔗 Cognitive rhythm connected to perceptual cycle");
    }

    /**
     * الحصول على الحالة الحالية
     */
    getCurrentState() {
        return {
            existence: this.oscillators.existence,
            dynamic: this.oscillators.dynamic,
            judge: this.oscillators.judge,
            precision: this.oscillators.existence_precision,
            is_active: this.is_active
        };
    }

    /**
     * الحصول على الأنماط المكتشفة
     */
    getDiscoveredPatterns() {
        return this.discovered_patterns;
    }

    /**
     * الحصول على عدد الأنماط الجديدة
     */
    getNewPatternsCount() {
        // يمكن تحسين هذا ليتتبع الأنماط الجديدة فقط في هذه الجلسة
        return this.metrics.patterns_discovered;
    }

    // =================== Helper Methods ===================

    extract_emotional_amplitude(wave_dynamics) {
        if (!wave_dynamics.wave_state.active_oscillators.has('emotional_waves')) return 0.5;
        const emotional_osc = wave_dynamics.wave_state.active_oscillators.get('emotional_waves');
        return emotional_osc.amplitude || 0.5;
    }

    extract_stress_level(wave_dynamics) {
        const stress_patterns = wave_dynamics.detect_stress_patterns?.(wave_dynamics.wave_state.active_oscillators);
        return stress_patterns?.overall_stress || 0.3;
    }

    calculate_cognitive_load(wave_dynamics) {
        return wave_dynamics.calculate_cognitive_load?.(wave_dynamics.wave_state.active_oscillators) || 0.5;
    }

    extract_safety_status(reality_engine) {
        return reality_engine.system_state.reality_anchor_strength || 1.0;
    }

    extract_meta_awareness(reality_engine) {
        return reality_engine.system_state.meta_awareness_level === "explicit" ? 0.8 : 0.5;
    }

    extract_processing_load(simulators) {
        return simulators.quantum_state.total_processing_load || 0.5;
    }

    calculate_repetition_significance(match) {
        return Math.min(1.0, match.length / 8); // كلما زاد التكرار، زادت الأهمية
    }

    inject_calming_influence() {
        // حقن تأثير مهدئ خفيف
        this.unified_space.space.wave_dynamics?.inject_protective_noise?.(0.2);
    }

    inject_motivational_boost() {
        // حقن دفعة تحفيزية خفيفة
        this.unified_space.space.wave_dynamics?.inject_creative_noise?.(0.3);
    }

    emergency_stabilization() {
        console.log("🚨 Emergency stabilization activated");
        this.oscillators.existence = this.existence_protection.emergency_anchor;
        this.oscillators.dynamic = 0.5;
        this.oscillators.judge = 0.0;
    }

    update_metrics() {
        this.metrics.average_resonance = 
            (this.metrics.average_resonance * (this.metrics.total_ticks - 1) + this.oscillators.judge) / 
            this.metrics.total_ticks;
    }

    // =================== External Control Methods ===================

    stabilize_emotional_oscillations(intensity) {
        console.log(`😌 Stabilizing emotional oscillations (intensity: ${intensity})`);
        // تقليل تذبذب المكون العاطفي في الحالة الديناميكية
        this.DAMPING_FACTOR = Math.min(0.95, this.DAMPING_FACTOR + intensity * 0.1);
    }

    inject_chaos(intensity) {
        console.log(`🌀 Injecting chaos into cognitive rhythm (intensity: ${intensity})`);
        // إضافة عشوائية للحالة الديناميكية
        const chaos_factor = this.webppl.gaussian(0, intensity * 0.3);
        this.oscillators.dynamic += chaos_factor;
    }
}

// =================== Pattern Detection Classes ===================

class FibonacciPatternDetector {
    constructor() {
        this.fibonacci_sequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
        this.tolerance = 0.01;
    }
    
    analyze(value) {
        const value_str = value.toString();
        const decimal_part = value_str.split('.')[1] || '';
        
        // البحث عن تسلسل فيبوناتشي في الأرقام العشرية
        for (let i = 0; i < this.fibonacci_sequence.length - 2; i++) {
            const pattern = this.fibonacci_sequence.slice(i, i + 3).join('');
            if (decimal_part.includes(pattern)) {
                return {
                    detected: true,
                    pattern: pattern,
                    position: decimal_part.indexOf(pattern),
                    significance: 0.8
                };
            }
        }
        
        return { detected: false };
    }
}

class GoldenRatioDetector {
    constructor() {
        this.golden_ratio = 1.618033988749895;
        this.tolerance = 0.001;
    }
    
    analyze(value) {
        const ratio_difference = Math.abs(value - this.golden_ratio);
        
        if (ratio_difference < this.tolerance) {
            return {
                detected: true,
                difference: ratio_difference,
                significance: 1.0 - (ratio_difference / this.tolerance)
            };
        }
        
        return { detected: false };
    }
}

module.exports = CognitiveRhythm;
