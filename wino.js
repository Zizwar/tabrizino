// wino.js - Enhanced with Agate Memory Integration
// هذا هو الملف التنفيذي الرئيسي لـ WinoScript مع تكامل ذاكرة العقيق.
// يقوم بتهيئة جميع المفاهيم، وتحميل مخطط التدفق، وتنفيذ دورات الإدراك مع التصويت والتخزين الزمني.

// --- 1. استدعاء مخطط التدفق المحدث ---
const cognitiveLayers = require('./core/cognitive_layers.json');
const cognitiveFlowBlueprint = require('./core/cognitive_flow.json');
const agateMemorySchema = require('./core/agate-memory.json');

// --- 2. تحديث كلاسات المفاهيم لتشمل ذاكرة العقيق ---
const conceptImplementations = {
    // المفاهيم الأساسية مع تكامل العقيق
    MotivationCore: class { 
        async process(data, context) { 
            console.log("MotivationCore processing..."); 
            return { 
                updatedData: data, 
                motivationProfile: { activeGoal: "sample_goal" },
                goalRelevanceForVoting: 0.8 // جديد: صلة الهدف بالتصويت
            }; 
        } 
    },
    
    AttentionManager: class { 
        async process(data, context) { 
            console.log("AttentionManager processing..."); 
            return { 
                updatedData: data, 
                attentionFocus: "focused_element",
                attentionAllocationForVoting: 0.7 // جديد: تخصيص الانتباه للتصويت
            }; 
        } 
    },
    
    Middleware: class { 
        async process(data, context) { 
            console.log("Middleware (The Bridge) processing..."); 
            return { 
                filteredData: data, 
                bridge_status: "data_screened",
                trustLevel: 0.6, // جديد: مستوى الثقة للتصويت
                preliminarySignificance: 0.5 // جديد: تقييم أولي للأهمية
            }; 
        } 
    },
    
    // المحاكيات مع قدرة التصويت
    SimulatorOrchestrator: class { 
        constructor() {
            this.simulators = [
                { id: 'reality_processor', weight: 0.3 },
                { id: 'prediction_engine', weight: 0.25 },
                { id: 'memory_reconstructor', weight: 0.2 },
                { id: 'social_modeler', weight: 0.15 },
                { id: 'pattern_explorer', weight: 0.1 }
            ];
        }
        
        async processWithAllSimulators(data, context) { 
            console.log("SimulatorOrchestrator (Script Runner) processing..."); 
            
            // المعالجة التقليدية
            const gatheredPossibilities = [
                { id: "sim1_option_a", confidence: 0.8, source: 'reality_processor' },
                { id: "sim2_option_b", confidence: 0.6, source: 'prediction_engine' },
                { id: "sim3_option_c", confidence: 0.7, source: 'memory_reconstructor' }
            ];
            
            // جديد: تصويت المحاكيات على أهمية التجربة
            const simulatorVotes = await this.collectVotesOnExperienceSignificance(data, context);
            
            return { 
                gatheredPossibilities: gatheredPossibilities,
                simulatorVotes: simulatorVotes, // جديد
                votingConsensus: this.analyzeVotingConsensus(simulatorVotes) // جديد
            }; 
        }
        
        // جديد: جمع أصوات المحاكيات
        async collectVotesOnExperienceSignificance(data, context) {
            const votes = [];
            
            for (const simulator of this.simulators) {
                const vote = await this.simulateVote(simulator, data, context);
                votes.push(vote);
            }
            
            return votes;
        }
        
        // محاكاة تصويت محاكي واحد
        async simulateVote(simulator, data, context) {
            // محاكاة منطق التصويت حسب نوع المحاكي
            let significanceScore = 0.5; // نقطة البداية
            let suggestedColor = 'white'; // افتراضي
            
            switch (simulator.id) {
                case 'reality_processor':
                    significanceScore = data.realityRelevance || 0.7;
                    suggestedColor = significanceScore > 0.8 ? 'blue' : 'white';
                    break;
                case 'prediction_engine':
                    significanceScore = data.futureImportance || 0.6;
                    suggestedColor = significanceScore > 0.7 ? 'yellow' : 'white';
                    break;
                case 'memory_reconstructor':
                    significanceScore = data.memoryWorthiness || 0.5;
                    suggestedColor = significanceScore > 0.6 ? 'green' : 'white';
                    break;
                case 'social_modeler':
                    significanceScore = data.socialImpact || 0.4;
                    suggestedColor = significanceScore > 0.7 ? 'purple' : 'white';
                    break;
                case 'pattern_explorer':
                    significanceScore = data.novelty || 0.6;
                    suggestedColor = significanceScore > 0.8 ? 'red' : 'white';
                    break;
            }
            
            return {
                simulatorId: simulator.id,
                significanceScore: Math.min(1.0, significanceScore),
                suggestedColor: suggestedColor,
                confidence: 0.7 + Math.random() * 0.2,
                reasoning: `${simulator.id}_assessment_based_on_data_patterns`,
                weight: simulator.weight
            };
        }
        
        // تحليل إجماع التصويت
        analyzeVotingConsensus(votes) {
            const totalWeightedScore = votes.reduce((sum, vote) => 
                sum + (vote.significanceScore * vote.weight), 0);
            
            const averageSignificance = totalWeightedScore / votes.reduce((sum, vote) => sum + vote.weight, 0);
            
            // تحليل الألوان المقترحة
            const colorVotes = {};
            votes.forEach(vote => {
                if (!colorVotes[vote.suggestedColor]) {
                    colorVotes[vote.suggestedColor] = 0;
                }
                colorVotes[vote.suggestedColor] += vote.weight * vote.confidence;
            });
            
            const dominantColor = Object.keys(colorVotes).reduce((a, b) => 
                colorVotes[a] > colorVotes[b] ? a : b);
            
            return {
                averageSignificance: averageSignificance,
                consensusLevel: this.calculateConsensusLevel(votes),
                dominantColor: dominantColor,
                colorVoteDistribution: colorVotes,
                storageRecommendation: averageSignificance > 0.6 ? 'colored_agate' : 'white_agate'
            };
        }
        
        calculateConsensusLevel(votes) {
            const avgScore = votes.reduce((sum, vote) => sum + vote.significanceScore, 0) / votes.length;
            const variance = votes.reduce((sum, vote) => sum + Math.pow(vote.significanceScore - avgScore, 2), 0) / votes.length;
            const standardDeviation = Math.sqrt(variance);
            
            // إجماع عالي = انحراف معياري منخفض
            return Math.max(0, 1 - (standardDeviation * 2));
        }
    },
    
    GenerativeCollapse: class { 
        async process(data, context) { 
            console.log("GenerativeCollapse processing..."); 
            const finalDecision = data.gatheredPossibilities ? data.gatheredPossibilities[0] : "default_decision";
            
            return { 
                finalDecision: finalDecision,
                collapseConfidence: 0.8,
                decisionAgate: { // جديد: معلومات العقيق للقرار
                    color: this.determineDecisionColor(finalDecision, context),
                    timestamp: Date.now(),
                    significance: 0.9
                }
            }; 
        }
        
        determineDecisionColor(decision, context) {
            // منطق تحديد لون العقيق بناءً على نوع القرار
            if (decision.confidence > 0.8) return 'blue'; // قرار واثق
            if (decision.source === 'creative') return 'purple'; // قرار إبداعي
            if (context.emotionalIntensity > 0.7) return 'red'; // قرار عاطفي
            return 'yellow'; // قرار عادي
        }
    },
    
    MetaCognition: class { 
        async monitorAndSuggest(data, context) { 
            console.log("MetaCognition processing..."); 
            return { 
                insights: "cycle_efficient", 
                self_model_update: "minor_adjustment",
                votingEffectivenessAssessment: this.assessVotingEffectiveness(data), // جديد
                timelineQualityMetrics: this.calculateTimelineQuality(data) // جديد
            }; 
        }
        
        assessVotingEffectiveness(data) {
            if (data.votingConsensus) {
                return {
                    consensusRate: data.votingConsensus.consensusLevel,
                    colorConsistency: this.calculateColorConsistency(data.votingConsensus),
                    simulatorAgreement: data.votingConsensus.consensusLevel > 0.7 ? 'high' : 'moderate'
                };
            }
            return { status: 'no_voting_data_available' };
        }
        
        calculateTimelineQuality(data) {
            return {
                storageDecisionQuality: data.agateStorageDecision ? 'good' : 'pending',
                timelineIntegrity: 'maintained',
                compressionEfficiency: 'optimal'
            };
        }
        
        calculateColorConsistency(votingConsensus) {
            const colorDistribution = votingConsensus.colorVoteDistribution;
            const totalVotes = Object.values(colorDistribution).reduce((sum, votes) => sum + votes, 0);
            const dominantColorPercentage = Math.max(...Object.values(colorDistribution)) / totalVotes;
            
            return dominantColorPercentage > 0.6 ? 'high' : 'moderate';
        }
    },
    
    // جديد: ذاكرة العقيق
    AgateMemory: class {
        constructor() {
            this.timeline = [];
            this.votingBuffer = new Map();
            this.compressionSettings = {
                whiteAgateCompressionThreshold: 3,
                maxCompressionRatio: 0.6
            };
            this.logicalConstraints = {
                geographicalSpeedLimits: {
                    walking: 5, // km/h
                    driving_1990s: 80, // km/h average
                    bus_morocco: 60, // km/h with stops
                    train_morocco: 70 // km/h with stops
                },
                technologicalEras: {
                    '1990s': ['bus', 'taxi', 'train', 'car'],
                    '2000s': ['bus', 'taxi', 'train', 'car', 'plane_domestic'],
                    '2020s': ['bus', 'taxi', 'train', 'car', 'plane', 'ride_sharing']
                }
            };
        }
        
        async processStorageDecision(data, context) {
            console.log("AgateMemory: Processing storage decision...");
            
            if (!data.votingConsensus) {
                return this.handleNoVotingData(data, context);
            }
            
            const consensus = data.votingConsensus;
            const storageDecision = this.makeStorageDecision(consensus, context);
            
            if (storageDecision.storeAsColored) {
                const coloredAgate = this.createColoredAgate(data, consensus, context);
                this.insertIntoTimeline(coloredAgate);
                
                return {
                    success: true,
                    agateType: 'colored',
                    agateColor: coloredAgate.color,
                    timelinePosition: coloredAgate.timelinePosition,
                    storageReason: 'high_consensus_significance'
                };
            } else {
                const whiteAgate = this.createWhiteAgate(data, context);
                this.insertIntoTimeline(whiteAgate);
                this.scheduleCompressionCheck();
                
                return {
                    success: true,
                    agateType: 'white',
                    timelinePosition: whiteAgate.timelinePosition,
                    storageReason: 'low_consensus_or_insufficient_significance',
                    speculationPotential: whiteAgate.speculationPotential
                };
            }
        }
        
        makeStorageDecision(consensus, context) {
            const significanceThreshold = 0.6;
            const consensusThreshold = 0.6;
            
            const shouldStoreAsColored = (
                consensus.averageSignificance >= significanceThreshold &&
                consensus.consensusLevel >= consensusThreshold
            );
            
            return {
                storeAsColored: shouldStoreAsColored,
                confidence: consensus.consensusLevel,
                reasoning: shouldStoreAsColored ? 
                    'significance_and_consensus_above_threshold' : 
                    'insufficient_significance_or_consensus'
            };
        }
        
        createColoredAgate(data, consensus, context) {
            return {
                type: 'measured_agate',
                color: consensus.dominantColor,
                content: data.finalDecision || data.gatheredPossibilities,
                significance: consensus.averageSignificance,
                consensusLevel: consensus.consensusLevel,
                timestamp: Date.now(),
                timelinePosition: this.calculateTimelinePosition(),
                votingDetails: consensus,
                emotionalContext: context.emotionalState || null,
                measuredBy: 'generative_collapse',
                compressionEligible: false
            };
        }
        
        createWhiteAgate(data, context) {
            return {
                type: 'white_agate',
                content: 'unmeasured_possibilities',
                speculationPotential: this.assessSpeculationPotential(data, context),
                timestamp: Date.now(),
                timelinePosition: this.calculateTimelinePosition(),
                logicalConstraints: this.calculateLogicalConstraints(context),
                compressionEligible: true,
                reinterpretationHistory: []
            };
        }
        
        assessSpeculationPotential(data, context) {
            const adjacentAgates = this.getAdjacentAgates(this.timeline.length);
            
            return {
                canSpeculate: true,
                constraintTypes: ['geographical', 'temporal', 'technological'],
                adjacentContext: adjacentAgates,
                speculationConfidenceRange: [0.3, 0.7]
            };
        }
        
        calculateLogicalConstraints(context) {
            // حساب القيود المنطقية للعقيق الأبيض
            const constraints = {
                geographical: null,
                temporal: null,
                technological: null,
                physical: null
            };
            
            if (context.location && context.previousLocation) {
                constraints.geographical = this.calculateGeographicalConstraints(
                    context.previousLocation, 
                    context.location,
                    context.timeElapsed
                );
            }
            
            if (context.timeEra) {
                constraints.technological = this.logicalConstraints.technologicalEras[context.timeEra] || [];
            }
            
            return constraints;
        }
        
        calculateGeographicalConstraints(locationA, locationB, timeElapsed) {
            // مثال: الدار البيضاء → طنجة
            if (locationA === 'casablanca' && locationB === 'tangier') {
                const distance = 350; // km
                const timeAvailable = timeElapsed; // milliseconds
                const timeAvailableHours = timeAvailable / (1000 * 60 * 60);
                
                const feasibleMethods = [];
                
                // فحص الطرق الممكنة
                if (timeAvailableHours >= distance / this.logicalConstraints.geographicalSpeedLimits.driving_1990s) {
                    feasibleMethods.push('car', 'bus', 'taxi');
                }
                if (timeAvailableHours >= distance / this.logicalConstraints.geographicalSpeedLimits.train_morocco) {
                    feasibleMethods.push('train');
                }
                
                return {
                    distance: distance,
                    timeAvailable: timeAvailableHours,
                    feasibleMethods: feasibleMethods,
                    impossibleMethods: ['airplane', 'camel', 'boat', 'teleportation']
                };
            }
            
            return null;
        }
        
        async retrieveTimelineSegment(query) {
            console.log("AgateMemory: Retrieving timeline segment...");
            
            const segment = this.extractTimelineSegment(query.startTime, query.endTime);
            const processedSegment = await this.processSegmentForRetrieval(segment, query);
            
            return {
                originalSegment: segment,
                processedSegment: processedSegment,
                metadata: {
                    totalAgates: segment.length,
                    whiteAgates: segment.filter(a => a.type === 'white_agate').length,
                    coloredAgates: segment.filter(a => a.type === 'measured_agate').length,
                    compressionRatio: this.calculateSegmentCompressionRatio(segment)
                }
            };
        }
        
        async processSegmentForRetrieval(segment, query) {
            const processedSegment = [];
            
            for (const agate of segment) {
                if (agate.type === 'white_agate' && query.speculateWhiteContent) {
                    const speculatedContent = await this.speculateWhiteAgateContent(agate, query.currentContext);
                    processedSegment.push({
                        ...agate,
                        speculation: speculatedContent
                    });
                } else {
                    processedSegment.push(agate);
                }
            }
            
            return processedSegment;
        }
        
        async speculateWhiteAgateContent(whiteAgate, currentContext) {
            // تطبيق القيود المنطقية للتخمين
            const constraints = whiteAgate.logicalConstraints;
            const adjacentAgates = this.getAdjacentAgates(whiteAgate.timelinePosition);
            
            let speculation = {
                method: 'logical_constraint_based',
                possibleScenarios: [],
                impossibleScenarios: [],
                confidence: 0.5
            };
            
            if (constraints.geographical) {
                speculation.possibleScenarios.push(...constraints.geographical.feasibleMethods.map(method => ({
                    scenario: `travel_via_${method}`,
                    confidence: this.calculateMethodConfidence(method),
                    constraints: constraints.geographical
                })));
                
                speculation.impossibleScenarios.push(...constraints.geographical.impossibleMethods.map(method => ({
                    scenario: `travel_via_${method}`,
                    reason: 'geographically_or_technologically_impossible'
                })));
            }
            
            return speculation;
        }
        
        calculateMethodConfidence(method) {
            const confidenceMap = {
                'car': 0.7,
                'bus': 0.8,
                'taxi': 0.6,
                'train': 0.5
            };
            return confidenceMap[method] || 0.3;
        }
        
        insertIntoTimeline(agate) {
            this.timeline.push(agate);
            agate.timelinePosition = this.timeline.length - 1;
        }
        
        calculateTimelinePosition() {
            return this.timeline.length;
        }
        
        getAdjacentAgates(position) {
            return {
                before: position > 0 ? this.timeline[position - 1] : null,
                after: position < this.timeline.length - 1 ? this.timeline[position + 1] : null
            };
        }
        
        scheduleCompressionCheck() {
            // فحص إمكانية ضغط العقيق الأبيض المتتالي
            console.log("AgateMemory: Scheduling compression check for white agate sequences...");
        }
        
        extractTimelineSegment(startTime, endTime) {
            return this.timeline.filter(agate => 
                agate.timestamp >= startTime && agate.timestamp <= endTime
            );
        }
        
        calculateSegmentCompressionRatio(segment) {
            const whiteAgates = segment.filter(a => a.type === 'white_agate').length;
            return whiteAgates > 0 ? Math.min(0.8, whiteAgates / segment.length) : 0;
        }
        
        handleNoVotingData(data, context) {
            console.warn("AgateMemory: No voting data available, storing as white agate by default");
            const whiteAgate = this.createWhiteAgate(data, context);
            this.insertIntoTimeline(whiteAgate);
            
            return {
                success: true,
                agateType: 'white',
                timelinePosition: whiteAgate.timelinePosition,
                storageReason: 'no_voting_data_fallback'
            };
        }
    },
    
    // مفاهيم أخرى بسيطة
    SkillAcquisitionManager: class { 
        async processPracticeExperience(data, context) { 
            console.log("SkillAcquisitionManager (Script Writer) processing..."); 
            return { updatedSkillScript: { id: "driving_script_v1.1" } }; 
        } 
    },
    
    EmbodimentInterface: class { 
        async reportState(data, context) { 
            console.log("EmbodimentInterface reporting..."); 
            return { embodimentFeedback: { energyLevel: 0.7 } }; 
        } 
    },
    
    EnvironmentalVariables: class { 
        async assess(data, context) { 
            console.log("EnvironmentalVariables assessing..."); 
            return { environmentalAssessment: { current_condition: "stable" } }; 
        } 
    },
    
    NoiseFactor: class { 
        async applyNoise(data, context) { 
            console.log("NoiseFactor applying noise..."); 
            return { noisyData: data }; 
        } 
    },
    
    AriadneThread: class {
        async monitorSafety(data, context) {
            console.log("AriadneThread: Monitoring safety...");
            return {
                safetyStatus: 'green',
                dangerLevel: 0.1,
                interventionRecommendation: 'continue_normal_operation'
            };
        }
    }
};

