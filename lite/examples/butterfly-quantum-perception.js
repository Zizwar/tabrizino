/**
 * Butterfly Quantum Perception - CPF~ Lite Example
 * 
 * Demonstrates how all 17 concepts work together to model butterfly perception
 * Shows probabilistic cognition in action with varying results each run
 * 
 * @example ButterflyPerception
 * @version 3.0-quantum
 */

const WinoQuantum = require('../wino-quantum');

/**
 * Butterfly Perception Demonstration
 * 
 * This example shows how CPF~ Lite models simple entity perception
 * where the same stimulus produces contextually appropriate but varied responses
 */
class ButterflyPerceptionDemo {
    constructor() {
        this.cpf = new WinoQuantum({
            simulators: { creative_mode: true },
            memory: { reconstruction_variability: 0.3 },
            waves: { noise_creativity: 0.4 },
            decisions: { urgency_threshold: 0.6 },
            reality: { anchor_strength: 0.8 }
        });
        
        this.demonstration_scenarios = {
            flower_field_morning: {
                stimulus: "colorful_flower_field",
                context: "spring_morning",
                environmental_factors: {
                    lighting: "bright_sunlight",
                    temperature: "warm",
                    wind: "gentle_breeze",
                    predator_signals: "low"
                },
                butterfly_state: {
                    energy_level: 0.8,
                    hunger: 0.6,
                    mating_drive: 0.4,
                    exploration_motivation: 0.7
                }
            },
            
            flower_field_threat: {
                stimulus: "colorful_flower_field",
                context: "predator_nearby",
                environmental_factors: {
                    lighting: "bright_sunlight",
                    temperature: "warm",
                    wind: "gentle_breeze",
                    predator_signals: "high"
                },
                butterfly_state: {
                    energy_level: 0.8,
                    hunger: 0.6,
                    mating_drive: 0.4,
                    exploration_motivation: 0.2,
                    alert_level: 0.9
                }
            },
            
            flower_field_evening: {
                stimulus: "colorful_flower_field",
                context: "evening_twilight",
                environmental_factors: {
                    lighting: "dim_golden",
                    temperature: "cooling",
                    wind: "calm",
                    predator_signals: "low"
                },
                butterfly_state: {
                    energy_level: 0.3,
                    hunger: 0.8,
                    mating_drive: 0.1,
                    exploration_motivation: 0.3,
                    fatigue: 0.7
                }
            }
        };
    }

    /**
     * Run complete butterfly perception demonstration
     */
    async runCompleteDemo() {
        console.log("🦋 CPF~ Lite: Butterfly Quantum Perception Demonstration");
        console.log("=" .repeat(60));
        console.log();
        
        console.log("This demo shows how the same stimulus (flower field) produces");
        console.log("different perceptual responses based on context and internal state.");
        console.log("Each run will show probabilistic variations - no two exactly alike!");
        console.log();
        
        for (const [scenario_name, scenario] of Object.entries(this.demonstration_scenarios)) {
            await this.runScenarioDemo(scenario_name, scenario);
            console.log();
        }
        
        await this.runMultipleIterationsDemo();
    }

    /**
     * Run single scenario demonstration
     */
    async runScenarioDemo(scenario_name, scenario) {
        console.log(`🌸 Scenario: ${scenario_name.replace(/_/g, ' ').toUpperCase()}`);
        console.log("-".repeat(40));
        
        // Display scenario context
        console.log("Context:");
        console.log(`  Stimulus: ${scenario.stimulus}`);
        console.log(`  Environment: ${scenario.context}`);
        console.log(`  Lighting: ${scenario.environmental_factors.lighting}`);
        console.log(`  Predator signals: ${scenario.environmental_factors.predator_signals}`);
        console.log(`  Energy level: ${(scenario.butterfly_state.energy_level * 100).toFixed(0)}%`);
        console.log(`  Hunger: ${(scenario.butterfly_state.hunger * 100).toFixed(0)}%`);
        console.log();
        
        try {
            // Process through CPF~ Lite
            const perception_result = await this.cpf.perceiveAs("butterfly", {
                stimulus: scenario.stimulus,
                context: scenario.context,
                ...scenario.environmental_factors,
                ...scenario.butterfly_state
            });
            
            this.displayPerceptionResults(perception_result);
            
        } catch (error) {
            console.log("❌ Error in perception processing:", error.message);
        }
    }

