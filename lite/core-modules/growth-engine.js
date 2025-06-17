/**
 * Growth Engine - محرك النمو البيولوجي
 * 
 * المسؤول عن النمو المستقل للوعاء المعرفي (brain_capacity)
 * يحاكي النمو البيولوجي الطبيعي للدماغ مع التكيف مع التجارب
 * 
 * @module GrowthEngine
 * @version 4.0-vectorial
 */

const ProbabilityCore = require('../probability-core');

class GrowthEngine {
    constructor(unified_space) {
        this.unified_space = unified_space;
        this.webppl = new ProbabilityCore();
        this.is_active = false;
        this.growth_interval_id = null;
        
        // === المحركات المزدوجة للنمو ===
        this.growth_engines = {
            biological: {
                // النمو البيولوجي المستقل (مثل نمو الدماغ الطبيعي)
                base_growth_rate: 0.0001,           // نمو بطيء ومستمر
                accumulator: 0.0,                   // مجمع النمو
                growth_threshold: 1.0,              // عتبة إطلاق النمو
                age_factor: 1.0,                    // عامل العمر (يبطئ مع الوقت)
                nutrition_factor: 1.0,              // عامل "التغذية" المعرفية
                maturation_curve: 'logarithmic'     // منحنى النضج
            },
            cognitive: {
                // النمو المعرفي المدفوع بالحاجة
                demand_accumulator: 0.0,            // طلب النمو المعرفي
                complexity_pressure: 0.0,           // ضغط التعقيد
                learning_boost: 1.0,                // دفعة التعلم
                challenge_response: 0.0,            // استجابة للتحديات
                creativity_catalyst: 0.0            // محفز الإبداع
            }
        };
        
        // === مراحل النمو ===
        this.growth_stages = {
            infant: { capacity_range: [10, 1000], growth_rate: 2.0, plasticity: 0.95 },
            child: { capacity_range: [1000, 50000], growth_rate: 1.5, plasticity: 0.85 },
            adolescent: { capacity_range: [50000, 500000], growth_rate: 1.2, plasticity: 0.70 },
            adult: { capacity_range: [500000, 2000000], growth_rate: 0.8, plasticity: 0.50 },
            mature: { capacity_range: [2000000, 5000000], growth_rate: 0.4, plasticity: 0.30 },
            elder: { capacity_range: [5000000, Infinity], growth_rate: 0.2, plasticity: 0.20 }
        };
        
        // === العوامل البيئية ===
        this.environmental_factors = {
            stress_level: 0.3,                      // مستوى التوتر
            learning_richness: 0.7,                 // ثراء التعلم
            social_stimulation: 0.6,                // التحفيز الاجتماعي
            physical_health: 0.8,                   // الصحة الجسدية
            sleep_quality: 0.7,                     // جودة النوم
            challenge_level: 0.5                    // مستوى التحدي
        };
        
        // === تتبع النمو ===
        this.growth_history = [];
        this.current_stage = null;
        this.growth_predictions = [];
        
        // === أحداث النمو ===
        this.growth_events = {
            major_expansions: [],                   // التوسعات الكبرى
            precision_upgrades: [],                 // ترقيات الدقة
            emergent_abilities: [],                 // القدرات الناشئة
            critical_periods: []                    // الفترات الحرجة
        };
        
        // === إعدادات التحكم ===
        this.growth_settings = {
            biological_tick_interval: 1000,        // كل ثانية
            max_growth_per_cycle: 0.1,             // حد أقصى للنمو في الدورة
            emergency_growth_threshold: 0.95,      // عتبة النمو الطارئ
            precision_expansion_threshold: 5       // عتبة توسع الدقة
        };
        
        // === إحصائيات ===
        this.metrics = {
            total_growth_events: 0,
            biological_growth_count: 0,
            cognitive_growth_count: 0,
            average_growth_rate: 0.0,
            total_capacity_gained: 0,
            growth_efficiency: 0.0,
            stage_transitions: 0
        };
        
        // تحديد المرحلة الحالية
        this.determine_current_stage();
    }

