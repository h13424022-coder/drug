
export interface DrugInfo {
  상품명: string[];
  주의식재료: string[];
}

export interface DrugDB {
  [key: string]: DrugInfo;
}

export interface Reasons {
  [key: string]: string;
}

export interface FoodInference {
  [key: string]: string[];
}

export interface Warning {
  name: string;
  reason: string;
  brand: string;
}

export interface AnalysisResult {
  detected: string[];
  warnings: Warning[];
  safe: string[];
}

export interface FinalReport {
  [menu: string]: AnalysisResult;
}
