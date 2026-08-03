export interface FeatureFlags {
  enableSplitCompare: boolean;
  enableAISidecar: boolean;
  enableKnowledgeGraph: boolean;
  enableScenarioSimulator: boolean;
  enableAIEvaluationObservatory: boolean;
  enableTerminalWorkspace: boolean;
}

export const defaultFeatureFlags: FeatureFlags = {
  enableSplitCompare: true,
  enableAISidecar: true,
  enableKnowledgeGraph: true,
  enableScenarioSimulator: true,
  enableAIEvaluationObservatory: true,
  enableTerminalWorkspace: true,
};

export const getFeatureFlag = (key: keyof FeatureFlags): boolean => {
  return defaultFeatureFlags[key] ?? true;
};