    /**
     * بدء محرك النمو
     */
    start() {
        if (this.is_active) {
            console.log("🌱 Growth engine already active");
            return;
        }
        
        this.is_active = true;
        
        // بدء دورة النمو البيولوجي
        this.growth_interval_id = setInterval(() => {
            this.biological_growth_tick();
        }, this.growth_settings.biological_tick_interval);
        
        console.log("🌱 Growth Engine Started");
        console.log(`   Current capacity: ${this.unified_space.capacity}`);
        console.log(`   Current stage: ${this.current_stage}`);
        console.log(`   Biological growth rate: ${this.growth_engines.biological.base_growth_rate}`);
        console.log(`   Growth tick interval: ${this.growth_settings.biological_tick_interval}ms`);
    }

    /**
     * إيقاف محرك النمو
     */
    stop() {
        if (!this.is_active) return;
        
        clearInterval(this.growth_interval_id);
        this.is_active = false;
        this.growth_interval_id = null;
        
        console.log("🌙 Growth engine stopped");
    }

    /**
     * دورة النمو البيولوجي - تعمل بشكل مستقل
     */
    biological_growth_tick() {
        if (!this.is_active) return;
        
        try {
            // 1. تحديث العوامل البيئية
            this.update_environmental_factors();
            
            // 2. حساب النمو البيولوجي
            const biological_growth = this.calculate_biological_growth();
            
            // 3. تطبيق النمو إذا تجاوز العتبة
            if (biological_growth > 0) {
                this.apply_biological_growth(biological_growth);
            }
            
            // 4. فحص انتقال المراحل
            this.check_stage_transition();
            
            // 5. تحديث التنبؤات
            this.update_growth_predictions();
            
        } catch (error) {
            console.error("❌ Error in biological growth tick:", error);
        }
    }

    /**
     * حساب النمو البيولوجي الطبيعي
     */
    calculate_biological_growth() {
        const bio = this.growth_engines.biological;
        const stage_info = this.growth_stages[this.current_stage];
        
        // النمو الأساسي مع عامل المرحلة
        let base_growth = bio.base_growth_rate * stage_info.growth_rate;
        
        // تطبيق منحنى النضج
        base_growth *= this.calculate_maturation_factor();
        
        // تأثير العوامل البيئية
        base_growth *= this.calculate_environmental_multiplier();
        
        // تجميع النمو
        bio.accumulator += base_growth;
        
        // إطلاق النمو إذا تجاوز العتبة
        if (bio.accumulator >= bio.growth_threshold) {
            const growth_amount = bio.accumulator;
            bio.accumulator = 0; // إعادة تصفير
            return growth_amount;
        }
        
        return 0;
    }

    /**
     * تطبيق النمو البيولوجي
     */
    apply_biological_growth(growth_amount) {
        const old_capacity = this.unified_space.capacity;
        const growth_multiplier = 1 + Math.min(growth_amount, this.growth_settings.max_growth_per_cycle);
        const new_capacity = Math.floor(old_capacity * growth_multiplier);
        
        console.log(`🌱 Biological growth applied!`);
        console.log(`   Growth amount: ${growth_amount.toFixed(6)}`);
        console.log(`   Capacity: ${old_capacity} → ${new_capacity}`);
        
        // تحديث السعة
        this.unified_space.capacity = new_capacity;
        
        // تسجيل حدث النمو
        this.record_growth_event('biological', old_capacity, new_capacity, growth_amount);
        
        // تحديث الإحصائيات
        this.metrics.biological_growth_count++;
        this.metrics.total_capacity_gained += (new_capacity - old_capacity);
        this.metrics.total_growth_events++;
        
        // إشعار المكونات الأخرى بالنمو
        this.notify_growth_event(old_capacity, new_capacity);
    }