    /**
     * Display detailed perception results
     */
    displayPerceptionResults(result) {
        console.log("🧠 Cognitive Processing Results:");
        
        // Reality Processing Layer
        if (result.simulators?.superposition_state) {
            console.log("\n  📡 Reality Processing (Quantum Simulators):");
            const active_types = result.simulators.active_types || [];
            console.log(`    Active simulators: ${active_types.join(", ")}`);
            console.log(`    Processing coherence: ${(result.simulators.coherence_score * 100).toFixed(1)}%`);
            
            if (result.simulators.environmental_influence) {
                const env = result.simulators.environmental_influence;
                console.log(`    Environmental influence: ${(env.total_influence * 100).toFixed(1)}%`);
                console.log(`    Dominant factor: ${env.dominant_factor}`);
            }
        }
        
        // Memory Layer
        if (result.memory) {
            console.log("\n  💎 Probabilistic Memory (Agate System):");
            console.log(`    Memory reconstruction confidence: ${(result.memory.reconstruction_confidence * 100).toFixed(1)}%`);
            console.log(`    Emotional coloring: ${result.memory.emotional_coloring ? 'Strong' : 'Mild'}`);
            console.log(`    Memory segments used: ${result.memory.segments_used || 'Multiple'}`);
            
            if (result.memory.reconstruction_variation) {
                console.log(`    Reconstruction variation: ${(result.memory.reconstruction_variation * 100).toFixed(1)}%`);
            }
        }
        
        // Wave Dynamics
        if (result.waves) {
            console.log("\n  🌊 Wave Dynamics (Cognitive Interference):");
            console.log(`    Overall coherence: ${(result.waves.overall_coherence * 100).toFixed(1)}%`);
            console.log(`    Pattern stability: ${(result.waves.pattern_stability * 100).toFixed(1)}%`);
            
            if (result.waves.creative_potential !== undefined) {
                console.log(`    Creative potential: ${(result.waves.creative_potential * 100).toFixed(1)}%`);
            }
            
            if (result.waves.noise_interventions?.length > 0) {
                console.log(`    Noise interventions: ${result.waves.noise_interventions.length} applied`);
            }
        }
        
        // Decision Quantum
        if (result.decision) {
            console.log("\n  ⚡ Decision Quantum (Wave Collapse):");
            console.log(`    Decision state: ${result.decision.state || 'Processing'}`);
            
            if (result.decision.state === "collapsed") {
                console.log(`    Final decision: ${result.decision.decision}`);
                console.log(`    Confidence: ${(result.decision.confidence * 100).toFixed(1)}%`);
                console.log(`    Trigger: ${result.decision.collapse_trigger}`);
            } else {
                console.log(`    Options in superposition: ${result.decision.options?.length || 'Multiple'}`);
                console.log(`    Collapse probability: ${((result.decision.collapse_probability || 0) * 100).toFixed(1)}%`);
            }
        }
        
        // Reality Engine
        if (result.reality) {
            console.log("\n  🔗 Reality Engine (Anchor & Meta-Cognition):");
            console.log(`    Reality anchor strength: ${(result.reality.reality_validation?.anchor_strength * 100).toFixed(1)}%`);
            console.log(`    Safety status: ${result.reality.safety_assessment?.overall_safety > 0.8 ? 'Safe' : 'Monitored'}`);
            console.log(`    Meta-awareness level: ${result.reality.meta_cognitive_status?.awareness_level || 'Implicit'}`);
            
            if (result.reality.interventions_applied?.length > 0) {
                console.log(`    Safety interventions: ${result.reality.interventions_applied.length} applied`);
            }
        }
        
        // Generated Behavioral Response
        console.log("\n  🎯 Emergent Behavioral Response:");
        const behavioral_response = this.synthesizeBehavioralResponse(result);
        console.log(`    Primary action: ${behavioral_response.primary_action}`);
        console.log(`    Action intensity: ${(behavioral_response.intensity * 100).toFixed(1)}%`);
        console.log(`    Duration estimate: ${behavioral_response.duration}`);
        console.log(`    Adaptation level: ${behavioral_response.adaptation}`);
        
        // System Health
        console.log("\n  ⚙️ System Health:");
        console.log(`    Overall coherence: ${(result.coherence_level * 100).toFixed(1)}%`);
        console.log(`    Processing quality: ${this.assessProcessingQuality(result)}%`);
        console.log(`    Concepts actively involved: ${this.countActiveConcepts(result)}/17`);
    }