// --- 3. الكلاس الرئيسي لـ WinoScript Engine مع ذاكرة العقيق ---
class WinoScriptEngine {
    constructor(flowBlueprint, conceptImpls) {
        console.log("WinoScript Engine: Initializing with Agate Memory integration...");
        this.flowSequence = flowBlueprint.flow_sequence;
        this.handlers = {};
        
        // تهيئة كائنات المعالجات مع التركيز على ذاكرة العقيق
        for (const conceptId in conceptImpls) {
            if (conceptImpls.hasOwnProperty(conceptId)) {
                const className = this.convertToClassName(conceptId);
                if (conceptImpls[className]) {
                    this.handlers[conceptId] = new conceptImpls[className]();
                } else if (conceptImpls[conceptId] && typeof conceptImpls[conceptId] === 'function') {
                    this.handlers[conceptId] = new conceptImpls[conceptId]();
                } else {
                    this.handlers[conceptId] = this.createMockHandler(conceptId);
                }
            }
        }
        
        // تعيين المعالجات الأساسية
        this.handlers['simulators'] = new conceptImplementations.SimulatorOrchestrator();
        this.handlers['agate-memory'] = new conceptImplementations.AgateMemory(); // جديد
        this.handlers['generative-collapse'] = new conceptImplementations.GenerativeCollapse();
        this.handlers['meta-cognition'] = new conceptImplementations.MetaCognition();
        this.handlers['ariadne-thread'] = new conceptImplementations.AriadneThread();
        
        this.currentGlobalState = {};
        console.log("WinoScript Engine: Initialized with Agate Memory support.");
    }
    