    /**
     * النمو المعرفي المدفوع بالطلب
     */
    async request_cognitive_growth(demand_source, urgency = 0.5) {
        console.log(`🧠 Cognitive growth requested by: ${demand_source.type || 'unknown'}`);
        console.log(`   Urgency level: ${urgency.toFixed(2)}`);
        
        const cognitive = this.growth_engines.cognitive;
        
        // زيادة مجمع الطلب
        cognitive.demand_accumulator += urgency * 0.1;
        
        // حساب ضغط التعقيد
        cognitive.complexity_pressure += this.assess_complexity_pressure(demand_source);
        
        // تحديد نوع النمو المطلوب
        const growth_type = this.determine_required_growth_type(demand_source);
        
        // تطبيق النمو إذا تجاوز العتبة
        if (cognitive.demand_accumulator > 0.5 || urgency > 0.8) {
            await this.apply_cognitive_growth(growth_type, cognitive.demand_accumulator);
            cognitive.demand_accumulator = 0; // إعادة تصفير
        }
    }

    /**
     * طلب توسع الدقة (من مكتشف الأنماط)
     */
    async request_precision_expansion(pattern_data) {
        console.log(`🎯 Precision expansion requested for pattern: ${pattern_data.type}`);
        
        const current_precision = this.get_current_vectorial_precision();
        
        if (pattern_data.significance > 0.8 && current_precision < 15) {
            const new_precision = Math.min(15, current_precision + 1);
            
            console.log(`📈 Precision expanded: ${current_precision} → ${new_precision}`);
            
            // تطبيق التوسع
            await this.apply_precision_expansion(new_precision, pattern_data);
            
            // تسجيل الحدث
            this.growth_events.precision_upgrades.push({
                timestamp: Date.now(),
                old_precision: current_precision,
                new_precision: new_precision,
                trigger_pattern: pattern_data,
                success: true
            });
        }
    }

    /**
     * تسريع النمو (للاكتشافات المهمة)
     */
    accelerate_growth(discovery_data) {
        console.log(`🚀 Growth acceleration triggered by discovery: ${discovery_data.probably_id || 'unknown'}`);
        
        const bio = this.growth_engines.biological;
        const cognitive = this.growth_engines.cognitive;
        
        // دفعة نمو فورية
        const acceleration_factor = discovery_data.discovery_potential || 0.5;
        
        bio.accumulator += acceleration_factor * 0.3;
        cognitive.demand_accumulator += acceleration_factor * 0.4;
        cognitive.creativity_catalyst += acceleration_factor * 0.2;
        
        console.log(`   Biological boost: +${(acceleration_factor * 0.3).toFixed(3)}`);
        console.log(`   Cognitive boost: +${(acceleration_factor * 0.4).toFixed(3)}`);
        
        // تحديث دقة التشفير العاطفي أيضاً
        if (this.unified_space.emotional_crypto) {
            this.unified_space.emotional_crypto.crypto_precision = Math.min(12, 
                this.unified_space.emotional_crypto.crypto_precision + 1);
        }
    }

    /**
     * تحديد المرحلة الحالية للنمو
     */
    determine_current_stage() {
        const current_capacity = this.unified_space.capacity;
        
        for (const [stage_name, stage_info] of Object.entries(this.growth_stages)) {
            const [min_capacity, max_capacity] = stage_info.capacity_range;
            
            if (current_capacity >= min_capacity && current_capacity < max_capacity) {
                const previous_stage = this.current_stage;
                this.current_stage = stage_name;
                
                if (previous_stage && previous_stage !== stage_name) {
                    this.handle_stage_transition(previous_stage, stage_name);
                }
                
                return stage_name;
            }
        }
        
        // إذا تجاوز كل المراحل، فهو في مرحلة "elder"
        this.current_stage = 'elder';
        return 'elder';
    }

