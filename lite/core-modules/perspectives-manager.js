/**
 * Perspectives Manager - مدير المناظير
 * 
 * يدير "العدسات" المختلفة التي يمكن تطبيقها على المحاكي الأساسي.
 * @module PerspectivesManager
 */
class PerspectivesManager {
    constructor() {
        this.perspectives = new Map();
        this.initialize_default_perspectives();
    }

    initialize_default_perspectives() {
        // منظور الوالدين
        this.add_perspective('parental_protective', {
            trust_matrix: {
                family: { trust: 0.9, reliability: 0.95 },
                strangers: { trust: 0.2, reliability: 0.3 },
                authority: { trust: 0.7, reliability: 0.8 }
            },
            emotional_filter: 'protective_caring', // اسم الفلتر أو إعداده
            script_bias: 'stability.script', // اسم السكريبت أو تأثيره
            memory_access_rules: {
                prioritize: ['family_events', 'safety_related'],
                de_emphasize: ['risky_adventures']
            }
        });

        // منظور الذات المستقبلية
        this.add_perspective('future_growth', {
            trust_matrix: {
                opportunities: { trust: 0.8, reliability: 0.6 },
                status_quo: { trust: 0.3, reliability: 0.7 },
                learning: { trust: 0.9, reliability: 0.8 }
            },
            emotional_filter: 'ambitious_optimistic',
            script_bias: 'growth.script',
            memory_access_rules: {
                prioritize: ['achievements', 'learning_moments'],
                de_emphasize: ['failures', 'limitations']
            }
        });

        // منظور القلق الاجتماعي
        this.add_perspective('social_uncertainty', {
            trust_matrix: {
                self_worth: { trust: 0.2, reliability: 0.1 },
                social_judgments: { trust: 0.1, paranoia_factor: 0.7 },
                peers: { trust: 0.3, reliability: 0.2 }
            },
            emotional_filter: 'anxious_hypervigilant',
            script_bias: 'cautious.script',
            memory_access_rules: {
                prioritize: ['social_failures', 'embarrassing_moments'],
                amplify: ['negative_feedback', 'rejection_signals']
            }
        });
    }

    add_perspective(name, config) {
        this.perspectives.set(name, config);
    }

    get_perspective(name) {
        return this.perspectives.get(name);
    }

    // تفعيل عدة مناظير للبرلمان الداخلي
    activate_parliament(perspective_names) {
        return perspective_names.map(name => this.get_perspective(name)).filter(p => p); // filter out undefined if name not found
    }
}

module.exports = PerspectivesManager;