    /**
     * Synthesize behavioral response from cognitive processing
     */
    synthesizeBehavioralResponse(result) {
        // Analyze the cognitive processing results to predict behavioral outcome
        
        let primary_action = "explore_cautiously";
        let intensity = 0.5;
        let duration = "moderate";
        let adaptation = "flexible";
        
        // Factor in environmental threat level
        const predator_risk = result.environmental_factors?.predator_signals === "high";
        const energy_level = result.butterfly_state?.energy_level || 0.5;
        const coherence = result.coherence_level || 0.5;
        
        if (predator_risk) {
            primary_action = "quick_nectar_gathering_with_escape_readiness";
            intensity = 0.9;
            duration = "brief";
            adaptation = "highly_reactive";
        } else if (energy_level > 0.7 && coherence > 0.7) {
            primary_action = "exploratory_flower_investigation";
            intensity = 0.8;
            duration = "extended";
            adaptation = "curious";
        } else if (energy_level < 0.4) {
            primary_action = "conservative_feeding_prioritization";
            intensity = 0.6;
            duration = "focused";
            adaptation = "efficiency_focused";
        }
        
        // Add variation based on wave dynamics
        if (result.waves?.creative_potential > 0.7) {
            primary_action += "_with_novel_patterns";
            adaptation = "creative";
        }
        
        if (result.waves?.noise_interventions?.length > 0) {
            adaptation += "_with_interruption_resilience";
        }
        
        return {
            primary_action: primary_action,
            intensity: intensity,
            duration: duration,
            adaptation: adaptation
        };
    }

    /**
     * Run multiple iterations to show probabilistic variation
     */
    async runMultipleIterationsDemo() {
        console.log("🔄 PROBABILISTIC VARIATION DEMONSTRATION");
        console.log("=" .repeat(60));
        console.log("Running the same scenario 3 times to show how results vary...");
        console.log();
        
        const scenario = this.demonstration_scenarios.flower_field_morning;
        const iterations = [];
        
        for (let i = 1; i <= 3; i++) {
            console.log(`Run ${i}:`);
            console.log("-".repeat(10));
            
            try {
                const result = await this.cpf.perceiveAs("butterfly", {
                    stimulus: scenario.stimulus,
                    context: scenario.context,
                    ...scenario.environmental_factors,
                    ...scenario.butterfly_state
                });
                
                const behavioral_response = this.synthesizeBehavioralResponse(result);
                const processing_quality = this.assessProcessingQuality(result);
                
                iterations.push({
                    run: i,
                    primary_action: behavioral_response.primary_action,
                    intensity: behavioral_response.intensity,
                    coherence: result.coherence_level || 0.5,
                    processing_quality: processing_quality,
                    active_concepts: this.countActiveConcepts(result)
                });
                
                console.log(`  Action: ${behavioral_response.primary_action}`);
                console.log(`  Intensity: ${(behavioral_response.intensity * 100).toFixed(1)}%`);
                console.log(`  Coherence: ${((result.coherence_level || 0.5) * 100).toFixed(1)}%`);
                console.log(`  Quality: ${processing_quality}%`);
                console.log();
                
            } catch (error) {
                console.log(`  ❌ Error in run ${i}: ${error.message}`);
                console.log();
            }
        }
        
        // Analyze variation
        this.analyzeIterationVariation(iterations);
    }