    /**
     * التعامل مع انتقال المراحل
     */
    handle_stage_transition(old_stage, new_stage) {
        console.log(`🎯 Stage transition: ${old_stage} → ${new_stage}`);
        
        const transition_event = {
            timestamp: Date.now(),
            old_stage: old_stage,
            new_stage: new_stage,
            capacity_at_transition: this.unified_space.capacity,
            new_abilities: this.discover_stage_abilities(new_stage)
        };
        
        this.growth_events.critical_periods.push(transition_event);
        this.metrics.stage_transitions++;
        
        // تطبيق تغييرات المرحلة الجديدة
        this.apply_stage_changes(new_stage);
        
        // إشعار المكونات الأخرى
        this.notify_stage_transition(transition_event);
    }

    /**
     * تطبيق تغييرات المرحلة الجديدة
     */
    apply_stage_changes(new_stage) {
        const stage_info = this.growth_stages[new_stage];
        
        // تحديث معدل النمو
        this.growth_engines.biological.base_growth_rate *= stage_info.growth_rate;
        
        // تحديث المرونة المعرفية
        if (this.unified_space.space.wave_dynamics) {
            this.unified_space.space.wave_dynamics.cognitive_plasticity = stage_info.plasticity;
        }
        
        // إطلاق قدرات جديدة للمرحلة
        this.unlock_stage_abilities(new_stage);
    }

    /**
     * حساب عامل النضج
     */
    calculate_maturation_factor() {
        const current_capacity = this.unified_space.capacity;
        const bio = this.growth_engines.biological;
        
        switch (bio.maturation_curve) {
            case 'logarithmic':
                // نمو سريع في البداية، ثم يتباطأ
                return Math.log(current_capacity + 1) / Math.log(current_capacity + 1000);
                
            case 'sigmoid':
                // منحنى S - بطيء، ثم سريع، ثم بطيء
                return 1 / (1 + Math.exp(-0.001 * (current_capacity - 100000)));
                
            default:
                return 1.0;
        }
    }

    /**
     * حساب مضاعف العوامل البيئية
     */
    calculate_environmental_multiplier() {
        const env = this.environmental_factors;
        
        // العوامل الإيجابية
        const positive_factors = 
            env.learning_richness * 0.3 +
            env.social_stimulation * 0.2 +
            env.physical_health * 0.2 +
            env.sleep_quality * 0.2 +
            env.challenge_level * 0.1;
        
        // العوامل السلبية
        const negative_factors = env.stress_level * 0.3;
        
        // المضاعف النهائي
        return Math.max(0.1, positive_factors - negative_factors + 0.5);
    }

    /**
     * تحديث العوامل البيئية
     */
    update_environmental_factors() {
        // تحديث بناءً على حالة النظام
        const reality_engine = this.unified_space.space.reality_engine;
        const wave_dynamics = this.unified_space.space.wave_dynamics;
        
        if (reality_engine && reality_engine.system_state) {
            // تحديث التوتر بناءً على قوة مرساة الواقع
            this.environmental_factors.stress_level = Math.max(0.1, 
                1.0 - reality_engine.system_state.reality_anchor_strength);
        }
        
        if (wave_dynamics && wave_dynamics.wave_state) {
            // تحديث جودة النوم بناءً على استقرار الأمواج
            const wave_stability = this.calculate_wave_stability(wave_dynamics);
            this.environmental_factors.sleep_quality = wave_stability;
        }
        
        // تحديث ثراء التعلم بناءً على نشاط النمو المعرفي
        this.environmental_factors.learning_richness = Math.min(1.0, 
            this.growth_engines.cognitive.demand_accumulator);
    }

    /**
     * فحص انتقال المراحل
     */
    check_stage_transition() {
        const new_stage = this.determine_current_stage();
        // determine_current_stage already handles transition if needed
    }

