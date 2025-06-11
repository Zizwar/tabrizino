/**
 * Decision Wave Collapse - CPF~ Lite Decision Quantum Demonstration
 * 
 * Shows how decisions exist in quantum superposition until trust evaluation,
 * social modeling, and time pressure force wave function collapse
 * 
 * @example DecisionWaveCollapse
 * @version 3.0-quantum
 */

const WinoQuantum = require('../wino-quantum');

/**
 * Decision Wave Collapse Demonstration
 * 
 * Demonstrates the quantum nature of decision-making in CPF~ Lite:
 * - Options exist in superposition
 * - Trust matrix evaluates reliability
 * - Social modeling considers others' perspectives
 * - External pressure forces collapse to final decision
 */
class DecisionWaveCollapseDemo {
    constructor() {
        this.cpf = new WinoQuantum({
            decisions: { 
                collapse_sensitivity: 0.6,
                trust_weight: 0.8,
                social_influence: 0.7
            }
        });
        
        // Decision scenarios for demonstration
        this.decision_scenarios = {
            job_offer_choice: {
                scenario_name: "Job Offer Decision",
                description: "Choosing between multiple job offers with different trade-offs",
                options: [
                    {
                        id: "startup_offer",
                        description: "High-growth startup - equity, risk, learning",
                        salary: 75000,
                        equity: "significant",
                        job_security: 0.3,
                        learning_opportunity: 0.9,
                        work_life_balance: 0.4,
                        prestige: 0.6
                    },
                    {
                        id: "corporate_offer", 
                        description: "Established corporation - stability, benefits, structure",
                        salary: 95000,
                        equity: "minimal",
                        job_security: 0.8,
                        learning_opportunity: 0.5,
                        work_life_balance: 0.7,
                        prestige: 0.8
                    },
                    {
                        id: "remote_consulting",
                        description: "Remote consulting - flexibility, uncertainty, independence",
                        salary: 85000,
                        equity: "none",
                        job_security: 0.4,
                        learning_opportunity: 0.7,
                        work_life_balance: 0.9,
                        prestige: 0.5
                    }
                ],
                trust_context: {
                    entities: [
                        {
                            id: "startup_ceo",
                            competence_history: { successes: 3, failures: 1, total: 4 },
                            benevolence_indicators: { positive: 2, negative: 0 },
                            transparency: 0.8
                        },
                        {
                            id: "corporate_hr",
                            competence_history: { successes: 8, failures: 1, total: 9 },
                            benevolence_indicators: { positive: 1, negative: 0 },
                            transparency: 0.6
                        },
                        {
                            id: "consulting_client",
                            competence_history: { successes: 2, failures: 0, total: 2 },
                            benevolence_indicators: { positive: 1, negative: 1 },
                            transparency: 0.4
                        }
                    ]
                },
                social_models: ["family_expectations", "peer_comparisons", "future_self"],
                time_constraints: {
                    decision_deadline: "1_week",
                    opportunity_windows: {
                        startup: "closing_soon",
                        corporate: "standard_timeline", 
                        consulting: "flexible"
                    }
                }
            },
            
            relationship_decision: {
                scenario_name: "Relationship Commitment",
                description: "Deciding whether to move in together after dating for 1 year",
                options: [
                    {
                        id: "move_in_together",
                        description: "Take the next step - shared apartment, deeper commitment",
                        financial_impact: 0.6, // positive
                        relationship_growth: 0.8,
                        personal_independence: 0.3,
                        future_potential: 0.8,
                        risk_level: 0.4
                    },
                    {
                        id: "keep_separate_places",
                        description: "Maintain current arrangement - independence, slower pace",
                        financial_impact: 0.2,
                        relationship_growth: 0.4,
                        personal_independence: 0.8,
                        future_potential: 0.5,
                        risk_level: 0.2
                    },
                    {
                        id: "temporary_trial",
                        description: "Trial period - spend more nights together first",
                        financial_impact: 0.4,
                        relationship_growth: 0.6,
                        personal_independence: 0.6,
                        future_potential: 0.6,
                        risk_level: 0.3
                    }
                ],
                trust_context: {
                    entities: [
                        {
                            id: "romantic_partner",
                            competence_history: { successes: 7, failures: 2, total: 9 },
                            benevolence_indicators: { positive: 8, negative: 1 },
                            transparency: 0.9,
                            emotional_consistency: 0.8
                        }
                    ]
                },
                social_models: ["family_expectations", "peer_comparisons", "ideal_self", "future_self"],
                emotional_factors: {
                    love_intensity: 0.8,
                    commitment_readiness: 0.6,
                    fear_of_loss_of_independence: 0.5,
                    relationship_satisfaction: 0.8
                }
            },
            
            creative_project_choice: {
                scenario_name: "Creative Project Direction",
                description: "Choosing artistic direction for a creative project with collaborators",
                options: [
                    {
                        id: "experimental_approach",
                        description: "Push boundaries - innovative but risky artistic direction",
                        artistic_satisfaction: 0.9,
                        commercial_viability: 0.3,
                        collaborator_buy_in: 0.4,
                        personal_growth: 0.8,
                        time_requirement: 0.8
                    },
                    {
                        id: "proven_formula",
                        description: "Stick with what works - safe but less innovative",
                        artistic_satisfaction: 0.4,
                        commercial_viability: 0.8,
                        collaborator_buy_in: 0.8,
                        personal_growth: 0.3,
                        time_requirement: 0.4
                    },
                    {
                        id: "hybrid_approach",
                        description: "Balance innovation with proven elements",
                        artistic_satisfaction: 0.6,
                        commercial_viability: 0.6,
                        collaborator_buy_in: 0.7,
                        personal_growth: 0.6,
                        time_requirement: 0.6
                    }
                ],
                trust_context: {
                    entities: [
                        {
                            id: "creative_collaborator_1",
                            competence_history: { successes: 4, failures: 1, total: 5 },
                            benevolence_indicators: { positive: 3, negative: 0 },
                            artistic_vision_alignment: 0.7
                        },
                        {
                            id: "creative_collaborator_2", 
                            competence_history: { successes: 6, failures: 0, total: 6 },
                            benevolence_indicators: { positive: 2, negative: 1 },
                            artistic_vision_alignment: 0.5
                        }
                    ]
                },
                social_models: ["artistic_community", "future_self", "ideal_self"],
                creative_factors: {
                    artistic_integrity_importance: 0.9,
                    practical_success_importance: 0.6,
                    collaboration_harmony_importance: 0.7
                }
            }
        };
        
        // Different pressure contexts for collapse testing
        this.pressure_contexts = {
            low_pressure: {
                time_pressure: 0.2,
                external_pressure: 0.1,
                social_pressure: 0.2,
                urgency: 0.3,
                description: "Relaxed decision environment"
            },
            moderate_pressure: {
                time_pressure: 0.5,
                external_pressure: 0.4,
                social_pressure: 0.5,
                urgency: 0.6,
                description: "Moderate time constraints and expectations"
            },
            high_pressure: {
                time_pressure: 0.8,
                external_pressure: 0.7,
                social_pressure: 0.8,
                urgency: 0.9,
                description: "High stakes, tight timeline, strong social expectations"
            }
        };
    }