    convertToClassName(conceptId) {
        return conceptId.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^(.)/, (g) => g.toUpperCase());
    }
    
    createMockHandler(conceptId) {
        return {
            process: async (data) => {
                console.log(`Mock handler for ${conceptId} processing...`);
                return { mockOutput: `Output from ${conceptId}` };
            }
        };
    }

    /**
     * الوظيفة الرئيسية لتشغيل دورة إدراكية كاملة مع تكامل ذاكرة العقيق.
     */
    async runCognitiveCycle(initialTriggerData, initialContext = {}) {
        console.log("\n=== WinoScript Engine: Starting cognitive cycle with Agate Memory ===");
        this.currentGlobalState = { 
            ...initialContext, 
            triggerData: initialTriggerData, 
            stepOutputs: {},
            agateMemorySession: {
                sessionId: this.generateSessionId(),
                startTime: Date.now(),
                votingEnabled: true
            },
            timestamp_start_cycle: Date.now()
        };

        for (const stepConfig of this.flowSequence) {
            console.log(`\n--- Step ${stepConfig.step}: ${stepConfig.process} ---`);
            
            let stepInputData = this.prepareStepInput(stepConfig);
            let accumulatedStepOutput = {};

            // معالجة خاصة للخطوات الجديدة المتعلقة بذاكرة العقيق
            if (stepConfig.step === 3.5) {
                accumulatedStepOutput = await this.processAgateStorageDecision(stepInputData);
            } else {
                // معالجة عادية للمفاهيم
                for (const conceptId of stepConfig.concepts) {
                    const conceptOutput = await this.processConceptInStep(conceptId, stepInputData);
                    accumulatedStepOutput = { ...accumulatedStepOutput, ...conceptOutput };
                }
            }

            // تحديث الحالة الكلية
            this.currentGlobalState = { ...this.currentGlobalState, ...accumulatedStepOutput };

            // حفظ مخرجات الخطوة
            if (stepConfig.output_key || stepConfig.step === 3.5) {
                const outputKey = stepConfig.output_key || `step_${stepConfig.step}_output`;
                this.currentGlobalState.stepOutputs[outputKey] = accumulatedStepOutput;
            }
        }

        this.currentGlobalState.timestamp_end_cycle = Date.now();
        
        // تقرير نهائي يشمل معلومات ذاكرة العقيق
        const finalReport = this.generateFinalReport();
        
        console.log("\n=== Cognitive cycle completed with Agate Memory integration ===");
        return { success: true, finalState: this.currentGlobalState, agateReport: finalReport };
    }
    
    prepareStepInput(stepConfig) {
        let stepInputData = this.currentGlobalState;
        
        if (stepConfig.input_source === "initial_trigger") {
            stepInputData = this.currentGlobalState.triggerData;
        } else if (stepConfig.input_source && this.currentGlobalState.stepOutputs[stepConfig.input_source]) {
            stepInputData = this.currentGlobalState.stepOutputs[stepConfig.input_source];
        }
        
        return stepInputData;
    }
    
    async processConceptInStep(conceptId, stepInputData) {
        const handler = this.handlers[conceptId];
        if (!handler) {
            console.warn(`No handler found for concept '${conceptId}'`);
            return { [`${conceptId}_status`]: "handler_not_found" };
        }
        
        try {
            console.log(`Processing with concept: ${conceptId}`);
            
            // معالجة خاصة لكل نوع من المفاهيم
            if (conceptId === 'simulators' && typeof handler.processWithAllSimulators === 'function') {
                return await handler.processWithAllSimulators(stepInputData, this.currentGlobalState);
            } else if (conceptId === 'meta-cognition' && typeof handler.monitorAndSuggest === 'function') {
                return await handler.monitorAndSuggest(this.currentGlobalState, this.currentGlobalState);
            } else if (conceptId === 'agate-memory' && typeof handler.processStorageDecision === 'function') {
                return await handler.processStorageDecision(stepInputData, this.currentGlobalState);
            } else if (conceptId === 'ariadne-thread' && typeof handler.monitorSafety === 'function') {
                return await handler.monitorSafety(stepInputData, this.currentGlobalState);
            } else if (typeof handler.process === 'function') {
                return await handler.process(stepInputData, this.currentGlobalState);
            } else {
                console.warn(`Handler for '${conceptId}' does not have a recognized processing method.`);
                return { [`${conceptId}_status`]: "no_processing_method" };
            }
        } catch (error) {
            console.error(`Error processing concept '${conceptId}':`, error.message);
            return { [`${conceptId}_error`]: error.message };
        }
    }
    
    // جديد: معالجة خاصة لخطوة قرار التخزين في ذاكرة العقيق
    async processAgateStorageDecision(stepInputData) {
        console.log("🔄 Processing Agate Storage Decision (Step 3.5)...");
        
        let output = {};
        
        // تقييم أمان شامل مع الخيط الأريادني
        if (this.handlers['ariadne-thread']) {
            const safetyAssessment = await this.handlers['ariadne-thread'].monitorSafety(
                stepInputData, 
                this.currentGlobalState
            );
            output.safetyAssessment = safetyAssessment;
            
            // إذا كان هناك خطر، تطبيق التدخل
            if (safetyAssessment.dangerLevel > 0.6) {
                console.warn("⚠️ Safety concern detected, applying Ariadne intervention...");
                output.ariadneIntervention = {
                    applied: true,
                    interventionLevel: safetyAssessment.interventionRecommendation,
                    reason: 'safety_override'
                };
            }
        }
        
        // قرار التخزين في ذاكرة العقيق
        if (this.handlers['agate-memory'] && !output.ariadneIntervention?.applied) {
            const storageDecision = await this.handlers['agate-memory'].processStorageDecision(
                stepInputData, 
                this.currentGlobalState
            );
            output.agateStorageDecision = storageDecision;
            
            console.log(`💎 Agate storage: ${storageDecision.agateType} (${storageDecision.agateColor || 'white'})`);
        }
        
        // مراقبة من الميتا كوجنيشن
        if (this.handlers['meta-cognition']) {
            const metaAssessment = await this.handlers['meta-cognition'].monitorAndSuggest(
                output, 
                this.currentGlobalState
            );
            output.metaAssessment = metaAssessment;
        }
        
        return output;
    }
    
    generateFinalReport() {
        const agateHandler = this.handlers['agate-memory'];
        
        let agateReport = {
            sessionId: this.currentGlobalState.agateMemorySession?.sessionId,
            cycleDuration: this.currentGlobalState.timestamp_end_cycle - this.currentGlobalState.timestamp_start_cycle,
            timelineUpdated: !!this.currentGlobalState.agateStorageDecision,
            storageDecision: this.currentGlobalState.agateStorageDecision || null,
            votingData: this.currentGlobalState.votingConsensus || null,
            safetyEvents: this.currentGlobalState.safetyAssessment || null
        };
        
        if (agateHandler && agateHandler.timeline) {
            agateReport.currentTimelineLength = agateHandler.timeline.length;
            agateReport.lastAgateType = agateHandler.timeline.length > 0 ? 
                agateHandler.timeline[agateHandler.timeline.length - 1].type : 'none';
        }
        
        return agateReport;
    }
    
    generateSessionId() {
        return `wino_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // جديد: دالة مساعدة لاسترجاع قطعة من الخط الزمني
    async retrieveTimelineSegment(query) {
        if (!this.handlers['agate-memory']) {
            throw new Error("Agate Memory not initialized");
        }
        
        return await this.handlers['agate-memory'].retrieveTimelineSegment(query);
    }
    
    // جديد: دالة لعرض الخط الزمني الحالي
    displayCurrentTimeline() {
        const agateHandler = this.handlers['agate-memory'];
        if (!agateHandler || !agateHandler.timeline) {
            console.log("No timeline available");
            return;
        }
        
        console.log("\n📊 Current Agate Timeline:");
        console.log("=" .repeat(50));
        
        agateHandler.timeline.forEach((agate, index) => {
            const timestamp = new Date(agate.timestamp).toLocaleTimeString();
            const agateIcon = agate.type === 'measured_agate' ? '🔵' : '⚪';
            const color = agate.color || 'white';
            
            console.log(`${index}: ${agateIcon} [${color}] ${timestamp} - ${agate.content || 'unmeasured'}`);
        });
        
        console.log("=" .repeat(50));
    }
}

// --- 4. دالة مساعدة لتهيئة العقل حسب المستوى المعرفي ---
function initializeMindFor(organism_profile) {
    const availableLayers = cognitiveLayers.cognitive_stack.filter(l => l.layer_id <= organism_profile.max_layer);
    let availableConcepts = [];
    
    availableLayers.forEach(layer => {
        availableConcepts.push(...layer.key_concepts_activated);
    });
    
    const engine = new WinoScriptEngine(cognitiveFlowBlueprint, conceptImplementations);
    return engine;
}

// --- 5. مثال للاستخدام مع ذاكرة العقيق ---
async function runAgateMemoryDemo() {
    console.log("🚀 Starting WinoScript Demo with Agate Memory...");
    
    const engine = new WinoScriptEngine(cognitiveFlowBlueprint, conceptImplementations);

    // محاكاة تجربة مهمة (قرار السفر من الدار البيضاء إلى طنجة)
    const importantExperience = {
        type: "important_decision",
        content: "planning_trip_casablanca_to_tangier",
        realityRelevance: 0.8,
        futureImportance: 0.7,
        memoryWorthiness: 0.9,
        socialImpact: 0.5,
        novelty: 0.6,
        emotionalIntensity: 0.6
    };
    
    const context = {
        current_activity: "travel_planning",
        location: "casablanca",
        previousLocation: "rabat",
        timeElapsed: 2 * 24 * 60 * 60 * 1000, // يومان
        timeEra: "1990s",
        emotionalState: "excited_anticipation"
    };

    console.log("\n📝 Processing important experience...");
    const result1 = await engine.runCognitiveCycle(importantExperience, context);
    
    if (result1.success) {
        console.log("\n✅ First cycle completed!");
        console.log("📊 Agate Report:", result1.agateReport);
        engine.displayCurrentTimeline();
    }

    // محاكاة تجربة عادية (غير مهمة)
    const ordinaryExperience = {
        type: "routine_activity",
        content: "having_morning_coffee",
        realityRelevance: 0.3,
        futureImportance: 0.2,
        memoryWorthiness: 0.1,
        socialImpact: 0.1,
        novelty: 0.1,
        emotionalIntensity: 0.3
    };

    console.log("\n📝 Processing ordinary experience...");
    const result2 = await engine.runCognitiveCycle(ordinaryExperience, { current_activity: "morning_routine" });
    
    if (result2.success) {
        console.log("\n✅ Second cycle completed!");
        console.log("📊 Agate Report:", result2.agateReport);
        engine.displayCurrentTimeline();
    }

    // استرجاع قطعة من الخط الزمني
    console.log("\n🔍 Retrieving timeline segment...");
    try {
        const timelineQuery = {
            startTime: Date.now() - (1 * 60 * 60 * 1000), // آخر ساعة
            endTime: Date.now(),
            speculateWhiteContent: true,
            currentContext: {
                emotionalState: "reflective",
                location: "tangier",
                timeEra: "1990s"
            }
        };
        
        const timelineSegment = await engine.retrieveTimelineSegment(timelineQuery);
        console.log("📚 Timeline segment retrieved:", timelineSegment.metadata);
        
        if (timelineSegment.processedSegment.length > 0) {
            console.log("🔍 Segment details:");
            timelineSegment.processedSegment.forEach((agate, index) => {
                console.log(`  ${index}: ${agate.type} - ${agate.content}`);
                if (agate.speculation) {
                    console.log(`    💭 Speculation: ${agate.speculation.possibleScenarios?.length || 0} scenarios`);
                }
            });
        }
    } catch (error) {
        console.error("Error retrieving timeline:", error.message);
    }

    console.log("\n🎉 Agate Memory Demo completed!");
    return {
        engine: engine,
        results: [result1, result2],
        totalExperiences: 2
    };
}

// --- 6. تصدير للاستخدام في بيئات أخرى ---
module.exports = { 
    WinoScriptEngine, 
    conceptImplementations, 
    cognitiveFlowBlueprint,
    agateMemorySchema,
    runAgateMemoryDemo,
    initializeMindFor
};

// --- 7. تشغيل تلقائي للديمو (يمكن تعطيله) ---
// قم بإلغاء التعليق لتشغيل الديمو تلقائياً
/*
if (require.main === module) {
    runAgateMemoryDemo().catch(console.error);
}
*/