    /**
     * تحديث تنبؤات النمو
     */
    update_growth_predictions() {
        if (this.growth_history.length < 5) return; // نحتاج بيانات كافية
        
        const recent_growth = this.growth_history.slice(-5);
        const average_growth_rate = this.calculate_average_growth_rate(recent_growth);
        
        const predictions = {
            timestamp: Date.now(),
            current_capacity: this.unified_space.capacity,
            predicted_1_hour: this.predict_capacity(average_growth_rate, 3600),
            predicted_1_day: this.predict_capacity(average_growth_rate, 86400),
            predicted_1_week: this.predict_capacity(average_growth_rate, 604800),
            next_stage_eta: this.predict_next_stage_eta(average_growth_rate)
        };
        
        this.growth_predictions.push(predictions);
        
        // الاحتفاظ بآخر 10 تنبؤات فقط
        if (this.growth_predictions.length > 10) {
            this.growth_predictions = this.growth_predictions.slice(-10);
        }
    }

    // =================== Growth Application Methods ===================

    async apply_cognitive_growth(growth_type, growth_amount) {
        console.log(`🧠 Applying cognitive growth: ${growth_type}`);
        console.log(`   Amount: ${growth_amount.toFixed(4)}`);
        
        const old_capacity = this.unified_space.capacity;
        let new_capacity = old_capacity;
        
        switch (growth_type) {
            case 'processing_depth':
                // زيادة عمق المعالجة
                new_capacity = Math.floor(old_capacity * (1 + growth_amount * 0.1));
                break;
                
            case 'connection_density':
                // زيادة كثافة الروابط
                new_capacity = Math.floor(old_capacity * (1 + growth_amount * 0.15));
                await this.enhance_cross_talk_matrix(growth_amount);
                break;
                
            case 'precision_boost':
                // زيادة الدقة المعرفية
                new_capacity = Math.floor(old_capacity * (1 + growth_amount * 0.05));
                await this.boost_processing_precision(growth_amount);
                break;
                
            case 'creative_expansion':
                // توسع إبداعي
                new_capacity = Math.floor(old_capacity * (1 + growth_amount * 0.2));
                await this.expand_creative_capabilities(growth_amount);
                break;
        }
        
        if (new_capacity > old_capacity) {
            this.unified_space.capacity = new_capacity;
            
            // تسجيل حدث النمو
            this.record_growth_event('cognitive', old_capacity, new_capacity, growth_amount, growth_type);
            
            // تحديث الإحصائيات
            this.metrics.cognitive_growth_count++;
            this.metrics.total_capacity_gained += (new_capacity - old_capacity);
            this.metrics.total_growth_events++;
            
            console.log(`   Capacity: ${old_capacity} → ${new_capacity}`);
        }
    }

    async apply_precision_expansion(new_precision, pattern_data) {
        // تطبيق توسع الدقة على جميع المكونات المناسبة
        
        // WaveDynamics
        if (this.unified_space.space.wave_dynamics) {
            this.unified_space.space.wave_dynamics.oscillator_precision = new_precision;
        }
        
        // CognitiveRhythm
        if (this.unified_space.cognitive_rhythm) {
            this.unified_space.cognitive_rhythm.oscillators.existence_precision = new_precision;
        }
        
        // EmotionalCryptography
        if (this.unified_space.emotional_crypto) {
            this.unified_space.emotional_crypto.crypto_precision = Math.min(12, new_precision);
        }
        
        console.log(`🎯 Precision expansion applied across all systems: ${new_precision}`);
    }

    // =================== Enhancement Methods ===================

    async enhance_cross_talk_matrix(growth_amount) {
        // تحسين مصفوفة التواصل المتقاطع
        const simulators = this.unified_space.space.quantum_simulators;
        if (simulators && simulators.cross_talk_matrix) {
            for (const [connection, strength] of Object.entries(simulators.cross_talk_matrix)) {
                simulators.cross_talk_matrix[connection] = Math.min(1.0, 
                    strength + growth_amount * 0.1);
            }
        }
    }

    async boost_processing_precision(growth_amount) {
        // زيادة دقة المعالجة
        const components = [
            this.unified_space.space.quantum_simulators,
            this.unified_space.space.agate_memory,
            this.unified_space.space.decision_quantum
        ];
        
        components.forEach(component => {
            if (component && component.processing_precision) {
                component.processing_precision = Math.min(15, 
                    component.processing_precision + growth_amount);
            }
        });
    }