    /**
     * Analyze variation across iterations
     */
    analyzeIterationVariation(iterations) {
        if (iterations.length < 2) return;
        
        console.log("📊 VARIATION ANALYSIS:");
        console.log("-".repeat(20));
        
        // Calculate variation metrics
        const intensities = iterations.map(iter => iter.intensity);
        const coherences = iterations.map(iter => iter.coherence);
        const qualities = iterations.map(iter => iter.processing_quality);
        
        const intensity_variation = this.calculateVariation(intensities);
        const coherence_variation = this.calculateVariation(coherences);
        const quality_variation = this.calculateVariation(qualities);
        
        console.log(`Intensity variation: ${(intensity_variation * 100).toFixed(1)}%`);
        console.log(`Coherence variation: ${(coherence_variation * 100).toFixed(1)}%`);
        console.log(`Quality variation: ${(quality_variation * 100).toFixed(1)}%`);
        
        // Check if actions varied
        const unique_actions = new Set(iterations.map(iter => iter.primary_action));
        console.log(`Action diversity: ${unique_actions.size}/${iterations.length} unique responses`);
        
        // Consistency assessment
        const avg_coherence = coherences.reduce((a, b) => a + b, 0) / coherences.length;
        const consistency_score = avg_coherence * (1 - intensity_variation);
        
        console.log(`Consistency score: ${(consistency_score * 100).toFixed(1)}%`);
        console.log();
        
        if (consistency_score > 0.7) {
            console.log("✅ Results show good consistency with appropriate variation");
        } else if (consistency_score > 0.5) {
            console.log("⚠️ Results show moderate consistency - some instability detected");
        } else {
            console.log("❌ Results show high variation - system may need tuning");
        }
        
        console.log();
        console.log("This demonstrates CPF~ Lite's core principle:");
        console.log("Same input → Contextually appropriate variations");
        console.log("(Like human cognition: similar but never identical)");
    }

    /**
     * Utility methods
     */
    
    assessProcessingQuality(result) {
        const factors = [
            result.coherence_level || 0.5,
            result.simulators?.coherence_score || 0.5,
            result.memory?.reconstruction_confidence || 0.5,
            result.waves?.overall_coherence || 0.5,
            result.reality?.system_coherence || 0.5
        ];
        
        const average = factors.reduce((a, b) => a + b, 0) / factors.length;
        return Math.round(average * 100);
    }
    
    countActiveConcepts(result) {
        let count = 0;
        
        // Count concepts that show activity
        if (result.simulators?.active_types?.length > 0) count += result.simulators.active_types.length;
        if (result.memory?.reconstruction_confidence > 0.3) count += 3; // memory, reconstruction, encryption
        if (result.waves?.interference_detected) count += 3; // waves, oscillators, noise
        if (result.decision?.state) count += 3; // collapse, trust, social
        if (result.reality?.reality_validation) count += 4; // ariadne, meta, embodiment, environment
        
        return Math.min(17, count); // Cap at 17 total concepts
    }
    
    calculateVariation(values) {
        if (values.length < 2) return 0;
        
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        const std_dev = Math.sqrt(variance);
        
        return mean > 0 ? std_dev / mean : 0; // Coefficient of variation
    }
}

/**
 * Example usage and execution
 */
async function runButterflyDemo() {
    const demo = new ButterflyPerceptionDemo();
    await demo.runCompleteDemo();
}

// Export for use in other examples
module.exports = { ButterflyPerceptionDemo, runButterflyDemo };

// Auto-run if this file is executed directly
if (require.main === module) {
    runButterflyDemo().catch(error => {
        console.error("Demo execution error:", error);
    });
}
