import { incomeTaxEvaluator } from './evaluators/incomeTax';
import { capitalGainsEvaluator } from './evaluators/capitalGains';
import { privacyEvaluator } from './evaluators/privacy';

const evaluators = [
  incomeTaxEvaluator,
  capitalGainsEvaluator,
  privacyEvaluator
];

export function evaluateRules(rules, profile) {
  const triggered = [];
  
  for (const rule of rules) {
    let evaluatedResult = null;
    
    // Find matching evaluator plugin
    for (const ev of evaluators) {
      if (ev.canEvaluate(rule.rule_type)) {
        try {
          evaluatedResult = ev.evaluate(rule, profile);
        } catch (e) {
          console.error(`Evaluator ${ev.id} failed on rule ${rule.id}:`, e);
        }
        break;
      }
    }
    
    if (evaluatedResult) {
      triggered.push({
        ...rule,
        ...evaluatedResult
      });
    }
  }
  
  return triggered;
}