    async expand_creative_capabilities(growth_amount) {
        // توسيع القدرات الإبداعية
        const wave_dynamics = this.unified_space.space.wave_dynamics;
        if (wave_dynamics) {
            // زيادة قدرة النظام على رؤية الأنماط الإبداعية
            wave_dynamics.creative_pattern_sensitivity = Math.min(1.0, 
                (wave_dynamics.creative_pattern_sensitivity || 0.5) + growth_amount * 0.2);
        }
    }

    // =================== Helper Methods ===================

    record_growth_event(type, old_capacity, new_capacity, growth_amount, subtype = null) {
        const event = {
            timestamp: Date.now(),
            type: type,
            subtype: subtype,
            old_capacity: old_capacity,
            new_capacity: new_capacity,
            growth_amount: growth_amount,
            growth_ratio: new_capacity / old_capacity,
            stage: this.current_stage,
            environmental_factors: { ...this.environmental_factors }
        };
        
        this.growth_history.push(event);
        
        // تنظيف التاريخ القديم
        if (this.growth_history.length > 100) {
            this.growth_history = this.growth_history.slice(-50);
        }
    }

    notify_growth_event(old_capacity, new_capacity) {
        // إشعار الدورة الإدراكية بالنمو
        if (this.unified_space.perceptual_cycle) {
            this.unified_space.perceptual_cycle.last_capacity_check = old_capacity;
        }
        
        console.log(`📢 Growth notification sent to all components`);
    }

    notify_stage_transition(transition_event) {
        console.log(`📢 Stage transition notification: ${transition_event.old_stage} → ${transition_event.new_stage}`);
        
        // يمكن إضافة إشعارات للمكونات الأخرى حسب الحاجة
    }

    assess_complexity_pressure(demand_source) {
        // تقييم ضغط التعقيد من مصدر الطلب
        if (demand_source.type === 'pattern_discovery') {
            return demand_source.significance || 0.5;
        } else if (demand_source.type === 'cross_talk_enhancement') {
            return 0.7;
        } else if (demand_source.type === 'emergency_expansion') {
            return 0.9;
        }
        
        return 0.5;
    }

    determine_required_growth_type(demand_source) {
        // تحديد نوع النمو المطلوب
        if (demand_source.type === 'pattern_discovery') {
            return 'precision_boost';
        } else if (demand_source.type === 'cross_talk_enhancement') {
            return 'connection_density';
        } else if (demand_source.type === 'creative_breakthrough') {
            return 'creative_expansion';
        }
        
        return 'processing_depth';
    }

    get_current_vectorial_precision() {
        // الحصول على الدقة الفيكتورية الحالية
        if (this.unified_space.cognitive_rhythm) {
            return this.unified_space.cognitive_rhythm.oscillators.existence_precision;
        }
        
        // حساب بناءً على السعة
        const capacity = this.unified_space.capacity;
        if (capacity < 500) return 1;
        if (capacity < 5000) return 3;
        if (capacity < 50000) return 5;
        if (capacity < 500000) return 8;
        return 10;
    }

    discover_stage_abilities(stage) {
        // اكتشاف القدرات الجديدة للمرحلة
        const abilities = {
            infant: ['basic_pattern_recognition'],
            child: ['associative_learning', 'simple_creativity'],
            adolescent: ['abstract_thinking', 'complex_pattern_discovery'],
            adult: ['meta_cognition', 'strategic_planning'],
            mature: ['wisdom_integration', 'deep_insight'],
            elder: ['transcendent_understanding', 'pattern_synthesis']
        };
        
        return abilities[stage] || [];
    }

    unlock_stage_abilities(stage) {
        const abilities = this.discover_stage_abilities(stage);
        
        abilities.forEach(ability => {
            console.log(`🔓 Unlocked ability: ${ability}`);
            // يمكن تطبيق القدرات الجديدة على المكونات المناسبة
        });
    }