    /**
     * Run complete decision wave collapse demonstration
     */
    async runCompleteDemo() {
        console.log("⚡ CPF~ Lite: Decision Wave Collapse Demonstration");
        console.log("=".repeat(52));
        console.log();
        
        console.log("Decision-making as quantum physics:");
        console.log("• Multiple options exist in superposition");
        console.log("• Trust evaluation weights each possibility");
        console.log("• Social modeling adds influence patterns");
        console.log("• Pressure forces wave function collapse");
        console.log("• Result: Single decision with confidence rating");
        console.log();
        
        // Demo 1: Superposition maintenance vs collapse
        await this.demonstrateSupeRPositionCollapse();
        
        // Demo 2: Trust matrix effects on decision weighting
        await this.demonstrateTrustMatrixEffects();
        
        // Demo 3: Social modeling influence
        await this.demonstrateSocialModelingEffects();
        
        // Demo 4: Pressure-induced collapse timing
        await this.demonstratePressureCollapseEffects();
    }

    /**
     * Demonstrate superposition maintenance vs collapse
     */
    async demonstrateSupeRPositionCollapse() {
        console.log("🌀 DEMONSTRATION 1: Superposition Maintenance vs Collapse");
        console.log("=".repeat(54));
        console.log();
        
        const scenario = this.decision_scenarios.job_offer_choice;
        
        console.log(`Decision: ${scenario.scenario_name}`);
        console.log(`Options: ${scenario.options.length} possibilities`);
        console.log("Testing different pressure levels to show collapse behavior...");
        console.log();
        
        for (const [pressure_name, pressure_context] of Object.entries(this.pressure_contexts)) {
            console.log(`🔥 Pressure Level: ${pressure_name.replace(/_/g, ' ').toUpperCase()}`);
            console.log(`   Time pressure: ${(pressure_context.time_pressure * 100).toFixed(0)}%`);
            console.log(`   External pressure: ${(pressure_context.external_pressure * 100).toFixed(0)}%`);
            console.log(`   Social pressure: ${(pressure_context.social_pressure * 100).toFixed(0)}%`);
            
            try {
                const decision_result = await this.cpf.makeDecision({
                    options: scenario.options.map(opt => opt.description),
                    trust_context: scenario.trust_context,
                    social_models: scenario.social_models,
                    time_pressure: pressure_context.time_pressure,
                    external_pressure: pressure_context.external_pressure,
                    social_pressure: pressure_context.social_pressure,
                    urgency: pressure_context.urgency
                });
                
                this.displayDecisionResult(decision_result, pressure_context);
                console.log();
                
            } catch (error) {
                console.log(`   ❌ Decision processing failed: ${error.message}`);
                console.log();
            }
        }
    }

