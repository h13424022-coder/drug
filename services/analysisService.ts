
import { DRUG_DB, REASONS, FOOD_INFERENCE } from '../constants';
import { FinalReport, Warning } from '../types';

export const analyzeMeal = (mealInput: string): FinalReport => {
  const userMenus = mealInput.split(',').map(m => m.trim()).filter(m => m.length > 0);
  const finalReport: FinalReport = {};

  for (const menu of userMenus) {
    const detected = new Set<string>();
    
    // Check for direct ingredient mention
    Object.keys(REASONS).forEach(key => {
      if (menu.replace(/\s/g, "").includes(key)) {
        detected.add(key);
      }
    });

    // Check for inferred ingredients
    Object.entries(FOOD_INFERENCE).forEach(([fk, items]) => {
      if (menu.includes(fk)) {
        items.forEach(itm => detected.add(itm));
      }
    });

    if (detected.size > 0) {
      const warnings: Warning[] = [];
      const unsafe = new Set<string>();
      
      detected.forEach(ing => {
        Object.entries(DRUG_DB).forEach(([drug, info]) => {
          if (info.주의식재료.includes(ing)) {
            warnings.push({
              name: drug,
              reason: REASONS[ing],
              brand: info.상품명.join(", ")
            });
            unsafe.add(drug);
          }
        });
      });

      const safe = Object.keys(DRUG_DB)
        .filter(d => !unsafe.has(d))
        .map(d => `${d}(${DRUG_DB[d].상품명.join(", ")})`);

      finalReport[menu] = {
        detected: Array.from(detected),
        warnings: warnings,
        safe: safe
      };
    }
  }

  return finalReport;
};