    calculate_wave_stability(wave_dynamics) {
        // حساب استقرار الأمواج
        if (!wave_dynamics.wave_state.active_oscillators) return 0.7;
        
        let stability_sum = 0;
        let count = 0;
        
        for (const oscillator of wave_dynamics.wave_state.active_oscillators.values()) {
            if (oscillator.stability) {
                stability_sum += oscillator.stability;
                count++;
            }
        }
        
        return count > 0 ? stability_sum / count : 0.7;
    }

    calculate_average_growth_rate(growth_history) {
        if (growth_history.length < 2) return 0;
        
        const total_growth = growth_history.reduce((sum, event) => 
            sum + (event.growth_ratio - 1), 0);
        
        return total_growth / growth_history.length;
    }

    predict_capacity(growth_rate, time_seconds) {
        const cycles_in_time = time_seconds / (this.growth_settings.biological_tick_interval / 1000);
        const predicted_growth = Math.pow(1 + growth_rate, cycles_in_time);
        
        return Math.floor(this.unified_space.capacity * predicted_growth);
    }

    predict_next_stage_eta(growth_rate) {
        const current_stage_info = this.growth_stages[this.current_stage];
        const next_capacity_threshold = current_stage_info.capacity_range[1];
        
        if (growth_rate <= 0) return Infinity;
        
        const capacity_needed = next_capacity_threshold - this.unified_space.capacity;
        const cycles_needed = Math.log(1 + capacity_needed / this.unified_space.capacity) / Math.log(1 + growth_rate);
        
        return cycles_needed * (this.growth_settings.biological_tick_interval / 1000); // في الثواني
    }

    // =================== Getters and Public Interface ===================

    getCurrentStage() {
        return this.current_stage;
    }

    getGrowthPredictions() {
        return this.growth_predictions.slice(-1)[0]; // آخر تنبؤ
    }

    getGrowthHistory() {
        return [...this.growth_history];
    }

    getMetrics() {
        // حساب كفاءة النمو
        this.metrics.average_growth_rate = this.growth_history.length > 0 ? 
            this.calculate_average_growth_rate(this.growth_history) : 0;
        
        this.metrics.growth_efficiency = this.metrics.total_capacity_gained > 0 ? 
            this.metrics.total_growth_events / this.metrics.total_capacity_gained : 0;
        
        return { ...this.metrics };
    }

    getEnvironmentalFactors() {
        return { ...this.environmental_factors };
    }

    // =================== External Control Methods ===================

    set_environmental_factor(factor_name, value) {
        if (this.environmental_factors.hasOwnProperty(factor_name)) {
            this.environmental_factors[factor_name] = Math.max(0, Math.min(1, value));
            console.log(`🌍 Environmental factor updated: ${factor_name} = ${value}`);
        }
    }

    force_growth_spurt(intensity = 0.5) {
        console.log(`💥 Forced growth spurt triggered (intensity: ${intensity})`);
        
        this.growth_engines.biological.accumulator += intensity;
        this.growth_engines.cognitive.demand_accumulator += intensity * 0.8;
        
        // تطبيق فوري إذا كانت الشدة عالية
        if (intensity > 0.7) {
            this.biological_growth_tick();
        }
    }

    enter_critical_period(period_type, duration = 30000) {
        console.log(`⚡ Entering critical period: ${period_type} (${duration}ms)`);
        
        // زيادة مؤقتة في معدل النمو
        const original_rate = this.growth_engines.biological.base_growth_rate;
        this.growth_engines.biological.base_growth_rate *= 2;
        
        // العودة للمعدل الطبيعي بعد المدة المحددة
        setTimeout(() => {
            this.growth_engines.biological.base_growth_rate = original_rate;
            console.log(`⚡ Critical period ended: ${period_type}`);
        }, duration);
        
        // تسجيل الفترة الحرجة
        this.growth_events.critical_periods.push({
            type: period_type,
            start_time: Date.now(),
            duration: duration,
            capacity_at_start: this.unified_space.capacity
        });
    }
}

module.exports = GrowthEngine;