    /**
     * Display decision result with analysis
     */
    displayDecisionResult(result, context) {
        console.log(`   🎯 Decision State: ${result.state.toUpperCase()}`);
        
        if (result.state === "collapsed") {
            console.log(`   ✅ Final Decision: ${result.decision}`);
            console.log(`   🎲 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
            console.log(`   ⚡ Collapse Trigger: ${result.collapse_trigger}`);
            
            if (result.alternative_paths && result.alternative_paths.length > 0) {
                console.log(`   🔀 Alternative paths considered: ${result.alternative_paths.length}`);
            }
        } else {
            console.log(`   🌀 Superposition maintained`);
            console.log(`   📊 Options in play: ${result.options?.length || 'Multiple'}`);
            console.log(`   📈 Collapse probability: ${((result.collapse_probability || 0) * 100).toFixed(1)}%`);
            console.log(`   💡 Recommendation: ${result.recommendation}`);
            
            if (result.information_needs) {
                console.log(`   📋 Information needs: ${result.information_needs.length} identified`);
            }
        }
        
        // Analysis of decision quality
        const quality_analysis = this.analyzeDecisionQuality(result, context);
        console.log(`   📊 Decision quality: ${quality_analysis.quality_rating}%`);
        console.log(`   ⏱️ Process speed: ${quality_analysis.speed_rating}`);
        console.log(`   🎯 Confidence calibration: ${quality_analysis.confidence_calibration}`);
    }

    /**
     * Demonstrate trust matrix effects
     */
    async demonstrateTrustMatrixEffects() {
        console.log("🤝 DEMONSTRATION 2: Trust Matrix Effects on Decision Weighting");
        console.log("=".repeat(58));
        console.log();
        
        const scenario = this.decision_scenarios.relationship_decision;
        const base_pressure = this.pressure_contexts.moderate_pressure;
        
        console.log(`Decision: ${scenario.scenario_name}`);
        console.log("Testing how different trust levels affect option weighting...");
        console.log();
        
        // Create variations of trust context
        const trust_variations = {
            high_trust: {
                entities: scenario.trust_context.entities.map(entity => ({
                    ...entity,
                    competence_history: { successes: 9, failures: 1, total: 10 },
                    benevolence_indicators: { positive: 9, negative: 0 },
                    transparency: 0.9
                }))
            },
            moderate_trust: scenario.trust_context,
            low_trust: {
                entities: scenario.trust_context.entities.map(entity => ({
                    ...entity,
                    competence_history: { successes: 3, failures: 4, total: 7 },
                    benevolence_indicators: { positive: 2, negative: 3 },
                    transparency: 0.3
                }))
            }
        };
        
        for (const [trust_level, trust_context] of Object.entries(trust_variations)) {
            console.log(`🔍 Trust Level: ${trust_level.replace(/_/g, ' ').toUpperCase()}`);
            
            try {
                const decision_result = await this.cpf.makeDecision({
                    options: scenario.options.map(opt => opt.description),
                    trust_context: trust_context,
                    social_models: scenario.social_models,
                    ...base_pressure
                });
                
                this.displayTrustEffectsResult(decision_result, trust_level);
                console.log();
                
            } catch (error) {
                console.log(`   ❌ Trust evaluation failed: ${error.message}`);
                console.log();
            }
        }
    }

    /**
     * Display trust effects on decision
     */
    displayTrustEffectsResult(result, trust_level) {
        console.log("   🤝 Trust Impact Analysis:");
        
        if (result.state === "collapsed") {
            console.log(`   Decision: ${result.decision}`);
            console.log(`   Confidence: ${(result.confidence * 100).toFixed(1)}%`);
            
            // Analyze trust contribution to confidence
            const trust_contribution = this.analyzeTrustContribution(result, trust_level);
            console.log(`   Trust contribution to confidence: ${trust_contribution.contribution}%`);
            console.log(`   Risk assessment adjustment: ${trust_contribution.risk_adjustment}`);
            console.log(`   Information completeness feeling: ${trust_contribution.completeness_feeling}`);
        } else {
            console.log(`   Superposition maintained - insufficient trust for collapse`);
            console.log(`   Primary trust concern: ${this.identifyTrustConcern(trust_level)}`);
        }
        
        // Trust-specific insights
        const trust_insights = this.generateTrustInsights(result, trust_level);
        console.log(`   Trust insight: ${trust_insights.primary_insight}`);
        console.log(`   Recommendation: ${trust_insights.recommendation}`);
    }

    /**
     * Demonstrate social modeling effects
     */
    async demonstrateSocialModelingEffects() {
        console.log("👥 DEMONSTRATION 3: Social Modeling Effects on Decision");
        console.log("=".repeat(52));
        console.log();
        
        const scenario = this.decision_scenarios.creative_project_choice;
        const base_pressure = this.pressure_contexts.moderate_pressure;
        
        console.log(`Decision: ${scenario.scenario_name}`);
        console.log("Testing how different social modeling influences decision...");
        console.log();
        
        // Different social modeling scenarios
        const social_scenarios = {
            family_focused: ["family_expectations"],
            peer_oriented: ["peer_comparisons"],
            self_directed: ["future_self", "ideal_self"],
            community_aware: ["artistic_community", "peer_comparisons"],
            comprehensive: ["family_expectations", "peer_comparisons", "future_self", "ideal_self", "artistic_community"]
        };
        
        for (const [social_context, social_models] of Object.entries(social_scenarios)) {
            console.log(`👥 Social Context: ${social_context.replace(/_/g, ' ').toUpperCase()}`);
            console.log(`   Active models: ${social_models.join(', ')}`);
            
            try {
                const decision_result = await this.cpf.makeDecision({
                    options: scenario.options.map(opt => opt.description),
                    trust_context: scenario.trust_context,
                    social_models: social_models,
                    ...base_pressure
                });
                
                this.displaySocialModelingResult(decision_result, social_context, social_models);
                console.log();
                
            } catch (error) {
                console.log(`   ❌ Social modeling failed: ${error.message}`);
                console.log();
            }
        }
    }

    /**
     * Display social modeling results
     */
    displaySocialModelingResult(result, context, models) {
        console.log("   👥 Social Influence Analysis:");
        
        if (result.state === "collapsed") {
            console.log(`   Decision: ${result.decision}`);
            console.log(`   Confidence: ${(result.confidence * 100).toFixed(1)}%`);
            
            // Analyze social contribution
            const social_analysis = this.analyzeSocialContribution(result, context, models);
            console.log(`   Social pressure level: ${social_analysis.pressure_level}%`);
            console.log(`   Conformity influence: ${social_analysis.conformity_influence}`);
            console.log(`   Identity alignment: ${social_analysis.identity_alignment}`);
        } else {
            console.log(`   Superposition maintained`);
            console.log(`   Social conflict detected: ${this.detectSocialConflict(models)}`);
        }
        
        // Social modeling insights
        const social_insights = this.generateSocialInsights(result, context);
        console.log(`   Primary social factor: ${social_insights.primary_factor}`);
        console.log(`   Social stress level: ${social_insights.stress_level}`);
        console.log(`   Recommendation: ${social_insights.recommendation}`);
    }

    /**
     * Demonstrate pressure-induced collapse timing
     */
    async demonstratePressureCollapseEffects() {
        console.log("💥 DEMONSTRATION 4: Pressure-Induced Collapse Timing");
        console.log("=".repeat(51));
        console.log();
        
        console.log("Same decision under increasing pressure to show collapse dynamics...");
        console.log();
        
        const scenario = this.decision_scenarios.job_offer_choice;
        
        // Progressive pressure increase
        const pressure_progression = [
            { level: 0.1, description: "minimal pressure" },
            { level: 0.3, description: "light pressure" },
            { level: 0.5, description: "moderate pressure" },
            { level: 0.7, description: "high pressure" },
            { level: 0.9, description: "extreme pressure" }
        ];
        
        for (const pressure_point of pressure_progression) {
            console.log(`⚡ Pressure Level: ${(pressure_point.level * 100).toFixed(0)}% (${pressure_point.description})`);
            
            try {
                const decision_result = await this.cpf.makeDecision({
                    options: scenario.options.map(opt => opt.description),
                    trust_context: scenario.trust_context,
                    social_models: scenario.social_models,
                    time_pressure: pressure_point.level,
                    external_pressure: pressure_point.level * 0.8,
                    urgency: pressure_point.level
                });
                
                this.displayPressureCollapseResult(decision_result, pressure_point);
                console.log();
                
            } catch (error) {
                console.log(`   ❌ Pressure handling failed: ${error.message}`);
                console.log();
            }
        }
        
        console.log("📊 COLLAPSE DYNAMICS ANALYSIS:");
        console.log("As pressure increases:");
        console.log("• Lower pressure → Superposition maintained, more information gathering");
        console.log("• Medium pressure → Partial collapse, option narrowing");
        console.log("• High pressure → Rapid collapse, satisficing behavior");
        console.log("• Extreme pressure → Immediate collapse, stress-driven decisions");
    }

    /**
     * Display pressure collapse results
     */
    displayPressureCollapseResult(result, pressure_point) {
        const collapse_indicator = result.state === "collapsed" ? "🔥" : "🌀";
        console.log(`   ${collapse_indicator} Result: ${result.state}`);
        
        if (result.state === "collapsed") {
            console.log(`   ⚡ Decision: ${result.decision}`);
            console.log(`   🎯 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
            console.log(`   ⏱️ Collapse trigger: ${result.collapse_trigger}`);
            
            // Analyze pressure effects on decision quality
            const pressure_effects = this.analyzePressureEffects(result, pressure_point);
            console.log(`   📉 Quality impact: ${pressure_effects.quality_impact}`);
            console.log(`   🏃 Speed vs accuracy trade-off: ${pressure_effects.speed_accuracy_tradeoff}`);
        } else {
            console.log(`   📊 Collapse probability: ${((result.collapse_probability || 0) * 100).toFixed(1)}%`);
            console.log(`   🔄 Options still in superposition: ${result.options?.length || 'Multiple'}`);
            console.log(`   💡 System recommendation: ${result.recommendation}`);
        }
    }

    /**
     * Analysis and utility methods
     */
    
    analyzeDecisionQuality(result, context) {
        let quality_rating = 50; // Base quality
        
        if (result.state === "collapsed") {
            quality_rating += result.confidence * 30;
            if (result.collapse_trigger === "confidence_threshold") quality_rating += 20;
            if (result.collapse_trigger === "time_pressure") quality_rating -= 10;
        } else {
            quality_rating += 10; // Bonus for maintaining superposition when appropriate
        }
        
        const speed_rating = context.time_pressure > 0.7 ? "Fast" : 
                           context.time_pressure > 0.4 ? "Moderate" : "Deliberate";
        
        const confidence_calibration = result.confidence > 0.8 ? "High" :
                                     result.confidence > 0.5 ? "Moderate" : "Low";
        
        return {
            quality_rating: Math.round(Math.max(0, Math.min(100, quality_rating))),
            speed_rating: speed_rating,
            confidence_calibration: confidence_calibration
        };
    }
    
    analyzeTrustContribution(result, trust_level) {
        const trust_mappings = {
            high_trust: { contribution: "85", risk_adjustment: "Low risk tolerance", completeness_feeling: "Comprehensive" },
            moderate_trust: { contribution: "65", risk_adjustment: "Moderate risk tolerance", completeness_feeling: "Adequate" },
            low_trust: { contribution: "35", risk_adjustment: "High risk aversion", completeness_feeling: "Incomplete" }
        };
        
        return trust_mappings[trust_level] || trust_mappings.moderate_trust;
    }
    
    identifyTrustConcern(trust_level) {
        const concerns = {
            high_trust: "None - strong foundation for decision",
            moderate_trust: "Mild uncertainty about outcomes",
            low_trust: "Significant doubt about reliability and intentions"
        };
        
        return concerns[trust_level] || "General trust assessment needed";
    }
    
    generateTrustInsights(result, trust_level) {
        const insights = {
            high_trust: {
                primary_insight: "Trust enables confident decision-making",
                recommendation: "Proceed with chosen option, trust is well-founded"
            },
            moderate_trust: {
                primary_insight: "Adequate trust with some verification needed",
                recommendation: "Proceed cautiously, establish additional checkpoints"
            },
            low_trust: {
                primary_insight: "Trust deficit creating decision paralysis",
                recommendation: "Address trust issues before major commitments"
            }
        };
        
        return insights[trust_level] || insights.moderate_trust;
    }
    
    analyzeSocialContribution(result, context, models) {
        const pressure_level = models.length * 15; // More models = more pressure
        
        const conformity_mappings = {
            family_focused: "High family conformity pressure",
            peer_oriented: "Strong peer influence",
            self_directed: "Minimal conformity, self-focused",
            community_aware: "Professional community standards",
            comprehensive: "Multiple conflicting social pressures"
        };
        
        const identity_mappings = {
            family_focused: "Family role identity prioritized",
            peer_oriented: "Peer group belonging emphasized",
            self_directed: "Individual identity protection",
            community_aware: "Professional identity alignment",
            comprehensive: "Complex identity integration required"
        };
        
        return {
            pressure_level: Math.min(100, pressure_level),
            conformity_influence: conformity_mappings[context] || "Standard social influence",
            identity_alignment: identity_mappings[context] || "Balanced identity consideration"
        };
    }
    
    detectSocialConflict(models) {
        if (models.length > 3) return "High - multiple competing social expectations";
        if (models.includes("family_expectations") && models.includes("peer_comparisons")) {
            return "Moderate - family vs peer conflict potential";
        }
        return "Low - aligned social influences";
    }
    
    generateSocialInsights(result, context) {
        const insights = {
            family_focused: {
                primary_factor: "Family approval and expectations",
                stress_level: "Moderate - family pressure",
                recommendation: "Balance family expectations with personal goals"
            },
            peer_oriented: {
                primary_factor: "Peer acceptance and comparison",
                stress_level: "High - social comparison anxiety",
                recommendation: "Consider long-term vs short-term social approval"
            },
            self_directed: {
                primary_factor: "Personal values and future vision",
                stress_level: "Low - self-determined path",
                recommendation: "Trust internal compass while staying connected"
            },
            comprehensive: {
                primary_factor: "Multiple competing social demands",
                stress_level: "Very High - social overwhelm",
                recommendation: "Prioritize most important relationships and values"
            }
        };
        
        return insights[context] || {
            primary_factor: "Standard social considerations",
            stress_level: "Moderate",
            recommendation: "Balance social and personal factors"
        };
    }
    
    analyzePressureEffects(result, pressure_point) {
        const quality_impact = pressure_point.level > 0.7 ? "Significant degradation" :
                              pressure_point.level > 0.4 ? "Moderate impact" : "Minimal impact";
        
        const speed_accuracy = pressure_point.level > 0.7 ? "Speed heavily favored over accuracy" :
                              pressure_point.level > 0.4 ? "Balanced speed-accuracy trade-off" :
                              "Accuracy favored over speed";
        
        return {
            quality_impact: quality_impact,
            speed_accuracy_tradeoff: speed_accuracy
        };
    }
}

/**
 * Example usage and execution
 */
async function runDecisionCollapseDemo() {
    const demo = new DecisionWaveCollapseDemo();
    await demo.runCompleteDemo();
}

// Export for use in other examples
module.exports = { DecisionWaveCollapseDemo, runDecisionCollapseDemo };

// Auto-run if this file is executed directly
if (require.main === module) {
    runDecisionCollapseDemo().catch(error => {
        console.error("Demo execution error:", error);
    });
}